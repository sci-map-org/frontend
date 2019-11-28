import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';

import { withApollo } from '../src/graphql/apollo';

const Home: NextPage<{}> = () => (
  <Box>
    <p>Hello Next.js</p>
  </Box>
);

export default withApollo(Home);
