import * as Types from '../types';

import { TopicLinkDataFragment } from '../topics/topics.fragments.generated';
export type ResourceDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationSeconds' | 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialTag' }
    & Pick<Types.LearningMaterialTag, 'name'>
  )>>, consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
  )> }
);

export type ResourceLinkDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name'>
);

export type ResourceWithCoveredTopicsDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { coveredSubTopics?: Types.Maybe<(
    { __typename?: 'LearningMaterialCoveredSubTopicsResults' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
  )> }
);
