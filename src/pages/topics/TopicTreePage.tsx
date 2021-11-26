import { Box, Flex, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { SubTopicsTreeData, SubTopicsTreeProps } from '../../components/topics/SubTopicsTree';
import { generateTopicData } from '../../graphql/topics/topics.fragments';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { TopicPageInfo, TopicTreePageInfo } from '../RoutesPageInfos';
import { GetTopicByKeyTopicTreePageQuery, useGetTopicByKeyTopicTreePageQuery } from './TopicTreePage.generated';

const SubTopicsTree = dynamic<SubTopicsTreeProps>(
  () =>
    import('../../components/topics/SubTopicsTree').then((res) => {
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
  const { currentUser } = useCurrentUser();

  const canUpdate = useMemo(
    () => !!currentUser && (currentUser.role === UserRole.Contributor || currentUser.role === UserRole.Admin),
    [currentUser]
  );

  if (!data && !loading) return <Box>Topic not found !</Box>;
  const topic = data?.getTopicByKey || placeholderTopicData;
  return (
    <PageLayout
      breadCrumbsLinks={[TopicPageInfo(topic), TopicTreePageInfo(topic)]}
      title={topic.name + ' - SubTopics'}
      centerChildren
      isLoading={loading}
    >
      <Flex direction="column" mt={4}>
        <Stack spacing={4} width="36rem">
          {topic.subTopics && (
            <SubTopicsTree
              topic={topic}
              onUpdated={() => {
                refetch();
              }}
              updatable={canUpdate}
              isLoading={loading}
            />
          )}
        </Stack>
      </Flex>
    </PageLayout>
  );
};
