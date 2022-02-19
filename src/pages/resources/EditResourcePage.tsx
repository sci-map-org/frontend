import { Box } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { ResourceEditor } from '../../components/resources/ResourceEditor';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { TopicLinkData } from '../../graphql/topics/topics.fragments';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../PageInfo';
import { EditResourcePageInfo, ResourcePageInfo } from '../RoutesPageInfos';
import { useGetResourceEditResourcePageQuery } from './EditResourcePage.generated';

export const getResourceEditResourcePage = gql`
  query getResourceEditResourcePage($resourceKey: String!) {
    getResourceByKey(resourceKey: $resourceKey) {
      ...ResourceData
      createdBy {
        _id
      }
      showedIn {
        ...TopicLinkData
      }
    }
  }
  ${ResourceData}
  ${TopicLinkData}
`;

const EditResourcePage: React.FC<{ resourceKey: string }> = ({ resourceKey }) => {
  const { data } = useGetResourceEditResourcePageQuery({ variables: { resourceKey }, returnPartialData: true });
  const { currentUser } = useCurrentUser();
  if (!data || !data.getResourceByKey) return <Box>Resource not found !</Box>;
  const { getResourceByKey: resource } = data;
  return (
    <PageLayout
      marginSize="md"
      breadCrumbsLinks={[ResourcePageInfo(resource), EditResourcePageInfo(resource)]}
      accessRule={
        currentUser &&
        (currentUser.role === UserRole.Admin ||
          currentUser.role === UserRole.Contributor ||
          currentUser._id === resource.createdBy?._id)
      }
    >
      <ResourceEditor
        resource={resource}
        onResourceSaved={async (updatedResource) => routerPushToPage(ResourcePageInfo(resource))}
        onCancel={() => Router.back()}
      ></ResourceEditor>
    </PageLayout>
  );
};

export default EditResourcePage;
