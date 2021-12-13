import * as Types from '../../../../graphql/types';

import { SearchResultTopicCardDataFragment } from './SearchResultTopicCard.generated';
import { SearchResultLearningPathCardDataFragment } from './SearchResultLearningPathCard.generated';
import { SearchResultResourceCardDataFragment } from './SearchResultResourceCard.generated';
export type SearchResultCardDataFragment = (
  { __typename?: 'SearchResult' }
  & { entity: (
    { __typename?: 'Topic' }
    & SearchResultTopicCardDataFragment
  ) | (
    { __typename?: 'Resource' }
    & SearchResultResourceCardDataFragment
  ) | (
    { __typename?: 'LearningPath' }
    & SearchResultLearningPathCardDataFragment
  ) }
);
