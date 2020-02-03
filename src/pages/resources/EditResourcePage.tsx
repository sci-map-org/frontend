import { Box, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';

import { PageLayout } from '../../components/layout/PageLayout';
import { ResourceEditor } from '../../components/resources/ResourceEditor';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { useGetResourceEditResourcePageQuery } from './EditResourcePage.generated';

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
  return (
    <PageLayout mode="form">
      <ResourceEditor resource={resource} onSave={editedResource => console.log(editedResource)}></ResourceEditor>
    </PageLayout>
  );
};

export default EditResourcePage;
