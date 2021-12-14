import * as Types from '../../graphql/types';

import { LearningMaterialStarsRaterData_LearningPath_Fragment, LearningMaterialStarsRaterData_Resource_Fragment } from '../../components/learning_materials/LearningMaterialStarsRating.generated';
import { LearningPathCompletionDataFragment } from '../../components/learning_paths/LearningPathCompletion.generated';
export type StartedLearningPathCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'name' | 'public' | 'rating' | 'description' | 'durationSeconds'>
  & LearningMaterialStarsRaterData_LearningPath_Fragment
  & LearningPathCompletionDataFragment
);
