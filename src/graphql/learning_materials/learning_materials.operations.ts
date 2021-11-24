import gql from "graphql-tag";

// TODO
// export const attachLearningMaterialToDomain = gql`
//   mutation attachLearningMaterialToDomain($domainId: String!, $learningMaterialId: String!) {
//     attachLearningMaterialToDomain(domainId: $domainId, learningMaterialId: $learningMaterialId) {
//       _id
//       coveredConceptsByDomain {
//         domain {
//           _id
//           key
//         }
//         coveredConcepts {
//           _id
//         }
//       }
//     }
//   }
// `;

// export const detachLearningMaterialFromDomain = gql`
//   mutation detachLearningMaterialFromDomain($domainId: String!, $learningMaterialId: String!) {
//     detachLearningMaterialFromDomain(domainId: $domainId, learningMaterialId: $learningMaterialId) {
//       _id
//       coveredConceptsByDomain {
//         domain {
//           _id
//           key
//         }
//         coveredConcepts {
//           _id
//         }
//       }
//     }
//   }
// `;


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
