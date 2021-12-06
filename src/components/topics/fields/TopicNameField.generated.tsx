import * as Types from '../../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import * as Operations from './TopicNameField';
import * as Apollo from '@apollo/client';
export type TopicSuggestionDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, 'context'>
  & TopicLinkDataFragment
);

export type AutocompleteTopicNameQueryVariables = Types.Exact<{
  partialName: Types.Scalars['String'];
}>;


export type AutocompleteTopicNameQuery = (
  { __typename?: 'Query' }
  & { autocompleteTopicName: (
    { __typename?: 'SearchTopicsResult' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & TopicSuggestionDataFragment
    )> }
  ) }
);

export type GetTopicByIdDisambiguationModalQueryVariables = Types.Exact<{
  topicId: Types.Scalars['String'];
}>;


export type GetTopicByIdDisambiguationModalQuery = (
  { __typename?: 'Query' }
  & { getTopicById: (
    { __typename?: 'Topic' }
    & { disambiguationTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & { contextualisedTopics?: Types.Maybe<Array<(
        { __typename?: 'Topic' }
        & { parentTopic?: Types.Maybe<(
          { __typename?: 'Topic' }
          & { parentTopic?: Types.Maybe<(
            { __typename?: 'Topic' }
            & TopicLinkDataFragment
          )> }
          & TopicLinkDataFragment
        )>, contextTopic?: Types.Maybe<(
          { __typename?: 'Topic' }
          & TopicLinkDataFragment
        )> }
        & TopicLinkDataFragment
      )>> }
      & TopicLinkDataFragment
    )>, parentTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & { parentTopic?: Types.Maybe<(
        { __typename?: 'Topic' }
        & TopicLinkDataFragment
      )> }
      & TopicLinkDataFragment
    )> }
    & TopicLinkDataFragment
  ) }
);

export type GetTopicValidContextsFromDisambiguationQueryVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  disambiguationTopicId: Types.Scalars['String'];
}>;


export type GetTopicValidContextsFromDisambiguationQuery = (
  { __typename?: 'Query' }
  & { getTopicValidContextsFromDisambiguation: (
    { __typename?: 'GetTopicValidContextsFromDisambiguation' }
    & { validContexts?: Types.Maybe<Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )>> }
  ) }
);

export type GetTopicsValidContextsQueryVariables = Types.Exact<{
  parentTopicId: Types.Scalars['String'];
  existingSameNameTopicId: Types.Scalars['String'];
}>;


export type GetTopicsValidContextsQuery = (
  { __typename?: 'Query' }
  & { getTopicValidContexts: (
    { __typename?: 'GetTopicValidContextsResult' }
    & { validContexts?: Types.Maybe<Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )>>, validSameNameTopicContexts?: Types.Maybe<Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )>> }
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

/**
 * __useGetTopicByIdDisambiguationModalQuery__
 *
 * To run a query within a React component, call `useGetTopicByIdDisambiguationModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicByIdDisambiguationModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicByIdDisambiguationModalQuery({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useGetTopicByIdDisambiguationModalQuery(baseOptions: Apollo.QueryHookOptions<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>) {
        return Apollo.useQuery<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>(Operations.getTopicByIdDisambiguationModal, baseOptions);
      }
export function useGetTopicByIdDisambiguationModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>(Operations.getTopicByIdDisambiguationModal, baseOptions);
        }
export type GetTopicByIdDisambiguationModalQueryHookResult = ReturnType<typeof useGetTopicByIdDisambiguationModalQuery>;
export type GetTopicByIdDisambiguationModalLazyQueryHookResult = ReturnType<typeof useGetTopicByIdDisambiguationModalLazyQuery>;
export type GetTopicByIdDisambiguationModalQueryResult = Apollo.QueryResult<GetTopicByIdDisambiguationModalQuery, GetTopicByIdDisambiguationModalQueryVariables>;

/**
 * __useGetTopicValidContextsFromDisambiguationQuery__
 *
 * To run a query within a React component, call `useGetTopicValidContextsFromDisambiguationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicValidContextsFromDisambiguationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicValidContextsFromDisambiguationQuery({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      disambiguationTopicId: // value for 'disambiguationTopicId'
 *   },
 * });
 */
export function useGetTopicValidContextsFromDisambiguationQuery(baseOptions: Apollo.QueryHookOptions<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>) {
        return Apollo.useQuery<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>(Operations.getTopicValidContextsFromDisambiguation, baseOptions);
      }
export function useGetTopicValidContextsFromDisambiguationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>(Operations.getTopicValidContextsFromDisambiguation, baseOptions);
        }
export type GetTopicValidContextsFromDisambiguationQueryHookResult = ReturnType<typeof useGetTopicValidContextsFromDisambiguationQuery>;
export type GetTopicValidContextsFromDisambiguationLazyQueryHookResult = ReturnType<typeof useGetTopicValidContextsFromDisambiguationLazyQuery>;
export type GetTopicValidContextsFromDisambiguationQueryResult = Apollo.QueryResult<GetTopicValidContextsFromDisambiguationQuery, GetTopicValidContextsFromDisambiguationQueryVariables>;

/**
 * __useGetTopicsValidContextsQuery__
 *
 * To run a query within a React component, call `useGetTopicsValidContextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicsValidContextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicsValidContextsQuery({
 *   variables: {
 *      parentTopicId: // value for 'parentTopicId'
 *      existingSameNameTopicId: // value for 'existingSameNameTopicId'
 *   },
 * });
 */
export function useGetTopicsValidContextsQuery(baseOptions: Apollo.QueryHookOptions<GetTopicsValidContextsQuery, GetTopicsValidContextsQueryVariables>) {
        return Apollo.useQuery<GetTopicsValidContextsQuery, GetTopicsValidContextsQueryVariables>(Operations.getTopicsValidContexts, baseOptions);
      }
export function useGetTopicsValidContextsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicsValidContextsQuery, GetTopicsValidContextsQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicsValidContextsQuery, GetTopicsValidContextsQueryVariables>(Operations.getTopicsValidContexts, baseOptions);
        }
export type GetTopicsValidContextsQueryHookResult = ReturnType<typeof useGetTopicsValidContextsQuery>;
export type GetTopicsValidContextsLazyQueryHookResult = ReturnType<typeof useGetTopicsValidContextsLazyQuery>;
export type GetTopicsValidContextsQueryResult = Apollo.QueryResult<GetTopicsValidContextsQuery, GetTopicsValidContextsQueryVariables>;