import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewResource } from '../../components/resources/NewResource';

export const NewResourcePage: React.FC<{}> = () => {
  return (
    <PageLayout marginSize="xl" title={`Create new Resource`}>
      <NewResource
        onCancel={() => Router.back()}
        onResourceCreated={(createdResource) => Router.push(`/resources/${createdResource._id}`)}
      />
    </PageLayout>
  );
};
