import gql from 'graphql-tag';
import { ConceptDataFragment } from './concepts.fragments.generated';

export const ConceptData = gql`
  fragment ConceptData on Concept {
    _id
    key
    name
    description
    known {
      level
    }
  }
`;

export const ConceptWithDependenciesData = gql`
  fragment ConceptWithDependenciesData on Concept {
    _id
    key
    name
    known {
      level
    }
    referencedByConcepts {
      concept {
        _id
      }
    }
  }
`;

export const generateConceptData = (): ConceptDataFragment => ({
  _id: Math.random().toString(),
  key: Math.random().toString(),
  name: 'Concept Name',
});
