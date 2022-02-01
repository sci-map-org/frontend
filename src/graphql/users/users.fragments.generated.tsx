import * as Types from '../types';

export type CurrentUserDataFragment = { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined };

export type UserLinkDataFragment = { __typename?: 'User', _id: string, key: string, displayName: string };

export type PublicUserDataFragment = { __typename?: 'User', _id: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined };

export type LoginResponseDataFragment = { __typename?: 'LoginResponse', jwt: string, redirectUrl?: string | null | undefined, currentUser: { __typename?: 'CurrentUser', _id: string, email: string, key: string, role: Types.UserRole, displayName: string, bio?: string | null | undefined, profilePictureUrl?: string | null | undefined, startedLearningPaths?: Array<{ __typename?: 'LearningPathStartedItem', startedAt: any, learningPath: { __typename?: 'LearningPath', _id: string, key: string, name: string } }> | null | undefined } };
