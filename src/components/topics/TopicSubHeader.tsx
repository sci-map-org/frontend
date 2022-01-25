import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, LinkBox, LinkOverlay, Skeleton, Stack, Text, Wrap, WrapItem, WrapProps } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { ReactNode } from 'react';
import { TopicTypeFullData } from '../../graphql/topic_types/topic_types.fragments';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../../pages/PageInfo';
import {
  ManageTopicPageInfo,
  ManageTopicPagePath,
  TopicTreePageInfo,
  TopicTreePagePath,
} from '../../pages/RoutesPageInfos';
import { RoleAccess, userHasAccess } from '../auth/RoleAccess';
import { ResourceIcon } from '../lib/icons/ResourceIcon';
import { TopicIcon } from '../lib/icons/TopicIcon';
import { TreeIcon } from '../lib/icons/TreeIcon';
import { PageLink } from '../navigation/InternalLink';
import { TopicLevelViewer } from './fields/TopicLevel';
import { TopicTypesViewer } from './fields/TopicTypeViewer';
import { TopicSubHeaderDataFragment } from './TopicSubHeader.generated';

export const TopicSubHeaderData = gql`
  fragment TopicSubHeaderData on Topic {
    _id
    key
    name
    level
    topicTypes {
      ...TopicTypeFullData
    }
    learningMaterialsTotalCount
    subTopicsTotalCount
  }
  ${TopicTypeFullData}
`;

interface TopicSubHeaderProps {
  topic: TopicSubHeaderDataFragment;
  size: 'sm' | 'md';
  isLoading?: boolean;
  subTopicsDisplay?: 'tree' | 'count';
  displayManage?: boolean;
}

export const TopicSubHeader: React.FC<TopicSubHeaderProps & WrapProps> = ({
  topic,
  size,
  isLoading,
  subTopicsDisplay = 'tree',
  displayManage,
  ...wrapProps
}) => {
  const { currentUser } = useCurrentUser();
  const menuItems = [
    ...(!!topic.topicTypes ? [<TopicTypesViewer topicTypes={topic.topicTypes} maxShown={2} />] : []),
    ...(!!topic.level ? [<TopicLevelViewer level={topic.level} />] : []),
    subTopicsDisplay === 'tree' ? (
      <TextSubHeaderItem
        size={size}
        pageInfo={TopicTreePageInfo(topic)}
        leftIcon={<TopicIcon boxSize="22px" color="currentColor" />}
        text="SubTopics Tree"
        rightIcon={<TreeIcon boxSize="20px" color="currentColor" mt="2px" />}
      />
    ) : (
      <TextSubHeaderItem
        size={size}
        pageInfo={TopicTreePageInfo(topic)}
        leftIcon={<TopicIcon boxSize="22px" color="currentColor" />}
        text={`${topic.subTopicsTotalCount} SubTopics`}
      />
    ),
    <TextSubHeaderItem
      size={size}
      leftIcon={<ResourceIcon boxSize="20px" color="currentColor" />}
      text={`${topic.learningMaterialsTotalCount} Resources`}
    />,
    ...(displayManage && userHasAccess('contributorOrAdmin', currentUser)
      ? [
          <TextSubHeaderItem
            size={size}
            pageInfo={ManageTopicPageInfo(topic)}
            leftIcon={<SettingsIcon boxSize="16px" color="currentColor" />}
            text="Manage"
          />,
        ]
      : []),
  ].reduce((final, item, idx, menuItems) => {
    final.push(item);
    if (idx < menuItems.length - 1)
      final.push(
        <Text fontWeight={500} fontSize="15px" color="gray.500">
          |
        </Text>
      );

    return final;
  }, [] as JSX.Element[]);
  return (
    <Wrap spacing="11px" {...wrapProps}>
      {menuItems.map((menuItem, idx) => (
        <WrapItem key={idx}>
          <Skeleton isLoaded={!isLoading}>{menuItem}</Skeleton>
        </WrapItem>
      ))}
    </Wrap>
  );
};

const TextSubHeaderItem: React.FC<{
  size: TopicSubHeaderProps['size'];
  text: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  pageInfo?: PageInfo;
  onClick?: () => void;
}> = ({ text, leftIcon = null, rightIcon = null, pageInfo }) => {
  const visualElement = (
    <Stack
      direction="row"
      alignItems="center"
      spacing="5px"
      color="gray.600"
      _hover={{ color: 'gray.800' }}
      transition="color ease-in 0.15s"
    >
      {leftIcon}
      <Text
        fontWeight={500}
        fontSize="14px"
        pt="1px"
        textDecoration="unset"
        _hover={{ textDecoration: 'unset' }}
        _active={{}}
      >
        {text}
      </Text>
      {rightIcon}
    </Stack>
  );
  return pageInfo ? (
    <PageLink pageInfo={pageInfo} color="gray.600" _hover={{}} _active={{}} _focus={{}}>
      {visualElement}
    </PageLink>
  ) : (
    visualElement
  );
};
