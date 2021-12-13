import gql from 'graphql-tag';
import { TopicLinkData } from '../topics/topics.fragments';

export const LearningMaterialWithCoveredTopicsData = gql`
  fragment LearningMaterialWithCoveredTopicsData on LearningMaterial {
    _id
    coveredSubTopics(options: {}) {
      items {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;
