import * as Types from '../../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import * as Operations from './TopicName';
import * as Apollo from '@apollo/client';
export type AutocompleteTopicNameQueryVariables = Types.Exact<{
  partialName: Types.Scalars['String'];
}>;


export type AutocompleteTopicNameQuery = (
  { __typename?: 'Query' }
  & { autocompleteTopicName: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id'>
      & TopicLinkDataFragment
    )> }
  ) }
);



/**
 * __useAutocompleteTopicNameQuery__
 *
 * To run a query within a React component, call `useAutocompleteTopicNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useAutocompleteTopicNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutocompleteTopicNameQuery({
 *   variables: {
 *      partialName: // value for 'partialName'
 *   },
 * });
 */
export function useAutocompleteTopicNameQuery(baseOptions: Apollo.QueryHookOptions<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>) {
        return Apollo.useQuery<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>(Operations.autocompleteTopicName, baseOptions);
      }
export function useAutocompleteTopicNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>) {
          return Apollo.useLazyQuery<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>(Operations.autocompleteTopicName, baseOptions);
        }
export type AutocompleteTopicNameQueryHookResult = ReturnType<typeof useAutocompleteTopicNameQuery>;
export type AutocompleteTopicNameLazyQueryHookResult = ReturnType<typeof useAutocompleteTopicNameLazyQuery>;
export type AutocompleteTopicNameQueryResult = Apollo.QueryResult<AutocompleteTopicNameQuery, AutocompleteTopicNameQueryVariables>;