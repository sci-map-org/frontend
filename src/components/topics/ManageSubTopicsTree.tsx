import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, ExternalLinkIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { BiUnlink } from '@react-icons/all-files/bi/BiUnlink';
import React, { useEffect, useMemo, useState } from 'react';
import SortableTree, { getVisibleNodeCount, NodeRendererProps, TreeItem } from 'react-sortable-tree';
import { ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment, DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import {
  useAttachTopicIsSubTopicOfTopicMutation,
  useDetachTopicIsSubTopicOfTopicMutation,
  useUpdateTopicIsSubTopicOfTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import { TopicType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { ConceptPageInfo, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { domainLinkStyleProps } from '../lib/links/DomainLink';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { DomainIcon } from '../lib/icons/DomainIcon';
import { PageLink } from '../navigation/InternalLink';
import { AddSubTopicModal } from './AddSubTopic';
export interface ManageSubTopicsTreeProps {
  domain: DomainDataFragment;
  subTopics: SubTopicItem[];
  onUpdated: () => void;
  isLoading?: boolean;
}
const rowPadding = '6px';
const linesColor = 'gray.400';

type SubTopicItem = {
  index: number;
  subTopic: {
    _id: string;
    topicType: TopicType;
    name: string;
    description?: string | null;
    subTopics?: SubTopicItem[] | null;
  };
};

type PendingUpdate = {
  nodeId: string;
  previousParentId: string;
  nextParentId: string;
  index: number;
};

export const ManageSubTopicsTree: React.FC<ManageSubTopicsTreeProps> = ({
  domain,
  subTopics,
  onUpdated,
  isLoading,
}) => {
  const { currentUser } = useCurrentUser();
  const canUpdate = useMemo(
    () => !!currentUser && (currentUser.role === UserRole.Contributor || currentUser.role === UserRole.Admin),
    [currentUser]
  );
  const transformSubTopics = (subTopicItems: SubTopicItem[], updatable: boolean): TreeItem[] => {
    return subTopicItems.map((subTopicItem) => ({
      ...subTopicItem.subTopic,
      title: subTopicItem.subTopic.name,
      index: subTopicItem.index,
      updatable: canUpdate && updatable,
      subtitle: subTopicItem.subTopic.description,
      children: subTopicItem.subTopic.subTopics
        ? transformSubTopics(
            subTopicItem.subTopic.subTopics,
            updatable && subTopicItem.subTopic.topicType !== TopicType.Domain
          )
        : undefined,
      expanded: subTopicItem.subTopic.topicType !== TopicType.Domain,
    }));
  };

  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const buildTreeData = () => {
    const subTopicsData = subTopics ? transformSubTopics(subTopics, true) : [];
    setTreeData(subTopicsData);
  };
  useEffect(() => {
    buildTreeData();
  }, [subTopics]);

  const count = getVisibleNodeCount({ treeData });

  const [isUpdating, setIsUpdating] = useState(false);
  // ideally would be better to have a single source of truth
  const [pendingUpdates, setPendingUpdates] = useState<PendingUpdate[]>([]);

  const addPendingUpdate = async (update: PendingUpdate) => setPendingUpdates([...pendingUpdates, update]);

  const [updateTopicIsSubTopicOfTopicMutation] = useUpdateTopicIsSubTopicOfTopicMutation();
  const [attachTopicIsSubTopicOfTopicMutation] = useAttachTopicIsSubTopicOfTopicMutation();
  const [detachTopicIsSubTopicOfTopicMutation] = useDetachTopicIsSubTopicOfTopicMutation();
  const runUpdate = async ({ previousParentId, nextParentId, nodeId, index }: PendingUpdate) => {
    if (previousParentId === nextParentId) {
      await updateTopicIsSubTopicOfTopicMutation({
        variables: { parentTopicId: previousParentId, subTopicId: nodeId, payload: { index } },
        fetchPolicy: 'no-cache',
      });
    } else {
      await detachTopicIsSubTopicOfTopicMutation({
        variables: { parentTopicId: previousParentId, subTopicId: nodeId },
        fetchPolicy: 'no-cache',
      });
      await attachTopicIsSubTopicOfTopicMutation({
        variables: { parentTopicId: nextParentId, subTopicId: nodeId, payload: { index } },
        fetchPolicy: 'no-cache',
      });
    }
  };
  const runPendingUpdates = async () => {
    setIsUpdating(true);
    for (let pendingUpdate of pendingUpdates) {
      await runUpdate(pendingUpdate);
    }
    setPendingUpdates([]);
    onUpdated();
    setIsUpdating(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      {isLoading || isUpdating ? (
        <Center h="400px" w="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box h={`${count * 36 + 10}px`} w="100%">
          <SortableTree
            treeData={treeData}
            onMoveNode={({ node, prevPath, prevTreeIndex, nextTreeIndex, nextPath, nextParentNode }) => {
              const nodeId = node._id;

              const previousParentId: string =
                prevPath.length > 1 ? (prevPath[prevPath.length - 2] as string) : domain._id;

              const nextParentId: string = nextPath.length > 1 ? (nextPath[nextPath.length - 2] as string) : domain._id;
              if (previousParentId === nextParentId && prevTreeIndex === nextTreeIndex) return;

              const siblings: TreeItem[] = nextParentNode ? (nextParentNode.children as TreeItem[]) : treeData;

              const nextRelativeIndex = siblings.findIndex((sibling) => sibling._id === node._id);
              const prevNode = siblings[nextRelativeIndex - 1];

              const nextNode = siblings[nextRelativeIndex + 1];

              if (nextNode && !prevNode)
                addPendingUpdate({ nodeId, previousParentId, nextParentId, index: nextNode.index / 2 });
              if (prevNode && !nextNode)
                addPendingUpdate({ nodeId, previousParentId, nextParentId, index: prevNode.index + 1000 });

              if (!prevNode && !nextNode) addPendingUpdate({ nodeId, previousParentId, nextParentId, index: 10000000 });
              if (prevNode && nextNode)
                addPendingUpdate({
                  nodeId,
                  previousParentId,
                  nextParentId,
                  index: (prevNode.index + nextNode.index) / 2,
                });
            }}
            canDrag={({ node }) => node.updatable}
            canDrop={({ node, nextParent }) =>
              !nextParent || (nextParent.updatable && nextParent.topicType !== TopicType.Domain)
            }
            generateNodeProps={({ node, path }) => ({
              buttons:
                node.topicType === TopicType.Concept
                  ? [
                      <PageLink pageInfo={ConceptPageInfo(domain, node as ConceptLinkDataFragment)} isExternal key="a">
                        <IconButton aria-label="Go to Topic" icon={<ExternalLinkIcon />} size="xs" variant="ghost" />
                      </PageLink>,
                    ]
                  : [
                      <PageLink pageInfo={DomainPageInfo(node as DomainLinkDataFragment)} isExternal key="b">
                        <IconButton aria-label="Go to Area" icon={<ExternalLinkIcon />} size="xs" variant="ghost" />
                      </PageLink>,
                      ...[
                        node.updatable
                          ? [
                              <DeleteButtonWithConfirmation
                                icon={<BiUnlink />}
                                size="xs"
                                key="a"
                                variant="ghost"
                                mode="iconButton"
                                modalBodyText={`Detach Area "${node.name}" from this topic ?`}
                                modalHeaderText={`Detach Area "${node.name}" ?`}
                                confirmButtonText="Detach"
                                onConfirmation={() => {
                                  detachTopicIsSubTopicOfTopicMutation({
                                    variables: {
                                      parentTopicId: path.length > 1 ? (path[path.length - 2] as string) : domain._id,
                                      subTopicId: node._id,
                                    },
                                  });
                                }}
                              />,
                            ]
                          : [],
                      ],
                    ],
            })}
            rowHeight={36}
            scaffoldBlockPxWidth={120}
            onChange={(treeData) => setTreeData(treeData)}
            getNodeKey={({ node }) => node._id}
            nodeContentRenderer={CustomThemeNodeContentRenderer}
          />
        </Box>
      )}
      <Stack spacing={6} pt={4}>
        <RoleAccess accessRule="contributorOrAdmin">
          <Flex justifyContent="space-between">
            <Button
              w="45%"
              isDisabled={!pendingUpdates.length}
              onClick={() => {
                setPendingUpdates([]);
                buildTreeData();
              }}
            >
              Cancel
            </Button>
            <Button w="45%" colorScheme="blue" isDisabled={!pendingUpdates.length} onClick={() => runPendingUpdates()}>
              Save
              {!!pendingUpdates.length && ` (${pendingUpdates.length} change${pendingUpdates.length === 1 ? '' : 's'})`}
            </Button>
          </Flex>
        </RoleAccess>
        <RoleAccess accessRule="loggedInUser">
          <Button colorScheme="blue" onClick={() => onOpen()} variant="outline">
            + Add SubTopic
          </Button>
          <AddSubTopicModal
            domain={domain}
            parentTopicId={domain._id}
            isOpen={isOpen}
            onClose={onClose}
            onAdded={() => onUpdated()}
            onCancel={() => onClose()}
          />
        </RoleAccess>
      </Stack>
    </Stack>
  );
};

function isDescendant(older: TreeItem, younger: TreeItem): boolean {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some((child) => child === younger || isDescendant(child, younger))
  );
}

const CustomThemeNodeContentRenderer: React.FC<NodeRendererProps> = ({
  buttons = [],
  canDrag = false,
  canDrop = false,
  className = '',
  draggedNode = null,
  icons = [],
  isSearchFocus = false,
  isSearchMatch = false,
  parentNode = null, // Needed for dndManager
  style = {},
  subtitle = null,
  swapDepth = null,
  swapFrom = null,
  swapLength = null,
  title = null,
  toggleChildrenVisibility = null,
  scaffoldBlockPxWidth,
  connectDragPreview,
  connectDragSource,
  isDragging,
  node,
  path,
  treeIndex,
  didDrop,
  lowerSiblingCounts,
  listIndex,
  treeId, // Not needed, but preserved for other renderers
  isOver, // Not needed, but preserved for other renderers
  ...otherProps
}) => {
  const nodeTitle = title || node.title;

  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;

  const nodeContent = connectDragPreview(
    <div>
      <Center
        pl={2}
        height="100%"
        whiteSpace="nowrap"
        display="flex"
        boxSizing="border-box"
        {...(isLandingPadActive
          ? {
              border: 'none !important',
              boxShadow: 'none !important',
              outline: 'none !important', // ? what does this do ?
              _before: {
                backgroundColor: 'blue.200',
                border: '2px dashed white',
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -1,
              },
            }
          : {})}
        {...(isLandingPadActive && !canDrop
          ? {
              border: 'none !important',
              boxShadow: 'none !important',
              outline: 'none !important', // ? what does this do ?
              _before: {
                backgroundColor: 'red.200',
                border: '2px dashed white',
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -1,
              },
            }
          : {})}
        opacity={isDraggedDescendant ? 0.5 : 1}
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1}>
            {node.topicType === TopicType.Domain && <DomainIcon boxSize={6} />}
            {/* {node.topicType === TopicType.Concept && <ConceptIcon opacity={0.7} boxSize={6} />} */}
            {/* {node.topicType === TopicType.LearningGoal && <LearningGoalIcon boxSize={6} />} */}
            <Text as="span" {...(node.topicType === TopicType.Domain && domainLinkStyleProps)}>
              {typeof nodeTitle === 'function'
                ? nodeTitle({
                    node,
                    path,
                    treeIndex,
                  })
                : nodeTitle}
            </Text>
          </Stack>
          <Stack direction="row" spacing={1}>
            {buttons}
          </Stack>
        </Stack>
      </Center>
    </div>
  );

  return (
    // {...otherProps} (was in the next Box/div, doesn't seem useful)
    <Box style={{ height: '100%' }} display="flex" direction="row" alignItems="center">
      {toggleChildrenVisibility && node.children && (node.children.length > 0 || typeof node.children === 'function') && (
        <Box>
          <IconButton
            type="button"
            icon={node.expanded ? <MinusIcon /> : <AddIcon />}
            size="xs"
            variant="outline"
            bgColor="white"
            aria-label={node.expanded ? 'Collapse' : 'Expand'}
            position="absolute"
            top="50%"
            transform="translate(-50%, -50%)"
            style={{ left: -0.5 * scaffoldBlockPxWidth }}
            onClick={() =>
              toggleChildrenVisibility({
                node,
                path,
                treeIndex,
              })
            }
          />

          {node.expanded && !isDragging && (
            <Box
              style={{ width: scaffoldBlockPxWidth }}
              height="100%"
              display="inline-block"
              position="absolute"
              _after={{
                content: '""',
                position: 'absolute',
                backgroundColor: linesColor,
                width: '1px',
                left: '50%',
                bottom: 0,
                height: rowPadding,
              }}
            />
          )}
        </Box>
      )}

      <Box
        padding={`${rowPadding} ${rowPadding} ${rowPadding} 0`}
        height="100%"
        box-sizing="border-box"
        cursor="move"
        _hover={{
          opacity: 0.75,
        }}
        _active={{
          opacity: 1,
        }}
        {...(!canDrag && {
          cursor: 'default',
          _hover: {
            opacity: 1,
          },
        })}
      >
        {canDrag ? connectDragSource(nodeContent, { dropEffect: 'copy' }) : nodeContent}
      </Box>
    </Box>
  );
};
