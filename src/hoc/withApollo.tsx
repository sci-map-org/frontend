import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookie from 'cookie';
import { IncomingMessage } from 'http';
import fetch from 'isomorphic-unfetch';
import NextApp, { AppContext as NextAppContext, AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { env } from '../env';

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
      // https://github.com/apollographql/apollo-client/issues/3897
      //(errors are rendered as loading)
      const { getDataFromTree } = await import('@apollo/client/react/ssr');
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
    }

    // getDataFromTree does not call componentWillUnmount
    // head side effect therefore need to be cleared manually
    // Head.rewind(); //removed because of Next v11

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
  getInitialState: () => NormalizedCacheObject;
  getToken: () => string;
}
function createApolloClient(config: CreateApolloClientConfig): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: env.API_URL, // Server URL (must be absolute)
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
  const cache = new InMemoryCache({
    possibleTypes: {
      LearningMaterial: ['Resource', 'LearningPath'],
    },
  }).restore(config.getInitialState());
  const client = new ApolloClient({
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: process.env.NODE_ENV !== 'production',
    defaultOptions: {
      query: {
        errorPolicy: 'all', // ?
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
