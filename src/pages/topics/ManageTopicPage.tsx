import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { ManageTopic, ManageTopicTabIndex } from '../../components/topics/ManageTopic';
import { useGetTopicByKeyManageTopicPageQuery } from '../../components/topics/ManageTopic.generated';
import { NotFoundPage } from '../NotFoundPage';
import { ManageTopicPageInfo, ManageTopicPagePath, TopicPageInfo } from '../RoutesPageInfos';

export const ManageTopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const router = useRouter();
  const tabQueryParam = useMemo(() => {
    if (router.query.tab && typeof router.query.tab === 'string') {
      try {
        const parsedTab = parseInt(router.query.tab, 10);
        if (parsedTab === ManageTopicTabIndex.Data) return ManageTopicTabIndex.Data;
        if (parsedTab === ManageTopicTabIndex.SubTopics) return ManageTopicTabIndex.SubTopics;
        return null;
      } catch (err) {
        return null;
      }
    }
    return null;
  }, [router.query.tab]);

  const { data, loading, refetch } = useGetTopicByKeyManageTopicPageQuery({
    variables: { topicKey },
  });
  if (!data && !loading) return <NotFoundPage />;
  const topic = data?.getTopicByKey;
  return (
    <PageLayout
      isLoading={loading}
      breadCrumbsLinks={topic ? [TopicPageInfo(topic), ManageTopicPageInfo(topic)] : []}
      accessRule="contributorOrAdmin"
      renderBackgroundImage={
        <Image
          position="absolute"
          src="/images/topostain_red_manage_topic_page.svg"
          zIndex={-1}
          right="0"
          h={{ base: '200px', sm: '240px', md: '280px' }}
        />
      }
    >
      {!!topic && (
        <ManageTopic
          topic={topic}
          tab={tabQueryParam || ManageTopicTabIndex.Data}
          isLoading={loading}
          onChangeTab={(newTab) => {
            router.push(
              {
                pathname: ManageTopicPagePath(topicKey),
                query: {
                  tab: newTab,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
          refetch={refetch}
        />
      )}
    </PageLayout>
  );
};
