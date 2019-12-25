import { Box, Flex, Text, Stack } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useGetResourceById } from '../../../src/graphql/resources/resources.hooks';

const ResourcePage: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  if (typeof id !== 'string') return null;

  const { resource } = useGetResourceById(id);

  if (!resource) return <Box>Resource not found !</Box>;
  return (
    <Box px={50} py={50} mx={100} mt={10} borderWidth={1}>
      <Stack spacing={2}>
        <Text fontSize="3xl">{resource.name}</Text>
        <Text>{resource.description}</Text>
        <Text>{resource.url}</Text>
        <Text>
          {resource.type} - {resource.mediaType}
        </Text>
      </Stack>
    </Box>
  );
};

export default ResourcePage;
