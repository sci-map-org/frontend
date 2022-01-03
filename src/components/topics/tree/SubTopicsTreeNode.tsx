import { IconButton } from '@chakra-ui/button';
import { AddIcon, ExternalLinkIcon, Icon, MinusIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';
import { BiDuplicate } from '@react-icons/all-files/bi/BiDuplicate';
import { BiLink } from '@react-icons/all-files/bi/BiLink';
import { BiUnlink } from '@react-icons/all-files/bi/BiUnlink';
import { isDescendant, NodeRendererProps } from 'react-sortable-tree';
import {
  useAttachTopicIsPartOfTopicMutation,
  useDetachTopicIsPartOfTopicMutation,
} from '../../../graphql/topics/topics.operations.generated';
import { SubTopicRelationshipType } from '../../../graphql/types';
import { TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { ButtonWithConfirmationDialog } from '../../lib/buttons/ButtonWithConfirmationDialog';
import { DeleteButtonWithConfirmation } from '../../lib/buttons/DeleteButtonWithConfirmation';
import { PageLink } from '../../navigation/InternalLink';
import { TopicLevelViewer } from '../fields/TopicLevel';
import { TopicTypesViewer } from '../fields/TopicTypeViewer';
import { ManageTopicModal } from '../ManageTopic';
import { getTopicIdFromNodeId } from './SubTopicsTree';
import { SubTopicsTreeNodeDataFragment } from './SubTopicsTreeNodeData.generated';

interface SubTopicsTreeNodeProps extends NodeRendererProps {
  baseTopicNodeId: string;
  nodeTopicRelation: SubTopicsTreeNodeDataFragment;
  onTreeUpdated: () => void;
  //   subTopics?: SubTopicsTreeNodeDataFragment[]
}

// const rowPadding = '4px';
const linesColor = 'gray.400';

export const SubTopicsTreeNode: React.FC<SubTopicsTreeNodeProps> = ({
  node,
  nodeTopicRelation,
  baseTopicNodeId,
  onTreeUpdated,
  didDrop,
  canDrop,
  isDragging,
  draggedNode,
  canDrag,
  connectDragSource,
  connectDragPreview,
  scaffoldBlockPxWidth,
  toggleChildrenVisibility,
  path,
  treeIndex,
}) => {
  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  const [attachTopicIsPartOfTopicMutation] = useAttachTopicIsPartOfTopicMutation();
  const [detachTopicIsPartOfTopicMutation] = useDetachTopicIsPartOfTopicMutation();

  const nodeContent = connectDragPreview(
    //   Mandatory to have native html elements
    <div>
      <Flex
        position="relative"
        display="flex"
        flexDir="row"
        borderWidth={2}
        borderColor="gray.600"
        {...(canDrag && {
          _hover: {
            // borderColor: 'gray.500',
            boxShadow: 'md',
          },
        })}
        borderRadius={4}
        alignItems="stretch"
        pt="2px"
        pl="4px"
        pb="2px"
        pr="1px"
        // whiteSpace="nowrap"
        {...(isLandingPadActive && {
          boxShadow: 'none !important',
          //   outline: 'none !important', // ? what does this do ?
          _before: {
            backgroundColor: 'blue.200',
            content: '""',
            position: 'absolute',
            height: '100%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
          },
        })}
        {...(isLandingPadActive &&
          !canDrop && {
            boxShadow: 'none !important',
            _before: {
              backgroundColor: 'red.200',
              height: '100%',
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: -1,
            },
          })}
        opacity={isDraggedDescendant ? 0.5 : 1}
      >
        <Stack direction="column" spacing={1}>
          <PageLink pageInfo={TopicPageInfo(nodeTopicRelation.subTopic)} isExternal _focus={{}} _active={{}}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Text as="span">{nodeTopicRelation.subTopic.name}</Text>
              <ExternalLinkIcon />
            </Stack>
          </PageLink>
          <Flex direction="row" justifyContent="space-between" pr="2px" pb="1px">
            {(nodeTopicRelation.relationshipType === SubTopicRelationshipType.IsPartOf ||
              !!nodeTopicRelation.subTopic.topicTypes?.length) && (
              <Flex direction="row" {...(typeof nodeTopicRelation.subTopic.level === 'number' && { mr: '8px' })}>
                {nodeTopicRelation.relationshipType === SubTopicRelationshipType.IsPartOf && (
                  <Icon as={BiLink} mr={1} color="blue.500" />
                )}
                <TopicTypesViewer topicTypes={nodeTopicRelation.subTopic.topicTypes || []} size="sm" maxShown={2} />
              </Flex>
            )}
            <TopicLevelViewer level={nodeTopicRelation.subTopic.level || undefined} size="sm" />
          </Flex>
        </Stack>
        {node.updatable && (
          <Flex flexDir="column" justifyContent="space-between" pl={2}>
            <ManageTopicModal
              topicKey={nodeTopicRelation.subTopic.key}
              renderButton={(openModal) => (
                <Tooltip label={`Manage ${nodeTopicRelation.subTopic.name}`}>
                  <IconButton
                    aria-label={`Manage ${nodeTopicRelation.subTopic.name}`}
                    size="xs"
                    fontSize="1em"
                    isRound
                    variant="ghost"
                    icon={<SettingsIcon />}
                    onClick={() => openModal()}
                  />
                </Tooltip>
              )}
            />
            {nodeTopicRelation.relationshipType === SubTopicRelationshipType.IsPartOf ? (
              <ButtonWithConfirmationDialog
                renderButton={(openDialog) => (
                  <Tooltip label={`Remove virtual copy (detach "Also Part Of" relationship) ?`}>
                    <IconButton
                      aria-label={`Remove virtual copy (detach "Also Part Of" relationship) ?`}
                      icon={<BiUnlink />}
                      size="xs"
                      isRound
                      fontSize="1em"
                      variant="ghost"
                      onClick={openDialog}
                    />
                  </Tooltip>
                )}
                dialogBodyText={`Remove virtual copy "${nodeTopicRelation.subTopic.name}" ?`}
                dialogHeaderText={`Detach "${nodeTopicRelation.subTopic.name}" ?`}
                confirmButtonText="Detach"
                confirmButtonColorScheme="red"
                onConfirmation={async () => {
                  await detachTopicIsPartOfTopicMutation({
                    variables: {
                      partOfTopicId: getTopicIdFromNodeId(
                        path.length > 1 ? (path[path.length - 2] as string) : baseTopicNodeId
                      ),
                      subTopicId: nodeTopicRelation.subTopic._id,
                    },
                  });
                  onTreeUpdated();
                }}
              />
            ) : (
              <Tooltip label={`Create virtual copy (new "Also Part Of" relationship) ?`}>
                <IconButton
                  aria-label={`Create virtual copy (new "Also Part Of" relationship) ?`}
                  icon={<BiDuplicate />}
                  size="xs"
                  isRound
                  fontSize="1em"
                  variant="ghost"
                  onClick={() => {
                    attachTopicIsPartOfTopicMutation({
                      variables: {
                        partOfTopicId: getTopicIdFromNodeId(
                          path.length > 1 ? (path[path.length - 2] as string) : baseTopicNodeId
                        ),
                        subTopicId: nodeTopicRelation.subTopic._id,
                        payload: { index: nodeTopicRelation.index + 1 },
                      },
                    });
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        )}
      </Flex>
    </div>
  );

  return (
    <Box h="100%" display="flex" flexDirection="row" alignItems="center">
      {toggleChildrenVisibility && node.children && (node.children.length > 0 || typeof node.children === 'function') && (
        <IconButton
          type="button"
          icon={node.expanded ? <MinusIcon /> : <AddIcon />}
          size="xs"
          isRound
          _focus={{}}
          _hover={{}}
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
      )}

      <Box
        cursor="move"
        // _hover={{
        //   opacity: 0.9,
        // }}
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
