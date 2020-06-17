import gql from 'graphql-tag';

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
      coveredConcepts(options: {}) {
        items {
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
      coveredConcepts(options: {}) {
        items {
          _id
          name
        }
      }
    }
  }
`;
