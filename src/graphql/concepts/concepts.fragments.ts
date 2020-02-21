import gql from 'graphql-tag';

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
