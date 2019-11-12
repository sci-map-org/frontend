import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';

import { Layout } from './Layout/Layout';
import client from '../graphql/client';

export const Wrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <ColorModeProvider>
        {/* <ApolloProvider client={client}> */}
        <Layout>{children}</Layout>
        {/* </ApolloProvider> */}
      </ColorModeProvider>
    </ThemeProvider>
  );
};
