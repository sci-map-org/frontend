import * as Types from '../types';

import { ResourcePreviewDataFragment } from '../resources/resources.fragments.generated';
export type LearningPathDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'public' | 'name' | 'description' | 'durationMs'>
);

export type LearningPathWithResourceItemsPreviewDataFragment = (
  { __typename?: 'LearningPath' }
  & { resourceItems?: Types.Maybe<Array<(
    { __typename?: 'LearningPathResourceItem' }
    & Pick<Types.LearningPathResourceItem, 'description'>
    & { resource: (
      { __typename?: 'Resource' }
      & ResourcePreviewDataFragment
    ) }
  )>> }
  & LearningPathDataFragment
);
