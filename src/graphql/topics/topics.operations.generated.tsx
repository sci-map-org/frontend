import * as Types from '../types';

import * as Operations from './topics.operations';
import * as Apollo from '@apollo/client';
export type CheckTopicKeyAvailabilityQueryVariables = Types.Exact<{
  key: Types.Scalars['String'];
  topicType: Types.TopicType;
  domainKey?: Types.Maybe<Types.Scalars['String']>;
}>;


export type CheckTopicKeyAvailabilityQuery = (
  { __typename?: 'Query' }
  & { checkTopicKeyAvailability: (
    { __typename?: 'CheckTopicKeyAvailabilityResult' }
    & Pick<Types.CheckTopicKeyAvailabilityResult, 'available'>
    & { existingTopic?: Types.Maybe<(
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id' | 'name'>
    ) | (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id' | 'name'>
    ) | (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id' | 'name'>
    ) | (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, '_id' | 'name'>
    )> }
  ) }
);



/**
 * __useCheckTopicKeyAvailabilityQuery__
 *
 * To run a query within a React component, call `useCheckTopicKeyAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckTopicKeyAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckTopicKeyAvailabilityQuery({
 *   variables: {
 *      key: // value for 'key'
 *      topicType: // value for 'topicType'
 *      domainKey: // value for 'domainKey'
 *   },
 * });
 */
export function useCheckTopicKeyAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>) {
        return Apollo.useQuery<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>(Operations.checkTopicKeyAvailability, baseOptions);
      }
export function useCheckTopicKeyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>) {
          return Apollo.useLazyQuery<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>(Operations.checkTopicKeyAvailability, baseOptions);
        }
export type CheckTopicKeyAvailabilityQueryHookResult = ReturnType<typeof useCheckTopicKeyAvailabilityQuery>;
export type CheckTopicKeyAvailabilityLazyQueryHookResult = ReturnType<typeof useCheckTopicKeyAvailabilityLazyQuery>;
export type CheckTopicKeyAvailabilityQueryResult = Apollo.QueryResult<CheckTopicKeyAvailabilityQuery, CheckTopicKeyAvailabilityQueryVariables>;