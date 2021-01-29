import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { env } from '../env';

const httpLink = new HttpLink({
  uri: env.API_URL, // Server URL (must be absolute)
  credentials: 'same-origin',
  fetch,
});

const getCookie = (): Promise<{ value: string } | null> => {
  /** @ts-ignore */
  if (chrome) {
    return new Promise((resolve) => {
      /** @ts-ignore */
      chrome.cookies.get(
        {
          url: env.FRONTEND_URL,
          name: 'jwt_token',
        },
        (cookie: any) => {
          resolve(cookie);
        }
      );
    });
  }
  console.error('chrome root object not available, trying "browser"');
  /** @ts-ignore */
  return browser.cookies.get({
    url: env.FRONTEND_URL,
    name: 'jwt_token',
  });
};

const authLink = setContext(async (_request, { headers }) => {
  const cookie = await getCookie();
  if (!cookie) {
    console.error('No cookie found :(');
    throw new Error('No cookie found :(');
  }
  return {
    headers: {
      ...headers,
      Authorization: cookie.value,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
