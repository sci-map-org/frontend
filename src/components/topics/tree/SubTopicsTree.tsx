import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import SortableTree, { getVisibleNodeCount, TreeItem } from 'react-sortable-tree';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import {
  useAttachTopicIsPartOfTopicMutation,
  useAttachTopicIsSubTopicOfTopicMutation,
  useDetachTopicIsPartOfTopicMutation,
  useDetachTopicIsSubTopicOfTopicMutation,
  useUpdateTopicIsPartOfTopicMutation,
  useUpdateTopicIsSubTopicOfTopicMutation,
} from '../../../graphql/topics/topics.operations.generated';
import { SubTopicRelationshipType } from '../../../graphql/types';
import { DeepMergeTwoTypes } from '../../../util/types.util';
import { RoleAccess } from '../../auth/RoleAccess';
import { NewTopicModal } from './../NewTopic';
import { SubTopicsTreeDataFragment } from './SubTopicsTree.generated';
import { CustomNodeRendererConnector, SubTopicsTreeNodeData } from './SubTopicsTreeNode';
import { SubTopicsTreeNodeDataFragment } from './SubTopicsTreeNode.generated';

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

type SubTopicItem = DeepMergeTwoTypes<
  SubTopicsTreeNodeDataFragment,
  {
    subTopic: {
      subTopics?: SubTopicItem[] | null;
    };
  }
>;

type PendingUpdate = {
  nodeId: string;
  previousParentNodeId: string;
  nextParentNodeId: string;
  index: number;
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
  const baseTopicNodeId = createNodeId(topic._id, SubTopicRelationshipType.IsSubtopicOf);

  // const transformSubTopics = (subTopicItems: SubTopicItem[], canUpdate: boolean): TreeItem[] => {
  const transformSubTopics = (subTopicItems: SubTopicItem[], canUpdate: boolean): TreeItem[] => {
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

  const [treeData, setTreeData] = useState<TreeItem[]>([]);
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
  const runUpdate = async ({ previousParentNodeId, nextParentNodeId, nodeId, index }: PendingUpdate) => {
    const relationshipType = getRelationshipTypeFromNodeId(nodeId);
    if (previousParentNodeId === nextParentNodeId) {
      if (relationshipType === SubTopicRelationshipType.IsSubtopicOf) {
        await updateTopicIsSubTopicOfTopicMutation({
          variables: {
            parentTopicId: getTopicIdFromNodeId(previousParentNodeId),
            subTopicId: getTopicIdFromNodeId(nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      } else {
        await updateTopicIsPartOfTopicMutation({
          variables: {
            partOfTopicId: getTopicIdFromNodeId(previousParentNodeId),
            subTopicId: getTopicIdFromNodeId(nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      }
    } else {
      if (relationshipType === SubTopicRelationshipType.IsSubtopicOf) {
        await detachTopicIsSubTopicOfTopicMutation({
          variables: {
            parentTopicId: getTopicIdFromNodeId(previousParentNodeId),
            subTopicId: getTopicIdFromNodeId(nodeId),
          },
          fetchPolicy: 'no-cache',
        });
        await attachTopicIsSubTopicOfTopicMutation({
          variables: {
            parentTopicId: getTopicIdFromNodeId(nextParentNodeId),
            subTopicId: getTopicIdFromNodeId(nodeId),
            payload: { index },
          },
          fetchPolicy: 'no-cache',
        });
      } else {
        await detachTopicIsPartOfTopicMutation({
          variables: {
            partOfTopicId: getTopicIdFromNodeId(previousParentNodeId),
            subTopicId: getTopicIdFromNodeId(nodeId),
          },
          fetchPolicy: 'no-cache',
        });
        await attachTopicIsPartOfTopicMutation({
          variables: {
            partOfTopicId: getTopicIdFromNodeId(nextParentNodeId),
            subTopicId: getTopicIdFromNodeId(nodeId),
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

  return (
    <Stack spacing={4} width="1300px">
      {isLoading || isUpdating ? (
        <Center h="400px" w="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box h={`${count * 72 + 10}px`} w="100%">
          <SortableTree
            treeData={treeData}
            rowHeight={72}
            scaffoldBlockPxWidth={140}
            onMoveNode={({ node, prevPath, prevTreeIndex, nextTreeIndex, nextPath, nextParentNode }) => {
              const nodeId = node.nodeId;
              const previousParentNodeId: string =
                prevPath.length > 1 ? (prevPath[prevPath.length - 2] as string) : baseTopicNodeId;

              const nextParentNodeId: string =
                nextPath.length > 1 ? (nextPath[nextPath.length - 2] as string) : baseTopicNodeId;
              if (previousParentNodeId === nextParentNodeId && prevTreeIndex === nextTreeIndex) return;

              const siblings: TreeItem[] = nextParentNode ? (nextParentNode.children as TreeItem[]) : treeData;

              const nextRelativeIndex = siblings.findIndex((sibling) => sibling.nodeId === node.nodeId);
              const prevNode = siblings[nextRelativeIndex - 1];

              const nextNode = siblings[nextRelativeIndex + 1];

              if (nextNode && !prevNode)
                addPendingUpdate({
                  nodeId,
                  previousParentNodeId,
                  nextParentNodeId,
                  index: nextNode.subTopicItem.index / 2,
                });
              if (prevNode && !nextNode)
                addPendingUpdate({
                  nodeId,
                  previousParentNodeId,
                  nextParentNodeId,
                  index: prevNode.subTopicItem.index + 1000,
                });

              if (!prevNode && !nextNode)
                addPendingUpdate({ nodeId, previousParentNodeId, nextParentNodeId, index: 10000000 });
              if (prevNode && nextNode)
                addPendingUpdate({
                  nodeId,
                  previousParentNodeId,
                  nextParentNodeId,
                  index: (prevNode.subTopicItem.index + nextNode.subTopicItem.index) / 2,
                });
            }}
            canDrag={({ node }) => node.updatable}
            canDrop={({ node, nextParent }) =>
              !nextParent ||
              (nextParent.updatable && nextParent.subTopicItem.relationshipType !== SubTopicRelationshipType.IsPartOf)
            }
            onChange={(treeData) => setTreeData(treeData)}
            getNodeKey={({ node }) => {
              const subTopicItem: SubTopicsTreeNodeDataFragment = node.subTopicItem;
              return createNodeId(subTopicItem.subTopic._id, subTopicItem.relationshipType);
            }}
            nodeContentRenderer={CustomNodeRendererConnector}
          />
        </Box>
      )}
      <Stack spacing={6} pt={4}>
        {updatable && (
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
  );
};
