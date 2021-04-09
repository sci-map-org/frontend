import gql from 'graphql-tag';
import { ConceptType } from '../types';

import { ConceptDataFragment } from './concepts.fragments.generated';

export const ConceptLinkData = gql`
  fragment ConceptLinkData on Concept {
    _id
    key
    name
    domain {
      _id
      key
      name
    }
  }
`;

export const ConceptData = gql`
  fragment ConceptData on Concept {
    _id
    key
    name
    types
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
    types
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
  types: [ConceptType.Concept],
  name: 'Oups ' + "you shouldn't see that...".substr(0, Math.round(Math.random() * 25)),
});
