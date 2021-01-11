import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import '../../src/services/cloudwatch_error_logger.service';
import { Layout } from '../components/layout/Layout';
import { theme } from '../theme/theme';
import { UnauthentificatedModalProvider } from './auth/UnauthentificatedModal';

interface WrapperProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <DefaultSeo title="Sci-Map.org" />
        <UnauthentificatedModalProvider>
          <Layout>{children}</Layout>
        </UnauthentificatedModalProvider>
        <style global jsx>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
            @import url('http://fonts.cdnfonts.com/css/avenir-next-lt-pro');
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
        <script async defer data-domain="sci-map.org" src="https://analytics.sci-map.org/js/plausible.js"></script>
      </ChakraProvider>
    </ApolloProvider>
  );
};
