import * as Types from '../types';

export type ArticleViewerDataFragment = (
  { __typename?: 'Article' }
  & Pick<Types.Article, '_id' | 'key' | 'title' | 'content' | 'contentType'>
  & { author?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'key' | 'displayName'>
  )> }
);

export type ArticlePreviewDataFragment = (
  { __typename?: 'Article' }
  & Pick<Types.Article, '_id' | 'key' | 'title' | 'contentType'>
  & { author?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'key'>
  )> }
);
