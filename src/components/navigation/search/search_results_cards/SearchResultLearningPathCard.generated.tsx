import * as Types from '../../../../graphql/types';

import { LearningPathLinkDataFragment } from '../../../../graphql/learning_paths/learning_paths.fragments.generated';
export type SearchResultLearningPathCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, 'durationSeconds' | 'rating'>
  & { resourceItems?: Types.Maybe<Array<(
    { __typename?: 'LearningPathResourceItem' }
    & { resource: (
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id'>
    ) }
  )>> }
  & LearningPathLinkDataFragment
);
