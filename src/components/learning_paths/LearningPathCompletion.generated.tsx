import * as Types from '../../graphql/types';

export type LearningPathCompletionDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id' | 'durationSeconds'>
  & { started?: Types.Maybe<(
    { __typename?: 'LearningPathStarted' }
    & Pick<Types.LearningPathStarted, 'startedAt' | 'completedAt'>
  )>, resourceItems?: Types.Maybe<Array<(
    { __typename?: 'LearningPathResourceItem' }
    & { resource: (
      { __typename?: 'Resource' }
      & Pick<Types.Resource, '_id' | 'durationSeconds'>
      & { consumed?: Types.Maybe<(
        { __typename?: 'ConsumedResource' }
        & Pick<Types.ConsumedResource, 'openedAt' | 'consumedAt'>
      )> }
    ) }
  )>> }
);
