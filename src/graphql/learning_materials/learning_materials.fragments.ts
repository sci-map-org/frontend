import gql from 'graphql-tag';

export const LearningMaterialWithCoveredTopicsData = gql`
  fragment LearningMaterialWithCoveredTopicsData on LearningMaterial {
    _id
    coveredSubTopics(options: {}) {
      items {
        ...TopicLinkData
      }
    }
  }
`;
