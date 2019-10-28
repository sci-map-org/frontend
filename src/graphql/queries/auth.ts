import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
    }
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      email
    }
  }
`;
