import * as Types from '../../graphql/types';

import * as Operations from './RegisterFormProfileInfo';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CheckUserKeyAvailabilityQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
}>;


export type CheckUserKeyAvailabilityQuery = { __typename?: 'Query', checkUserKeyAvailability: { __typename?: 'CheckUserKeyAvailabilityResult', available: boolean } };



/**
 * __useCheckUserKeyAvailabilityQuery__
 *
 * To run a query within a React component, call `useCheckUserKeyAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserKeyAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserKeyAvailabilityQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useCheckUserKeyAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<CheckUserKeyAvailabilityQuery, CheckUserKeyAvailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserKeyAvailabilityQuery, CheckUserKeyAvailabilityQueryVariables>(Operations.checkUserKeyAvailability, options);
      }
export function useCheckUserKeyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserKeyAvailabilityQuery, CheckUserKeyAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserKeyAvailabilityQuery, CheckUserKeyAvailabilityQueryVariables>(Operations.checkUserKeyAvailability, options);
        }
export type CheckUserKeyAvailabilityQueryHookResult = ReturnType<typeof useCheckUserKeyAvailabilityQuery>;
export type CheckUserKeyAvailabilityLazyQueryHookResult = ReturnType<typeof useCheckUserKeyAvailabilityLazyQuery>;
export type CheckUserKeyAvailabilityQueryResult = Apollo.QueryResult<CheckUserKeyAvailabilityQuery, CheckUserKeyAvailabilityQueryVariables>;