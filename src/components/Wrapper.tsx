import { ApolloClient, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/core';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import '../../src/services/cloudwatch_error_logger.service';
import { Layout } from '../components/layout/Layout';
import { GA_TRACKING_ID } from '../services/google_analytics.service';
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
        {/* <script async defer data-domain="sci-map.org" src="http://analytics.sci-map.org/js/plausible.js"></script> */}
        <script async defer data-domain="localhost:3000" src="http://analytics.sci-map.org/js/plausible.js"></script>

        {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        /> */}
      </ChakraProvider>
    </ApolloProvider>
  );
};
