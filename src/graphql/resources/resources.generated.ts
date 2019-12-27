import * as Types from '../types';

export type ResourceDataFragment = { __typename?: 'Resource' } & Pick<
  Types.Resource,
  '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description'
>;

export type ResourcePreviewDataFragment = { __typename?: 'Resource' } & Pick<Types.Resource, '_id' | 'name' | 'type'>;

export type GetResourceByIdQueryVariables = {
  id: Types.Scalars['String'];
};

export type GetResourceByIdQueryResult = { __typename?: 'Query' } & {
  getResourceById: { __typename?: 'Resource' } & ResourceDataFragment;
};

export type ListDomainResourcePreviewsQueryVariables = {
  domainKey: Types.Scalars['String'];
  options: Types.DomainResourcesOptions;
};

export type ListDomainResourcePreviewsQueryResult = { __typename?: 'Query' } & {
  getDomainByKey: { __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'name'> & {
      resources: Types.Maybe<
        { __typename?: 'DomainResourcesResults' } & {
          items: Array<{ __typename?: 'Resource' } & ResourcePreviewDataFragment>;
        }
      >;
    };
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

export type AttachResourceCoversConceptsMutationVariables = {
  resourceId: Types.Scalars['String'];
  conceptIds: Array<Types.Scalars['String']>;
};

export type AttachResourceCoversConceptsMutationResult = { __typename?: 'Mutation' } & {
  attachResourceCoversConcepts: { __typename?: 'Resource' } & ResourceDataFragment;
};

import gql from 'graphql-tag';
export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
    type
    mediaType
    url
    description
  }
`;
export const ResourcePreviewData = gql`
  fragment ResourcePreviewData on Resource {
    _id
    name
    type
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
export const ListDomainResourcePreviewsOperation = gql`
  query listDomainResourcePreviews($domainKey: String!, $options: DomainResourcesOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      name
      resources(options: $options) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ResourcePreviewData}
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
export const AttachResourceCoversConceptsOperation = gql`
  mutation attachResourceCoversConcepts($resourceId: String!, $conceptIds: [String!]!) {
    attachResourceCoversConcepts(resourceId: $resourceId, conceptIds: $conceptIds) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;
