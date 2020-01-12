import * as Types from '../types';

export type ConceptDataFragment = { __typename?: 'Concept' } & Pick<Types.Concept, '_id' | 'name' | 'description'>;

export type AddConceptToDomainMutationVariables = {
  domainId: Types.Scalars['String'];
  payload: Types.CreateConceptPayload;
};

export type AddConceptToDomainMutationResult = { __typename?: 'Mutation' } & {
  addConceptToDomain: { __typename?: 'Concept' } & ConceptDataFragment;
};

export type UpdateConceptMutationVariables = {
  _id: Types.Scalars['String'];
  payload: Types.UpdateConceptPayload;
};

export type UpdateConceptMutationResult = { __typename?: 'Mutation' } & {
  updateConcept: { __typename?: 'Concept' } & ConceptDataFragment;
};

export type DeleteConceptMutationVariables = {
  _id: Types.Scalars['String'];
};

export type DeleteConceptMutationResult = { __typename?: 'Mutation' } & {
  deleteConcept: { __typename?: 'DeleteConceptResult' } & Pick<Types.DeleteConceptResult, '_id' | 'success'>;
};

export type GetConceptQueryVariables = {
  _id: Types.Scalars['String'];
};

export type GetConceptQueryResult = { __typename?: 'Query' } & {
  getConcept: { __typename?: 'Concept' } & {
    coveredByResources: Types.Maybe<
      { __typename?: 'ConceptCoveredByResourcesResults' } & {
        items: Array<{ __typename?: 'Resource' } & Pick<Types.Resource, '_id' | 'name' | 'type'>>;
      }
    >;
  } & ConceptDataFragment;
};

export type ListDomainConceptsQueryVariables = {
  domainKey: Types.Scalars['String'];
  options: Types.DomainConceptsOptions;
};

export type ListDomainConceptsQueryResult = { __typename?: 'Query' } & {
  getDomainByKey: { __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'name'> & {
      concepts: Types.Maybe<
        { __typename?: 'DomainConceptsResults' } & { items: Array<{ __typename?: 'Concept' } & ConceptDataFragment> }
      >;
    };
};

import gql from 'graphql-tag';
export const ConceptData = gql`
  fragment ConceptData on Concept {
    _id
    name
    description
  }
`;
export const AddConceptToDomainOperation = gql`
  mutation addConceptToDomain($domainId: String!, $payload: CreateConceptPayload!) {
    addConceptToDomain(domainId: $domainId, payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;
export const UpdateConceptOperation = gql`
  mutation updateConcept($_id: String!, $payload: UpdateConceptPayload!) {
    updateConcept(_id: $_id, payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;
export const DeleteConceptOperation = gql`
  mutation deleteConcept($_id: String!) {
    deleteConcept(_id: $_id) {
      _id
      success
    }
  }
`;
export const GetConceptOperation = gql`
  query getConcept($_id: String!) {
    getConcept(_id: $_id) {
      ...ConceptData
      coveredByResources(options: {}) {
        items {
          _id
          name
          type
        }
      }
    }
  }
  ${ConceptData}
`;
export const ListDomainConceptsOperation = gql`
  query listDomainConcepts($domainKey: String!, $options: DomainConceptsOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      name
      concepts(options: $options) {
        items {
          ...ConceptData
        }
      }
    }
  }
  ${ConceptData}
`;
