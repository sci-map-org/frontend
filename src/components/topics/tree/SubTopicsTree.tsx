import { useApolloClient } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import React, { useEffect, useMemo, useState } from 'react';
import SortableTree, {
  addNodeUnderParent,
  find,
  getVisibleNodeCount,
  NodeRendererProps,
  removeNode,
  TreeItem,
  TreeNode,
} from 'react-sortable-tree';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import {
  useAttachTopicIsPartOfTopicMutation,
  useAttachTopicIsSubTopicOfTopicMutation,
  useDetachTopicIsPartOfTopicMutation,
  useDetachTopicIsSubTopicOfTopicMutation,
  useUpdateTopicContextMutation,
  useUpdateTopicIsPartOfTopicMutation,
  useUpdateTopicIsSubTopicOfTopicMutation,
} from '../../../graphql/topics/topics.operations.generated';
import { SubTopicRelationshipType } from '../../../graphql/types';
import { RoleAccess } from '../../auth/RoleAccess';
import { SelectContextTopic } from '../fields/TopicNameField';
import { NewTopicModal } from './../NewTopic';
import {
  GetTopicValidContextsQuery,
  GetTopicValidContextsQueryVariables,
  SubTopicsTreeDataFragment,
} from './SubTopicsTree.generated';
import { SubTopicsTreeNode, SubTopicsTreeNodeData } from './SubTopicsTreeNode';
import { SubTopicsTreeNodeDataFragment } from './SubTopicsTreeNode.generated';

export const getTopicValidContexts = gql`
  query getTopicValidContexts($parentTopicId: String!, $topicId: String!) {
    getTopicValidContexts(parentTopicId: $parentTopicId, topicId: $topicId) {
      validContexts {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

export const SubTopicsTreeData = gql`
  fragment SubTopicsTreeData on Topic {
    ...TopicLinkData
    subTopics {
      ...SubTopicsTreeNodeData
      subTopic {
        subTopics {
          ...SubTopicsTreeNodeData
          subTopic {
            subTopics {
              ...SubTopicsTreeNodeData
            }
          }
        }
      }
    }
  }
  ${TopicLinkData}
  ${SubTopicsTreeNodeData}
`;
export interface SubTopicsTreeProps {
  topic: SubTopicsTreeDataFragment;
  onUpdated: () => void;
  isLoading?: boolean;
  updatable: boolean;
}

type SubTopicItem = SubTopicsTreeNodeDataFragment & {
  subTopic: SubTopicsTreeNodeDataFragment['subTopic'] & {
    subTopics?: SubTopicItem[] | null;
  };
};
let t: SubTopicItem;

type PendingUpdate = {
  node: TopicTreeItem;
  previousParentNode: TopicTreeItem;
  nextParentNode: TopicTreeItem;
  index: number;
  newContextTopicId?: string;
};

type TopicTreeItem = TreeItem & {
  subTopicItem: SubTopicItem;
  nodeId: string;
  baseTopicNodeId: string;
  index: number;
  updatable: boolean;
};

const getNodeKey = (treeNode: TreeNode): string => {
  const node = treeNode.node as TopicTreeItem;

  return node.nodeId;
};

export const createNodeId = (topicId: string, relation: SubTopicRelationshipType) => {
  return `${relation}~${topicId}`;
};

export const getTopicIdFromNodeId = (nodeId: string) => {
  return nodeId.split('~')[1];
};

export const getRelationshipTypeFromNodeId = (nodeId: string): SubTopicRelationshipType => {
  return nodeId.split('~')[0] as SubTopicRelationshipType;
};
export const SubTopicsTree: React.FC<SubTopicsTreeProps> = ({ topic, onUpdated, isLoading, updatable }) => {
  const baseTopicNodeId = useMemo(() => createNodeId(topic._id, SubTopicRelationshipType.IsSubtopicOf), [topic._id]);

  const baseTopicFakeNode: TopicTreeItem = useMemo(
    () => ({
      nodeId: baseTopicNodeId,
      baseTopicNodeId,
      subTopicItem: {
        subTopic: topic,
        index: 0,
        relationshipType: SubTopicRelationshipType.IsSubtopicOf,
      },
      index: 0,
      updatable: false,
    }),
    [baseTopicNodeId]
  );

  const [selectValidContextModalProps, setSelectValidContextModalProps] = useState<
    Omit<SelectValidContextModalProps, 'onSelectValidContext' | 'isOpen' | 'onCancel'>
  >();
  const client = useApolloClient();

  const transformSubTopics = (subTopicItems: SubTopicItem[], canUpdate: boolean): TopicTreeItem[] => {
    return subTopicItems.map((subTopicItem) => {
      return {
        subTopicItem,

        nodeId: createNodeId(
          subTopicItem.subTopic._id as string,
          subTopicItem.relationshipType as SubTopicRelationshipType
        ),
        baseTopicNodeId,
        title: subTopicItem.subTopic.name,
        index: subTopicItem.index,
        updatable: canUpdate && updatable,
        children:
          subTopicItem.subTopic.subTopics && subTopicItem.relationshipType === SubTopicRelationshipType.IsSubtopicOf
            ? // Don't expand on links, otherwise it adds some complication with
              // none unique keys/portions of the tree that should be synchronised
              transformSubTopics(subTopicItem.subTopic.subTopics, updatable)
            : undefined,
        expanded: true,
      };
    });
  };

  const [treeData, setTreeData] = useState<TopicTreeItem[]>([]);
  const buildTreeData = () => {
    const subTopicsData = topic.subTopics ? transformSubTopics(topic.subTopics, true) : [];
    setTreeData(subTopicsData);
  };
  useEffect(() => {
    buildTreeData();
  }, [topic.subTopics]);

  const count = getVisibleNodeCount({ treeData });

  const [isUpdating, setIsUpdating] = useState(false);
  // ideally would be better to have a single source of truth
  const [pendingUpdates, setPendingUpdates] = useState<PendingUpdate[]>([]);

  const addPendingUpdate = async (update: PendingUpdate) => setPendingUpdates([...pendingUpdates, update]);

  const [updateTopicIsSubTopicOfTopicMutation] = useUpdateTopicIsSubTopicOfTopicMutation();
  const [updateTopicIsPartOfTopicMutation] = useUpdateTopicIsPartOfTopicMutation();
  const [attachTopicIsSubTopicOfTopicMutation] = useAttachTopicIsSubTopicOfTopicMutation();
  const [attachTopicIsPartOfTopicMutation] = useAttachTopicIsPartOfTopicMutation();
  const [detachTopicIsSubTopicOfTopicMutation] = useDetachTopicIsSubTopicOfTopicMutation();
  const [detachTopicIsPartOfTopicMutation] = useDetachTopicIsPartOfTopicMutation();

  const [updateTopicContextMutation] = useUpdateTopicContextMutation();

  const runUpdate = async ({ previousParentNode, nextParentNode, node, index, newContextTopicId }: PendingUpdate) => {
    if (newContextTopicId) {
      await updateTopicContextMutation({
        variables: {
          topicId: getTopicIdFromNodeId(node.nodeId),
          contextTopicId: newContextTopicId,
        },
      });
    }
    const relationshipType = getRelationshipTypeFromNodeId(node.nodeId);

    if (previousParentNode.nodeId === nextParentNode.nodeId) {
      if (relationshipType === SubTopicRelationshipType.IsSubtopicOf) {
        await updateTopicIsSubTopicOfTopicMutation({
          variables: {
            parentTopicId: getTopicIdFromNodeId(previousParentNode.nodeId),
            subTopicId: getTopicIdFromNodeId(node.nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      } else {
        await updateTopicIsPartOfTopicMutation({
          variables: {
            partOfTopicId: getTopicIdFromNodeId(previousParentNode.nodeId),
            subTopicId: getTopicIdFromNodeId(node.nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      }
    } else {
      if (relationshipType === SubTopicRelationshipType.IsSubtopicOf) {
        await detachTopicIsSubTopicOfTopicMutation({
          variables: {
            parentTopicId: getTopicIdFromNodeId(previousParentNode.nodeId),
            subTopicId: getTopicIdFromNodeId(node.nodeId),
          },
          fetchPolicy: 'no-cache',
        });
        await attachTopicIsSubTopicOfTopicMutation({
          variables: {
            parentTopicId: getTopicIdFromNodeId(nextParentNode.nodeId),
            subTopicId: getTopicIdFromNodeId(node.nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      } else {
        await detachTopicIsPartOfTopicMutation({
          variables: {
            partOfTopicId: getTopicIdFromNodeId(previousParentNode.nodeId),
            subTopicId: getTopicIdFromNodeId(node.nodeId),
          },
          fetchPolicy: 'no-cache',
        });
        await attachTopicIsPartOfTopicMutation({
          variables: {
            partOfTopicId: getTopicIdFromNodeId(nextParentNode.nodeId),
            subTopicId: getTopicIdFromNodeId(node.nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      }
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

  const checkIfContextStillValid = async ({
    node,
    previousParentNode,
    nextParentNode,
    index,
  }: PendingUpdate): Promise<boolean> => {
    const { data } = await client.query<GetTopicValidContextsQuery, GetTopicValidContextsQueryVariables>({
      query: getTopicValidContexts,
      variables: {
        parentTopicId: getTopicIdFromNodeId(nextParentNode.nodeId),
        topicId: getTopicIdFromNodeId(node.nodeId),
      },
    });
    if (!node.subTopicItem.subTopic.contextTopic?._id) throw new Error('Context topic should exists');
    if (!data.getTopicValidContexts.validContexts) throw new Error('No valid contexts returned');
    const currentContextStillValid = data.getTopicValidContexts.validContexts?.find((validContext) => {
      return validContext._id === node.subTopicItem.subTopic.contextTopic?._id;
    });
    if (!currentContextStillValid) {
      // open the modal and stuff
      setSelectValidContextModalProps({
        validContexts: data.getTopicValidContexts.validContexts,
        currentContext: node.subTopicItem.subTopic.contextTopic,
        pendingUpdate: {
          node,
          previousParentNode,
          nextParentNode,
          index,
        },
      });
      return false;
    }
    return true;
  };

  const getNodeById = (nodeId: string): { node: TopicTreeItem; path: string[] } => {
    if (nodeId === baseTopicFakeNode.nodeId) return { node: baseTopicFakeNode, path: [] };
    const { matches } = find({
      treeData,
      getNodeKey, // required but not used ???
      searchMethod: (n) => n.node.nodeId === nodeId,
    });

    if (!matches.length) throw new Error(`${nodeId} not found`);
    return {
      node: matches[0].node as TopicTreeItem,
      path: matches[0].path as string[],
    };
  };

  return (
    <>
      <Stack spacing={4} width="1300px">
        {isLoading || isUpdating ? (
          <Center h="400px" w="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          treeData.length && (
            <Box h={`${count * 72 + 10}px`} w="100%">
              <SortableTree
                treeData={treeData}
                rowHeight={72}
                scaffoldBlockPxWidth={140}
                onMoveNode={async ({ node: nodeUntyped, prevPath, prevTreeIndex, nextTreeIndex, nextPath }) => {
                  const node = nodeUntyped as TopicTreeItem;

                  const previousParentNodeId: string =
                    prevPath.length > 1 ? (prevPath[prevPath.length - 2] as string) : baseTopicNodeId;
                  const { node: previousParentNode } = getNodeById(previousParentNodeId);

                  const nextParentNodeId: string =
                    nextPath.length > 1 ? (nextPath[nextPath.length - 2] as string) : baseTopicNodeId;
                  const { node: nextParentNode } = getNodeById(nextParentNodeId);

                  if (previousParentNodeId === nextParentNodeId && prevTreeIndex === nextTreeIndex) return;

                  const siblings: TopicTreeItem[] =
                    nextParentNode.nodeId === baseTopicNodeId ? treeData : (nextParentNode.children as TopicTreeItem[]);

                  const nextRelativeIndex = siblings.findIndex((sibling) => sibling.nodeId === node.nodeId);
                  const prevNode = siblings[nextRelativeIndex - 1];

                  const nextNode = siblings[nextRelativeIndex + 1];

                  let index: number;
                  if (prevNode && nextNode) index = (prevNode.subTopicItem.index + nextNode.subTopicItem.index) / 2;
                  else if (!prevNode && nextNode) index = nextNode.subTopicItem.index / 2;
                  else if (prevNode && !nextNode) index = prevNode.subTopicItem.index + 1000;
                  else index = 10000000;

                  if (
                    nextParentNodeId !== previousParentNodeId &&
                    getRelationshipTypeFromNodeId(node.nodeId) === SubTopicRelationshipType.IsSubtopicOf &&
                    !!node.subTopicItem.subTopic.context
                  ) {
                    // the topic has a context, we're changing its parent and the topic is a subtopic, so we need to check the context.
                    const isValid = await checkIfContextStillValid({
                      node: node as TopicTreeItem,
                      previousParentNode,
                      nextParentNode,
                      index,
                    });
                    if (!isValid) return;
                  }

                  addPendingUpdate({
                    node,
                    previousParentNode,
                    nextParentNode,
                    index,
                  });
                }}
                canDrag={({ node }) => node.updatable}
                canDrop={({ node, nextParent }) =>
                  !nextParent ||
                  (nextParent.updatable &&
                    nextParent.subTopicItem.relationshipType !== SubTopicRelationshipType.IsPartOf)
                }
                onChange={(treeData) => setTreeData(treeData as TopicTreeItem[])}
                getNodeKey={({ node }) => {
                  const subTopicItem: SubTopicsTreeNodeDataFragment = node.subTopicItem;
                  return createNodeId(subTopicItem.subTopic._id, subTopicItem.relationshipType);
                }}
                nodeContentRenderer={({ node, treeId, ...props }: NodeRendererProps) => (
                  <SubTopicsTreeNode
                    baseTopicNodeId={node.baseTopicNodeId}
                    treeId={treeId}
                    nodeTopicRelation={node.subTopicItem as SubTopicsTreeNodeDataFragment}
                    node={node}
                    onTreeUpdated={onUpdated}
                    {...props}
                  />
                )}
              />
            </Box>
          )
        )}
        <Stack spacing={6} pt={4}>
          {updatable && treeData.length && (
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
                <Button
                  w="45%"
                  colorScheme="blue"
                  isDisabled={!pendingUpdates.length}
                  onClick={() => runPendingUpdates()}
                >
                  Save
                  {!!pendingUpdates.length &&
                    ` (${pendingUpdates.length} change${pendingUpdates.length === 1 ? '' : 's'})`}
                </Button>
              </Flex>
            </RoleAccess>
          )}
          <RoleAccess accessRule="loggedInUser">
            <NewTopicModal
              parentTopic={topic}
              renderButton={(openModal) => (
                <Button colorScheme="blue" onClick={() => openModal()} variant="outline">
                  + Add SubTopic
                </Button>
              )}
              onCreated={() => onUpdated()}
            />
          </RoleAccess>
        </Stack>
      </Stack>
      {selectValidContextModalProps && (
        <SelectValidContextModal
          // isOpen={isOpen}
          onSelectValidContext={(selectedContext, pendingUpdate) => {
            // add pending update (including new context) -> how to avoid updating it several time ?
            addPendingUpdate({
              ...pendingUpdate,
              newContextTopicId: selectedContext._id,
            });
            setSelectValidContextModalProps(undefined);
          }}
          onCancel={({ node, previousParentNode }) => {
            const res = removeNode({ treeData, path: getNodeById(node.nodeId).path, getNodeKey });
            if (!res) throw new Error('Failed to remove node');
            if (res) {
              const { treeData: updatedTreeData } = addNodeUnderParent({
                parentKey: previousParentNode.nodeId,
                treeData: res.treeData,
                getNodeKey,
                newNode: node,
              });
              setTreeData(updatedTreeData as TopicTreeItem[]);
            }
            setSelectValidContextModalProps(undefined);
          }}
          {...selectValidContextModalProps}
        />
      )}
    </>
  );
};

interface SelectValidContextModalProps {
  pendingUpdate: PendingUpdate;
  validContexts: TopicLinkDataFragment[];
  onSelectValidContext: (selectedContext: TopicLinkDataFragment, pendingUpdate: PendingUpdate) => void;
  // node: TopicTreeItem;
  currentContext: TopicLinkDataFragment;
  // isOpen: boolean;
  onCancel: (pendingUpdate: PendingUpdate) => void;
  // previousParent: TopicTreeItem;
  // nextParent: TopicTreeItem;
  // index: number;
}

const SelectValidContextModal: React.FC<SelectValidContextModalProps> = ({
  validContexts,
  onSelectValidContext,
  pendingUpdate,
  currentContext,
  onCancel,
}) => {
  const { node, previousParentNode, nextParentNode } = pendingUpdate;
  const [selectedContext, setSelectedContext] = useState<TopicLinkDataFragment>(validContexts[0]);
  return (
    <Modal blockScrollOnMount={false} isOpen={true} onClose={() => onCancel(pendingUpdate)} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select valid context for {node.subTopicItem.subTopic.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={8} pt={8} pb={16} display="flex" alignItems="stretch" justifyContent="stretch">
          <Stack>
            <Text>
              By moving the topic <b>{node.subTopicItem.subTopic.name}</b> from within{' '}
              <b>{previousParentNode.subTopicItem.subTopic.name}</b> to{' '}
              <b>{nextParentNode.subTopicItem.subTopic.name}</b>, its current context{' '}
              <Text as="span" fontWeight={600} color="gray.400">
                ({currentContext.name})
              </Text>{' '}
              is not valid anymore. Please select a new context:
            </Text>
            <Center>
              <Stack direction="row" alignItems="center">
                <Text whiteSpace="nowrap" fontWeight={600} color="gray.600">
                  New Context:
                </Text>
                <SelectContextTopic
                  contexts={validContexts}
                  selectedContext={selectedContext}
                  onSelect={setSelectedContext}
                />
              </Stack>
            </Center>
            <Stack direction="row" justifyContent="flex-end">
              <Button colorScheme="red" onClick={() => onCancel(pendingUpdate)}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isDisabled={!selectedContext}
                onClick={() => selectedContext && onSelectValidContext(selectedContext, pendingUpdate)}
              >
                Select Context
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
