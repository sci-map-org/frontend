import { Box, Flex, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/lib/Typography';
import { PageButtonLink } from '../../components/navigation/InternalLink';
import { ManageTopicTabIndex } from '../../components/topics/ManageTopic';
import { SubTopicsTreeProps } from '../../components/topics/tree/SubTopicsTree';
import { SubTopicsTreeData } from '../../components/topics/tree/SubTopicsTreeData';
import { generateTopicData } from '../../graphql/topics/topics.fragments';
import { ManageTopicPageInfo, TopicPageInfo, TopicTreePageInfo } from '../RoutesPageInfos';
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
      _id
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
    <PageLayout breadCrumbsLinks={[TopicPageInfo(topic), TopicTreePageInfo(topic)]} isLoading={loading}>
      <Flex>
        <PageTitle mb={10} mt={10}>
          <Text color="blue.600" as="span">
            {topic.name}
          </Text>
          - SubTopics Tree
        </PageTitle>
      </Flex>
      <Flex direction="row-reverse" mb={8}>
        <PageButtonLink pageInfo={ManageTopicPageInfo(topic, ManageTopicTabIndex.SubTopics)}>
          Manage SubTopics
        </PageButtonLink>
      </Flex>
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
