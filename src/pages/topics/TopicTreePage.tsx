import { Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { RoleAccess } from '../../components/auth/RoleAccess';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/lib/Typography';
import { PageLink } from '../../components/navigation/InternalLink';
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
    <PageLayout
      breadCrumbsLinks={[TopicPageInfo(topic), TopicTreePageInfo(topic)]}
      isLoading={loading}
      renderBackgroundImage={
        <Image
          position="absolute"
          src="/images/topostain_green_domain_page.svg"
          zIndex={-1}
          right="0"
          h={{ base: '200px', sm: '240px', md: '320px' }}
        />
      }
    >
      <Flex>
        <Skeleton isLoaded={!loading}>
          <PageTitle mb={2} mt={10}>
            <Text color="blue.600" as="span">
              {topic.name}
            </Text>
            - SubTopics Tree
          </PageTitle>
        </Skeleton>
      </Flex>
      <Flex direction="row" mb={20}>
        <RoleAccess accessRule="contributorOrAdmin">
          <PageLink
            color="gray.700"
            fontWeight={600}
            size="sm"
            variant="outline"
            pageInfo={ManageTopicPageInfo(topic, ManageTopicTabIndex.SubTopics)}
            display="flex"
            alignItems="baseline"
          >
            Manage
          </PageLink>
        </RoleAccess>
      </Flex>
      {topic.subTopics && (
        <Box>
          <SubTopicsTree
            topic={topic}
            onUpdated={() => {
              refetch();
            }}
            updatable={false}
            isLoading={loading}
          />
        </Box>
      )}
    </PageLayout>
  );
};
