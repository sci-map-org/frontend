import gql from 'graphql-tag';
import { UserRole } from '../types';
import { PublicUserDataFragment } from './users.fragments.generated';

export const CurrentUserData = gql`
  fragment CurrentUserData on CurrentUser {
    _id
    email
    key
    role
    displayName
    bio
    profilePictureUrl
    startedLearningPaths(options: {}) {
      startedAt
      learningPath {
        _id
        key
        name
      }
    }
  }
`;

export const UserLinkData = gql`
  fragment UserLinkData on User {
    _id
    key
    displayName
  }
`;

export const PublicUserData = gql`
  fragment PublicUserData on User {
    _id
    key
    role
    displayName
    bio
    profilePictureUrl
  }
`;

export const generatePublicUserData = (): PublicUserDataFragment => ({
  _id: Math.random().toString(),
  key: Math.random().toString(),
  displayName: 'Concept Name',
  role: UserRole.User,
});

export const LoginResponseData = gql`
  fragment LoginResponseData on LoginResponse {
    jwt
    currentUser {
      ...CurrentUserData
    }
    redirectUrl
  }
  ${CurrentUserData}
`;
