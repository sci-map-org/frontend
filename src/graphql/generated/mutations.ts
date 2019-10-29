import gql from 'graphql-tag';

export const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      currentUser {
        _id
        email
        uniqueName
      }
    }
  }
`;
export const RegisterMutation = gql`
  mutation register($payload: RegisterPayload!) {
    register(payload: $payload) {
      _id
      email
      uniqueName
    }
  }
`;
