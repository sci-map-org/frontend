import { useApolloClient, useMutation } from '@apollo/react-hooks';
import Cookies from 'js-cookie';

import { LoginMutation, RegisterMutation } from '../graphql/generated/mutations';
import { CurrentUserQuery } from '../graphql/generated/queries';
import {
  LoginMutationResult,
  MutationLoginArgs,
  MutationRegisterArgs,
  RegisterMutationResult,
} from '../graphql/generated/types';

export const useLogin = () => {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation<LoginMutationResult, MutationLoginArgs>(LoginMutation, {
    onCompleted({ login }) {
      Cookies.set('jwt_token', login.jwt);
      client.writeData({ data: { isLoggedIn: true } });
    },
    update(cache, { data }) {
      if (!data) return;
      cache.writeQuery({
        query: CurrentUserQuery,
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
  const [register, { loading, error }] = useMutation<RegisterMutationResult, MutationRegisterArgs>(
    RegisterMutation,
    {}
  );
  return {
    register,
    loading,
    error,
  };
};
