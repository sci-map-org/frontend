import * as Types from '../types';

export type LearningMaterialWithCoveredConceptsByDomainData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
);

export type LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
);

export type LearningMaterialWithCoveredConceptsByDomainDataFragment = LearningMaterialWithCoveredConceptsByDomainData_Resource_Fragment | LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment;
