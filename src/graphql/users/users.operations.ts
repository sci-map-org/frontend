import gql from 'graphql-tag';
import { CurrentUserData, LoginResponseData } from './users.fragments';

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
      ...LoginResponseData
    }
  }
  ${LoginResponseData}
`;

export const loginGoogle = gql`
  mutation loginGoogle($idToken: String!, $discourseSSO: DiscourseSSO) {
    loginGoogle(idToken: $idToken, discourseSSO: $discourseSSO) {
      ...LoginResponseData
    }
  }
  ${LoginResponseData}
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
