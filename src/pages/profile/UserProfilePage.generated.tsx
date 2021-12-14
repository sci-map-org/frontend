import * as Types from '../../graphql/types';

import * as Operations from './UserProfilePage';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetUserUserProfilePageQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetUserUserProfilePageQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _id: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined } };



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
export function useGetUserUserProfilePageQuery(baseOptions: Apollo.QueryHookOptions<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>(Operations.getUserUserProfilePage, options);
      }
export function useGetUserUserProfilePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>(Operations.getUserUserProfilePage, options);
        }
export type GetUserUserProfilePageQueryHookResult = ReturnType<typeof useGetUserUserProfilePageQuery>;
export type GetUserUserProfilePageLazyQueryHookResult = ReturnType<typeof useGetUserUserProfilePageLazyQuery>;
export type GetUserUserProfilePageQueryResult = Apollo.QueryResult<GetUserUserProfilePageQuery, GetUserUserProfilePageQueryVariables>;