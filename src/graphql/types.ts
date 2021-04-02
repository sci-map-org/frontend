export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date scalar serialized as ISO UTC string, parsed from JS Date time (ms since Unix epoch, from Date.now() or new Date().getTime() */
  Date: string;
};

export type Query = {
  __typename?: 'Query';
  getHomePageData: GetHomePageDataResults;
  globalSearch: GlobalSearchResults;
  searchTopics: SearchTopicsResult;
  searchSubTopics: SearchTopicsResult;
  checkTopicKeyAvailability: CheckTopicKeyAvailabilityResult;
  currentUser?: Maybe<CurrentUser>;
  getUser: User;
  getArticleByKey: Article;
  listArticles: ListArticlesResult;
  searchDomains: SearchDomainsResult;
  getDomainByKey: Domain;
  searchLearningMaterialTags: Array<LearningMaterialTagSearchResult>;
  searchResources: SearchResourcesResult;
  getResourceById: Resource;
  analyzeResourceUrl: AnalyzeResourceUrlResult;
  getConcept: Concept;
  getDomainConceptByKey: Concept;
  getLearningPath: LearningPath;
  getLearningPathByKey: LearningPath;
  searchLearningGoals: SearchLearningGoalsResult;
  getLearningGoalByKey: LearningGoal;
  getDomainLearningGoalByKey: DomainAndLearningGoalResult;
};


export type QueryGlobalSearchArgs = {
  query: Scalars['String'];
  options?: Maybe<GlobalSearchOptions>;
};


export type QuerySearchTopicsArgs = {
  options: SearchTopicsOptions;
};


export type QuerySearchSubTopicsArgs = {
  domainId: Scalars['String'];
  options: SearchTopicsOptions;
};


export type QueryCheckTopicKeyAvailabilityArgs = {
  key: Scalars['String'];
  topicType: TopicType;
  domainKey?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  key: Scalars['String'];
};


export type QueryGetArticleByKeyArgs = {
  key: Scalars['String'];
};


export type QueryListArticlesArgs = {
  options: ListArticlesOptions;
};


export type QuerySearchDomainsArgs = {
  options: SearchDomainsOptions;
};


export type QueryGetDomainByKeyArgs = {
  key: Scalars['String'];
};


export type QuerySearchLearningMaterialTagsArgs = {
  options: SearchLearningMaterialTagsOptions;
};


export type QuerySearchResourcesArgs = {
  query: Scalars['String'];
  options: SearchResourcesOptions;
};


export type QueryGetResourceByIdArgs = {
  id: Scalars['String'];
};


export type QueryAnalyzeResourceUrlArgs = {
  url: Scalars['String'];
};


export type QueryGetConceptArgs = {
  _id: Scalars['String'];
};


export type QueryGetDomainConceptByKeyArgs = {
  domainKey: Scalars['String'];
  conceptKey: Scalars['String'];
};


export type QueryGetLearningPathArgs = {
  _id: Scalars['String'];
};


export type QueryGetLearningPathByKeyArgs = {
  key: Scalars['String'];
};


export type QuerySearchLearningGoalsArgs = {
  options: SearchLearningGoalsOptions;
};


export type QueryGetLearningGoalByKeyArgs = {
  key: Scalars['String'];
};


export type QueryGetDomainLearningGoalByKeyArgs = {
  domainKey: Scalars['String'];
  learningGoalKey: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  loginGoogle: LoginResponse;
  register: CurrentUser;
  registerGoogle: CurrentUser;
  verifyEmailAddress: VerifyEmailResponse;
  adminUpdateUser: User;
  createArticle: Article;
  updateArticle: Article;
  deleteArticle: DeleteArticleResponse;
  createDomain: Domain;
  updateDomain: Domain;
  deleteDomain: DeleteDomainResponse;
  addTagsToLearningMaterial: LearningMaterial;
  removeTagsFromLearningMaterial: LearningMaterial;
  attachLearningMaterialToDomain: LearningMaterial;
  detachLearningMaterialFromDomain: LearningMaterial;
  attachLearningMaterialCoversConcepts: LearningMaterial;
  detachLearningMaterialCoversConcepts: LearningMaterial;
  rateLearningMaterial: LearningMaterial;
  addLearningMaterialPrerequisite: LearningMaterial;
  removeLearningMaterialPrerequisite: LearningMaterial;
  addLearningMaterialOutcome: LearningMaterial;
  removeLearningMaterialOutcome: LearningMaterial;
  createResource: Resource;
  updateResource: Resource;
  deleteResource: DeleteResourceResponse;
  setResourcesConsumed: Array<Resource>;
  voteResource: Resource;
  addSubResource: SubResourceCreatedResult;
  createSubResourceSeries: SubResourceSeriesCreatedResult;
  addSubResourceToSeries: SubResourceSeriesCreatedResult;
  addConceptToDomain: Concept;
  updateConcept: Concept;
  deleteConcept: DeleteConceptResult;
  setConceptsKnown: Array<Concept>;
  setConceptsUnknown: Array<Concept>;
  createLearningPath: LearningPath;
  updateLearningPath: LearningPath;
  deleteLearningPath: DeleteLearningPathResult;
  addComplementaryResourceToLearningPath: ComplementaryResourceUpdatedResult;
  removeComplementaryResourceFromLearningPath: ComplementaryResourceUpdatedResult;
  startLearningPath: LearningPathStartedResult;
  completeLearningPath: LearningPathCompletedResult;
  createLearningGoal: LearningGoal;
  attachLearningGoalToDomain: DomainAndLearningGoalResult;
  detachLearningGoalFromDomain: DomainAndLearningGoalResult;
  updateLearningGoal: LearningGoal;
  deleteLearningGoal: DeleteLearningGoalMutationResult;
  attachLearningGoalRequiresSubGoal: AttachLearningGoalRequiresSubGoalResult;
  detachLearningGoalRequiresSubGoal: DetachLearningGoalRequiresSubGoalResult;
  attachLearningGoalDependency: UpdateLearningGoalDependenciesResult;
  detachLearningGoalDependency: UpdateLearningGoalDependenciesResult;
  startLearningGoal: LearningGoalStartedResult;
  publishLearningGoal: LearningGoalPublishedResult;
  indexLearningGoal: LearningGoalIndexedResult;
  rateLearningGoal: LearningGoal;
  updateConceptBelongsToDomain: ConceptBelongsToDomain;
  addConceptBelongsToConcept: UpdateConceptBelongsToConceptResult;
  removeConceptBelongsToConcept: UpdateConceptBelongsToConceptResult;
  addDomainBelongsToDomain: UpdateDomainBelongsToDomainResults;
  removeDomainBelongsToDomain: UpdateDomainBelongsToDomainResults;
  addConceptReferencesConcept: UpdateConceptReferencesConceptResult;
  removeConceptReferencesConcept: UpdateConceptReferencesConceptResult;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  discourseSSO?: Maybe<DiscourseSso>;
};


export type MutationLoginGoogleArgs = {
  idToken: Scalars['String'];
  discourseSSO?: Maybe<DiscourseSso>;
};


export type MutationRegisterArgs = {
  payload: RegisterPayload;
};


export type MutationRegisterGoogleArgs = {
  payload: RegisterGooglePayload;
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['String'];
  payload: AdminUpdateUserPayload;
};


export type MutationCreateArticleArgs = {
  payload: CreateArticlePayload;
};


export type MutationUpdateArticleArgs = {
  id: Scalars['String'];
  payload: UpdateArticlePayload;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationCreateDomainArgs = {
  payload: CreateDomainPayload;
};


export type MutationUpdateDomainArgs = {
  id: Scalars['String'];
  payload: UpdateDomainPayload;
};


export type MutationDeleteDomainArgs = {
  id: Scalars['String'];
};


export type MutationAddTagsToLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationRemoveTagsFromLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationAttachLearningMaterialToDomainArgs = {
  domainId: Scalars['String'];
  learningMaterialId: Scalars['String'];
};


export type MutationDetachLearningMaterialFromDomainArgs = {
  domainId: Scalars['String'];
  learningMaterialId: Scalars['String'];
};


export type MutationAttachLearningMaterialCoversConceptsArgs = {
  learningMaterialId: Scalars['String'];
  conceptIds: Array<Scalars['String']>;
};


export type MutationDetachLearningMaterialCoversConceptsArgs = {
  learningMaterialId: Scalars['String'];
  conceptIds: Array<Scalars['String']>;
};


export type MutationRateLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationAddLearningMaterialPrerequisiteArgs = {
  learningMaterialId: Scalars['String'];
  prerequisiteLearningGoalId: Scalars['String'];
};


export type MutationRemoveLearningMaterialPrerequisiteArgs = {
  learningMaterialId: Scalars['String'];
  prerequisiteLearningGoalId: Scalars['String'];
};


export type MutationAddLearningMaterialOutcomeArgs = {
  learningMaterialId: Scalars['String'];
  outcomeLearningGoalId: Scalars['String'];
};


export type MutationRemoveLearningMaterialOutcomeArgs = {
  learningMaterialId: Scalars['String'];
  outcomeLearningGoalId: Scalars['String'];
};


export type MutationCreateResourceArgs = {
  payload: CreateResourcePayload;
};


export type MutationUpdateResourceArgs = {
  _id: Scalars['String'];
  payload: UpdateResourcePayload;
};


export type MutationDeleteResourceArgs = {
  _id: Scalars['String'];
};


export type MutationSetResourcesConsumedArgs = {
  payload: SetResourcesConsumedPayload;
};


export type MutationVoteResourceArgs = {
  resourceId: Scalars['String'];
  value: ResourceVoteValue;
};


export type MutationAddSubResourceArgs = {
  parentResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationCreateSubResourceSeriesArgs = {
  parentResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationAddSubResourceToSeriesArgs = {
  parentResourceId: Scalars['String'];
  previousResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationAddConceptToDomainArgs = {
  domainId: Scalars['String'];
  payload: AddConceptToDomainPayload;
};


export type MutationUpdateConceptArgs = {
  _id: Scalars['String'];
  payload: UpdateConceptPayload;
};


export type MutationDeleteConceptArgs = {
  _id: Scalars['String'];
};


export type MutationSetConceptsKnownArgs = {
  payload: SetConceptKnownPayload;
};


export type MutationSetConceptsUnknownArgs = {
  conceptIds: Array<Scalars['String']>;
};


export type MutationCreateLearningPathArgs = {
  payload: CreateLearningPathPayload;
};


export type MutationUpdateLearningPathArgs = {
  _id: Scalars['String'];
  payload: UpdateLearningPathPayload;
};


export type MutationDeleteLearningPathArgs = {
  _id: Scalars['String'];
};


export type MutationAddComplementaryResourceToLearningPathArgs = {
  learningPathId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type MutationRemoveComplementaryResourceFromLearningPathArgs = {
  learningPathId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type MutationStartLearningPathArgs = {
  learningPathId: Scalars['String'];
};


export type MutationCompleteLearningPathArgs = {
  learningPathId: Scalars['String'];
  completed: Scalars['Boolean'];
};


export type MutationCreateLearningGoalArgs = {
  payload: CreateLearningGoalPayload;
  options?: Maybe<CreateLearningGoalOptions>;
};


export type MutationAttachLearningGoalToDomainArgs = {
  learningGoalId: Scalars['String'];
  domainId: Scalars['String'];
  payload: AttachLearningGoalToDomainPayload;
};


export type MutationDetachLearningGoalFromDomainArgs = {
  learningGoalId: Scalars['String'];
  domainId: Scalars['String'];
};


export type MutationUpdateLearningGoalArgs = {
  _id: Scalars['String'];
  payload: UpdateLearningGoalPayload;
};


export type MutationDeleteLearningGoalArgs = {
  _id: Scalars['String'];
};


export type MutationAttachLearningGoalRequiresSubGoalArgs = {
  learningGoalId: Scalars['String'];
  subGoalId: Scalars['String'];
  payload: AttachLearningGoalRequiresSubGoalPayload;
};


export type MutationDetachLearningGoalRequiresSubGoalArgs = {
  learningGoalId: Scalars['String'];
  subGoalId: Scalars['String'];
};


export type MutationAttachLearningGoalDependencyArgs = {
  parentLearningGoalId: Scalars['String'];
  learningGoalId: Scalars['String'];
  learningGoalDependencyId: Scalars['String'];
};


export type MutationDetachLearningGoalDependencyArgs = {
  parentLearningGoalId: Scalars['String'];
  learningGoalId: Scalars['String'];
  learningGoalDependencyId: Scalars['String'];
};


export type MutationStartLearningGoalArgs = {
  learningGoalId: Scalars['String'];
};


export type MutationPublishLearningGoalArgs = {
  learningGoalId: Scalars['String'];
};


export type MutationIndexLearningGoalArgs = {
  learningGoalId: Scalars['String'];
};


export type MutationRateLearningGoalArgs = {
  learningGoalId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationUpdateConceptBelongsToDomainArgs = {
  conceptId: Scalars['String'];
  domainId: Scalars['String'];
  payload: UpdateConceptBelongsToDomainPayload;
};


export type MutationAddConceptBelongsToConceptArgs = {
  parentConceptId: Scalars['String'];
  subConceptId: Scalars['String'];
};


export type MutationRemoveConceptBelongsToConceptArgs = {
  parentConceptId: Scalars['String'];
  subConceptId: Scalars['String'];
};


export type MutationAddDomainBelongsToDomainArgs = {
  parentDomainId: Scalars['String'];
  subDomainId: Scalars['String'];
};


export type MutationRemoveDomainBelongsToDomainArgs = {
  parentDomainId: Scalars['String'];
  subDomainId: Scalars['String'];
};


export type MutationAddConceptReferencesConceptArgs = {
  conceptId: Scalars['String'];
  referencedConceptId: Scalars['String'];
};


export type MutationRemoveConceptReferencesConceptArgs = {
  conceptId: Scalars['String'];
  referencedConceptId: Scalars['String'];
};


export type GetHomePageDataResults = {
  __typename?: 'GetHomePageDataResults';
  currentUser?: Maybe<CurrentUser>;
  recommendedLearningGoals: Array<LearningGoal>;
  recommendedLearningPaths: Array<LearningPath>;
};

export type GlobalSearchResults = {
  __typename?: 'GlobalSearchResults';
  results: Array<SearchResult>;
};

export type GlobalSearchOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type SearchTopicsResult = {
  __typename?: 'SearchTopicsResult';
  items: Array<Topic>;
};

export type SearchTopicsOptions = {
  query: Scalars['String'];
  pagination: PaginationOptions;
  filter?: Maybe<SearchTopicsFilterOptions>;
};

export type CheckTopicKeyAvailabilityResult = {
  __typename?: 'CheckTopicKeyAvailabilityResult';
  available: Scalars['Boolean'];
  existingTopic?: Maybe<Topic>;
};

export enum TopicType {
  Domain = 'Domain',
  Concept = 'Concept',
  LearningGoal = 'LearningGoal'
}

export type CurrentUser = {
  __typename?: 'CurrentUser';
  _id: Scalars['String'];
  email: Scalars['String'];
  displayName: Scalars['String'];
  key: Scalars['String'];
  role: UserRole;
  articles?: Maybe<ListArticlesResult>;
  createdLearningPaths?: Maybe<Array<LearningPath>>;
  startedLearningPaths?: Maybe<Array<LearningPathStartedItem>>;
  createdLearningGoals?: Maybe<Array<LearningGoalCreatedItem>>;
  startedLearningGoals?: Maybe<Array<LearningGoalStartedItem>>;
  consumedResources?: Maybe<UserConsumedResourcesResult>;
};


export type CurrentUserArticlesArgs = {
  options: ListArticlesOptions;
};


export type CurrentUserCreatedLearningPathsArgs = {
  options: UserLearningPathsOptions;
};


export type CurrentUserStartedLearningPathsArgs = {
  options: UserLearningPathsOptions;
};


export type CurrentUserCreatedLearningGoalsArgs = {
  options: UserLearningGoalsOptions;
};


export type CurrentUserStartedLearningGoalsArgs = {
  options: UserLearningGoalsOptions;
};


export type CurrentUserConsumedResourcesArgs = {
  options: UserConsumedResourcesOptions;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  displayName: Scalars['String'];
  role: UserRole;
  key: Scalars['String'];
  articles?: Maybe<ListArticlesResult>;
};


export type UserArticlesArgs = {
  options: ListArticlesOptions;
};

export type Article = {
  __typename?: 'Article';
  _id: Scalars['String'];
  key: Scalars['String'];
  contentType: ArticleContentType;
  title: Scalars['String'];
  content: Scalars['String'];
  author?: Maybe<User>;
};

export type ListArticlesResult = {
  __typename?: 'ListArticlesResult';
  items: Array<Article>;
};

export type ListArticlesOptions = {
  filter?: Maybe<ListArticlesFilter>;
  pagination?: Maybe<PaginationOptions>;
};

export type SearchDomainsResult = {
  __typename?: 'SearchDomainsResult';
  items: Array<Domain>;
};

export type SearchDomainsOptions = {
  query?: Maybe<Scalars['String']>;
  pagination: PaginationOptions;
};

export type Domain = Topic & {
  __typename?: 'Domain';
  _id: Scalars['String'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  topicType: TopicType;
  size?: Maybe<Scalars['Float']>;
  concepts?: Maybe<DomainConceptsResults>;
  conceptTotalCount?: Maybe<Scalars['Int']>;
  resources?: Maybe<DomainResourcesResults>;
  learningPaths?: Maybe<DomainLearningPathsResults>;
  learningMaterials?: Maybe<DomainLearningMaterialsResults>;
  learningMaterialsTotalCount?: Maybe<Scalars['Int']>;
  subDomains?: Maybe<Array<DomainBelongsToDomainItem>>;
  parentDomains?: Maybe<Array<DomainBelongsToDomainItem>>;
  learningGoals?: Maybe<Array<LearningGoalBelongsToDomain>>;
  subTopics?: Maybe<Array<TopicBelongsToDomain>>;
};


export type DomainConceptsArgs = {
  options: DomainConceptsOptions;
};


export type DomainResourcesArgs = {
  options: DomainResourcesOptions;
};


export type DomainLearningPathsArgs = {
  options: DomainLearningPathsOptions;
};


export type DomainLearningMaterialsArgs = {
  options: DomainLearningMaterialsOptions;
};

export type LearningMaterialTagSearchResult = {
  __typename?: 'LearningMaterialTagSearchResult';
  name: Scalars['String'];
  usageCount?: Maybe<Scalars['Int']>;
};

export type SearchLearningMaterialTagsOptions = {
  query: Scalars['String'];
  pagination: PaginationOptions;
};

export type SearchResourcesResult = {
  __typename?: 'SearchResourcesResult';
  items: Array<Resource>;
};

export type SearchResourcesOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type Resource = LearningMaterial & {
  __typename?: 'Resource';
  _id: Scalars['String'];
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  tags?: Maybe<Array<LearningMaterialTag>>;
  url: Scalars['String'];
  upvotes?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  consumed?: Maybe<ConsumedResource>;
  creator?: Maybe<User>;
  coveredConcepts?: Maybe<LearningMaterialCoveredConceptsResults>;
  coveredConceptsByDomain?: Maybe<Array<LearningMaterialCoveredConceptsByDomainItem>>;
  domains?: Maybe<Array<Domain>>;
  subResources?: Maybe<Array<Resource>>;
  parentResources?: Maybe<Array<Resource>>;
  subResourceSeries?: Maybe<Array<Resource>>;
  seriesParentResource?: Maybe<Resource>;
  nextResource?: Maybe<Resource>;
  previousResource?: Maybe<Resource>;
  prerequisites?: Maybe<Array<LearningMaterialPrerequisiteItem>>;
  outcomes?: Maybe<Array<LearningMaterialOutcomeItem>>;
};


export type ResourceCoveredConceptsArgs = {
  options: LearningMaterialCoveredConceptsOptions;
};

export type AnalyzeResourceUrlResult = {
  __typename?: 'AnalyzeResourceUrlResult';
  resourceData?: Maybe<ResourceData>;
};

export type Concept = Topic & {
  __typename?: 'Concept';
  _id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  topicType: TopicType;
  domain?: Maybe<Domain>;
  size?: Maybe<Scalars['Float']>;
  coveredByResources?: Maybe<ConceptCoveredByResourcesResults>;
  known?: Maybe<KnownConcept>;
  referencingConcepts?: Maybe<Array<ConceptReferencesConceptItem>>;
  referencedByConcepts?: Maybe<Array<ConceptReferencesConceptItem>>;
  subConcepts?: Maybe<Array<ConceptBelongsToConceptItem>>;
  parentConcepts?: Maybe<Array<ConceptBelongsToConceptItem>>;
};


export type ConceptCoveredByResourcesArgs = {
  options: ConceptCoveredByResourcesOptions;
};

export type LearningPath = LearningMaterial & {
  __typename?: 'LearningPath';
  _id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  resourceItems?: Maybe<Array<LearningPathResourceItem>>;
  complementaryResources?: Maybe<Array<Resource>>;
  tags?: Maybe<Array<LearningMaterialTag>>;
  rating?: Maybe<Scalars['Float']>;
  coveredConcepts?: Maybe<LearningMaterialCoveredConceptsResults>;
  coveredConceptsByDomain?: Maybe<Array<LearningMaterialCoveredConceptsByDomainItem>>;
  domains?: Maybe<Array<Domain>>;
  started?: Maybe<LearningPathStarted>;
  createdBy?: Maybe<User>;
  startedBy?: Maybe<LearningPathStartedByResults>;
  prerequisites?: Maybe<Array<LearningMaterialPrerequisiteItem>>;
  outcomes?: Maybe<Array<LearningMaterialOutcomeItem>>;
};


export type LearningPathCoveredConceptsArgs = {
  options: LearningMaterialCoveredConceptsOptions;
};


export type LearningPathStartedByArgs = {
  options: LearningPathStartedByOptions;
};

export type SearchLearningGoalsResult = {
  __typename?: 'SearchLearningGoalsResult';
  items: Array<LearningGoal>;
};

export type SearchLearningGoalsOptions = {
  query?: Maybe<Scalars['String']>;
  pagination: PaginationOptions;
};

export type LearningGoal = Topic & {
  __typename?: 'LearningGoal';
  _id: Scalars['String'];
  key: Scalars['String'];
  type: LearningGoalType;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  topicType: TopicType;
  publishedAt?: Maybe<Scalars['Date']>;
  hidden: Scalars['Boolean'];
  rating?: Maybe<Scalars['Float']>;
  progress?: Maybe<LearningGoalProgress>;
  createdBy?: Maybe<User>;
  domain?: Maybe<LearningGoalBelongsToDomain>;
  size?: Maybe<Scalars['Float']>;
  requiredInGoals?: Maybe<Array<RequiredInGoalItem>>;
  requiredSubGoals?: Maybe<Array<SubGoalItem>>;
  dependsOnLearningGoals?: Maybe<Array<DependsOnGoalItem>>;
  dependantLearningGoals?: Maybe<Array<DependsOnGoalItem>>;
  started?: Maybe<LearningGoalStarted>;
  startedBy?: Maybe<LearningGoalStartedByResults>;
  relevantLearningMaterials?: Maybe<LearningGoalRelevantLearningMaterialsResults>;
};


export type LearningGoalDependsOnLearningGoalsArgs = {
  parentLearningGoalIdIn?: Maybe<Array<Scalars['String']>>;
};


export type LearningGoalDependantLearningGoalsArgs = {
  parentLearningGoalIdIn?: Maybe<Array<Scalars['String']>>;
};


export type LearningGoalStartedByArgs = {
  options: LearningGoalStartedByOptions;
};


export type LearningGoalRelevantLearningMaterialsArgs = {
  options: LearningGoalRelevantLearningMaterialsOptions;
};

export type DomainAndLearningGoalResult = {
  __typename?: 'DomainAndLearningGoalResult';
  domain: Domain;
  learningGoal: LearningGoal;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  currentUser: CurrentUser;
  jwt: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
};

export type DiscourseSso = {
  sig: Scalars['String'];
  sso: Scalars['String'];
};

export type RegisterPayload = {
  key: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterGooglePayload = {
  key: Scalars['String'];
  displayName: Scalars['String'];
  idToken: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  email: Scalars['String'];
};

export type AdminUpdateUserPayload = {
  displayName?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  active?: Maybe<Scalars['Boolean']>;
};

export type CreateArticlePayload = {
  contentType: ArticleContentType;
  title: Scalars['String'];
  content: Scalars['String'];
};

export type UpdateArticlePayload = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type CreateDomainPayload = {
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateDomainPayload = {
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteDomainResponse = {
  __typename?: 'DeleteDomainResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type LearningMaterial = {
  _id: Scalars['String'];
  tags?: Maybe<Array<LearningMaterialTag>>;
  rating?: Maybe<Scalars['Float']>;
  coveredConcepts?: Maybe<LearningMaterialCoveredConceptsResults>;
  coveredConceptsByDomain?: Maybe<Array<LearningMaterialCoveredConceptsByDomainItem>>;
  domains?: Maybe<Array<Domain>>;
  prerequisites?: Maybe<Array<LearningMaterialPrerequisiteItem>>;
  outcomes?: Maybe<Array<LearningMaterialOutcomeItem>>;
};


export type LearningMaterialCoveredConceptsArgs = {
  options: LearningMaterialCoveredConceptsOptions;
};

export type CreateResourcePayload = {
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  domainsAndCoveredConcepts?: Maybe<Array<DomainAndCoveredConcepts>>;
  prerequisitesLearningGoalsIds?: Maybe<Array<Scalars['String']>>;
  outcomesLearningGoalsIds?: Maybe<Array<Scalars['String']>>;
  subResourceSeries?: Maybe<Array<CreateSubResourcePayload>>;
};

export type UpdateResourcePayload = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ResourceType>;
  mediaType?: Maybe<ResourceMediaType>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
};

export type DeleteResourceResponse = {
  __typename?: 'DeleteResourceResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SetResourcesConsumedPayload = {
  resources: Array<SetResourcesConsumedPayloadResourcesField>;
};

export enum ResourceVoteValue {
  Up = 'up',
  Down = 'down'
}

export type SubResourceCreatedResult = {
  __typename?: 'SubResourceCreatedResult';
  parentResource: Resource;
  subResource: Resource;
};

export type SubResourceSeriesCreatedResult = {
  __typename?: 'SubResourceSeriesCreatedResult';
  seriesParentResource: Resource;
  subResource: Resource;
};

export type AddConceptToDomainPayload = {
  key?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Float']>;
};

export type UpdateConceptPayload = {
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteConceptResult = {
  __typename?: 'DeleteConceptResult';
  success: Scalars['Boolean'];
  _id: Scalars['String'];
  domain?: Maybe<Domain>;
};

export type SetConceptKnownPayload = {
  concepts: Array<SetConceptKnownPayloadConceptsField>;
};

export type CreateLearningPathPayload = {
  name: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  resourceItems: Array<CreateLearningPathResourceItem>;
};

export type UpdateLearningPathPayload = {
  name?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  resourceItems?: Maybe<Array<CreateLearningPathResourceItem>>;
};

export type DeleteLearningPathResult = {
  __typename?: 'DeleteLearningPathResult';
  success: Scalars['Boolean'];
  _id: Scalars['String'];
};

export type ComplementaryResourceUpdatedResult = {
  __typename?: 'ComplementaryResourceUpdatedResult';
  resource: Resource;
  learningPath: LearningPath;
};

export type LearningPathStartedResult = {
  __typename?: 'LearningPathStartedResult';
  user: CurrentUser;
  learningPath: LearningPath;
};

export type LearningPathCompletedResult = {
  __typename?: 'LearningPathCompletedResult';
  user: CurrentUser;
  learningPath: LearningPath;
};

export type CreateLearningGoalPayload = {
  name: Scalars['String'];
  type: LearningGoalType;
  key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateLearningGoalOptions = {
  public?: Maybe<Scalars['Boolean']>;
  domainId?: Maybe<Scalars['String']>;
};

export type AttachLearningGoalToDomainPayload = {
  index?: Maybe<Scalars['Float']>;
};

export type UpdateLearningGoalPayload = {
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  type?: Maybe<LearningGoalType>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteLearningGoalMutationResult = {
  __typename?: 'DeleteLearningGoalMutationResult';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AttachLearningGoalRequiresSubGoalResult = {
  __typename?: 'AttachLearningGoalRequiresSubGoalResult';
  learningGoal: LearningGoal;
  subGoal: SubGoal;
};

export type AttachLearningGoalRequiresSubGoalPayload = {
  strength?: Maybe<Scalars['Float']>;
};

export type DetachLearningGoalRequiresSubGoalResult = {
  __typename?: 'DetachLearningGoalRequiresSubGoalResult';
  learningGoal: LearningGoal;
  subGoal: SubGoal;
};

export type UpdateLearningGoalDependenciesResult = {
  __typename?: 'UpdateLearningGoalDependenciesResult';
  parentLearningGoal: LearningGoal;
  learningGoal: LearningGoal;
  learningGoalDependency: LearningGoal;
};

export type LearningGoalStartedResult = {
  __typename?: 'LearningGoalStartedResult';
  currentUser: CurrentUser;
  learningGoal: LearningGoal;
};

export type LearningGoalPublishedResult = {
  __typename?: 'LearningGoalPublishedResult';
  learningGoal: LearningGoal;
};

export type LearningGoalIndexedResult = {
  __typename?: 'LearningGoalIndexedResult';
  learningGoal: LearningGoal;
};

export type ConceptBelongsToDomain = {
  __typename?: 'ConceptBelongsToDomain';
  index: Scalars['Float'];
};

export type UpdateConceptBelongsToDomainPayload = {
  index?: Maybe<Scalars['Float']>;
};

export type UpdateConceptBelongsToConceptResult = {
  __typename?: 'UpdateConceptBelongsToConceptResult';
  parentConcept: Concept;
  subConcept: Concept;
};

export type UpdateDomainBelongsToDomainResults = {
  __typename?: 'UpdateDomainBelongsToDomainResults';
  parentDomain: Domain;
  subDomain: Domain;
};

export type UpdateConceptReferencesConceptResult = {
  __typename?: 'UpdateConceptReferencesConceptResult';
  concept: Concept;
  referencedConcept: Concept;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  entity: SearchResultEntity;
  score: Scalars['Float'];
};

export type PaginationOptions = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Topic = {
  _id: Scalars['String'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  topicType: TopicType;
  size?: Maybe<Scalars['Float']>;
};

export type SearchTopicsFilterOptions = {
  topicTypeIn?: Maybe<Array<TopicType>>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Contributor = 'CONTRIBUTOR',
  User = 'USER'
}

export type UserLearningPathsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningPathStartedItem = {
  __typename?: 'LearningPathStartedItem';
  learningPath: LearningPath;
  startedAt: Scalars['Date'];
  completedAt?: Maybe<Scalars['Date']>;
};

export type LearningGoalCreatedItem = {
  __typename?: 'LearningGoalCreatedItem';
  learningGoal: LearningGoal;
  createdAt: Scalars['Date'];
};

export type UserLearningGoalsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningGoalStartedItem = {
  __typename?: 'LearningGoalStartedItem';
  learningGoal: LearningGoal;
  startedAt: Scalars['Date'];
};

export type UserConsumedResourcesResult = {
  __typename?: 'UserConsumedResourcesResult';
  items: Array<UserConsumedResourceItem>;
  count: Scalars['Int'];
};

export type UserConsumedResourcesOptions = {
  filter?: Maybe<UserConsumedResourcesFilter>;
  sorting: UserConsumedResourcesSortingType;
  pagination?: Maybe<PaginationOptions>;
};

export enum ArticleContentType {
  Markdown = 'markdown'
}

export type ListArticlesFilter = {
  contentType?: Maybe<ArticleContentType>;
};

export type DomainConceptsResults = {
  __typename?: 'DomainConceptsResults';
  items: Array<DomainConceptsItem>;
};

export type DomainConceptsOptions = {
  pagination?: Maybe<PaginationOptions>;
  sorting?: Maybe<DomainConceptSortingOptions>;
};

export type DomainResourcesResults = {
  __typename?: 'DomainResourcesResults';
  items: Array<Resource>;
};

export type DomainResourcesOptions = {
  sortingType: DomainResourcesSortingType;
  query?: Maybe<Scalars['String']>;
  filter: DomainResourcesFilterOptions;
};

export type DomainLearningPathsResults = {
  __typename?: 'DomainLearningPathsResults';
  items: Array<LearningPath>;
};

export type DomainLearningPathsOptions = {
  pagination?: Maybe<PaginationOptions>;
  sorting: DomainLearningPathsSortingOptions;
};

export type DomainLearningMaterialsResults = {
  __typename?: 'DomainLearningMaterialsResults';
  items: Array<LearningMaterial>;
};

export type DomainLearningMaterialsOptions = {
  sortingType: DomainLearningMaterialsSortingType;
  query?: Maybe<Scalars['String']>;
  filter: DomainLearningMaterialsFilterOptions;
};

export type DomainBelongsToDomainItem = {
  __typename?: 'DomainBelongsToDomainItem';
  domain: Domain;
  relationship: DomainBelongsToDomain;
};

export type LearningGoalBelongsToDomain = {
  __typename?: 'LearningGoalBelongsToDomain';
  index: Scalars['Float'];
  domain: Domain;
  learningGoal: LearningGoal;
};

export type TopicBelongsToDomain = {
  __typename?: 'TopicBelongsToDomain';
  index: Scalars['Float'];
  topic: Topic;
  domain: Domain;
};

export enum ResourceType {
  Article = 'article',
  ArticleSeries = 'article_series',
  Course = 'course',
  Podcast = 'podcast',
  PodcastEpisode = 'podcast_episode',
  YoutubeVideo = 'youtube_video',
  YoutubePlaylist = 'youtube_playlist',
  OnlineBook = 'online_book',
  Book = 'book',
  ResearchPaper = 'research_paper',
  Talk = 'talk',
  Documentary = 'documentary',
  Website = 'website',
  VideoGame = 'video_game',
  Infographic = 'infographic',
  Tweet = 'tweet',
  Exercise = 'exercise',
  Quizz = 'quizz',
  Project = 'project',
  Other = 'other'
}

export enum ResourceMediaType {
  Video = 'video',
  Text = 'text',
  Audio = 'audio',
  Image = 'image',
  InteractiveContent = 'interactive_content'
}

export type LearningMaterialTag = {
  __typename?: 'LearningMaterialTag';
  name: Scalars['String'];
};

export type ConsumedResource = {
  __typename?: 'ConsumedResource';
  openedAt?: Maybe<Scalars['Date']>;
  lastOpenedAt?: Maybe<Scalars['Date']>;
  consumedAt?: Maybe<Scalars['Date']>;
};

export type LearningMaterialCoveredConceptsResults = {
  __typename?: 'LearningMaterialCoveredConceptsResults';
  items: Array<Concept>;
};

export type LearningMaterialCoveredConceptsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningMaterialCoveredConceptsByDomainItem = {
  __typename?: 'LearningMaterialCoveredConceptsByDomainItem';
  domain: Domain;
  coveredConcepts: Array<Concept>;
};

export type LearningMaterialPrerequisiteItem = {
  __typename?: 'LearningMaterialPrerequisiteItem';
  learningGoal: LearningGoal;
  strength: Scalars['Float'];
  createdBy: Scalars['String'];
  createdAt: Scalars['Date'];
};

export type LearningMaterialOutcomeItem = {
  __typename?: 'LearningMaterialOutcomeItem';
  learningGoal: LearningGoal;
  strength: Scalars['Float'];
  createdBy: Scalars['String'];
  createdAt: Scalars['Date'];
};

export type ResourceData = {
  __typename?: 'ResourceData';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ResourceType>;
  mediaType?: Maybe<ResourceMediaType>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  subResourceSeries?: Maybe<Array<SubResourceExtractedData>>;
};

export type ConceptCoveredByResourcesResults = {
  __typename?: 'ConceptCoveredByResourcesResults';
  items: Array<Resource>;
};

export type ConceptCoveredByResourcesOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type KnownConcept = {
  __typename?: 'KnownConcept';
  level: Scalars['Float'];
};

export type ConceptReferencesConceptItem = {
  __typename?: 'ConceptReferencesConceptItem';
  concept: Concept;
  relationship: ConceptReferencesConcept;
};

export type ConceptBelongsToConceptItem = {
  __typename?: 'ConceptBelongsToConceptItem';
  concept: Concept;
  relationship: ConceptBelongsToConcept;
};

export type LearningPathResourceItem = {
  __typename?: 'LearningPathResourceItem';
  resource: Resource;
  learningPathId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type LearningPathStarted = {
  __typename?: 'LearningPathStarted';
  startedAt: Scalars['Date'];
  completedAt?: Maybe<Scalars['Date']>;
};

export type LearningPathStartedByResults = {
  __typename?: 'LearningPathStartedByResults';
  items: Array<LearningPathStartedByItem>;
  count: Scalars['Int'];
};

export type LearningPathStartedByOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export enum LearningGoalType {
  Roadmap = 'Roadmap',
  SubGoal = 'SubGoal'
}

export type LearningGoalProgress = {
  __typename?: 'LearningGoalProgress';
  level: Scalars['Float'];
};

export type RequiredInGoalItem = {
  __typename?: 'RequiredInGoalItem';
  goal: LearningGoal;
  strength: Scalars['Float'];
};

export type SubGoalItem = {
  __typename?: 'SubGoalItem';
  subGoal: SubGoal;
  strength: Scalars['Float'];
};

export type DependsOnGoalItem = {
  __typename?: 'DependsOnGoalItem';
  learningGoal: LearningGoal;
  parentLearningGoalId: Scalars['String'];
};

export type LearningGoalStarted = {
  __typename?: 'LearningGoalStarted';
  startedAt: Scalars['Date'];
};

export type LearningGoalStartedByResults = {
  __typename?: 'LearningGoalStartedByResults';
  items: Array<LearningGoalStartedByItem>;
  count: Scalars['Int'];
};

export type LearningGoalStartedByOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningGoalRelevantLearningMaterialsResults = {
  __typename?: 'LearningGoalRelevantLearningMaterialsResults';
  items: Array<LearningGoalRelevantLearningMaterialsItem>;
  count: Scalars['Int'];
};

export type LearningGoalRelevantLearningMaterialsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type DomainAndCoveredConcepts = {
  domainId: Scalars['String'];
  conceptsIds: Array<Scalars['String']>;
};

export type CreateSubResourcePayload = {
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  domainsAndCoveredConcepts?: Maybe<Array<DomainAndCoveredConcepts>>;
  prerequisitesLearningGoalsIds?: Maybe<Array<Scalars['String']>>;
  outcomesLearningGoalsIds?: Maybe<Array<Scalars['String']>>;
};

export type SetResourcesConsumedPayloadResourcesField = {
  resourceId: Scalars['String'];
  consumed?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['Boolean']>;
};

export type SetConceptKnownPayloadConceptsField = {
  conceptId: Scalars['String'];
  level?: Maybe<Scalars['Float']>;
};

export type CreateLearningPathResourceItem = {
  resourceId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type SubGoal = LearningGoal | Concept;

export type SearchResultEntity = Domain | Concept | LearningGoal | Resource | LearningPath;

export type UserConsumedResourceItem = {
  __typename?: 'UserConsumedResourceItem';
  resource: Resource;
  openedAt?: Maybe<Scalars['Date']>;
  lastOpenedAt?: Maybe<Scalars['Date']>;
  consumedAt?: Maybe<Scalars['Date']>;
};

export type UserConsumedResourcesFilter = {
  completed?: Maybe<Scalars['Boolean']>;
};

export enum UserConsumedResourcesSortingType {
  LastOpened = 'lastOpened'
}

export type DomainConceptsItem = {
  __typename?: 'DomainConceptsItem';
  concept: Concept;
  relationship: ConceptBelongsToDomain;
};

export type DomainConceptSortingOptions = {
  entity: DomainConceptSortingEntities;
  field: DomainConceptSortingFields;
  direction: SortingDirection;
};

export enum DomainResourcesSortingType {
  Recommended = 'recommended',
  Newest = 'newest'
}

export type DomainResourcesFilterOptions = {
  resourceTypeIn?: Maybe<Array<ResourceType>>;
  consumedByUser: Scalars['Boolean'];
};

export type DomainLearningPathsSortingOptions = {
  field: DomainLearningPathsSortingFields;
  direction: SortingDirection;
};

export enum DomainLearningMaterialsSortingType {
  Recommended = 'recommended',
  Rating = 'rating',
  Newest = 'newest'
}

export type DomainLearningMaterialsFilterOptions = {
  resourceTypeIn?: Maybe<Array<ResourceType>>;
  completedByUser: Scalars['Boolean'];
  learningMaterialTypeIn?: Maybe<Array<LearningMaterialType>>;
};

export type DomainBelongsToDomain = {
  __typename?: 'DomainBelongsToDomain';
  index: Scalars['Float'];
};

export type SubResourceExtractedData = {
  __typename?: 'SubResourceExtractedData';
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
};

export type ConceptReferencesConcept = {
  __typename?: 'ConceptReferencesConcept';
  strength: Scalars['Float'];
};

export type ConceptBelongsToConcept = {
  __typename?: 'ConceptBelongsToConcept';
  index: Scalars['Float'];
};

export type LearningPathStartedByItem = {
  __typename?: 'LearningPathStartedByItem';
  user: User;
  startedAt: Scalars['Date'];
  completedAt?: Maybe<Scalars['Date']>;
};

export type LearningGoalStartedByItem = {
  __typename?: 'LearningGoalStartedByItem';
  startedAt: Scalars['Date'];
  user: User;
};

export type LearningGoalRelevantLearningMaterialsItem = {
  __typename?: 'LearningGoalRelevantLearningMaterialsItem';
  learningMaterial: LearningMaterial;
  coverage?: Maybe<Scalars['Float']>;
};

export enum DomainConceptSortingEntities {
  Concept = 'concept',
  Relationship = 'relationship'
}

export enum DomainConceptSortingFields {
  Id = '_id',
  Index = 'index'
}

export enum SortingDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum DomainLearningPathsSortingFields {
  CreatedAt = 'createdAt'
}

export enum LearningMaterialType {
  Resource = 'Resource',
  LearningPath = 'LearningPath'
}
