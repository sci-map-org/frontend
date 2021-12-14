import * as Types from '../../graphql/types';

export type LearningPathMiniCardDataFragment = { __typename?: 'LearningPath', _id: string, key: string, name: string, rating?: number | null | undefined, started?: { __typename?: 'LearningPathStarted', startedAt: any, completedAt?: any | null | undefined } | null | undefined };
