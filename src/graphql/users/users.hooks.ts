import { useApolloClient } from '@apollo/react-hooks';
import Cookies from 'js-cookie';
import { getCurrentUser } from './users.operations';
import {
  useGetCurrentUserQuery,
  useLoginGoogleMutation,
  useLoginMutation,
  useRegisterGoogleMutation,
  useRegisterMutation,
} from './users.operations.generated';

export const useCurrentUser = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  return {
    loading,
    error,
    currentUser: !!data && (data.currentUser || false),
  };
};

export const useLogin = (options?: Parameters<typeof useLoginMutation>[0]) => {
  const client = useApolloClient();
  const [login, { loading, error, data }] = useLoginMutation({
    ...options,
    onCompleted(data) {
      Cookies.set('jwt_token', data.login.jwt);
      client.resetStore();
      options?.onCompleted && options.onCompleted(data);
    },
    update(cache, result) {
      if (result.data) {
        cache.writeQuery({
          query: getCurrentUser,
          data: { currentUser: result.data.login.currentUser },
        });
      }
      options?.update && options.update(cache, result);
    },
  });

  return {
    data: data?.login,
    loading,
    error,
    login,
  };
};

export const useLoginGoogle = (options?: Parameters<typeof useLoginGoogleMutation>[0]) => {
  const client = useApolloClient();
  const [loginGoogle, { loading, error, data }] = useLoginGoogleMutation({
    ...options,
    onCompleted(data) {
      Cookies.set('jwt_token', data.loginGoogle.jwt);
      client.resetStore();
      options?.onCompleted && options.onCompleted(data);
    },
    update(cache, result) {
      if (result.data) {
        cache.writeQuery({
          query: getCurrentUser,
          data: { currentUser: result.data.loginGoogle.currentUser },
        });
      }
      options?.update && options.update(cache, result);
    },
  });

  return {
    data: data?.loginGoogle,
    loading,
    error,
    loginGoogle,
  };
};

export const useLogout = () => {
  const client = useApolloClient();
  const logout = () => {
    Cookies.remove('jwt_token');
    client.resetStore();
    client.writeQuery({
      query: getCurrentUser,
      data: { currentUser: null },
    });
  };
  return { logout };
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
