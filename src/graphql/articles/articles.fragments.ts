import gql from 'graphql-tag';

export const ArticleViewerData = gql`
  fragment ArticleViewerData on Article {
    _id
    key
    title
    content
    contentType
    author {
      key
      displayName
    }
  }
`;
export const ArticlePreviewData = gql`
  fragment ArticlePreviewData on Article {
    _id
    key
    title
    contentType
    author {
      key
    }
  }
`;
