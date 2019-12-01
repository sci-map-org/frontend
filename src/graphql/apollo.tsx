import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import cookie from 'cookie';
import { IncomingMessage } from 'http';
import fetch from 'isomorphic-unfetch';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';

import { Layout } from '../components/layout/Layout';

interface WithApolloInitialProps {
  apolloState?: NormalizedCacheObject;
}

interface WithApolloProps extends WithApolloInitialProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo<P, IP>(PageComponent: NextPage<P, IP>) {
  const WithApollo = (props: WithApolloProps & P) => {
    const { apolloClient, apolloState } = props;
    const client = apolloClient || initApolloClient({ initialState: apolloState || {}, getToken });

    // We wrap the client here since the layout requires the apollo client
    return (
      <ApolloProvider client={client}>
        <Layout>
          <PageComponent {...(props as P)} />
        </Layout>
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  WithApollo.getInitialProps = async (ctx: NextPageContext): Promise<WithApolloInitialProps> => {
    const { AppTree } = ctx;

    const apolloClient = initApolloClient({
      initialState: {},
      getToken: () => getToken(ctx.req),
    });

    const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

    // Exit early unless on the server
    if (typeof window !== 'undefined') {
      return {};
    }

    // When redirecting, the response is finished.
    // No point in continuing to render
    if (ctx.res && ctx.res.finished) {
      return {};
    }

    try {
      // Run all GraphQL queries
      const { getDataFromTree } = await import('@apollo/react-ssr');
      await getDataFromTree(
        <AppTree
          pageProps={{
            ...pageProps,
            apolloClient,
          }}
        />
      );
    } catch (error) {
      // Prevent Apollo Client GraphQL errors from crashing SSR.
      // Handle them in components via the data.error prop:
      // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
      console.error('Error while running `getDataFromTree`', error);
      console.error(error.graphQLErrors);
    }

    // getDataFromTree does not call componentWillUnmount
    // head side effect therefore need to be cleared manually
    Head.rewind();

    // Extract query data from the Apollo store
    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}

let apolloClient: null | ApolloClient<any> = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(config: CreateApolloClientConfig): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(config);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(config);
  }

  return apolloClient;
}

interface CreateApolloClientConfig {
  initialState: NormalizedCacheObject;
  getToken: () => string;
}
function createApolloClient(config: CreateApolloClientConfig): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql', // Server URL (must be absolute)
    credentials: 'same-origin',
    fetch,
  });

  const authLink = setContext((_request, { headers }) => {
    const token = config.getToken();
    return {
      headers: {
        ...headers,
        ...(!!token && { Authorization: token }),
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(config.initialState),
  });
}

/**
 * Get the user token from cookie
 * @param {Object} req
 */
function getToken(req?: IncomingMessage): string {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
  return cookies.jwt_token;
}
