import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Cookies from 'js-cookie';

const cache = new InMemoryCache();

export default new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache,
  request: operation => {
    const jwt = Cookies.get('jwt_token');
    if (!jwt) return;
    operation.setContext({
      headers: {
        authorization: jwt,
      },
    });
  },
});

cache.writeData({
  data: {
    isLoggedIn: !!Cookies.get('jwt_token'),
    cartItems: [],
  },
});
