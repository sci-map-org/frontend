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
  mutation login($email: String!, $password: String!, $discourseSSO: DiscourseSSO) {
    login(email: $email, password: $password, discourseSSO: $discourseSSO) {
      jwt
      currentUser {
        ...CurrentUserData
      }
      redirectUrl
    }
  }
  ${CurrentUserData}
`;

export const loginGoogle = gql`
  mutation loginGoogle($idToken: String!, $discourseSSO: DiscourseSSO) {
    loginGoogle(idToken: $idToken, discourseSSO: $discourseSSO) {
      jwt
      currentUser {
        ...CurrentUserData
      }
      redirectUrl
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

export const registerGoogle = gql`
  mutation registerGoogle($payload: RegisterGooglePayload!) {
    registerGoogle(payload: $payload) {
      ...CurrentUserData
    }
  }
  ${CurrentUserData}
`;
