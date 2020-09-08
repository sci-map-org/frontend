import * as Types from '../../graphql/types';

import * as Operations from './RegisterFormProfileInfo';
import * as Apollo from '@apollo/client';
export type GetUserByKeyQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type GetUserByKeyQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<Types.User, '_id'>
  ) }
);



/**
 * __useGetUserByKeyQuery__
 *
 * To run a query within a React component, call `useGetUserByKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByKeyQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetUserByKeyQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByKeyQuery, GetUserByKeyQueryVariables>) {
        return Apollo.useQuery<GetUserByKeyQuery, GetUserByKeyQueryVariables>(Operations.getUserByKey, baseOptions);
      }
export function useGetUserByKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByKeyQuery, GetUserByKeyQueryVariables>) {
          return Apollo.useLazyQuery<GetUserByKeyQuery, GetUserByKeyQueryVariables>(Operations.getUserByKey, baseOptions);
        }
export type GetUserByKeyQueryHookResult = ReturnType<typeof useGetUserByKeyQuery>;
export type GetUserByKeyLazyQueryHookResult = ReturnType<typeof useGetUserByKeyLazyQuery>;
export type GetUserByKeyQueryResult = Apollo.QueryResult<GetUserByKeyQuery, GetUserByKeyQueryVariables>;