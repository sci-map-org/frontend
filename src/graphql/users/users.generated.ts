import * as Types from '../types';

export type CurrentUserDataFragment = { __typename?: 'CurrentUser' } & Pick<
  Types.CurrentUser,
  '_id' | 'email' | 'key' | 'role'
>;

export type CurrentUserQueryVariables = {};

export type CurrentUserQueryResult = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'CurrentUser' } & CurrentUserDataFragment;
};

export type LoginMutationVariables = {
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
};

export type LoginMutationResult = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginResponse' } & Pick<Types.LoginResponse, 'jwt'> & {
      currentUser: { __typename?: 'CurrentUser' } & CurrentUserDataFragment;
    };
};

export type RegisterMutationVariables = {
  payload: Types.RegisterPayload;
};

export type RegisterMutationResult = { __typename?: 'Mutation' } & {
  register: { __typename?: 'CurrentUser' } & CurrentUserDataFragment;
};

import gql from 'graphql-tag';
export const CurrentUserData = gql`
  fragment CurrentUserData on CurrentUser {
    _id
    email
    key
    role
  }
`;
export const CurrentUserOperation = gql`
  query currentUser {
    currentUser {
      ...CurrentUserData
    }
  }
  ${CurrentUserData}
`;
export const LoginOperation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      currentUser {
        ...CurrentUserData
      }
    }
  }
  ${CurrentUserData}
`;
export const RegisterOperation = gql`
  mutation register($payload: RegisterPayload!) {
    register(payload: $payload) {
      ...CurrentUserData
    }
  }
  ${CurrentUserData}
`;
