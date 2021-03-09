import * as Types from '../../graphql/types';

import { LearningMaterialStarsRaterData_Resource_Fragment, LearningMaterialStarsRaterData_LearningPath_Fragment } from '../../components/learning_materials/LearningMaterialStarsRating.generated';
export type StartedLearningPathCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'name' | 'rating' | 'description' | 'durationSeconds'>
  & LearningMaterialStarsRaterData_LearningPath_Fragment
);
