import * as Types from '../types';

import { ResourcePreviewCardDataFragment } from '../../components/resources/ResourcePreviewCard.generated';
export type LearningPathDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'public' | 'name' | 'description' | 'durationSeconds'>
);

export type LearningPathLinkDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'key' | 'name'>
);

export type LearningPathWithResourceItemsPreviewDataFragment = (
  { __typename?: 'LearningPath' }
  & { resourceItems?: Types.Maybe<Array<(
    { __typename?: 'LearningPathResourceItem' }
    & Pick<Types.LearningPathResourceItem, 'description'>
    & { resource: (
      { __typename?: 'Resource' }
      & ResourcePreviewCardDataFragment
    ) }
  )>> }
  & LearningPathDataFragment
);
