import gql from 'graphql-tag';

export const CommentFullData = gql`
  fragment CommentFullData on Comment {
    _id
    discussionId
    parentId
    contentMarkdown
    postedAt
    postedByUserId
  }
`;
