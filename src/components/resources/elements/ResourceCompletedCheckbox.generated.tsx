import * as Types from '../../../graphql/types';

export type ResourceCompletedCheckboxDataFragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { consumed?: Types.Maybe<(
    { __typename?: 'ConsumedResource' }
    & Pick<Types.ConsumedResource, 'consumedAt' | 'openedAt'>
  )> }
);
