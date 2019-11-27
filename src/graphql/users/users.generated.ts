import * as Types from '../types';

export type CurrentUserQueryVariables = {};

export type CurrentUserQueryResult = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'CurrentUser' } & Pick<Types.CurrentUser, '_id' | 'email' | 'key'>;
};

export type LoginMutationVariables = {
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
};

export type LoginMutationResult = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginResponse' } & Pick<Types.LoginResponse, 'jwt'> & {
      currentUser: { __typename?: 'CurrentUser' } & Pick<Types.CurrentUser, '_id' | 'email' | 'key'>;
    };
};

export type RegisterMutationVariables = {
  payload: Types.RegisterPayload;
};

export type RegisterMutationResult = { __typename?: 'Mutation' } & {
  register: { __typename?: 'CurrentUser' } & Pick<Types.CurrentUser, '_id' | 'email' | 'key'>;
};

import gql from 'graphql-tag';

export const CurrentUserOperation = gql`
  query currentUser {
    currentUser {
      _id
      email
      key
    }
  }
`;
export const LoginOperation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      currentUser {
        _id
        email
        key
      }
    }
  }
`;
export const RegisterOperation = gql`
  mutation register($payload: RegisterPayload!) {
    register(payload: $payload) {
      _id
      email
      key
    }
  }
`;
