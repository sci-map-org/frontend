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

export const deleteResource = gql`
  mutation deleteResource($_id: String!) {
    deleteResource(_id: $_id) {
      _id
      success
    }
  }
`;

export const setResourceOpened = gql`
  mutation setResourceOpened($resourceId: String!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, opened: true }] }) {
      _id
      consumed {
        openedAt
        lastOpenedAt
      }
    }
  }
`;

export const setResourceConsumed = gql`
  mutation setResourceConsumed($resourceId: String!, $consumed: Boolean!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, consumed: $consumed }] }) {
      _id
      consumed {
        openedAt
        consumedAt
      }
    }
  }
`;

export const analyzeResourceUrl = gql`
  query analyzeResourceUrl($url: String!) {
    analyzeResourceUrl(url: $url) {
      resourceData {
        name
        type
        mediaType
        description
        durationSeconds
        subResourceSeries {
          name
          url
          type
          mediaType
          description
          durationSeconds
        }
      }
    }
  }
`;
