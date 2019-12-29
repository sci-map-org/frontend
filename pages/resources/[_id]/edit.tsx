import { Box, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { PageLayout } from '../../../src/components/layout/Page';
import { ResourceEditor } from '../../../src/components/resources/ResourceEditor';
import { useGetResourceWithCoveredConcepts } from '../../../src/graphql/resources/resources.hooks';

const EditResourcePage: React.FC = () => {
  const router = useRouter();

  const { _id } = router.query;

  if (typeof _id !== 'string') return null;

  const { resource } = useGetResourceWithCoveredConcepts(_id);

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
