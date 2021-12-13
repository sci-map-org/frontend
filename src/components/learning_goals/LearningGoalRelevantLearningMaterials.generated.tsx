import * as Types from '../../graphql/types';

import { ResourcePreviewCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
export type LearningGoalRelevantLearningMaterialsDataFragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id'>
  & { relevantLearningMaterials?: Types.Maybe<(
    { __typename?: 'LearningGoalRelevantLearningMaterialsResults' }
    & { items: Array<(
      { __typename?: 'LearningGoalRelevantLearningMaterialsItem' }
      & Pick<Types.LearningGoalRelevantLearningMaterialsItem, 'coverage'>
      & { learningMaterial: (
        { __typename?: 'Resource' }
        & ResourcePreviewCardDataFragment
      ) | (
        { __typename?: 'LearningPath' }
        & LearningPathPreviewCardDataFragment
      ) }
    )> }
  )> }
);
