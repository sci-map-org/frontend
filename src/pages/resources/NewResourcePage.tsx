import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewResource } from '../../components/resources/NewResource';
import { routerPushToPage } from '../PageInfo';
import { ResourcePageInfo } from '../RoutesPageInfos';

export const NewResourcePage: React.FC<{}> = () => {
  return (
    <PageLayout marginSize="xl">
      <NewResource
        onCancel={() => Router.back()}
        onResourceCreated={(createdResource) => routerPushToPage(ResourcePageInfo(createdResource))}
      />
    </PageLayout>
  );
};
