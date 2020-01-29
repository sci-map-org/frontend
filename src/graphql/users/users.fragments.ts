import gql from 'graphql-tag';

export const CurrentUserData = gql`
  fragment CurrentUserData on CurrentUser {
    _id
    email
    key
    role
  }
`;
