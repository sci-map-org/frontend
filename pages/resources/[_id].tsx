import { Box, Flex, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useGetResourceById } from '../../src/graphql/resources/resources.hooks';

const DomainPage: React.FC = () => {
  const router = useRouter();

  const { _id } = router.query;
  if (typeof _id !== 'string') return null;

  const { resource } = useGetResourceById(_id);

  if (!resource) return <Box>Resource not found !</Box>;
  return (
    <Box px={50} py={50} mx={100} mt={10} borderWidth={1}>
      <Flex direction="row">
        <Text fontSize="3xl">{resource.name}</Text>
      </Flex>
    </Box>
  );
};

export default DomainPage;
