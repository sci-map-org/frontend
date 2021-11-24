import gql from 'graphql-tag';

export const LearningMaterialWithCoveredConceptsByDomainData = gql`
  fragment LearningMaterialWithCoveredConceptsByDomainData on LearningMaterial {
    _id
    # coveredConceptsByDomain {
    #   domain {
    #     ...DomainLinkData
    #   }
    #   coveredConcepts {
    #     ...ConceptLinkData
    #   }
    # }
  }
`;
