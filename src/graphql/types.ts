export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
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
  key: Scalars['String'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  domain?: Maybe<Domain>,
  coveredByResources?: Maybe<ConceptCoveredByResourcesResults>,
  known?: Maybe<KnownConcept>,
};


export type ConceptCoveredByResourcesArgs = {
  options: ConceptCoveredByResourcesOptions
};

export type ConceptCoveredByResourcesOptions = {
  pagination?: Maybe<PaginationOptions>,
};

export type ConceptCoveredByResourcesResults = {
   __typename?: 'ConceptCoveredByResourcesResults',
  items: Array<Resource>,
};

export type ConsumedResource = {
   __typename?: 'ConsumedResource',
  openedAt?: Maybe<Scalars['DateTime']>,
  consumedAt?: Maybe<Scalars['DateTime']>,
};

export type CreateArticlePayload = {
  contentType: ArticleContentType,
  title: Scalars['String'],
  content: Scalars['String'],
};

export type CreateConceptPayload = {
  key?: Maybe<Scalars['String']>,
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
  durationMn?: Maybe<Scalars['Int']>,
  tags?: Maybe<Array<Scalars['String']>>,
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
  pagination?: Maybe<PaginationOptions>,
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

export type KnownConcept = {
   __typename?: 'KnownConcept',
  level: Scalars['Float'],
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
  addTagsToResource: Resource,
  removeTagsFromResource: Resource,
  createResource: Resource,
  updateResource: Resource,
  addResourceToDomain: Resource,
  attachResourceToDomain: Resource,
  attachResourceCoversConcepts: Resource,
  detachResourceCoversConcepts: Resource,
  setResourcesConsumed: Array<Resource>,
  addConceptToDomain: Concept,
  updateConcept: Concept,
  deleteConcept: DeleteConceptResult,
  setConceptsKnown: Array<Concept>,
  setConceptsUnknown: Array<Concept>,
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


export type MutationAddTagsToResourceArgs = {
  resourceId: Scalars['String'],
  tags: Array<Scalars['String']>
};


export type MutationRemoveTagsFromResourceArgs = {
  resourceId: Scalars['String'],
  tags: Array<Scalars['String']>
};


export type MutationCreateResourceArgs = {
  payload: CreateResourcePayload
};


export type MutationUpdateResourceArgs = {
  _id: Scalars['String'],
  payload: UpdateResourcePayload
};


export type MutationAddResourceToDomainArgs = {
  domainId: Scalars['String'],
  payload: CreateResourcePayload
};


export type MutationAttachResourceToDomainArgs = {
  domainId: Scalars['String'],
  resourceId: Scalars['String']
};


export type MutationAttachResourceCoversConceptsArgs = {
  resourceId: Scalars['String'],
  conceptIds: Array<Scalars['String']>
};


export type MutationDetachResourceCoversConceptsArgs = {
  resourceId: Scalars['String'],
  conceptIds: Array<Scalars['String']>
};


export type MutationSetResourcesConsumedArgs = {
  payload: SetResourcesConsumedPayload
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


export type MutationSetConceptsKnownArgs = {
  payload: SetConceptKnownPayload
};


export type MutationSetConceptsUnknownArgs = {
  conceptIds: Array<Scalars['String']>
};

export type PaginationOptions = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
};

export type Query = {
   __typename?: 'Query',
  currentUser: CurrentUser,
  getUser: User,
  getArticleByKey: Article,
  listArticles: ListArticlesResult,
  searchDomains: SearchDomainsResult,
  getDomainByKey: Domain,
  searchResourceTags: Array<ResourceTagSearchResult>,
  getResourceById: Resource,
  getConcept: Concept,
  getConceptByKey: Concept,
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


export type QuerySearchResourceTagsArgs = {
  options: SearchResourceTagsOptions
};


export type QueryGetResourceByIdArgs = {
  id: Scalars['String']
};


export type QueryGetConceptArgs = {
  _id: Scalars['String']
};


export type QueryGetConceptByKeyArgs = {
  key: Scalars['String']
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
  tags?: Maybe<Array<ResourceTag>>,
  url: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  durationMn?: Maybe<Scalars['Int']>,
  consumed?: Maybe<ConsumedResource>,
  coveredConcepts?: Maybe<ResourceCoveredConceptsResults>,
  domains?: Maybe<ResourceDomainsResults>,
};


export type ResourceCoveredConceptsArgs = {
  options: ResourceCoveredConceptsOptions
};


export type ResourceDomainsArgs = {
  options: ResourceDomainsOptions
};

export type ResourceCoveredConceptsOptions = {
  pagination?: Maybe<PaginationOptions>,
};

export type ResourceCoveredConceptsResults = {
   __typename?: 'ResourceCoveredConceptsResults',
  items: Array<Concept>,
};

export type ResourceDomainsOptions = {
  pagination?: Maybe<PaginationOptions>,
};

export type ResourceDomainsResults = {
   __typename?: 'ResourceDomainsResults',
  items: Array<Domain>,
};

export enum ResourceMediaType {
  Video = 'video',
  Text = 'text',
  Audio = 'audio'
}

export type ResourceTag = {
   __typename?: 'ResourceTag',
  name: Scalars['String'],
};

export type ResourceTagSearchResult = {
   __typename?: 'ResourceTagSearchResult',
  name: Scalars['String'],
  usageCount?: Maybe<Scalars['Int']>,
};

export enum ResourceType {
  Article = 'article',
  Tutorial = 'tutorial',
  Introduction = 'introduction',
  Course = 'course',
  ArticleSeries = 'article_series'
}

export type SearchDomainsOptions = {
  query?: Maybe<Scalars['String']>,
  pagination: PaginationOptions,
};

export type SearchDomainsResult = {
   __typename?: 'SearchDomainsResult',
  items: Array<Domain>,
};

export type SearchResourceTagsOptions = {
  query: Scalars['String'],
  pagination: PaginationOptions,
};

export type SetConceptKnownPayload = {
  concepts: Array<SetConceptKnownPayloadConceptsField>,
};

export type SetConceptKnownPayloadConceptsField = {
  conceptId: Scalars['String'],
  level?: Maybe<Scalars['Float']>,
};

export type SetResourcesConsumedPayload = {
  resources: Array<SetResourcesConsumedPayloadResourcesField>,
};

export type SetResourcesConsumedPayloadResourcesField = {
  resourceId: Scalars['String'],
  consumed?: Maybe<Scalars['Boolean']>,
  opened?: Maybe<Scalars['Boolean']>,
};

export type UpdateArticlePayload = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type UpdateConceptPayload = {
  key?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateDomainPayload = {
  name?: Maybe<Scalars['String']>,
  key?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateResourcePayload = {
  name?: Maybe<Scalars['String']>,
  type?: Maybe<ResourceType>,
  mediaType?: Maybe<ResourceMediaType>,
  url?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  durationMn?: Maybe<Scalars['Int']>,
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
