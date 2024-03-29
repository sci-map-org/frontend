import * as Types from '../types';

import * as Operations from './articles.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateArticleMutationVariables = Types.Exact<{
  payload: Types.CreateArticlePayload;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', _id: string, key: string, contentType: Types.ArticleContentType, title: string, content: string } };

export type GetArticleByKeyQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetArticleByKeyQuery = { __typename?: 'Query', getArticleByKey: { __typename?: 'Article', _id: string, key: string, title: string, content: string, contentType: Types.ArticleContentType, author?: { __typename?: 'User', key: string, displayName: string } | null | undefined } };

export type UpdateArticleMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  payload: Types.UpdateArticlePayload;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', _id: string, key: string, title: string, content: string, contentType: Types.ArticleContentType, author?: { __typename?: 'User', key: string, displayName: string } | null | undefined } };

export type DeleteArticleMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'DeleteArticleResponse', _id: string, success: boolean } };

export type ListUserArticlePreviewsQueryVariables = Types.Exact<{
  userKey: Types.Scalars['String'];
  options: Types.ListArticlesOptions;
}>;


export type ListUserArticlePreviewsQuery = { __typename?: 'Query', getUser: { __typename?: 'User', displayName: string, articles?: { __typename?: 'ListArticlesResult', items: Array<{ __typename?: 'Article', _id: string, key: string, title: string, contentType: Types.ArticleContentType, author?: { __typename?: 'User', key: string } | null | undefined }> } | null | undefined } };


export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

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
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(Operations.createArticle, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;

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
export function useGetArticleByKeyQuery(baseOptions: Apollo.QueryHookOptions<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>(Operations.getArticleByKey, options);
      }
export function useGetArticleByKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>(Operations.getArticleByKey, options);
        }
export type GetArticleByKeyQueryHookResult = ReturnType<typeof useGetArticleByKeyQuery>;
export type GetArticleByKeyLazyQueryHookResult = ReturnType<typeof useGetArticleByKeyLazyQuery>;
export type GetArticleByKeyQueryResult = Apollo.QueryResult<GetArticleByKeyQuery, GetArticleByKeyQueryVariables>;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

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
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(Operations.updateArticle, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

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
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(Operations.deleteArticle, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;

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
export function useListUserArticlePreviewsQuery(baseOptions: Apollo.QueryHookOptions<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>(Operations.listUserArticlePreviews, options);
      }
export function useListUserArticlePreviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>(Operations.listUserArticlePreviews, options);
        }
export type ListUserArticlePreviewsQueryHookResult = ReturnType<typeof useListUserArticlePreviewsQuery>;
export type ListUserArticlePreviewsLazyQueryHookResult = ReturnType<typeof useListUserArticlePreviewsLazyQuery>;
export type ListUserArticlePreviewsQueryResult = Apollo.QueryResult<ListUserArticlePreviewsQuery, ListUserArticlePreviewsQueryVariables>;