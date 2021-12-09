import { IconButton } from '@chakra-ui/button';
import { AddIcon, ExternalLinkIcon, MinusIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { BiLink } from '@react-icons/all-files/bi/BiLink';
import { BiUnlink } from '@react-icons/all-files/bi/BiUnlink';
import gql from 'graphql-tag';
import { isDescendant, NodeRendererProps } from 'react-sortable-tree';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { routerPushToPage } from '../../../pages/PageInfo';
import { ManageTopicPageInfo, TopicPageInfo } from '../../../pages/RoutesPageInfos';
import { DeleteButtonWithConfirmation } from '../../lib/buttons/DeleteButtonWithConfirmation';
import { PageLink } from '../../navigation/InternalLink';
import { useDetachTopicIsPartOfTopicMutation } from '../EditablePartOfTopics.generated';
import { SubTopicsTreeNodeDataFragment } from './SubTopicsTreeNode.generated';

export const CustomNodeRendererConnector: React.FC<NodeRendererProps> = ({ node, treeId, ...props }) => {
  return (
    <SubTopicsTreeNode
      baseTopicId={node.baseTopicId}
      treeId={treeId}
      nodeTopicRelation={node.subTopicItem as SubTopicsTreeNodeDataFragment}
      node={node}
      {...props}
    />
  );
};

export const SubTopicsTreeNodeData = gql`
  fragment SubTopicsTreeNodeData on TopicIsSubTopicOfTopic {
    index
    relationshipType
    subTopic {
      ...TopicLinkData
    }
  }
  ${TopicLinkData}
`;

interface SubTopicsTreeNodeProps extends NodeRendererProps {
  baseTopicId: string;
  nodeTopicRelation: SubTopicsTreeNodeDataFragment;
  //   subTopics?: SubTopicsTreeNodeDataFragment[]
}

// const rowPadding = '4px';
const linesColor = 'gray.400';

export const SubTopicsTreeNode: React.FC<SubTopicsTreeNodeProps> = ({
  node,
  nodeTopicRelation,
  baseTopicId,
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
  const [detachTopicIsPartOfTopicMutation] = useDetachTopicIsPartOfTopicMutation();

  const nodeContent = connectDragPreview(
    //   Mandatory to have native html elements
    <div>
      <Flex
        borderWidth={2}
        borderColor="gray.600"
        flexDir="row"
        alignItems="stretch"
        borderRadius={4}
        whiteSpace="nowrap"
        position="relative"
        display="flex"
        // height="100%"
        // boxSizing="content-box"
        {...(isLandingPadActive && {
          //   border: 'none !important',
          boxShadow: 'none !important',
          outline: 'none !important', // ? what does this do ?
          _before: {
            backgroundColor: 'blue.200',
            // border: '2px dashed white',
            content: '""',
            position: 'absolute',
            // borderRadius: 4,
            // my: rowPadding, //
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
            //   border: 'none !important',
            boxShadow: 'none !important',
            //   outline: 'none !important', // ? what does this do ?
            _before: {
              backgroundColor: 'red.200',
              // border: '2px dashed white',
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
        {/* <Stack direction="row" spacing={2}> */}
        <Stack direction="column" spacing={0}>
          <PageLink pageInfo={TopicPageInfo(nodeTopicRelation.subTopic)} isExternal _focus={{}} _active={{}}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Text as="span">{nodeTopicRelation.subTopic.name}</Text>
              <ExternalLinkIcon />
            </Stack>
          </PageLink>
          <Stack direction="row" spacing={1}>
            <BiLink color="blue.500" />
          </Stack>
        </Stack>
        <Flex flexDir="column" justifyContent="space-between" p={1} pl={2}>
          <IconButton
            aria-label="manage topic"
            size="xs"
            variant="ghost"
            icon={<SettingsIcon />}
            onClick={() => routerPushToPage(ManageTopicPageInfo(nodeTopicRelation.subTopic))}
          />
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
              detachTopicIsPartOfTopicMutation({
                variables: {
                  partOfTopicId: path.length > 1 ? (path[path.length - 2] as string) : baseTopicId,
                  subTopicId: node._id,
                },
              });
            }}
          />
        </Flex>
        {/* <PageLink pageInfo={TopicPageInfo(nodeTopicRelation.subTopic)} isExternal>
              <IconButton aria-label="Go to Topic" icon={<ExternalLinkIcon />} size="xs" variant="ghost" />
            </PageLink> */}
        {/* 
        <DeleteButtonWithConfirmation
              icon={<BiUnlink />}
              size="xs"
              key="a"
              variant="ghost"
              mode="iconButton"
              modalBodyText={`Detach Area "${node.name}" from this topic ?`}
              modalHeaderText={`Detach Area "${node.name}" ?`}
            confirmButtonText="Detach" */}
        {/* //   onConfirmation={() => {
            //     detachTopicIsSubTopicOfTopicMutation({
            //       variables: {
            //         parentTopicId: path.length > 1 ? (path[path.length - 2] as string) : topic._id,
            //         subTopicId: node._id,
            //       },
            //     });
            //   }}
            // /> */}
        {/* </Stack> */}
      </Flex>
    </div>
  );

  return (
    // {...otherProps} (was in the next Box/div, doesn't seem useful)
    <Box h="100%" display="flex" direction="row" alignItems="center">
      {toggleChildrenVisibility && node.children && (node.children.length > 0 || typeof node.children === 'function') && (
        // <Box>
        <IconButton
          type="button"
          icon={node.expanded ? <MinusIcon /> : <AddIcon />}
          size="xs"
          isRound
          _focus={{}}
          _hover={{}}
          // _active={{}}
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

      {/* {node.expanded && !isDragging && (
            <Box
              style={{ width: scaffoldBlockPxWidth }}
              height="100%"
              display="inline-block"
              position="absolute"
              _after={{
                content: '""',
                position: 'absolute',
                // backgroundColor: linesColor,
                width: '1px',
                left: '50%',
                bottom: 0,
                height: rowPadding,
              }}
            />
          )} */}
      {/* // </Box> */}

      <Box
        // padding={`${rowPadding} ${rowPadding} ${rowPadding} 0`}
        // py={rowPadding}
        // height="100%"
        // boxSizing="border-box"
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
