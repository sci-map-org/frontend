import * as Types from '../types';

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

export type ResourcePreviewDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'name' | 'type' | 'mediaType' | 'url' | 'description' | 'durationSeconds' | 'upvotes' | 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialTag' }
    & Pick<Types.LearningMaterialTag, 'name'>
  )>>, consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
  )>, subResourceSeries?: Types.Maybe<Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name'>
  )>>, subResources?: Types.Maybe<Array<(
    { __typename?: 'Resource' }
    & Pick<Types.Resource, '_id' | 'name'>
  )>> }
);

export type ResourceWithCoveredConceptsByDomainDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
);
