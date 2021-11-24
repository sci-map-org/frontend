import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';
import { NewDomain } from '../../components/domains/NewDomain';
import { PageLayout } from '../../components/layout/PageLayout';
import { routerPushToPage } from '../PageInfo';
import { TopicPageInfo } from '../RoutesPageInfos';

export const NewDomainPage: NextPage = () => {
  return (
    <PageLayout title="New Area" marginSize="xl" accessRule="contributorOrAdmin" centerChildren>
        {/* TODO */}
      {/* <NewDomain
        onCancel={() => Router.back()}
        onCreated={(createdTopic) => routerPushToPage(TopicPageInfo(createdTopic))}
      /> */}
    </PageLayout>
  );
};
