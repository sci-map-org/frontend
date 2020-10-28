import gql from 'graphql-tag';
import { ResourceData, ResourcePreviewData } from './resources.fragments';

export const searchResources = gql`
  query searchResources($query: String!, $options: SearchResourcesOptions!) {
    searchResources(query: $query, options: $options) {
      items {
        ...ResourceData
      }
    }
  }
  ${ResourceData}
`;

export const getResourcePreviewData = gql`
  query getResourcePreviewData($id: String!) {
    getResourceById(id: $id) {
      ...ResourcePreviewData
    }
  }
  ${ResourcePreviewData}
`;

export const voteResource = gql`
  mutation voteResource($resourceId: String!, $value: ResourceVoteValue!) {
    voteResource(resourceId: $resourceId, value: $value) {
      _id
      upvotes
    }
  }
`;

export const attachResourceCoversConcepts = gql`
  mutation attachResourceCoversConcepts($resourceId: String!, $conceptIds: [String!]!) {
    attachResourceCoversConcepts(resourceId: $resourceId, conceptIds: $conceptIds) {
      _id
      coveredConceptsByDomain {
        domain {
          _id
        }
        coveredConcepts {
          _id
          name
        }
      }
    }
  }
`;

export const detachResourceCoversConcepts = gql`
  mutation detachResourceCoversConcepts($resourceId: String!, $conceptIds: [String!]!) {
    detachResourceCoversConcepts(resourceId: $resourceId, conceptIds: $conceptIds) {
      _id
      coveredConceptsByDomain {
        domain {
          _id
        }
        coveredConcepts {
          _id
          name
        }
      }
    }
  }
`;

export const deleteResource = gql`
  mutation deleteResource($_id: String!) {
    deleteResource(_id: $_id) {
      _id
      success
    }
  }
`;

export const attachResourceToDomain = gql`
  mutation attachResourceToDomain($domainId: String!, $resourceId: String!) {
    attachResourceToDomain(domainId: $domainId, resourceId: $resourceId) {
      _id
      coveredConceptsByDomain {
        domain {
          _id
          key
        }
        coveredConcepts {
          _id
        }
      }
    }
  }
`;

export const detachResourceFromDomain = gql`
  mutation detachResourceFromDomain($domainId: String!, $resourceId: String!) {
    detachResourceFromDomain(domainId: $domainId, resourceId: $resourceId) {
      _id
      coveredConceptsByDomain {
        domain {
          _id
          key
        }
        coveredConcepts {
          _id
        }
      }
    }
  }
`;
