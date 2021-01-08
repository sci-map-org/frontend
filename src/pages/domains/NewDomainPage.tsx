import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';
import { NewDomain } from '../../components/domains/NewDomain';
import { PageLayout } from '../../components/layout/PageLayout';
import { routerPushToPage } from '../PageInfo';
import { DomainPageInfo } from './DomainPage';

export const NewDomainPage: NextPage = () => {
  return (
    <PageLayout title="New Domain" marginSize="xl" accessRule="contributorOrAdmin" centerChildren>
      <NewDomain
        onCancel={() => Router.back()}
        onCreated={(createdDomain) => routerPushToPage(DomainPageInfo(createdDomain))}
      />
    </PageLayout>
  );
};
