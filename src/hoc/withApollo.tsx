import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import cookie from 'cookie';
import { IncomingMessage } from 'http';
import fetch from 'isomorphic-unfetch';
import NextApp, { AppProps as NextAppProps, AppContext as NextAppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';

const getInitialState = (req?: IncomingMessage): NormalizedCacheObject => {
  // If no token on the request, we directly cache the currentUser query to null
  // (avoid spamming server)
  if (req) {
    return {
      ROOT_QUERY: {
        ...(!getToken(req) && { currentUser: null }),
      },
    };
  }
  return {};
};

// const initializeCache = (req?: IncomingMessage) => (client: ApolloClient) => {};
interface WithApolloInitialProps {
  apolloState?: NormalizedCacheObject;
}

interface WithApolloProps extends WithApolloInitialProps, NextAppProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree.
 */
export function withApollo(AppComponent: typeof NextApp) {
  const WithApollo = (props: WithApolloProps) => {
    const { apolloClient, apolloState } = props;
    const client =
      apolloClient ||
      initApolloClient({
        getInitialState: () => apolloState || getInitialState(),
        getToken,
      });

    return <AppComponent {...props} apolloClient={client} />;
  };

  WithApollo.getInitialProps = async (appCtx: NextAppContext): Promise<WithApolloInitialProps> => {
    // Exit early unless on the server
    if (typeof window !== 'undefined') {
      return {};
    }

    const { ctx } = appCtx;

    // When redirecting, the response is finished.
    // No point in continuing to render
    if (ctx.res && ctx.res.finished) {
      return {};
    }

    const apolloClient = initApolloClient({
      getInitialState: () => getInitialState(ctx.req),
      getToken: () => getToken(ctx.req),
    });

    const pageProps = AppComponent.getInitialProps ? await AppComponent.getInitialProps(appCtx) : {};
    const { AppTree } = ctx;

    try {
      // Run all GraphQL queries
      const { getDataFromTree } = await import('@apollo/react-ssr');
      await getDataFromTree(
        <AppTree
          pageProps={{
            ...pageProps,
          }}
          apolloClient={apolloClient}
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
    console.log('creating a new client side one');
    apolloClient = createApolloClient(config);
  }

  return apolloClient;
}

interface CreateApolloClientConfig {
  getInitialState: () => NormalizedCacheObject;
  getToken: () => string;
}
function createApolloClient(config: CreateApolloClientConfig): ApolloClient<NormalizedCacheObject> {
  console.log('new client created');
  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql', // Server URL (must be absolute)
    credentials: 'same-origin',
    fetch,
  });

  const authLink = setContext((_request, { headers }) => {
    const token = config.getToken(); // Why async ?
    return {
      headers: {
        ...headers,
        ...(!!token && { Authorization: token }),
      },
    };
  });
  const cache = new InMemoryCache().restore(config.getInitialState());
  const client = new ApolloClient({
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: process.env.NODE_ENV !== 'production',
    defaultOptions: {
      query: {
        errorPolicy: 'ignore', // ?
      },
    },
  });

  return client;
}

/**
 * Get the user token from cookie
 * @param {Object} req
 */
function getToken(req?: IncomingMessage): string {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
  return cookies.jwt_token;
}
