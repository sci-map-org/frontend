import * as Types from '../../graphql/types';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import * as Operations from './DomainConceptList';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type SetConceptsKnownMutationVariables = {
  payload: Types.SetConceptKnownPayload
};


export type SetConceptsKnownMutation = (
  { __typename?: 'Mutation' }
  & { setConceptsKnown: Array<(
    { __typename?: 'Concept' }
    & ConceptDataFragment
  )> }
);

export type SetConceptsUnknownMutationVariables = {
  conceptIds: Array<Types.Scalars['String']>
};


export type SetConceptsUnknownMutation = (
  { __typename?: 'Mutation' }
  & { setConceptsUnknown: Array<(
    { __typename?: 'Concept' }
    & ConceptDataFragment
  )> }
);


export type SetConceptsKnownMutationFn = ApolloReactCommon.MutationFunction<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>;

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
export function useSetConceptsKnownMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>) {
        return ApolloReactHooks.useMutation<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>(Operations.setConceptsKnown, baseOptions);
      }
export type SetConceptsKnownMutationHookResult = ReturnType<typeof useSetConceptsKnownMutation>;
export type SetConceptsKnownMutationResult = ApolloReactCommon.MutationResult<SetConceptsKnownMutation>;
export type SetConceptsKnownMutationOptions = ApolloReactCommon.BaseMutationOptions<SetConceptsKnownMutation, SetConceptsKnownMutationVariables>;
export type SetConceptsUnknownMutationFn = ApolloReactCommon.MutationFunction<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>;

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
export function useSetConceptsUnknownMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>) {
        return ApolloReactHooks.useMutation<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>(Operations.setConceptsUnknown, baseOptions);
      }
export type SetConceptsUnknownMutationHookResult = ReturnType<typeof useSetConceptsUnknownMutation>;
export type SetConceptsUnknownMutationResult = ApolloReactCommon.MutationResult<SetConceptsUnknownMutation>;
export type SetConceptsUnknownMutationOptions = ApolloReactCommon.BaseMutationOptions<SetConceptsUnknownMutation, SetConceptsUnknownMutationVariables>;