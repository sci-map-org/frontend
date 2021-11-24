import * as Types from '../../graphql/types';

import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { LearningPathCompletionDataFragment } from './LearningPathCompletion.generated';
import { LearningMaterialWithCoveredTopicsData_Resource_Fragment, LearningMaterialWithCoveredTopicsData_LearningPath_Fragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { UserAvatarDataFragment } from '../users/UserAvatar.generated';
export type LearningPathPreviewCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialTag' }
    & Pick<Types.LearningMaterialTag, 'name'>
  )>>, createdBy?: Types.Maybe<(
    { __typename?: 'User' }
    & UserAvatarDataFragment
  )> }
  & LearningPathDataFragment
  & LearningPathCompletionDataFragment
  & LearningMaterialWithCoveredTopicsData_LearningPath_Fragment
);
