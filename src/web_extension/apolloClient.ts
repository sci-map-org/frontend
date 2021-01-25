import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql', // Server URL (must be absolute)
  credentials: 'same-origin',
  fetch,
});

const authLink = setContext((_request, { headers }) => {
  //   const token = config.getToken();
  return {
    headers: {
      ...headers,
      //   ...(!!token && { Authorization: token }),
    },
  };
});

export const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
