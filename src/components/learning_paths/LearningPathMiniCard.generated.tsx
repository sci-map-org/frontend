import * as Types from '../../graphql/types';

import { LearningMaterialStarsRaterData_Resource_Fragment, LearningMaterialStarsRaterData_LearningPath_Fragment } from '../learning_materials/LearningMaterialStarsRating.generated';
export type LearningPathMiniCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'name' | 'rating'>
  & LearningMaterialStarsRaterData_LearningPath_Fragment
);
