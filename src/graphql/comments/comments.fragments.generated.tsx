import * as Types from '../types';

export type CommentFullDataFragment = { __typename?: 'Comment', _id: string, discussionId: string, parentId?: string | null | undefined, contentMarkdown: string, postedAt: string, postedByUserId: string };
