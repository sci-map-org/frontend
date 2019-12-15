import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import Cookies from 'js-cookie';

import {
  CurrentUserOperation,
  CurrentUserQueryResult,
  LoginMutationResult,
  LoginMutationVariables,
  LoginOperation,
  RegisterMutationResult,
  RegisterMutationVariables,
  RegisterOperation,
} from './users.generated';

export const useCurrentUser = () => {
  const { loading, error, data } = useQuery<CurrentUserQueryResult>(CurrentUserOperation, {
    errorPolicy: 'all',
  });
  return {
    loading,
    error,
    currentUser: !!data && data.currentUser,
  };
};

export const useLogin = () => {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation<LoginMutationResult, LoginMutationVariables>(LoginOperation, {
    onCompleted({ login }) {
      Cookies.set('jwt_token', login.jwt);
      client.writeData({ data: { isLoggedIn: true } });
    },
    update(cache, { data }) {
      if (!data) return;
      cache.writeQuery({
        query: CurrentUserOperation,
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
  const [register, { loading, error }] = useMutation<RegisterMutationResult, RegisterMutationVariables>(
    RegisterOperation,
    {}
  );
  return {
    register,
    loading,
    error,
  };
};
