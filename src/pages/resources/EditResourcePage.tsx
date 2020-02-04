import { Box, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';

import { PageLayout } from '../../components/layout/PageLayout';
import { ResourceEditor } from '../../components/resources/ResourceEditor';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import {
  useGetResourceEditResourcePageQuery,
  useUpdateResourceResourcePageMutation,
} from './EditResourcePage.generated';
import Router from 'next/router';

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
          _id
          name
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
              _id
              name
            }
          }
        }
      }
    }
  }
  ${ResourceData}
`;

const EditResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { data } = useGetResourceEditResourcePageQuery({ variables: { id: resourceId } });

  if (!data || !data.getResourceById) return <Box>Resource not found !</Box>;
  const { getResourceById: resource } = data;
  const [updateResource] = useUpdateResourceResourcePageMutation({
    onCompleted: () => {
      Router.push(`/resources/${resource._id}`);
    },
  });
  return (
    <PageLayout mode="form">
      <ResourceEditor
        resource={resource}
        onSave={editedResource => updateResource({ variables: { id: resource._id, payload: editedResource } })}
      ></ResourceEditor>
    </PageLayout>
  );
};

export default EditResourcePage;
