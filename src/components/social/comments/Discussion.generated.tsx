import * as Types from '../../../graphql/types';

import * as Operations from './Discussion';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DiscussionDataFragment = { __typename?: 'CommentResults', totalCount: number, items: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, children?: Array<{ __typename?: 'Comment', childrenCount?: number | null | undefined, _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined }> };

export type PostCommentMutationVariables = Types.Exact<{
  payload: Types.PostCommentPayload;
}>;


export type PostCommentMutation = { __typename?: 'Mutation', postComment: { __typename?: 'Comment', _id: string, contentMarkdown: string, lastUpdatedAt: string, postedAt: string, childrenCount?: number | null | undefined, parent?: { __typename?: 'Comment', _id: string, children?: Array<{ __typename?: 'Comment', _id: string }> | null | undefined } | null | undefined, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined } };


export type PostCommentMutationFn = Apollo.MutationFunction<PostCommentMutation, PostCommentMutationVariables>;

/**
 * __usePostCommentMutation__
 *
 * To run a mutation, you first call `usePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCommentMutation, { data, loading, error }] = usePostCommentMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function usePostCommentMutation(baseOptions?: Apollo.MutationHookOptions<PostCommentMutation, PostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCommentMutation, PostCommentMutationVariables>(Operations.postComment, options);
      }
export type PostCommentMutationHookResult = ReturnType<typeof usePostCommentMutation>;
export type PostCommentMutationResult = Apollo.MutationResult<PostCommentMutation>;
export type PostCommentMutationOptions = Apollo.BaseMutationOptions<PostCommentMutation, PostCommentMutationVariables>;