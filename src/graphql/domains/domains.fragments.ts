import gql from 'graphql-tag';
import { ConceptData } from '../concepts/concepts.fragments';

export const DomainData = gql`
  fragment DomainData on Domain {
    _id
    name
    key
    description
  }
`;

export const DomainWithConceptsData = gql`
  fragment DomainWithConceptsData on Domain {
    _id
    name
    key
    description
    concepts(options: {}) {
      items {
        relationship {
          index
        }
        concept {
          ...ConceptData
        }
      }
    }
  }
  ${ConceptData}
`;
