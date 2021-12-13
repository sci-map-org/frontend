import * as Types from '../../graphql/types';

import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
export type ResourcePreviewCardDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationSeconds' | 'upvotes' | 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialTag' }
    & Pick<Types.LearningMaterialTag, 'name'>
  )>>, consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
  )>, coveredSubTopics?: Types.Maybe<(
    { __typename?: 'LearningMaterialCoveredSubTopicsResults' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
  )>, subResourceSeries?: Types.Maybe<Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name'>
  )>>, subResources?: Types.Maybe<Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name'>
  )>> }
);
