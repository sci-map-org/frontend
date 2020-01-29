import gql from 'graphql-tag';

import { ArticlePreviewData, ArticleViewerData } from './articles.fragments';

export const createArticle = gql`
  mutation createArticle($payload: CreateArticlePayload!) {
    createArticle(payload: $payload) {
      _id
      key
      contentType
      title
      content
    }
  }
`;

export const getArticleByKey = gql`
  query getArticleByKey($key: String!) {
    getArticleByKey(key: $key) {
      ...ArticleViewerData
    }
  }
  ${ArticleViewerData}
`;

export const updateArticle = gql`
  mutation updateArticle($id: String!, $payload: UpdateArticlePayload!) {
    updateArticle(id: $id, payload: $payload) {
      ...ArticleViewerData
    }
  }
  ${ArticleViewerData}
`;

export const deleteArticle = gql`
  mutation deleteArticle($id: String!) {
    deleteArticle(id: $id) {
      _id
      success
    }
  }
`;

export const listUserArticlePreviews = gql`
  query listUserArticlePreviews($userKey: String!, $options: ListArticlesOptions!) {
    getUser(key: $userKey) {
      displayName
      articles(options: $options) {
        items {
          ...ArticlePreviewData
        }
      }
    }
  }
  ${ArticlePreviewData}
`;
