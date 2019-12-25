export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AdminUpdateUserPayload = {
  displayName?: Maybe<Scalars['String']>,
  key?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  role?: Maybe<UserRole>,
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

export type Concept = {
   __typename?: 'Concept',
  _id: Scalars['String'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  domain?: Maybe<Domain>,
};

export type CreateArticlePayload = {
  contentType: ArticleContentType,
  title: Scalars['String'],
  content: Scalars['String'],
};

export type CreateConceptPayload = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
};

export type CreateDomainPayload = {
  name: Scalars['String'],
  key: Scalars['String'],
  description?: Maybe<Scalars['String']>,
};

export type CreateResourcePayload = {
  name: Scalars['String'],
  type: ResourceType,
  mediaType: ResourceMediaType,
  url: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  approaches?: Maybe<Array<PedagogicalApproach>>,
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  _id: Scalars['String'],
  email: Scalars['String'],
  displayName: Scalars['String'],
  key: Scalars['String'],
  role: UserRole,
  articles?: Maybe<ListArticlesResult>,
};


export type CurrentUserArticlesArgs = {
  options: ListArticlesOptions
};

export type DeleteArticleResponse = {
   __typename?: 'DeleteArticleResponse',
  _id: Scalars['String'],
  success: Scalars['Boolean'],
};

export type DeleteConceptResult = {
   __typename?: 'DeleteConceptResult',
  success: Scalars['Boolean'],
  _id: Scalars['String'],
};

export type DeleteDomainResponse = {
   __typename?: 'DeleteDomainResponse',
  _id: Scalars['String'],
  success: Scalars['Boolean'],
};

export type Domain = {
   __typename?: 'Domain',
  _id: Scalars['String'],
  name: Scalars['String'],
  key: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  concepts?: Maybe<DomainConceptsResults>,
  resources?: Maybe<DomainResourcesResults>,
};


export type DomainConceptsArgs = {
  options: DomainConceptsOptions
};


export type DomainResourcesArgs = {
  options: DomainResourcesOptions
};

export type DomainConceptsOptions = {
  pagination: PaginationOptions,
};

export type DomainConceptsResults = {
   __typename?: 'DomainConceptsResults',
  items: Array<Concept>,
};

export type DomainResourcesOptions = {
  pagination: PaginationOptions,
};

export type DomainResourcesResults = {
   __typename?: 'DomainResourcesResults',
  items: Array<Resource>,
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
  adminUpdateUser: User,
  createArticle: Article,
  updateArticle: Article,
  deleteArticle: DeleteArticleResponse,
  createDomain: Domain,
  updateDomain: Domain,
  deleteDomain: DeleteDomainResponse,
  createResource: Resource,
  addResourceToDomain: Resource,
  attachResourceToDomain: Resource,
  addConceptToDomain: Concept,
  updateConcept: Concept,
  deleteConcept: DeleteConceptResult,
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  payload: RegisterPayload
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['String'],
  payload: AdminUpdateUserPayload
};


export type MutationCreateArticleArgs = {
  payload: CreateArticlePayload
};


export type MutationUpdateArticleArgs = {
  id: Scalars['String'],
  payload: UpdateArticlePayload
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String']
};


export type MutationCreateDomainArgs = {
  payload: CreateDomainPayload
};


export type MutationUpdateDomainArgs = {
  id: Scalars['String'],
  payload: UpdateDomainPayload
};


export type MutationDeleteDomainArgs = {
  id: Scalars['String']
};


export type MutationCreateResourceArgs = {
  payload: CreateResourcePayload
};


export type MutationAddResourceToDomainArgs = {
  domainId: Scalars['String'],
  payload: CreateResourcePayload
};


export type MutationAttachResourceToDomainArgs = {
  domainId: Scalars['String'],
  resourceId: Scalars['String']
};


export type MutationAddConceptToDomainArgs = {
  domainId: Scalars['String'],
  payload: CreateConceptPayload
};


export type MutationUpdateConceptArgs = {
  _id: Scalars['String'],
  payload: UpdateConceptPayload
};


export type MutationDeleteConceptArgs = {
  _id: Scalars['String']
};

export type PaginationOptions = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
};

export enum PedagogicalApproach {
  Practical = 'practical',
  Theoretical = 'theoretical',
  Intuitive = 'intuitive',
  Gamified = 'gamified',
  Visual = 'visual',
  Interactive = 'interactive',
  Abstract = 'abstract',
  Detailed = 'detailed'
}

export type Query = {
   __typename?: 'Query',
  currentUser: CurrentUser,
  getUser: User,
  getArticleByKey: Article,
  listArticles: ListArticlesResult,
  searchDomains: SearchDomainsResult,
  getDomainByKey: Domain,
  getResourceById: Resource,
  getConcept: Concept,
};


export type QueryGetUserArgs = {
  key: Scalars['String']
};


export type QueryGetArticleByKeyArgs = {
  key: Scalars['String']
};


export type QueryListArticlesArgs = {
  options: ListArticlesOptions
};


export type QuerySearchDomainsArgs = {
  options: SearchDomainsOptions
};


export type QueryGetDomainByKeyArgs = {
  key: Scalars['String']
};


export type QueryGetResourceByIdArgs = {
  id: Scalars['String']
};


export type QueryGetConceptArgs = {
  _id: Scalars['String']
};

export type RegisterPayload = {
  displayName: Scalars['String'],
  key: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Resource = {
   __typename?: 'Resource',
  _id: Scalars['String'],
  name: Scalars['String'],
  type: ResourceType,
  mediaType: ResourceMediaType,
  url: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  approaches?: Maybe<Array<PedagogicalApproach>>,
};

export enum ResourceMediaType {
  Video = 'video',
  Text = 'text'
}

export enum ResourceType {
  Article = 'article',
  Tutorial = 'tutorial',
  Introduction = 'introduction'
}

export type SearchDomainsOptions = {
  query?: Maybe<Scalars['String']>,
  pagination: PaginationOptions,
};

export type SearchDomainsResult = {
   __typename?: 'SearchDomainsResult',
  items: Array<Domain>,
};

export type UpdateArticlePayload = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type UpdateConceptPayload = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateDomainPayload = {
  name?: Maybe<Scalars['String']>,
  key?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
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

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}
