import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewTopic } from '../../components/topics/NewTopic';
import { routerPushToPage } from '../PageInfo';
import { TopicPageInfo } from '../RoutesPageInfos';

export const NewTopicPage: NextPage = () => {
  return (
    <PageLayout marginSize="xl" accessRule="contributorOrAdmin" centerChildren>
      <NewTopic
        size="md"
        onCancel={() => Router.back()}
        onCreated={(createdTopic) => routerPushToPage(TopicPageInfo(createdTopic))}
      />
    </PageLayout>
  );
};
