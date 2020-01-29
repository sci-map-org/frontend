import * as Types from '../types';

import * as Operations from './articles.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ArticleViewerDataFragment = (
  { __typename?: 'Article' }
  & Pick<Types.Article, '_id' | 'key' | 'title' | 'content' | 'contentType'>
  & { author: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'key' | 'displayName'>
  )> }
);

export type ArticlePreviewDataFragment = (
  { __typename?: 'Article' }
  & Pick<Types.Article, '_id' | 'key' | 'title' | 'contentType'>
  & { author: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'key'>
  )> }
);

export type CreateArticleMutationVariables = {
  payload: Types.CreateArticlePayload
};


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle: (
    { __typename?: 'Article' }
    & Pick<Types.Article, '_id' | 'key' | 'contentType' | 'title' | 'content'>
  ) }
);

export type GetArticleByKeyQueryVariables = {
  key: Types.Scalars['String']
};


export type GetArticleByKeyQuery = (
  { __typename?: 'Query' }
  & { getArticleByKey: (
    { __typename?: 'Article' }
    & ArticleViewerDataFragment
  ) }
);

export type UpdateArticleMutationVariables = {
  id: Types.Scalars['String'],
  payload: Types.UpdateArticlePayload
};


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle: (
    { __typename?: 'Article' }
    & ArticleViewerDataFragment
  ) }
);

export type DeleteArticleMutationVariables = {
  id: Types.Scalars['String']
};


export type DeleteArticleMutation = (
  { __typename?: 'Mutation' }
  & { deleteArticle: (
    { __typename?: 'DeleteArticleResponse' }
    & Pick<Types.DeleteArticleResponse, '_id' | 'success'>
  ) }
);

export type ListUserArticlePreviewsQueryVariables = {
  userKey: Types.Scalars['String'],
  options: Types.ListArticlesOptions
};


export type ListUserArticlePreviewsQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<Types.User, 'displayName'>
    & { articles: Types.Maybe<(
      { __typename?: 'ListArticlesResult' }
      & { items: Array<(
        { __typename?: 'Article' }
        & ArticlePreviewDataFragment
      )> }
    )> }
  ) }
);


export type CreateArticleMutationFn = ApolloReactCommon.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(Operations.createArticle, baseOptions);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = ApolloReactCommon.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useGetArticleByKeyQuery__
 *
 * To run a query within a React component, call `useGetArticleByKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleByKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleByKeyQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetArticleByKeyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>) {
        return ApolloReactHooks.useQuery<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>(Operations.getArticleByKey, baseOptions);
      }
export function useGetArticleByKeyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>(Operations.getArticleByKey, baseOptions);
        }
export type GetArticleByKeyQueryHookResult = ReturnType<typeof useGetArticleByKeyQuery>;
export type GetArticleByKeyLazyQueryHookResult = ReturnType<typeof useGetArticleByKeyLazyQuery>;
export type GetArticleByKeyQueryResult = ApolloReactCommon.QueryResult<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>;
export type UpdateArticleMutationFn = ApolloReactCommon.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(Operations.updateArticle, baseOptions);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = ApolloReactCommon.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export type DeleteArticleMutationFn = ApolloReactCommon.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(Operations.deleteArticle, baseOptions);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = ApolloReactCommon.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useListUserArticlePreviewsQuery__
 *
 * To run a query within a React component, call `useListUserArticlePreviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserArticlePreviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserArticlePreviewsQuery({
 *   variables: {
 *      userKey: // value for 'userKey'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useListUserArticlePreviewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>(Operations.listUserArticlePreviews, baseOptions);
      }
export function useListUserArticlePreviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>(Operations.listUserArticlePreviews, baseOptions);
        }
export type ListUserArticlePreviewsQueryHookResult = ReturnType<typeof useListUserArticlePreviewsQuery>;
export type ListUserArticlePreviewsLazyQueryHookResult = ReturnType<typeof useListUserArticlePreviewsLazyQuery>;
export type ListUserArticlePreviewsQueryResult = ApolloReactCommon.QueryResult<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>;