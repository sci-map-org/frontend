import { IconButton } from '@chakra-ui/button';
import { AddIcon, EditIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Center, Stack, Text } from '@chakra-ui/layout';
import React, { useMemo, useState } from 'react';
import SortableTree, { getVisibleNodeCount, NodeRendererProps, TreeItem } from 'react-sortable-tree';

export interface ManageSubTopicsTreeProps {
  subTopics: SubTopicItem[];
}
const rowPadding = '6px';
const linesColor = 'gray.400';

type SubTopicItem = {
  index: number;
  subTopic: {
    _id: string;
    name: string;
    description?: string | null;
    subTopics?: SubTopicItem[] | null;
  };
};
export const ManageSubTopicsTree: React.FC<ManageSubTopicsTreeProps> = ({ subTopics }) => {
  const transformSubTopics = (subTopicItems: SubTopicItem[]): TreeItem[] => {
    return subTopicItems.map((subTopicItem) => ({
      ...subTopicItem.subTopic,
      title: subTopicItem.subTopic.name,
      subtitle: subTopicItem.subTopic.description,
      children: subTopicItem.subTopic.subTopics ? transformSubTopics(subTopicItem.subTopic.subTopics) : undefined,
      expanded: true,
    }));
  };
  const subTopicsData = useMemo(() => {
    return subTopics ? transformSubTopics(subTopics) : [];
  }, [subTopics]);

  const editSubTopic = (subTopicId: string) => {
    console.log(subTopicId);
  };
  const [treeData, setTreeData] = useState<TreeItem[]>(subTopicsData);
  const count = getVisibleNodeCount({ treeData });
  return (
    <Box h={`${count * 36 + 10}px`}>
      <SortableTree
        treeData={treeData}
        rowHeight={36}
        scaffoldBlockPxWidth={120}
        onChange={(treeData) => setTreeData(treeData)}
        getNodeKey={({ node }) => node._id}
        nodeContentRenderer={CustomThemeNodeContentRenderer}
      />
    </Box>
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
        <Stack direction="row">
          <Text as="span">
            {typeof nodeTitle === 'function'
              ? nodeTitle({
                  node,
                  path,
                  treeIndex,
                })
              : nodeTitle}
          </Text>

          <IconButton
            aria-label="Edit SubTopic"
            icon={<EditIcon />}
            onClick={() => console.log(node._id)}
            size="xs"
            variant="ghost"
          >
            Test
          </IconButton>
        </Stack>
      </Center>
    </div>
  );

  return (
    <Box style={{ height: '100%' }} {...otherProps} display="flex" direction="row" alignItems="center">
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
