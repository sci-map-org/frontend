import * as Types from '../../graphql/types';

import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import * as Operations from './ResourcePage';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GetResourceResourcePageQueryVariables = {
  id: Types.Scalars['String'];
};

export type GetResourceResourcePageQuery = { __typename?: 'Query' } & {
  getResourceById: { __typename?: 'Resource' } & {
    coveredConcepts: Types.Maybe<
      { __typename?: 'ResourceCoveredConceptsResults' } & {
        items: Array<
          { __typename?: 'Concept' } & Pick<Types.Concept, '_id' | 'name'> & {
              domain: Types.Maybe<{ __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'key' | 'name'>>;
            }
        >;
      }
    >;
    domains: Types.Maybe<
      { __typename?: 'ResourceDomainsResults' } & {
        items: Array<
          { __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'key' | 'name'> & {
              concepts: Types.Maybe<
                { __typename?: 'DomainConceptsResults' } & {
                  items: Array<{ __typename?: 'Concept' } & Pick<Types.Concept, '_id' | 'name'>>;
                }
              >;
            }
        >;
      }
    >;
  } & ResourceDataFragment;
};

/**
 * __useGetResourceResourcePageQuery__
 *
 * To run a query within a React component, call `useGetResourceResourcePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceResourcePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceResourcePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceResourcePageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(
    Operations.getResourceResourcePage,
    baseOptions
  );
}
export function useGetResourceResourcePageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetResourceResourcePageQuery,
    GetResourceResourcePageQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetResourceResourcePageQuery, GetResourceResourcePageQueryVariables>(
    Operations.getResourceResourcePage,
    baseOptions
  );
}
export type GetResourceResourcePageQueryHookResult = ReturnType<typeof useGetResourceResourcePageQuery>;
export type GetResourceResourcePageLazyQueryHookResult = ReturnType<typeof useGetResourceResourcePageLazyQuery>;
export type GetResourceResourcePageQueryResult = ApolloReactCommon.QueryResult<
  GetResourceResourcePageQuery,
  GetResourceResourcePageQueryVariables
>;
