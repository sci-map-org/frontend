import { useApolloClient } from '@apollo/react-hooks';
import Cookies from 'js-cookie';

import { getCurrentUser } from './users.operations';
import {
  useGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useRegisterGoogleMutation,
  useLoginGoogleMutation,
} from './users.operations.generated';

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
      client.resetStore();
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

export const useLogout = () => {
  const client = useApolloClient();
  const logout = () => {
    Cookies.remove('jwt_token');
    client.resetStore();
    client.writeData({ data: { isLoggedIn: false } });
    client.writeQuery({
      query: getCurrentUser,
      data: { currentUser: null },
    });
  };
  return { logout };
};

export const useLoginGoogle = () => {
  const client = useApolloClient();
  const [loginGoogle, { loading, error }] = useLoginGoogleMutation({
    onCompleted({ loginGoogle }) {
      Cookies.set('jwt_token', loginGoogle.jwt);
      client.resetStore();
      client.writeData({ data: { isLoggedIn: true } });
    },
    update(cache, { data }) {
      if (!data) return;
      cache.writeQuery({
        query: getCurrentUser,
        data: { currentUser: data.loginGoogle.currentUser },
      });
    },
  });

  return {
    loading,
    error,
    loginGoogle,
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

export const useRegisterGoogle = () => {
  const [registerGoogle, { loading, error }] = useRegisterGoogleMutation();
  return {
    registerGoogle,
    loading,
    error,
  };
};
