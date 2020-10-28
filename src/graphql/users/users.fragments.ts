import gql from 'graphql-tag';
import { PublicUserDataFragment } from './users.fragments.generated';
import { UserRole } from '../types';

export const CurrentUserData = gql`
  fragment CurrentUserData on CurrentUser {
    _id
    email
    key
    role
    displayName
    createdLearningPaths(options: {}) {
      _id
      key
      name
    }
  }
`;

export const PublicUserData = gql`
  fragment PublicUserData on User {
    _id
    key
    role
    displayName
  }
`;

export const generatePublicUserData = (): PublicUserDataFragment => ({
  _id: Math.random().toString(),
  key: Math.random().toString(),
  displayName: 'Concept Name',
  role: UserRole.User,
});
