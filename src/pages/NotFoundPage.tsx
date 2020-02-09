import { Box, Flex, Link, Text } from '@chakra-ui/core';
import Router from 'next/router';

import { PageLayout } from '../components/layout/PageLayout';

export const NotFoundPage: React.FC<{}> = () => {
  return (
    <PageLayout>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Box textAlign="center">
          <Text fontSize="3xl">Not Found</Text>
          <Link fontSize="xl" onClick={() => Router.back()}>
            Go back
          </Link>
        </Box>
      </Flex>
    </PageLayout>
  );
};
