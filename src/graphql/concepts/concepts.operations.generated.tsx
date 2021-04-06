import * as Types from '../types';

import { ConceptDataFragment } from './concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../resources/resources.fragments.generated';
import * as Operations from './concepts.operations';
import * as Apollo from '@apollo/client';
export type AddConceptToDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
  parentTopicId: Types.Scalars['String'];
  payload: Types.AddConceptToDomainPayload;
}>;


export type AddConceptToDomainMutation = (
  { __typename?: 'Mutation' }
  & { addConceptToDomain: (
    { __typename?: 'AddConceptToDomainResult' }
    & { concept: (
      { __typename?: 'Concept' }
      & ConceptDataFragment
    ), domain: (
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id'>
      & { concepts?: Types.Maybe<(
        { __typename?: 'DomainConceptsResults' }
        & { items: Array<(
          { __typename?: 'DomainConceptsItem' }
          & { concept: (
            { __typename?: 'Concept' }
            & Pick<Types.Concept, '_id'>
          ), relationship: (
            { __typename?: 'ConceptBelongsToDomain' }
            & Pick<Types.ConceptBelongsToDomain, 'index'>
          ) }
        )> }
      )> }
    ), parentTopic: (
      { __typename?: 'Domain' }
      & Pick<Types.Domain, '_id'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Domain' }
          & Pick<Types.Domain, '_id'>
        ) | (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) | (
          { __typename?: 'LearningGoal' }
          & Pick<Types.LearningGoal, '_id'>
        ) }
      )>> }
    ) | (
      { __typename?: 'Concept' }
      & Pick<Types.Concept, '_id'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Domain' }
          & Pick<Types.Domain, '_id'>
        ) | (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) | (
          { __typename?: 'LearningGoal' }
          & Pick<Types.LearningGoal, '_id'>
        ) }
      )>> }
    ) | (
      { __typename?: 'LearningGoal' }
      & Pick<Types.LearningGoal, '_id'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Domain' }
          & Pick<Types.Domain, '_id'>
        ) | (
          { __typename?: 'Concept' }
          & Pick<Types.Concept, '_id'>
        ) | (
          { __typename?: 'LearningGoal' }
          & Pick<Types.LearningGoal, '_id'>
        ) }
      )>> }
    ) }
  ) }
);

export type UpdateConceptMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  payload: Types.UpdateConceptPayload;
}>;


export type UpdateConceptMutation = (
  { __typename?: 'Mutation' }
  & { updateConcept: (
    { __typename?: 'Concept' }
    & ConceptDataFragment
  ) }
);

export type DeleteConceptMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type DeleteConceptMutation = (
  { __typename?: 'Mutation' }
  & { deleteConcept: (
    { __typename?: 'DeleteConceptResult' }
    & Pick<Types.DeleteConceptResult, '_id' | 'success'>
  ) }
);

export type GetConceptQueryVariables = Types.Exact<{
  _id: Types.Scalars['String'];
}>;


export type GetConceptQuery = (
  { __typename?: 'Query' }
  & { getConcept: (
    { __typename?: 'Concept' }
    & { coveredByResources?: Types.Maybe<(
      { __typename?: 'ConceptCoveredByResourcesResults' }
      & { items: Array<(
        { __typename?: 'Resource' }
        & ResourcePreviewDataFragment
      )> }
    )> }
    & ConceptDataFragment
  ) }
);

export type SetConceptsKnownMutationVariables = Types.Exact<{
  payload: Types.SetConceptKnownPayload;
}>;


export type SetConceptsKnownMutation = (
  { __typename?: 'Mutation' }
  & { setConceptsKnown: Array<(
    { __typename?: 'Concept' }
    & ConceptDataFragment
  )> }
);

export type SetConceptsUnknownMutationVariables = Types.Exact<{
  conceptIds: Array<Types.Scalars['String']>;
}>;


export type SetConceptsUnknownMutation = (
  { __typename?: 'Mutation' }
  & { setConceptsUnknown: Array<(
    { __typename?: 'Concept' }
    & ConceptDataFragment
  )> }
);

export type GetDomainConceptListQueryVariables = Types.Exact<{
  domainKey: Types.Scalars['String'];
}>;


export type GetDomainConceptListQuery = (
  { __typename?: 'Query' }
  & { getDomainByKey: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key'>
    & { concepts?: Types.Maybe<(
      { __typename?: 'DomainConceptsResults' }
      & { items: Array<(
        { __typename?: 'DomainConceptsItem' }
        & { concept: (
          { __typename?: 'Concept' }
          & ConceptDataFragment
        ) }
      )> }
    )> }
  ) }
);


export type AddConceptToDomainMutationFn = Apollo.MutationFunction<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>;

/**
 * __useAddConceptToDomainMutation__
 *
 * To run a mutation, you first call `useAddConceptToDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConceptToDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConceptToDomainMutation, { data, loading, error }] = useAddConceptToDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *      parentTopicId: // value for 'parentTopicId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddConceptToDomainMutation(baseOptions?: Apollo.MutationHookOptions<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>) {
        return Apollo.useMutation<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>(Operations.addConceptToDomain, baseOptions);
      }
export type AddConceptToDomainMutationHookResult = ReturnType<typeof useAddConceptToDomainMutation>;
export type AddConceptToDomainMutationResult = Apollo.MutationResult<AddConceptToDomainMutation>;
export type AddConceptToDomainMutationOptions = Apollo.BaseMutationOptions<AddConceptToDomainMutation, AddConceptToDomainMutationVariables>;
export type UpdateConceptMutationFn = Apollo.MutationFunction<UpdateConceptMutation, UpdateConceptMutationVariables>;

/**
 * __useUpdateConceptMutation__
 *
 * To run a mutation, you first call `useUpdateConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConceptMutation, { data, loading, error }] = useUpdateConceptMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateConceptMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConceptMutation, UpdateConceptMutationVariables>) {
        return Apollo.useMutation<UpdateConceptMutation, UpdateConceptMutationVariables>(Operations.updateConcept, baseOptions);
      }
export type UpdateConceptMutationHookResult = ReturnType<typeof useUpdateConceptMutation>;
export type UpdateConceptMutationResult = Apollo.MutationResult<UpdateConceptMutation>;
export type UpdateConceptMutationOptions = Apollo.BaseMutationOptions<UpdateConceptMutation, UpdateConceptMutationVariables>;
export type DeleteConceptMutationFn = Apollo.MutationFunction<DeleteConceptMutation, DeleteConceptMutationVariables>;

/**
 * __useDeleteConceptMutation__
 *
 * To run a mutation, you first call `useDeleteConceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConceptMutation, { data, loading, error }] = useDeleteConceptMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteConceptMutation(baseOptions?: Apollo.MutationHookOptions<DeleteConceptMutation, DeleteConceptMutationVariables>) {
        return Apollo.useMutation<DeleteConceptMutation, DeleteConceptMutationVariables>(Operations.deleteConcept, baseOptions);
      }
export type DeleteConceptMutationHookResult = ReturnType<typeof useDeleteConceptMutation>;
export type DeleteConceptMutationResult = Apollo.MutationResult<DeleteConceptMutation>;
export type DeleteConceptMutationOptions = Apollo.BaseMutationOptions<DeleteConceptMutation, DeleteConceptMutationVariables>;

/**
 * __useGetConceptQuery__
 *
 * To run a query within a React component, call `useGetConceptQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConceptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConceptQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetConceptQuery(baseOptions: Apollo.QueryHookOptions<GetConceptQuery, GetConceptQueryVariables>) {
        return Apollo.useQuery<GetConceptQuery, GetConceptQueryVariables>(Operations.getConcept, baseOptions);
      }
export function useGetConceptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConceptQuery, GetConceptQueryVariables>) {
          return Apollo.useLazyQuery<GetConceptQuery, GetConceptQueryVariables>(Operations.getConcept, baseOptions);
        }
export type GetConceptQueryHookResult = ReturnType<typeof useGetConceptQuery>;
export type GetConceptLazyQueryHookResult = ReturnType<typeof useGetConceptLazyQuery>;
export type GetConceptQueryResult = Apollo.QueryResult<GetConceptQuery, GetConceptQueryVariables>;
export type SetConceptsKnownMutationFn = Apollo.MutationFunction<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>;

/**
 * __useSetConceptsKnownMutation__
 *
 * To run a mutation, you first call `useSetConceptsKnownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetConceptsKnownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setConceptsKnownMutation, { data, loading, error }] = useSetConceptsKnownMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useSetConceptsKnownMutation(baseOptions?: Apollo.MutationHookOptions<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>) {
        return Apollo.useMutation<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>(Operations.setConceptsKnown, baseOptions);
      }
export type SetConceptsKnownMutationHookResult = ReturnType<typeof useSetConceptsKnownMutation>;
export type SetConceptsKnownMutationResult = Apollo.MutationResult<SetConceptsKnownMutation>;
export type SetConceptsKnownMutationOptions = Apollo.BaseMutationOptions<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>;
export type SetConceptsUnknownMutationFn = Apollo.MutationFunction<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>;

/**
 * __useSetConceptsUnknownMutation__
 *
 * To run a mutation, you first call `useSetConceptsUnknownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetConceptsUnknownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setConceptsUnknownMutation, { data, loading, error }] = useSetConceptsUnknownMutation({
 *   variables: {
 *      conceptIds: // value for 'conceptIds'
 *   },
 * });
 */
export function useSetConceptsUnknownMutation(baseOptions?: Apollo.MutationHookOptions<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>) {
        return Apollo.useMutation<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>(Operations.setConceptsUnknown, baseOptions);
      }
export type SetConceptsUnknownMutationHookResult = ReturnType<typeof useSetConceptsUnknownMutation>;
export type SetConceptsUnknownMutationResult = Apollo.MutationResult<SetConceptsUnknownMutation>;
export type SetConceptsUnknownMutationOptions = Apollo.BaseMutationOptions<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>;

/**
 * __useGetDomainConceptListQuery__
 *
 * To run a query within a React component, call `useGetDomainConceptListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainConceptListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainConceptListQuery({
 *   variables: {
 *      domainKey: // value for 'domainKey'
 *   },
 * });
 */
export function useGetDomainConceptListQuery(baseOptions: Apollo.QueryHookOptions<GetDomainConceptListQuery, GetDomainConceptListQueryVariables>) {
        return Apollo.useQuery<GetDomainConceptListQuery, GetDomainConceptListQueryVariables>(Operations.getDomainConceptList, baseOptions);
      }
export function useGetDomainConceptListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDomainConceptListQuery, GetDomainConceptListQueryVariables>) {
          return Apollo.useLazyQuery<GetDomainConceptListQuery, GetDomainConceptListQueryVariables>(Operations.getDomainConceptList, baseOptions);
        }
export type GetDomainConceptListQueryHookResult = ReturnType<typeof useGetDomainConceptListQuery>;
export type GetDomainConceptListLazyQueryHookResult = ReturnType<typeof useGetDomainConceptListLazyQuery>;
export type GetDomainConceptListQueryResult = Apollo.QueryResult<GetDomainConceptListQuery, GetDomainConceptListQueryVariables>;