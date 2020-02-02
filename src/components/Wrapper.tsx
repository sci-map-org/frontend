import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import { Layout } from '../components/layout/Layout';
import { theme } from '../theme/theme';

interface WrapperProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Layout>{children}</Layout>
        <style global jsx>
          {`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
            }
            ul {
              list-style-type: none;
            }
          `}
        </style>
      </ThemeProvider>
    </ApolloProvider>
  );
};
