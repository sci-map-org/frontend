import { Box } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';

import { PageLayout } from '../../components/layout/PageLayout';
import { ResourceEditor } from '../../components/resources/ResourceEditor';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import {
  useGetResourceEditResourcePageQuery,
  useUpdateResourceResourcePageMutation,
} from './EditResourcePage.generated';

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
      coveredConcepts(options: {}) {
        items {
          ...ConceptData
          domain {
            _id
            key
            name
          }
        }
      }
      domains(options: {}) {
        items {
          _id
          key
          name
          concepts(options: {}) {
            items {
              concept {
                ...ConceptData
              }
            }
          }
        }
      }
    }
  }
  ${ResourceData}
  ${ConceptData}
`;

const EditResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { data } = useGetResourceEditResourcePageQuery({ variables: { id: resourceId } });
  const [updateResource] = useUpdateResourceResourcePageMutation({});
  if (!data || !data.getResourceById) return <Box>Resource not found !</Box>;
  const { getResourceById: resource } = data;
  return (
    <PageLayout mode="form">
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
