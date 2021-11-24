import * as Types from '../../graphql/types';

export type EditableLearningMaterialPrerequisitesData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
);

export type EditableLearningMaterialPrerequisitesData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
);

export type EditableLearningMaterialPrerequisitesDataFragment = EditableLearningMaterialPrerequisitesData_Resource_Fragment | EditableLearningMaterialPrerequisitesData_LearningPath_Fragment;
