import * as Types from '../types';

import * as Operations from './users.operations';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetCurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } | null | undefined };

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
  discourseSSO?: Types.InputMaybe<Types.DiscourseSso>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', jwt: string, redirectUrl?: string | null | undefined, currentUser: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } } };

export type LoginGoogleMutationVariables = Types.Exact<{
  idToken: Types.Scalars['String'];
  discourseSSO?: Types.InputMaybe<Types.DiscourseSso>;
}>;


export type LoginGoogleMutation = { __typename?: 'Mutation', loginGoogle: { __typename?: 'LoginResponse', jwt: string, redirectUrl?: string | null | undefined, currentUser: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } } };

export type RegisterMutationVariables = Types.Exact<{
  payload: Types.RegisterPayload;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } };

export type RegisterGoogleMutationVariables = Types.Exact<{
  payload: Types.RegisterGooglePayload;
}>;


export type RegisterGoogleMutation = { __typename?: 'Mutation', registerGoogle: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } };

export type UpdateCurrentUserMutationVariables = Types.Exact<{
  payload: Types.UpdateCurrentUserPayload;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } };



/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(Operations.getCurrentUser, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(Operations.getCurrentUser, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      discourseSSO: // value for 'discourseSSO'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(Operations.login, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export type LoginGoogleMutationFn = Apollo.MutationFunction<LoginGoogleMutation, LoginGoogleMutationVariables>;

/**
 * __useLoginGoogleMutation__
 *
 * To run a mutation, you first call `useLoginGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGoogleMutation, { data, loading, error }] = useLoginGoogleMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *      discourseSSO: // value for 'discourseSSO'
 *   },
 * });
 */
export function useLoginGoogleMutation(baseOptions?: Apollo.MutationHookOptions<LoginGoogleMutation, LoginGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginGoogleMutation, LoginGoogleMutationVariables>(Operations.loginGoogle, options);
      }
export type LoginGoogleMutationHookResult = ReturnType<typeof useLoginGoogleMutation>;
export type LoginGoogleMutationResult = Apollo.MutationResult<LoginGoogleMutation>;
export type LoginGoogleMutationOptions = Apollo.BaseMutationOptions<LoginGoogleMutation, LoginGoogleMutationVariables>;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(Operations.register, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export type RegisterGoogleMutationFn = Apollo.MutationFunction<RegisterGoogleMutation, RegisterGoogleMutationVariables>;

/**
 * __useRegisterGoogleMutation__
 *
 * To run a mutation, you first call `useRegisterGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerGoogleMutation, { data, loading, error }] = useRegisterGoogleMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterGoogleMutation(baseOptions?: Apollo.MutationHookOptions<RegisterGoogleMutation, RegisterGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterGoogleMutation, RegisterGoogleMutationVariables>(Operations.registerGoogle, options);
      }
export type RegisterGoogleMutationHookResult = ReturnType<typeof useRegisterGoogleMutation>;
export type RegisterGoogleMutationResult = Apollo.MutationResult<RegisterGoogleMutation>;
export type RegisterGoogleMutationOptions = Apollo.BaseMutationOptions<RegisterGoogleMutation, RegisterGoogleMutationVariables>;
export type UpdateCurrentUserMutationFn = Apollo.MutationFunction<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;

/**
 * __useUpdateCurrentUserMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrentUserMutation, { data, loading, error }] = useUpdateCurrentUserMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>(Operations.updateCurrentUser, options);
      }
export type UpdateCurrentUserMutationHookResult = ReturnType<typeof useUpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationResult = Apollo.MutationResult<UpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationOptions = Apollo.BaseMutationOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;