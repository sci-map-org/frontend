import * as Types from '../../../graphql/types';

import * as Operations from './CommentViewer';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CommentViewerDataFragment = { __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined };

export type CommentWithChildrenViewerDataFragment = { __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined };

export type ExpandCommentQueryVariables = Types.Exact<{
  commentId: Types.Scalars['String'];
}>;


export type ExpandCommentQuery = { __typename?: 'Query', getCommentById: { __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', childrenCount?: number | null | undefined, _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined } };

export type EditCommentMutationVariables = Types.Exact<{
  commentId: Types.Scalars['String'];
  payload: Types.EditCommentPayload;
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined } };



/**
 * __useExpandCommentQuery__
 *
 * To run a query within a React component, call `useExpandCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpandCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpandCommentQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useExpandCommentQuery(baseOptions: Apollo.QueryHookOptions<ExpandCommentQuery, ExpandCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExpandCommentQuery, ExpandCommentQueryVariables>(Operations.expandComment, options);
      }
export function useExpandCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpandCommentQuery, ExpandCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExpandCommentQuery, ExpandCommentQueryVariables>(Operations.expandComment, options);
        }
export type ExpandCommentQueryHookResult = ReturnType<typeof useExpandCommentQuery>;
export type ExpandCommentLazyQueryHookResult = ReturnType<typeof useExpandCommentLazyQuery>;
export type ExpandCommentQueryResult = Apollo.QueryResult<ExpandCommentQuery, ExpandCommentQueryVariables>;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(Operations.editComment, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;