import { Box, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { SubTopicsTreeData, SubTopicsTreeProps } from '../../components/topics/tree/SubTopicsTree';
import { generateTopicData } from '../../graphql/topics/topics.fragments';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { TopicPageInfo, TopicTreePageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyTopicTreePageQuery, useGetTopicByKeyTopicTreePageQuery } from './TopicTreePage.generated';

const SubTopicsTree = dynamic<SubTopicsTreeProps>(
  () =>
    import('../../components/topics/tree/SubTopicsTree').then((res) => {
      const { SubTopicsTree } = res;
      return SubTopicsTree;
    }),
  { ssr: false }
);

export const getTopicByKeyTopicTreePage = gql`
  query getTopicByKeyTopicTreePage($topicKey: String!) {
    getTopicByKey(topicKey: $topicKey) {
      ...SubTopicsTreeData
    }
  }
  ${SubTopicsTreeData}
`;

const placeholderTopicData: GetTopicByKeyTopicTreePageQuery['getTopicByKey'] = generateTopicData();

export const TopicTreePage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const { data, loading, refetch } = useGetTopicByKeyTopicTreePageQuery({
    variables: {
      topicKey,
    },
  });

  if (!data && !loading) return <Box>Topic not found !</Box>;
  const topic = data?.getTopicByKey || placeholderTopicData;
  return (
    <PageLayout
      breadCrumbsLinks={[TopicPageInfo(topic), TopicTreePageInfo(topic)]}
      title={topic.name + ' - SubTopics'}
      centerChildren
      isLoading={loading}
    >
      {topic.subTopics && (
        <SubTopicsTree
          topic={topic}
          onUpdated={() => {
            refetch();
          }}
          updatable={false}
          isLoading={loading}
        />
      )}
    </PageLayout>
  );
};
