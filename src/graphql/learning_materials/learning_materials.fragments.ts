import gql from 'graphql-tag';
import { ConceptLinkData } from '../concepts/concepts.fragments';
import { DomainLinkData } from '../domains/domains.fragments';

export const LearningMaterialWithCoveredConceptsByDomainData = gql`
  fragment LearningMaterialWithCoveredConceptsByDomainData on LearningMaterial {
    _id
    coveredConceptsByDomain {
      domain {
        ...DomainLinkData
      }
      coveredConcepts {
        ...ConceptLinkData
      }
    }
  }
  ${DomainLinkData}
  ${ConceptLinkData}
`;
