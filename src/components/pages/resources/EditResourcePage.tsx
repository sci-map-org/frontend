import { Box, Text } from '@chakra-ui/core';

import { PageLayout } from '../../../components/layout/PageLayout';
import { ResourceEditor } from '../../../components/resources/ResourceEditor';
import { useGetResourceWithCoveredConcepts } from '../../../graphql/resources/resources.hooks';

const EditResourcePage: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const { resource } = useGetResourceWithCoveredConcepts(resourceId);

  if (!resource) return <Box>Resource not found !</Box>;

  return (
    <PageLayout>
      <Text mb={5} fontSize="3xl">
        Edit - {resource.name}
      </Text>
      <ResourceEditor resource={resource} onSave={editedResource => console.log(editedResource)}></ResourceEditor>
    </PageLayout>
  );
};

export default EditResourcePage;
