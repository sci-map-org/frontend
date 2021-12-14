import * as Types from '../types';

export type ArticleViewerDataFragment = { __typename?: 'Article', _id: string, key: string, title: string, content: string, contentType: Types.ArticleContentType, author?: { __typename?: 'User', key: string, displayName: string } | null | undefined };

export type ArticlePreviewDataFragment = { __typename?: 'Article', _id: string, key: string, title: string, contentType: Types.ArticleContentType, author?: { __typename?: 'User', key: string } | null | undefined };
