import gql from 'graphql-tag';
import { TopicLinkData } from '../topics/topics.fragments';

export const showLearningMaterialInTopic = gql`
  mutation showLearningMaterialInTopic($topicId: String!, $learningMaterialId: String!) {
    showLearningMaterialInTopic(topicId: $topicId, learningMaterialId: $learningMaterialId) {
      _id
      showedIn {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

export const hideLearningMaterialFromTopic = gql`
  mutation hideLearningMaterialFromTopic($topicId: String!, $learningMaterialId: String!) {
    hideLearningMaterialFromTopic(topicId: $topicId, learningMaterialId: $learningMaterialId) {
      _id
      showedIn {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;
