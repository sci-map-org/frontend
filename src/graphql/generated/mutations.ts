import gql from 'graphql-tag';

export const CreateArticleMutation = gql`
  mutation createArticle($payload: CreateArticlePayload!) {
    createArticle(payload: $payload) {
      _id
      key
      contentType
      title
      content
      authorId
    }
  }
`;
export const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      currentUser {
        _id
        email
        key
      }
    }
  }
`;
export const RegisterMutation = gql`
  mutation register($payload: RegisterPayload!) {
    register(payload: $payload) {
      _id
      email
      key
    }
  }
`;
