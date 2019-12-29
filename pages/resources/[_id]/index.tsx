import { Box, Flex, Text, Stack, Link } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useGetResourceById } from '../../../src/graphql/resources/resources.hooks';
import { PageLayout } from '../../../src/components/layout/Page';

const ResourcePage: React.FC = () => {
  const router = useRouter();

  const { _id } = router.query;

  if (typeof _id !== 'string') return null;

  const { resource } = useGetResourceById(_id);

  if (!resource) return <Box>Resource not found !</Box>;
  return (
    <PageLayout>
      <Stack spacing={2}>
        <Flex direction="row" align="center" justify="space-between">
          <Text fontSize="3xl">{resource.name}</Text>
          <NextLink href={`${router.asPath}/edit`}>
            <Link>Edit</Link>
          </NextLink>
        </Flex>
        <Text>{resource.description}</Text>
        <Link isExternal href={resource.url}>
          {resource.url}
        </Link>
        <Text>
          {resource.type} - {resource.mediaType}
        </Text>
      </Stack>
    </PageLayout>
  );
};

export default ResourcePage;
