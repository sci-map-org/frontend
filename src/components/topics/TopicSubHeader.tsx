import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React from 'react';
import { TopicTypeFullData } from '../../graphql/topic_types/topic_types.fragments';
import { ManageTopicPagePath, TopicTreePagePath } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { ResourceIcon } from '../lib/icons/ResourceIcon';
import { TopicIcon } from '../lib/icons/TopicIcon';
import { TreeIcon } from '../lib/icons/TreeIcon';
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
  }
  ${TopicTypeFullData}
`;

interface TopicSubHeaderProps {
  topic: TopicSubHeaderDataFragment;
  size: 'sm' | 'md';
}
export const TopicSubHeader: React.FC<TopicSubHeaderProps> = ({ topic, size }) => {
  return (
    <Flex direction="column" py={2}>
      <Stack direction="row" spacing="16px" alignItems="center" mb={2}>
        {topic.topicTypes && <TopicTypesViewer topicTypes={topic.topicTypes} maxShown={2} />}
        {topic.level && <TopicLevelViewer level={topic.level} />}
      </Stack>
      <Stack direction="row" spacing="16px" alignItems="center">
        <LinkBox as="div">
          <Stack direction="row" alignItems="center" spacing="6px">
            <TopicIcon boxSize="22px" color="gray.500" mb="2px" />
            <Text fontWeight={500} fontSize="md" color="gray.500" pt="1px">
              <LinkOverlay href={TopicTreePagePath(topic.key)}>SubTopics Tree</LinkOverlay>
            </Text>
            <TreeIcon boxSize="20px" color="gray.500" mt="1px" />
          </Stack>
        </LinkBox>
        <Text fontWeight={500} fontSize="lg" color="gray.500">
          |
        </Text>
        <Stack direction="row" alignItems="center" spacing="6px">
          <ResourceIcon boxSize="20px" color="gray.500" />
          <Text fontWeight={500} fontSize="md" color="gray.500" pt="1px">
            {topic.learningMaterialsTotalCount} Resources
          </Text>
        </Stack>
        <RoleAccess accessRule="contributorOrAdmin">
          <Text fontWeight={500} fontSize="lg" color="gray.500">
            |
          </Text>
          <LinkBox as="div">
            <Stack direction="row" alignItems="center" spacing="6px">
              <SettingsIcon boxSize="16px" color="gray.500" />
              <Text fontWeight={500} fontSize="md" color="gray.500">
                <LinkOverlay href={ManageTopicPagePath(topic.key)}>Manage</LinkOverlay>
              </Text>
            </Stack>
          </LinkBox>
        </RoleAccess>
      </Stack>
    </Flex>
  );
};
