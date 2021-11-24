import * as Types from '../../../../graphql/types';

import { SearchResultLearningGoalCardDataFragment } from './SearchResultLearningGoalCard.generated';
import { SearchResultLearningPathCardDataFragment } from './SearchResultLearningPathCard.generated';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';
export type SearchResultCardDataFragment = (
  { __typename?: 'SearchResult' }
  & { entity: { __typename?: 'Topic' } | (
    { __typename?: 'LearningGoal' }
    & SearchResultLearningGoalCardDataFragment
  ) | (
    { __typename?: 'Resource' }
    & SearchResultResourceCardDataFragment
  ) | (
    { __typename?: 'LearningPath' }
    & SearchResultLearningPathCardDataFragment
  ) }
);
