import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { ManageTopic, ManageTopicTabIndex } from '../../components/topics/ManageTopic';
import { useGetTopicByKeyManageTopicPageQuery } from '../../components/topics/ManageTopic.generated';
import { NotFoundPage } from '../NotFoundPage';
import { ManageTopicPageInfo, TopicPageInfo } from '../RoutesPageInfos';

export const ManageTopicPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  const [tab, setTab] = useState(ManageTopicTabIndex.Data);
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
    >
      {topic && <ManageTopic topic={topic} tab={tab} onChangeTab={setTab} refetch={refetch} />}
    </PageLayout>
  );
};
