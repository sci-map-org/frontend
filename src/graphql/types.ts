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
  getTopLevelTopics: GetTopLevelTopicsResults;
  globalSearch: GlobalSearchResults;
  getTopicById: Topic;
  getTopicByKey: Topic;
  searchTopics: SearchTopicsResult;
  searchSubTopics: SearchTopicsResult;
  checkTopicKeyAvailability: CheckTopicKeyAvailabilityResult;
  currentUser?: Maybe<CurrentUser>;
  getUser: User;
  getArticleByKey: Article;
  listArticles: ListArticlesResult;
  searchLearningMaterialTags: Array<LearningMaterialTagSearchResult>;
  searchResources: SearchResourcesResult;
  getResourceById: Resource;
  getResourceByKey: Resource;
  analyzeResourceUrl: AnalyzeResourceUrlResult;
  getLearningPathById: LearningPath;
  getLearningPathByKey: LearningPath;
  searchLearningGoals: SearchLearningGoalsResult;
  getLearningGoalByKey: LearningGoal;
  checkLearningGoalKeyAvailability: CheckLearningGoalKeyAvailabilityResult;
};


export type QueryGlobalSearchArgs = {
  query: Scalars['String'];
  options?: Maybe<GlobalSearchOptions>;
};


export type QueryGetTopicByIdArgs = {
  topicId: Scalars['String'];
};


export type QueryGetTopicByKeyArgs = {
  topicKey: Scalars['String'];
};


export type QuerySearchTopicsArgs = {
  options: SearchTopicsOptions;
};


export type QuerySearchSubTopicsArgs = {
  topicId: Scalars['String'];
  options: SearchTopicsOptions;
};


export type QueryCheckTopicKeyAvailabilityArgs = {
  key: Scalars['String'];
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


export type QuerySearchLearningMaterialTagsArgs = {
  options: SearchLearningMaterialTagsOptions;
};


export type QuerySearchResourcesArgs = {
  query: Scalars['String'];
  options: SearchResourcesOptions;
};


export type QueryGetResourceByIdArgs = {
  resourceId: Scalars['String'];
};


export type QueryGetResourceByKeyArgs = {
  resourceKey: Scalars['String'];
};


export type QueryAnalyzeResourceUrlArgs = {
  url: Scalars['String'];
};


export type QueryGetLearningPathByIdArgs = {
  learningPathId: Scalars['String'];
};


export type QueryGetLearningPathByKeyArgs = {
  learningPathKey: Scalars['String'];
};


export type QuerySearchLearningGoalsArgs = {
  options: SearchLearningGoalsOptions;
};


export type QueryGetLearningGoalByKeyArgs = {
  key: Scalars['String'];
};


export type QueryCheckLearningGoalKeyAvailabilityArgs = {
  key: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTopic: Topic;
  addSubTopic: Topic;
  updateTopic: Topic;
  deleteTopic: DeleteTopicResponse;
  setTopicsKnown: Array<Topic>;
  setTopicsUnknown: Array<Topic>;
  login: LoginResponse;
  loginGoogle: LoginResponse;
  register: CurrentUser;
  registerGoogle: CurrentUser;
  verifyEmailAddress: VerifyEmailResponse;
  triggerResetPassword: TriggerResetPasswordResponse;
  resetPassword: ResetPasswordResponse;
  adminUpdateUser: User;
  updateCurrentUser: CurrentUser;
  createArticle: Article;
  updateArticle: Article;
  deleteArticle: DeleteArticleResponse;
  addTagsToLearningMaterial: LearningMaterial;
  removeTagsFromLearningMaterial: LearningMaterial;
  recommendLearningMaterial: LearningMaterial;
  showLearningMaterialInTopic: LearningMaterial;
  hideLearningMaterialFromTopic: LearningMaterial;
  rateLearningMaterial: LearningMaterial;
  createResource: Resource;
  updateResource: Resource;
  deleteResource: DeleteResourceResponse;
  setResourcesConsumed: Array<Resource>;
  addSubResource: SubResourceCreatedResult;
  createSubResourceSeries: SubResourceSeriesCreatedResult;
  addSubResourceToSeries: SubResourceSeriesCreatedResult;
  createLearningPath: LearningPath;
  updateLearningPath: LearningPath;
  deleteLearningPath: DeleteLearningPathResult;
  addComplementaryResourceToLearningPath: ComplementaryResourceUpdatedResult;
  removeComplementaryResourceFromLearningPath: ComplementaryResourceUpdatedResult;
  startLearningPath: LearningPathStartedResult;
  completeLearningPath: LearningPathCompletedResult;
  createLearningGoal: LearningGoal;
  updateLearningGoal: LearningGoal;
  deleteLearningGoal: DeleteLearningGoalMutationResult;
  attachLearningGoalRequiresSubGoal: AttachLearningGoalRequiresSubGoalResult;
  detachLearningGoalRequiresSubGoal: DetachLearningGoalRequiresSubGoalResult;
  attachLearningGoalDependency: UpdateLearningGoalDependenciesResult;
  detachLearningGoalDependency: UpdateLearningGoalDependenciesResult;
  startLearningGoal: LearningGoalStartedResult;
  publishLearningGoal: LearningGoalPublishedResult;
  indexLearningGoal: LearningGoalIndexedResult;
  showLearningGoalInTopic: ShowLearningGoalInTopicResult;
  hideLearningGoalFromTopic: ShowLearningGoalInTopicResult;
  rateLearningGoal: LearningGoal;
  addTopicHasPrerequisiteTopic: AddTopicHasPrerequisiteTopicResult;
  removeTopicHasPrerequisiteTopic: RemoveTopicHasPrerequisiteTopicResult;
  attachTopicIsSubTopicOfTopic: TopicIsSubTopicOfTopic;
  updateTopicIsSubTopicOfTopic: TopicIsSubTopicOfTopic;
  detachTopicIsSubTopicOfTopic: DetachTopicIsSubTopicOfTopicResult;
  attachLearningMaterialCoversTopics: LearningMaterial;
  detachLearningMaterialCoversTopics: LearningMaterial;
  addLearningMaterialHasPrerequisiteTopic: LearningMaterial;
  removeLearningMaterialHasPrerequisiteTopic: LearningMaterial;
};


export type MutationCreateTopicArgs = {
  payload: CreateTopicPayload;
};


export type MutationAddSubTopicArgs = {
  parentTopicId: Scalars['String'];
  payload: CreateTopicPayload;
};


export type MutationUpdateTopicArgs = {
  topicId: Scalars['String'];
  payload: UpdateTopicPayload;
};


export type MutationDeleteTopicArgs = {
  topicId: Scalars['String'];
};


export type MutationSetTopicsKnownArgs = {
  payload: SetTopicsKnownPayload;
};


export type MutationSetTopicsUnknownArgs = {
  topicIds: Array<Scalars['String']>;
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


export type MutationTriggerResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  payload: ResetPasswordPayload;
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['String'];
  payload: AdminUpdateUserPayload;
};


export type MutationUpdateCurrentUserArgs = {
  payload: UpdateCurrentUserPayload;
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


export type MutationAddTagsToLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationRemoveTagsFromLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationRecommendLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
};


export type MutationShowLearningMaterialInTopicArgs = {
  topicId: Scalars['String'];
  learningMaterialId: Scalars['String'];
};


export type MutationHideLearningMaterialFromTopicArgs = {
  topicId: Scalars['String'];
  learningMaterialId: Scalars['String'];
};


export type MutationRateLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationCreateResourceArgs = {
  payload: CreateResourcePayload;
};


export type MutationUpdateResourceArgs = {
  resourceId: Scalars['String'];
  payload: UpdateResourcePayload;
};


export type MutationDeleteResourceArgs = {
  resourceId: Scalars['String'];
};


export type MutationSetResourcesConsumedArgs = {
  payload: SetResourcesConsumedPayload;
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


export type MutationCreateLearningPathArgs = {
  payload: CreateLearningPathPayload;
};


export type MutationUpdateLearningPathArgs = {
  learningPathId: Scalars['String'];
  payload: UpdateLearningPathPayload;
};


export type MutationDeleteLearningPathArgs = {
  learningPathId: Scalars['String'];
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


export type MutationShowLearningGoalInTopicArgs = {
  topicId: Scalars['String'];
  learningGoalId: Scalars['String'];
  payload: ShowLearningGoalInTopicPayload;
};


export type MutationHideLearningGoalFromTopicArgs = {
  topicId: Scalars['String'];
  learningGoalId: Scalars['String'];
};


export type MutationRateLearningGoalArgs = {
  learningGoalId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationAddTopicHasPrerequisiteTopicArgs = {
  topicId: Scalars['String'];
  prerequisiteTopicId: Scalars['String'];
  strength?: Maybe<Scalars['Float']>;
};


export type MutationRemoveTopicHasPrerequisiteTopicArgs = {
  topicId: Scalars['String'];
  prerequisiteTopicId: Scalars['String'];
};


export type MutationAttachTopicIsSubTopicOfTopicArgs = {
  parentTopicId: Scalars['String'];
  subTopicId: Scalars['String'];
  payload: AttachTopicIsSubTopicOfTopicPayload;
};


export type MutationUpdateTopicIsSubTopicOfTopicArgs = {
  parentTopicId: Scalars['String'];
  subTopicId: Scalars['String'];
  payload: UpdateTopicIsSubTopicOfTopicPayload;
};


export type MutationDetachTopicIsSubTopicOfTopicArgs = {
  parentTopicId: Scalars['String'];
  subTopicId: Scalars['String'];
};


export type MutationAttachLearningMaterialCoversTopicsArgs = {
  learningMaterialId: Scalars['String'];
  topicsIds: Array<Scalars['String']>;
};


export type MutationDetachLearningMaterialCoversTopicsArgs = {
  learningMaterialId: Scalars['String'];
  topicsIds: Array<Scalars['String']>;
};


export type MutationAddLearningMaterialHasPrerequisiteTopicArgs = {
  learningMaterialId: Scalars['String'];
  prerequisiteTopicId: Scalars['String'];
  strength?: Maybe<Scalars['Float']>;
};


export type MutationRemoveLearningMaterialHasPrerequisiteTopicArgs = {
  learningMaterialId: Scalars['String'];
  prerequisiteTopicId: Scalars['String'];
};


export type GetHomePageDataResults = {
  __typename?: 'GetHomePageDataResults';
  currentUser?: Maybe<CurrentUser>;
  recommendedLearningGoals: Array<LearningGoal>;
  recommendedLearningPaths: Array<LearningPath>;
};

export type GetTopLevelTopicsResults = {
  __typename?: 'GetTopLevelTopicsResults';
  items: Array<Topic>;
};

export type GlobalSearchResults = {
  __typename?: 'GlobalSearchResults';
  results: Array<SearchResult>;
};

export type GlobalSearchOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type Topic = {
  __typename?: 'Topic';
  _id: Scalars['String'];
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  parentTopic?: Maybe<Topic>;
  subTopics?: Maybe<Array<TopicIsSubTopicOfTopic>>;
  subTopicsTotalCount?: Maybe<Scalars['Int']>;
  learningMaterials?: Maybe<TopicLearningMaterialsResults>;
  learningMaterialsTotalCount?: Maybe<Scalars['Int']>;
  prerequisites?: Maybe<Array<TopicHasPrerequisiteTopic>>;
  followUps?: Maybe<Array<TopicHasPrerequisiteTopic>>;
  createdBy?: Maybe<User>;
  createdAt: Scalars['Date'];
};


export type TopicLearningMaterialsArgs = {
  options: TopicLearningMaterialsOptions;
};

export type SearchTopicsResult = {
  __typename?: 'SearchTopicsResult';
  items: Array<Topic>;
};

export type SearchTopicsOptions = {
  query: Scalars['String'];
  pagination: PaginationOptions;
};

export type CheckTopicKeyAvailabilityResult = {
  __typename?: 'CheckTopicKeyAvailabilityResult';
  available: Scalars['Boolean'];
  existingTopic?: Maybe<Topic>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  _id: Scalars['String'];
  email: Scalars['String'];
  displayName: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
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
  bio?: Maybe<Scalars['String']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
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
  subResources?: Maybe<Array<Resource>>;
  parentResources?: Maybe<Array<Resource>>;
  subResourceSeries?: Maybe<Array<Resource>>;
  seriesParentResource?: Maybe<Resource>;
  nextResource?: Maybe<Resource>;
  previousResource?: Maybe<Resource>;
  coveredSubTopics?: Maybe<LearningMaterialCoveredSubTopicsResults>;
  coveredSubTopicsTree?: Maybe<Array<Topic>>;
  showedIn?: Maybe<Array<Topic>>;
  prerequisites?: Maybe<Array<LearningMaterialHasPrerequisiteTopic>>;
  createdBy?: Maybe<User>;
  createdAt: Scalars['Date'];
};


export type ResourceCoveredSubTopicsArgs = {
  options: LearningMaterialCoveredSubTopicsOptions;
};

export type AnalyzeResourceUrlResult = {
  __typename?: 'AnalyzeResourceUrlResult';
  resourceData?: Maybe<ResourceData>;
};

export type LearningPath = LearningMaterial & {
  __typename?: 'LearningPath';
  _id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  public: Scalars['Boolean'];
  durationSeconds?: Maybe<Scalars['Int']>;
  resourceItems?: Maybe<Array<LearningPathResourceItem>>;
  complementaryResources?: Maybe<Array<Resource>>;
  tags?: Maybe<Array<LearningMaterialTag>>;
  rating?: Maybe<Scalars['Float']>;
  started?: Maybe<LearningPathStarted>;
  startedBy?: Maybe<LearningPathStartedByResults>;
  coveredSubTopics?: Maybe<LearningMaterialCoveredSubTopicsResults>;
  coveredSubTopicsTree?: Maybe<Array<Topic>>;
  showedIn?: Maybe<Array<Topic>>;
  prerequisites?: Maybe<Array<LearningMaterialHasPrerequisiteTopic>>;
  createdBy?: Maybe<User>;
  createdAt: Scalars['Date'];
};


export type LearningPathStartedByArgs = {
  options: LearningPathStartedByOptions;
};


export type LearningPathCoveredSubTopicsArgs = {
  options: LearningMaterialCoveredSubTopicsOptions;
};

export type SearchLearningGoalsResult = {
  __typename?: 'SearchLearningGoalsResult';
  items: Array<LearningGoal>;
};

export type SearchLearningGoalsOptions = {
  query?: Maybe<Scalars['String']>;
  pagination: PaginationOptions;
};

export type LearningGoal = {
  __typename?: 'LearningGoal';
  _id: Scalars['String'];
  key: Scalars['String'];
  type: LearningGoalType;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['Date']>;
  hidden: Scalars['Boolean'];
  rating?: Maybe<Scalars['Float']>;
  progress?: Maybe<LearningGoalProgress>;
  createdBy?: Maybe<User>;
  showedIn?: Maybe<Array<Topic>>;
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

export type CheckLearningGoalKeyAvailabilityResult = {
  __typename?: 'CheckLearningGoalKeyAvailabilityResult';
  available: Scalars['Boolean'];
  existingLearningGoal?: Maybe<LearningGoal>;
};

export type CreateTopicPayload = {
  name: Scalars['String'];
  key: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UpdateTopicPayload = {
  name?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteTopicResponse = {
  __typename?: 'DeleteTopicResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SetTopicsKnownPayload = {
  topics: Array<SetTopicKnownPayloadTopicsField>;
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

export type TriggerResetPasswordResponse = {
  __typename?: 'TriggerResetPasswordResponse';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  currentUser: CurrentUser;
};

export type ResetPasswordPayload = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type AdminUpdateUserPayload = {
  displayName?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UpdateCurrentUserPayload = {
  displayName?: Maybe<Scalars['String']>;
  profilePictureUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
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

export type LearningMaterial = {
  _id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<LearningMaterialTag>>;
  rating?: Maybe<Scalars['Float']>;
  coveredSubTopics?: Maybe<LearningMaterialCoveredSubTopicsResults>;
  coveredSubTopicsTree?: Maybe<Array<Topic>>;
  showedIn?: Maybe<Array<Topic>>;
  prerequisites?: Maybe<Array<LearningMaterialHasPrerequisiteTopic>>;
  createdBy?: Maybe<User>;
  createdAt: Scalars['Date'];
};


export type LearningMaterialCoveredSubTopicsArgs = {
  options: LearningMaterialCoveredSubTopicsOptions;
};

export type CreateResourcePayload = {
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  showInTopicsIds: Array<Scalars['String']>;
  coveredSubTopicsIds?: Maybe<Array<Scalars['String']>>;
  prerequisitesTopicsIds?: Maybe<Array<Scalars['String']>>;
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
  topicId?: Maybe<Scalars['String']>;
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

export type ShowLearningGoalInTopicResult = {
  __typename?: 'ShowLearningGoalInTopicResult';
  learningGoal: LearningGoal;
  topic: Topic;
};

export type ShowLearningGoalInTopicPayload = {
  index?: Maybe<Scalars['Float']>;
};

export type AddTopicHasPrerequisiteTopicResult = {
  __typename?: 'AddTopicHasPrerequisiteTopicResult';
  topic: Topic;
  strength: Scalars['Float'];
  prerequisiteTopic: Topic;
};

export type RemoveTopicHasPrerequisiteTopicResult = {
  __typename?: 'RemoveTopicHasPrerequisiteTopicResult';
  topic: Topic;
  prerequisiteTopic: Topic;
};

export type TopicIsSubTopicOfTopic = {
  __typename?: 'TopicIsSubTopicOfTopic';
  index: Scalars['Float'];
  createdAt: Scalars['Date'];
  createdByUserId?: Maybe<Scalars['String']>;
  subTopic: Topic;
  parentTopic: Topic;
};

export type AttachTopicIsSubTopicOfTopicPayload = {
  index?: Maybe<Scalars['Float']>;
};

export type UpdateTopicIsSubTopicOfTopicPayload = {
  index?: Maybe<Scalars['Float']>;
};

export type DetachTopicIsSubTopicOfTopicResult = {
  __typename?: 'DetachTopicIsSubTopicOfTopicResult';
  parentTopic: Topic;
  subTopic: Topic;
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

export type TopicLearningMaterialsResults = {
  __typename?: 'TopicLearningMaterialsResults';
  items: Array<LearningMaterial>;
};

export type TopicLearningMaterialsOptions = {
  sortingType: TopicLearningMaterialsSortingType;
  query?: Maybe<Scalars['String']>;
  filter: TopicLearningMaterialsFilterOptions;
};

export type TopicHasPrerequisiteTopic = {
  __typename?: 'TopicHasPrerequisiteTopic';
  followUpTopic: Topic;
  strength: Scalars['Float'];
  prerequisiteTopic: Topic;
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

export type LearningMaterialCoveredSubTopicsResults = {
  __typename?: 'LearningMaterialCoveredSubTopicsResults';
  items: Array<Topic>;
};

export type LearningMaterialCoveredSubTopicsOptions = {
  pagination?: Maybe<PaginationOptions>;
};

export type LearningMaterialHasPrerequisiteTopic = {
  __typename?: 'LearningMaterialHasPrerequisiteTopic';
  strength: Scalars['Float'];
  createdByUserId: Scalars['String'];
  createdAt: Scalars['Date'];
  topic: Topic;
  learningMaterial: LearningMaterial;
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

export type SetTopicKnownPayloadTopicsField = {
  topicId: Scalars['String'];
  level?: Maybe<Scalars['Float']>;
};

export type CreateSubResourcePayload = {
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  showInTopicsIds: Array<Scalars['String']>;
  coveredSubTopicsIds?: Maybe<Array<Scalars['String']>>;
  prerequisitesTopicsIds?: Maybe<Array<Scalars['String']>>;
};

export type SetResourcesConsumedPayloadResourcesField = {
  resourceId: Scalars['String'];
  consumed?: Maybe<Scalars['Boolean']>;
  opened?: Maybe<Scalars['Boolean']>;
};

export type CreateLearningPathResourceItem = {
  resourceId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type SubGoal = LearningGoal | Topic;

export type SearchResultEntity = Topic | LearningGoal | Resource | LearningPath;

export enum TopicLearningMaterialsSortingType {
  Recommended = 'recommended',
  Rating = 'rating',
  Newest = 'newest'
}

export type TopicLearningMaterialsFilterOptions = {
  resourceTypeIn?: Maybe<Array<ResourceType>>;
  completedByUser: Scalars['Boolean'];
  learningMaterialTypeIn?: Maybe<Array<LearningMaterialType>>;
};

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

export type SubResourceExtractedData = {
  __typename?: 'SubResourceExtractedData';
  name: Scalars['String'];
  type: ResourceType;
  mediaType: ResourceMediaType;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
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

export enum LearningMaterialType {
  Resource = 'Resource',
  LearningPath = 'LearningPath'
}
