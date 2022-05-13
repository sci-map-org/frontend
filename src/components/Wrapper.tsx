import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import React from 'react';
import '../../src/services/cloudwatch_error_logger.service';
import { Layout } from '../components/layout/Layout';
import { theme } from '../theme/theme';
import { UnauthentificatedModalProvider } from './auth/UnauthentificatedModal';
import 'react-sortable-tree/style.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { env } from '../env';

interface WrapperProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
        <ChakraProvider resetCSS theme={theme}>
          <DefaultSeo title="Mapedia.org" />
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
          <script
            async
            defer
            data-domain="beta.mapedia.org"
            src="https://analytics.sci-map.org/js/plausible.js"
          ></script>
          {/* <link
          href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700&subset=latin,latin-ext"
          rel="stylesheet"
          type="text/css"
        ></link> */}
          <link
            href="https://fonts.googleapis.com/css?family=Nunito Sans:300,400,600&subset=latin,latin-ext"
            rel="stylesheet"
            type="text/css"
          ></link>
          {/* <link
          href="http://fonts.googleapis.com/css?family=Nunito:300,400,600&subset=latin,latin-ext"
          rel="stylesheet"
          type="text/css"
        ></link> */}
        </ChakraProvider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
};
