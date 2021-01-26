import * as Types from '../../graphql/types';

import { LearningMaterialStarsRaterData_Resource_Fragment, LearningMaterialStarsRaterData_LearningPath_Fragment } from '../learning_materials/LearningMaterialStarsRating.generated';
export type ResourceMiniCardDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'url' | 'rating'>
  & LearningMaterialStarsRaterData_Resource_Fragment
);
