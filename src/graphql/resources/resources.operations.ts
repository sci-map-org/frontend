import gql from 'graphql-tag';

export const voteResource = gql`
  mutation voteResource($resourceId: String!, $value: ResourceVoteValue!) {
    voteResource(resourceId: $resourceId, value: $value) {
      _id
      upvotes
    }
  }
`;
