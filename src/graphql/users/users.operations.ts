import gql from 'graphql-tag';

import { CurrentUserData } from './users.fragments';

export const getCurrentUser = gql`
  query getCurrentUser {
    currentUser {
      ...CurrentUserData
    }
  }
  ${CurrentUserData}
`;

export const login = gql`
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

export const register = gql`
  mutation register($payload: RegisterPayload!) {
    register(payload: $payload) {
      ...CurrentUserData
    }
  }
  ${CurrentUserData}
`;
