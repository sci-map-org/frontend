import * as Types from '../../../../graphql/types';

import { SearchResultDomainCardDataFragment } from './SearchResultDomainCard.generated';
import { SearchResultConceptCardDataFragment } from './SearchResultConceptCard.generated';
import { SearchResultLearningGoalCardDataFragment } from './SearchResultLearningGoalCard.generated';
import { SearchResultLearningPathCardDataFragment } from './SearchResultLearningPathCard.generated';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';
export type SearchResultCardDataFragment = (
  { __typename?: 'SearchResult' }
  & { entity: (
    { __typename?: 'Domain' }
    & SearchResultDomainCardDataFragment
  ) | (
    { __typename?: 'Concept' }
    & SearchResultConceptCardDataFragment
  ) | (
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
