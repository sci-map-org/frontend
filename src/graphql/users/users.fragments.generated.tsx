import * as Types from '../types';

export type CurrentUserDataFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<Types.CurrentUser, '_id' | 'email' | 'key' | 'role' | 'displayName'>
  & { createdLearningPaths?: Types.Maybe<Array<(
    { __typename?: 'LearningPath' }
    & Pick<Types.LearningPath, '_id' | 'key' | 'name'>
  )>> }
);

export type PublicUserDataFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, '_id' | 'key' | 'role' | 'displayName'>
);
