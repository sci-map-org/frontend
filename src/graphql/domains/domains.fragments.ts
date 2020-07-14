import gql from 'graphql-tag';
import { ConceptData } from '../concepts/concepts.fragments';
import { DomainDataFragment } from './domains.fragments.generated';

export const DomainData = gql`
  fragment DomainData on Domain {
    _id
    name
    key
    description
  }
`;

export const generateDomainData = (): DomainDataFragment => ({
  _id: Math.random().toString(),
  name: 'Placeholder Name',
  key: Math.random().toString(),
});

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
