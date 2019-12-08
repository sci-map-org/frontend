import { Box, Stack, Text } from '@chakra-ui/core';
import React from 'react';

export const ListArticlePage: React.FC = () => {
  // const {data, error, loading } = useQuery()
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Stack spacing={6} textAlign="center" width="36rem">
        <Text fontSize="4xl">Articles</Text>
      </Stack>
    </Box>
  );
};

export default ListArticlePage;
