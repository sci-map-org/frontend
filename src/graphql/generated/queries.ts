import gql from 'graphql-tag';

export const CurrentUserQuery = gql`
  query currentUser {
    currentUser {
      _id
      email
      key
    }
  }
`;
