import * as Types from '../../../graphql/types';

export type ResourceUrlDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id' | 'url'>
  & { consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'openedAt' | 'lastOpenedAt' | 'consumedAt'>
  )> }
);
