import { ApolloClient, ApolloProvider } from '@apollo/client';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { theme } from '../theme/theme';
import { UnauthentificatedModalProvider } from './auth/UnauthentificatedModal';

if (typeof window !== 'undefined') {
  import('../../src/services/cloudwatch_error_logger.service');
}

interface WrapperProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <DefaultSeo title="Sci-Map.org" />
        <UnauthentificatedModalProvider>
          <Layout>{children}</Layout>
        </UnauthentificatedModalProvider>
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
            html {
            }
          `}
        </style>
      </ThemeProvider>
    </ApolloProvider>
  );
};
