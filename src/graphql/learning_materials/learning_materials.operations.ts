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

// TODO
// export const attachLearningMaterialCoversConcepts = gql`
// mutation attachLearningMaterialCoversConcepts($learningMaterialId: String!, $conceptIds: [String!]!) {
//   attachLearningMaterialCoversConcepts(learningMaterialId: $learningMaterialId, conceptIds: $conceptIds) {
//     _id
//     coveredConceptsByDomain {
//       domain {
//         _id
//       }
//       coveredConcepts {
//         _id
//         name
//       }
//     }
//   }
// }
// `;

// export const detachLearningMaterialCoversConcepts = gql`
// mutation detachLearningMaterialCoversConcepts($learningMaterialId: String!, $conceptIds: [String!]!) {
//   detachLearningMaterialCoversConcepts(learningMaterialId: $learningMaterialId, conceptIds: $conceptIds) {
//     _id
//     coveredConceptsByDomain {
//       domain {
//         _id
//       }
//       coveredConcepts {
//         _id
//         name
//       }
//     }
//   }
// }
// `;
