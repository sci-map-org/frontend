import * as Types from '../../graphql/types';

export type LearningPathCompletionFragmentFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'durationMs'>
  & { resourceItems?: Types.Maybe<Array<(
    { __typename?: 'LearningPathResourceItem' }
    & { resource: (
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id' | 'durationMs'>
      & { consumed?: Types.Maybe<(
        { __typename?: 'ConsumedResource' }
        & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
      )> }
    ) }
  )>> }
);
