import { ConceptData } from './concepts.fragments';
import gql from 'graphql-tag';
import { ResourcePreviewData } from '../resources/resources.fragments';

// export const addConceptToDomain = gql`
//   mutation addConceptToDomain($domainId: String!, $payload: AddConceptToDomainPayload!) {
//     addConceptToDomain(domainId: $domainId, payload: $payload) {
//       ...ConceptData
//       domain {
//         _id
//         concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
//           items {
//             concept {
//               _id
//             }
//             relationship {
//               index
//             }
//           }
//         }
//       }
//     }
//   }
//   ${ConceptData}
// `;

export const updateConcept = gql`
  mutation updateConcept($_id: String!, $payload: UpdateConceptPayload!) {
    updateConcept(_id: $_id, payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const deleteConcept = gql`
  mutation deleteConcept($_id: String!) {
    deleteConcept(_id: $_id) {
      _id
      success
    }
  }
`;

export const getConcept = gql`
  query getConcept($_id: String!) {
    getConcept(_id: $_id) {
      ...ConceptData
      coveredByResources(options: {}) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ConceptData}
  ${ResourcePreviewData}
`;

export const setConceptsKnown = gql`
  mutation setConceptsKnown($payload: SetConceptKnownPayload!) {
    setConceptsKnown(payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const setConceptsUnknown = gql`
  mutation setConceptsUnknown($conceptIds: [String!]!) {
    setConceptsUnknown(conceptIds: $conceptIds) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const getDomainConceptList = gql`
  query getDomainConceptList($domainKey: String!) {
    getDomainByKey(key: $domainKey) {
      _id
      key
      concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
        items {
          concept {
            ...ConceptData
          }
        }
      }
    }
  }
  ${ConceptData}
`;
