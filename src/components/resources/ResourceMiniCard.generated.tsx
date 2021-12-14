import * as Types from '../../graphql/types';

import { LearningMaterialStarsRaterData_LearningPath_Fragment, LearningMaterialStarsRaterData_Resource_Fragment } from '../learning_materials/LearningMaterialStarsRating.generated';
export type ResourceMiniCardDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'url' | 'rating'>
  & LearningMaterialStarsRaterData_Resource_Fragment
);
