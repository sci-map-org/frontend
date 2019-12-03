import * as Types from '../types';

export type ArticleViewerDataFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'key' | 'title' | 'content' | 'contentType'
> & { author: Types.Maybe<{ __typename?: 'User' } & Pick<Types.User, 'key' | 'displayName'>> };

export type ArticlePreviewDataFragment = { __typename?: 'Article' } & Pick<
  Types.Article,
  '_id' | 'key' | 'title' | 'contentType'
> & { author: Types.Maybe<{ __typename?: 'User' } & Pick<Types.User, 'key'>> };

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
  getArticle: { __typename?: 'Article' } & ArticleViewerDataFragment;
};

export type UpdateArticleMutationVariables = {
  id: Types.Scalars['String'];
  payload: Types.UpdateArticlePayload;
};

export type UpdateArticleMutationResult = { __typename?: 'Mutation' } & {
  updateArticle: { __typename?: 'Article' } & ArticleViewerDataFragment;
};

export type DeleteArticleMutationVariables = {
  id: Types.Scalars['String'];
};

export type DeleteArticleMutationResult = { __typename?: 'Mutation' } & {
  deleteArticle: { __typename?: 'DeleteEntityResult' } & Pick<Types.DeleteEntityResult, 'success'>;
};

export type ListUserArticlePreviewsQueryVariables = {
  userKey: Types.Scalars['String'];
  options: Types.ListArticlesOptions;
};

export type ListUserArticlePreviewsQueryResult = { __typename?: 'Query' } & {
  getUser: { __typename?: 'User' } & Pick<Types.User, 'displayName'> & {
      articles: Types.Maybe<
        { __typename?: 'ListArticlesResult' } & {
          items: Array<{ __typename?: 'Article' } & ArticlePreviewDataFragment>;
        }
      >;
    };
};

import gql from 'graphql-tag';
export const ArticleViewerData = gql`
  fragment ArticleViewerData on Article {
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
export const ArticlePreviewData = gql`
  fragment ArticlePreviewData on Article {
    _id
    key
    title
    contentType
    author {
      key
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
      ...ArticleViewerData
    }
  }
  ${ArticleViewerData}
`;
export const UpdateArticleOperation = gql`
  mutation updateArticle($id: String!, $payload: UpdateArticlePayload!) {
    updateArticle(id: $id, payload: $payload) {
      ...ArticleViewerData
    }
  }
  ${ArticleViewerData}
`;
export const DeleteArticleOperation = gql`
  mutation deleteArticle($id: String!) {
    deleteArticle(id: $id) {
      success
    }
  }
`;
export const ListUserArticlePreviewsOperation = gql`
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
