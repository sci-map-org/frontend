import { useApolloClient } from '@apollo/client';
import Cookies from 'js-cookie';
import { get } from 'lodash';
import { env } from '../../env';
import { getCurrentUser } from './users.operations';
import { useGetCurrentUserQuery, useLoginGoogleMutation, useLoginMutation } from './users.operations.generated';

export const useCurrentUser = () => {
  const { loading, error, data } = useGetCurrentUserQuery({
    onError(err) {
      // TODO Ideally, should show an alert or message or something, and refresh 5sec later.
      const gqlErrors = get(err, ['networkError', 'result', 'errors']) as object[] | undefined;
      if (gqlErrors) {
        gqlErrors.forEach((gqlErr) => {
          if (get(gqlErr, ['extensions', 'code']) === 'UNAUTHENTICATED') {
            if (env.APP === 'frontend') {
              console.log('Invalid token, removing it from cookies');
              Cookies.remove('jwt_token');
              window.location.reload();
            }
          }
        });
      }
    },
  });
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
      options?.update && options.update(cache, result, {});
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
      options?.update && options.update(cache, result, {});
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
