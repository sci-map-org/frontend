import { Box } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { PageLayout } from '../../components/layout/PageLayout';
import { ResourceEditor } from '../../components/resources/ResourceEditor';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { routerPushToPage } from '../PageInfo';
import { EditResourcePageInfo, ResourcePageInfo } from '../RoutesPageInfos';
import {
  useGetResourceEditResourcePageQuery,
  useUpdateResourceResourcePageMutation,
} from './EditResourcePage.generated';

export const updateResourceResourcePage = gql`
  mutation updateResourceResourcePage($id: String!, $payload: UpdateResourcePayload!) {
    updateResource(resourceId: $id, payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

export const getResourceEditResourcePage = gql`
  query getResourceEditResourcePage($resourceKey: String!) {
    getResourceByKey(resourceKey: $resourceKey) {
      ...ResourceData
      createdBy {
        _id
      }
    }
  }
  ${ResourceData}
`;

const EditResourcePage: React.FC<{ resourceKey: string }> = ({ resourceKey }) => {
  const { data } = useGetResourceEditResourcePageQuery({ variables: { resourceKey }, returnPartialData: true });
  const [updateResource] = useUpdateResourceResourcePageMutation({});
  if (!data || !data.getResourceByKey) return <Box>Resource not found !</Box>;
  const { getResourceByKey: resource } = data;
  return (
    <PageLayout
      marginSize="xl"
      breadCrumbsLinks={[ResourcePageInfo(resource), EditResourcePageInfo(resource)]}
      accessRule="loggedInUser"
    >
      <ResourceEditor
        resource={resource}
        onSave={async (payload) => {
          await updateResource({
            variables: { id: resource._id, payload },
          });
          routerPushToPage(ResourcePageInfo(resource));
        }}
      ></ResourceEditor>
    </PageLayout>
  );
};

export default EditResourcePage;
