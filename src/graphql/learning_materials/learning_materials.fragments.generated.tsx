import * as Types from '../types';

import { DomainLinkDataFragment } from '../domains/domains.fragments.generated';
import { ConceptLinkDataFragment } from '../concepts/concepts.fragments.generated';
export type LearningMaterialWithCoveredConceptsByDomainData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { coveredConceptsByDomain?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainLinkDataFragment
    ), coveredConcepts: Array<(
      { __typename?: 'Concept' }
      & ConceptLinkDataFragment
    )> }
  )>> }
);

export type LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
  & { coveredConceptsByDomain?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialCoveredConceptsByDomainItem' }
    & { domain: (
      { __typename?: 'Domain' }
      & DomainLinkDataFragment
    ), coveredConcepts: Array<(
      { __typename?: 'Concept' }
      & ConceptLinkDataFragment
    )> }
  )>> }
);

export type LearningMaterialWithCoveredConceptsByDomainDataFragment = LearningMaterialWithCoveredConceptsByDomainData_Resource_Fragment | LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment;
