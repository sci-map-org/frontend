import * as Types from '../types';

export type ResourceDataFragment = { __typename?: 'Resource' } & Pick<Types.Resource, '_id' | 'name'>;

export type GetResourceByIdQueryVariables = {
  id: Types.Scalars['String'];
};

export type GetResourceByIdQueryResult = { __typename?: 'Query' } & {
  getResourceById: { __typename?: 'Resource' } & ResourceDataFragment;
};

export type CreateResourceMutationVariables = {
  payload: Types.CreateResourcePayload;
};

export type CreateResourceMutationResult = { __typename?: 'Mutation' } & {
  createResource: { __typename?: 'Resource' } & ResourceDataFragment;
};

export type AddResourceToDomainMutationVariables = {
  domainId: Types.Scalars['String'];
  payload: Types.CreateResourcePayload;
};

export type AddResourceToDomainMutationResult = { __typename?: 'Mutation' } & {
  addResourceToDomain: { __typename?: 'Resource' } & ResourceDataFragment;
};

import gql from 'graphql-tag';
export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
  }
`;
export const GetResourceByIdOperation = gql`
  query getResourceById($id: String!) {
    getResourceById(id: $id) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;
export const CreateResourceOperation = gql`
  mutation createResource($payload: CreateResourcePayload!) {
    createResource(payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;
export const AddResourceToDomainOperation = gql`
  mutation addResourceToDomain($domainId: String!, $payload: CreateResourcePayload!) {
    addResourceToDomain(domainId: $domainId, payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;
