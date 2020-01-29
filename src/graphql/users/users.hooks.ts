import { useApolloClient } from '@apollo/react-hooks';
import Cookies from 'js-cookie';

import { getCurrentUser } from './users.operations';
import { useGetCurrentUserQuery, useLoginMutation, useRegisterMutation } from './users.operations.generated';

export const useCurrentUser = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  return {
    loading,
    error,
    currentUser: !!data && data.currentUser,
  };
};

export const useLogin = () => {
  const client = useApolloClient();
  const [login, { loading, error }] = useLoginMutation({
    onCompleted({ login }) {
      Cookies.set('jwt_token', login.jwt);
      client.writeData({ data: { isLoggedIn: true } });
    },
    update(cache, { data }) {
      if (!data) return;
      cache.writeQuery({
        query: getCurrentUser,
        data: { currentUser: data.login.currentUser },
      });
    },
  });

  return {
    loading,
    error,
    login,
  };
};

export const useRegister = () => {
  const [register, { loading, error }] = useRegisterMutation();
  return {
    register,
    loading,
    error,
  };
};
