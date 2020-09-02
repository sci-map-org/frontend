import * as Types from '../../graphql/types';

import { PublicUserDataFragment } from '../../graphql/users/users.fragments.generated';
import * as Operations from './UserProfilePage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type GetUserUserProfilePageQueryVariables = Exact<{
  key: Types.Scalars['String'];
}>;


export type GetUserUserProfilePageQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & PublicUserDataFragment
  ) }
);



/**
 * __useGetUserUserProfilePageQuery__
 *
 * To run a query within a React component, call `useGetUserUserProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserUserProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserUserProfilePageQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetUserUserProfilePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>(Operations.getUserUserProfilePage, baseOptions);
      }
export function useGetUserUserProfilePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>(Operations.getUserUserProfilePage, baseOptions);
        }
export type GetUserUserProfilePageQueryHookResult = ReturnType<typeof useGetUserUserProfilePageQuery>;
export type GetUserUserProfilePageLazyQueryHookResult = ReturnType<typeof useGetUserUserProfilePageLazyQuery>;
export type GetUserUserProfilePageQueryResult = ApolloReactCommon.QueryResult<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>;