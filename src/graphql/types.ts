export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Article = {
   __typename?: 'Article',
  _id: Scalars['String'],
  key: Scalars['String'],
  contentType: ArticleContentType,
  title: Scalars['String'],
  content: Scalars['String'],
  author?: Maybe<User>,
};

export enum ArticleContentType {
  Markdown = 'markdown'
}

export type CreateArticlePayload = {
  contentType: ArticleContentType,
  title: Scalars['String'],
  content: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  _id: Scalars['String'],
  email: Scalars['String'],
  displayName: Scalars['String'],
  key: Scalars['String'],
  articles?: Maybe<ListArticlesResult>,
};


export type CurrentUserArticlesArgs = {
  options: ListArticlesOptions
};

export type ListArticlesFilter = {
  contentType?: Maybe<ArticleContentType>,
};

export type ListArticlesOptions = {
  filter?: Maybe<ListArticlesFilter>,
  pagination?: Maybe<PaginationOptions>,
};

export type ListArticlesResult = {
   __typename?: 'ListArticlesResult',
  items: Array<Article>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  currentUser: CurrentUser,
  jwt: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: LoginResponse,
  register: CurrentUser,
  createArticle: Article,
  updateArticle: Article,
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  payload: RegisterPayload
};


export type MutationCreateArticleArgs = {
  payload: CreateArticlePayload
};


export type MutationUpdateArticleArgs = {
  id: Scalars['String'],
  payload: UpdateArticlePayload
};

export type PaginationOptions = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
};

export type Query = {
   __typename?: 'Query',
  currentUser: CurrentUser,
  getArticle: Article,
  listArticles: ListArticlesResult,
};


export type QueryGetArticleArgs = {
  key: Scalars['String']
};


export type QueryListArticlesArgs = {
  options: ListArticlesOptions
};

export type RegisterPayload = {
  displayName: Scalars['String'],
  key: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UpdateArticlePayload = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  _id: Scalars['String'],
  email: Scalars['String'],
  displayName: Scalars['String'],
  key: Scalars['String'],
  articles?: Maybe<ListArticlesResult>,
};


export type UserArticlesArgs = {
  options: ListArticlesOptions
};
