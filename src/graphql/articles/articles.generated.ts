import * as Types from '../types';

export type ArticleViewerFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'key' | 'title' | 'content' | 'contentType'
> & { author: Types.Maybe<{ __typename?: 'User' } & Pick<Types.User, 'key' | 'displayName'>> };

export type CreateArticleMutationVariables = {
  payload: Types.CreateArticlePayload;
};

export type CreateArticleMutationResult = { __typename?: 'Mutation' } & {
  createArticle: { __typename?: 'Article' } & Pick<Types.Article, '_id' | 'key' | 'contentType' | 'title' | 'content'>;
};

export type GetArticleByKeyQueryVariables = {
  key: Types.Scalars['String'];
};

export type GetArticleByKeyQueryResult = { __typename?: 'Query' } & {
  getArticle: { __typename?: 'Article' } & Pick<Types.Article, '_id' | 'key' | 'title' | 'content' | 'contentType'> & {
      author: Types.Maybe<{ __typename?: 'User' } & Pick<Types.User, 'key' | 'displayName'>>;
    };
};

import gql from 'graphql-tag';
export const ArticleViewer = gql`
  fragment ArticleViewer on Article {
    _id
    key
    title
    content
    contentType
    author {
      key
      displayName
    }
  }
`;
export const CreateArticleOperation = gql`
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
export const GetArticleByKeyOperation = gql`
  query getArticleByKey($key: String!) {
    getArticle(key: $key) {
      _id
      key
      title
      content
      contentType
      author {
        key
        displayName
      }
    }
  }
`;
