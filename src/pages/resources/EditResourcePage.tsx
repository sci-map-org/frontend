import { Box } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { ResourceEditor } from '../../components/resources/ResourceEditor';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { PageInfo } from '../PageInfo';
import {
  useGetResourceEditResourcePageQuery,
  useUpdateResourceResourcePageMutation,
} from './EditResourcePage.generated';
import { ResourcePageInfo } from './ResourcePage';

export const EditResourcePagePath = (resourceId: string) => `/resources/${resourceId}/edit`;

export const EditResourcePageInfo = (resource: ResourceDataFragment): PageInfo => ({
  name: `Edit - ${resource.name}`,
  path: EditResourcePagePath(resource._id),
  routePath: EditResourcePagePath('[_id]'),
});

export const updateResourceResourcePage = gql`
  mutation updateResourceResourcePage($id: String!, $payload: UpdateResourcePayload!) {
    updateResource(_id: $id, payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

export const getResourceEditResourcePage = gql`
  query getResourceEditResourcePage($id: String!) {
    getResourceById(id: $id) {
      ...ResourceData
      creator {
        _id
      }
    }
  }
  ${ResourceData}
`;

const EditResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { data } = useGetResourceEditResourcePageQuery({ variables: { id: resourceId }, returnPartialData: true });
  const [updateResource] = useUpdateResourceResourcePageMutation({});
  if (!data || !data.getResourceById) return <Box>Resource not found !</Box>;
  const { getResourceById: resource } = data;
  return (
    <PageLayout
      marginSize="xl"
      breadCrumbsLinks={[ResourcePageInfo(resource), EditResourcePageInfo(resource)]}
      accessRule="loggedInUser"
    >
      <ResourceEditor
        resource={resource}
        onSave={async (editedResource) => {
          await updateResource({
            variables: { id: resource._id, payload: editedResource },
          });
          Router.push(`/resources/${resource._id}`);
        }}
      ></ResourceEditor>
    </PageLayout>
  );
};

export default EditResourcePage;
