import { Box, Stack, Text } from '@chakra-ui/core';
import { withApollo } from '../../../src/graphql/apollo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

const ListArticlePage: NextPage = () => {
  const router = useRouter();

  const { key } = router.query;

  // const {data, error, loading } = useQuery()
  console.log(key);
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Stack spacing={6} textAlign="center" width="36rem">
        <Text fontSize="4xl">Articles</Text>
      </Stack>
    </Box>
  );
};

export default withApollo(ListArticlePage);
