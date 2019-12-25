import * as Types from '../types';

export type ResourceFragment = { __typename?: 'Resource' } & Pick<
  Types.Resource,
  '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description'
>;

export type ResourcePreviewFragment = { __typename?: 'Resource' } & Pick<Types.Resource, '_id' | 'name' | 'type'>;

export type GetResourceByIdQueryVariables = {
  id: Types.Scalars['String'];
};

export type GetResourceByIdQueryResult = { __typename?: 'Query' } & {
  getResourceById: { __typename?: 'Resource' } & ResourceFragment;
};

export type ListDomainResourcePreviewsQueryVariables = {
  domainKey: Types.Scalars['String'];
  options: Types.DomainResourcesOptions;
};

export type ListDomainResourcePreviewsQueryResult = { __typename?: 'Query' } & {
  getDomainByKey: { __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'name'> & {
      resources: Types.Maybe<
        { __typename?: 'DomainResourcesResults' } & {
          items: Array<{ __typename?: 'Resource' } & ResourcePreviewFragment>;
        }
      >;
    };
};

export type CreateResourceMutationVariables = {
  payload: Types.CreateResourcePayload;
};

export type CreateResourceMutationResult = { __typename?: 'Mutation' } & {
  createResource: { __typename?: 'Resource' } & ResourceFragment;
};

export type AddResourceToDomainMutationVariables = {
  domainId: Types.Scalars['String'];
  payload: Types.CreateResourcePayload;
};

export type AddResourceToDomainMutationResult = { __typename?: 'Mutation' } & {
  addResourceToDomain: { __typename?: 'Resource' } & ResourceFragment;
};

import gql from 'graphql-tag';
export const Resource = gql`
  fragment Resource on Resource {
    _id
    name
    type
    mediaType
    url
    description
  }
`;
export const ResourcePreview = gql`
  fragment ResourcePreview on Resource {
    _id
    name
    type
  }
`;
export const GetResourceByIdOperation = gql`
  query getResourceById($id: String!) {
    getResourceById(id: $id) {
      ...Resource
    }
  }
  ${Resource}
`;
export const ListDomainResourcePreviewsOperation = gql`
  query listDomainResourcePreviews($domainKey: String!, $options: DomainResourcesOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      name
      resources(options: $options) {
        items {
          ...ResourcePreview
        }
      }
    }
  }
  ${ResourcePreview}
`;
export const CreateResourceOperation = gql`
  mutation createResource($payload: CreateResourcePayload!) {
    createResource(payload: $payload) {
      ...Resource
    }
  }
  ${Resource}
`;
export const AddResourceToDomainOperation = gql`
  mutation addResourceToDomain($domainId: String!, $payload: CreateResourcePayload!) {
    addResourceToDomain(domainId: $domainId, payload: $payload) {
      ...Resource
    }
  }
  ${Resource}
`;
