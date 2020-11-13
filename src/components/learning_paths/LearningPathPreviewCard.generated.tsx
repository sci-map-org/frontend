import * as Types from '../../graphql/types';

import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { LearningPathCompletionDataFragment } from './LearningPathCompletion.generated';
export type LearningPathPreviewCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialTag' }
    & Pick<Types.LearningMaterialTag, 'name'>
  )>> }
  & LearningPathDataFragment
  & LearningPathCompletionDataFragment
);
