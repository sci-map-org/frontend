import * as Types from '../../../graphql/types';

export type CommentViewerDataFragment = { __typename?: 'Comment', _id: string, contentMarkdown: string, postedAt: string, postedBy?: { __typename?: 'User', _id: string, key: string, displayName: string, profilePictureUrl?: string | null | undefined } | null | undefined };
