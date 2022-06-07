export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type AddTopicHasPrerequisiteTopicResult = {
  __typename?: 'AddTopicHasPrerequisiteTopicResult';
  prerequisiteTopic: Topic;
  strength: Scalars['Float'];
  topic: Topic;
};

export type AdminUpdateUserPayload = {
  active?: InputMaybe<Scalars['Boolean']>;
  bio?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  profilePictureUrl?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type AggregatedSubtopicPrerequisite = {
  __typename?: 'AggregatedSubtopicPrerequisite';
  prerequisiteParentsPath: Array<Topic>;
  relationship: TopicHasPrerequisiteTopic;
  subTopicPath: Array<Topic>;
};

export type AggregatedSubtopicsPrerequisitesOptions = {
  onlyIfTopicHasTopicTypes?: InputMaybe<Array<Scalars['String']>>;
  prereqParentsPathStopCondition: PrereqParentsPathStopCondition;
};

export type AnalyzeResourceUrlResult = {
  __typename?: 'AnalyzeResourceUrlResult';
  resourceData?: Maybe<ResourceData>;
};

export type Article = {
  __typename?: 'Article';
  _id: Scalars['String'];
  author?: Maybe<User>;
  content: Scalars['String'];
  contentType: ArticleContentType;
  key: Scalars['String'];
  title: Scalars['String'];
};

export enum ArticleContentType {
  Markdown = 'markdown'
}

export type AttachLearningGoalRequiresSubGoalPayload = {
  strength?: InputMaybe<Scalars['Float']>;
};

export type AttachLearningGoalRequiresSubGoalResult = {
  __typename?: 'AttachLearningGoalRequiresSubGoalResult';
  learningGoal: LearningGoal;
  subGoal: SubGoal;
};

export type AttachTopicIsPartOfTopicPayload = {
  index?: InputMaybe<Scalars['Float']>;
};

export type AttachTopicIsSubTopicOfTopicPayload = {
  index?: InputMaybe<Scalars['Float']>;
};

export type CheckLearningGoalKeyAvailabilityResult = {
  __typename?: 'CheckLearningGoalKeyAvailabilityResult';
  available: Scalars['Boolean'];
  existingLearningGoal?: Maybe<LearningGoal>;
};

export type CheckTopicKeyAvailabilityResult = {
  __typename?: 'CheckTopicKeyAvailabilityResult';
  available: Scalars['Boolean'];
  existingTopic?: Maybe<Topic>;
};

export type CheckUserKeyAvailabilityResult = {
  __typename?: 'CheckUserKeyAvailabilityResult';
  available: Scalars['Boolean'];
  existingUser?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  children?: Maybe<Array<Comment>>;
  childrenCount?: Maybe<Scalars['Int']>;
  contentMarkdown: Scalars['String'];
  discussionId: Scalars['String'];
  lastUpdatedAt: Scalars['String'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['String']>;
  postedAt: Scalars['String'];
  postedBy?: Maybe<User>;
  postedByUserId: Scalars['String'];
};

export type CommentOptions = {
  pagination: PaginationOptions;
};

export type CommentResults = {
  __typename?: 'CommentResults';
  items: Array<Comment>;
  rootCommentsTotalCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type ComplementaryResourceUpdatedResult = {
  __typename?: 'ComplementaryResourceUpdatedResult';
  learningPath: LearningPath;
  resource: Resource;
};

export type ConsumedResource = {
  __typename?: 'ConsumedResource';
  consumedAt?: Maybe<Scalars['Date']>;
  lastOpenedAt?: Maybe<Scalars['Date']>;
  openedAt?: Maybe<Scalars['Date']>;
};

export type CreateArticlePayload = {
  content: Scalars['String'];
  contentType: ArticleContentType;
  title: Scalars['String'];
};

export type CreateLearningGoalOptions = {
  public?: InputMaybe<Scalars['Boolean']>;
  topicId?: InputMaybe<Scalars['String']>;
};

export type CreateLearningGoalPayload = {
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: LearningGoalType;
};

export type CreateLearningPathPayload = {
  description?: InputMaybe<Scalars['String']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  outro?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  resourceItems: Array<CreateLearningPathResourceItem>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateLearningPathResourceItem = {
  description?: InputMaybe<Scalars['String']>;
  resourceId: Scalars['String'];
};

export type CreateResourceOptions = {
  recommend?: InputMaybe<Scalars['Boolean']>;
};

export type CreateResourcePayload = {
  coveredSubTopicsIds?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  prerequisitesTopicsIds?: InputMaybe<Array<Scalars['String']>>;
  showInTopicsIds: Array<Scalars['String']>;
  subResourceSeries?: InputMaybe<Array<CreateSubResourcePayload>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types: Array<ResourceType>;
  url: Scalars['String'];
};

export type CreateSubResourcePayload = {
  coveredSubTopicsIds?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  prerequisitesTopicsIds?: InputMaybe<Array<Scalars['String']>>;
  showInTopicsIds: Array<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types: Array<ResourceType>;
  url: Scalars['String'];
};

export type CreateTopicContextOptions = {
  contextTopicId: Scalars['String'];
  disambiguationTopicId: Scalars['String'];
};

export type CreateTopicPayload = {
  aliases?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  descriptionSourceUrl?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  level?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  prerequisitesTopicsIds: Array<Scalars['String']>;
  topicTypes: Array<Scalars['String']>;
  wikipediaPageUrl?: InputMaybe<Scalars['String']>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  _id: Scalars['String'];
  articles?: Maybe<ListArticlesResult>;
  bio?: Maybe<Scalars['String']>;
  consumedResources?: Maybe<UserConsumedResourcesResult>;
  createdLearningPaths?: Maybe<Array<LearningPath>>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  key: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  role: UserRole;
  startedLearningPaths?: Maybe<Array<LearningPathStartedItem>>;
};


export type CurrentUserArticlesArgs = {
  options: ListArticlesOptions;
};


export type CurrentUserConsumedResourcesArgs = {
  options: UserConsumedResourcesOptions;
};


export type CurrentUserCreatedLearningPathsArgs = {
  options: UserLearningPathsOptions;
};


export type CurrentUserStartedLearningPathsArgs = {
  options: UserLearningPathsOptions;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DeleteLearningGoalMutationResult = {
  __typename?: 'DeleteLearningGoalMutationResult';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DeleteLearningPathResult = {
  __typename?: 'DeleteLearningPathResult';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DeleteResourceResponse = {
  __typename?: 'DeleteResourceResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DeleteTopicResponse = {
  __typename?: 'DeleteTopicResponse';
  _id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DependsOnGoalItem = {
  __typename?: 'DependsOnGoalItem';
  learningGoal: LearningGoal;
  parentLearningGoalId: Scalars['String'];
};

export type DetachLearningGoalRequiresSubGoalResult = {
  __typename?: 'DetachLearningGoalRequiresSubGoalResult';
  learningGoal: LearningGoal;
  subGoal: SubGoal;
};

export type DetachTopicIsPartOfTopicResult = {
  __typename?: 'DetachTopicIsPartOfTopicResult';
  partOfTopic: Topic;
  subTopic: Topic;
};

export type DetachTopicIsSubTopicOfTopicResult = {
  __typename?: 'DetachTopicIsSubTopicOfTopicResult';
  parentTopic: Topic;
  subTopic: Topic;
};

export type DiscourseSso = {
  sig: Scalars['String'];
  sso: Scalars['String'];
};

export enum DiscussionLocation {
  LearningMaterialPage = 'LEARNING_MATERIAL_PAGE',
  ManageTopicPage = 'MANAGE_TOPIC_PAGE',
  TopicPage = 'TOPIC_PAGE'
}

export type EditCommentPayload = {
  contentMarkdown: Scalars['String'];
};

export type GetHomePageDataResults = {
  __typename?: 'GetHomePageDataResults';
  currentUser?: Maybe<CurrentUser>;
  recommendedLearningPaths: Array<LearningPath>;
};

export type GetTopLevelTopicsResults = {
  __typename?: 'GetTopLevelTopicsResults';
  items: Array<Topic>;
};

export type GetTopicValidContextsFromDisambiguation = {
  __typename?: 'GetTopicValidContextsFromDisambiguation';
  validContexts?: Maybe<Array<Topic>>;
};

export type GetTopicValidContextsFromSameName = {
  __typename?: 'GetTopicValidContextsFromSameName';
  validContexts?: Maybe<Array<Topic>>;
  validSameNameTopicContexts?: Maybe<Array<Topic>>;
};

export type GetTopicValidContextsResult = {
  __typename?: 'GetTopicValidContextsResult';
  validContexts?: Maybe<Array<Topic>>;
};

export type GlobalSearchOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type GlobalSearchResults = {
  __typename?: 'GlobalSearchResults';
  results: Array<SearchResult>;
};

export type KnownTopic = {
  __typename?: 'KnownTopic';
  level: Scalars['Float'];
};

export type LearningGoal = {
  __typename?: 'LearningGoal';
  _id: Scalars['String'];
  createdBy?: Maybe<User>;
  dependantLearningGoals?: Maybe<Array<DependsOnGoalItem>>;
  dependsOnLearningGoals?: Maybe<Array<DependsOnGoalItem>>;
  description?: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
  progress?: Maybe<LearningGoalProgress>;
  publishedAt?: Maybe<Scalars['Date']>;
  rating?: Maybe<Scalars['Float']>;
  relevantLearningMaterials?: Maybe<LearningGoalRelevantLearningMaterialsResults>;
  requiredInGoals?: Maybe<Array<RequiredInGoalItem>>;
  requiredSubGoals?: Maybe<Array<SubGoalItem>>;
  showedIn?: Maybe<Array<Topic>>;
  size?: Maybe<Scalars['Float']>;
  started?: Maybe<LearningGoalStarted>;
  startedBy?: Maybe<LearningGoalStartedByResults>;
  type: LearningGoalType;
};


export type LearningGoalDependantLearningGoalsArgs = {
  parentLearningGoalIdIn?: InputMaybe<Array<Scalars['String']>>;
};


export type LearningGoalDependsOnLearningGoalsArgs = {
  parentLearningGoalIdIn?: InputMaybe<Array<Scalars['String']>>;
};


export type LearningGoalRelevantLearningMaterialsArgs = {
  options: LearningGoalRelevantLearningMaterialsOptions;
};


export type LearningGoalStartedByArgs = {
  options: LearningGoalStartedByOptions;
};

export type LearningGoalIndexedResult = {
  __typename?: 'LearningGoalIndexedResult';
  learningGoal: LearningGoal;
};

export type LearningGoalProgress = {
  __typename?: 'LearningGoalProgress';
  level: Scalars['Float'];
};

export type LearningGoalPublishedResult = {
  __typename?: 'LearningGoalPublishedResult';
  learningGoal: LearningGoal;
};

export type LearningGoalRelevantLearningMaterialsItem = {
  __typename?: 'LearningGoalRelevantLearningMaterialsItem';
  coverage?: Maybe<Scalars['Float']>;
  learningMaterial: LearningMaterial;
};

export type LearningGoalRelevantLearningMaterialsOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type LearningGoalRelevantLearningMaterialsResults = {
  __typename?: 'LearningGoalRelevantLearningMaterialsResults';
  count: Scalars['Int'];
  items: Array<LearningGoalRelevantLearningMaterialsItem>;
};

export type LearningGoalStarted = {
  __typename?: 'LearningGoalStarted';
  startedAt: Scalars['Date'];
};

export type LearningGoalStartedByItem = {
  __typename?: 'LearningGoalStartedByItem';
  startedAt: Scalars['Date'];
  user: User;
};

export type LearningGoalStartedByOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type LearningGoalStartedByResults = {
  __typename?: 'LearningGoalStartedByResults';
  count: Scalars['Int'];
  items: Array<LearningGoalStartedByItem>;
};

export type LearningGoalStartedResult = {
  __typename?: 'LearningGoalStartedResult';
  currentUser: CurrentUser;
  learningGoal: LearningGoal;
};

export enum LearningGoalType {
  Roadmap = 'Roadmap',
  SubGoal = 'SubGoal'
}

export type LearningMaterial = {
  _id: Scalars['String'];
  comments?: Maybe<CommentResults>;
  coveredSubTopics?: Maybe<LearningMaterialCoveredSubTopicsResults>;
  coveredSubTopicsTree?: Maybe<Array<Topic>>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  prerequisites?: Maybe<Array<LearningMaterialHasPrerequisiteTopic>>;
  rating?: Maybe<Scalars['Float']>;
  recommendationsCount?: Maybe<Scalars['Int']>;
  recommended?: Maybe<LearningMaterialRecommended>;
  recommendedBy?: Maybe<Array<UserRecommendedLearningMaterial>>;
  showedIn?: Maybe<Array<Topic>>;
  tags?: Maybe<Array<LearningMaterialTag>>;
};


export type LearningMaterialCommentsArgs = {
  options: CommentOptions;
};


export type LearningMaterialCoveredSubTopicsArgs = {
  options: LearningMaterialCoveredSubTopicsOptions;
};


export type LearningMaterialRecommendedByArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type LearningMaterialCoveredSubTopicsOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type LearningMaterialCoveredSubTopicsResults = {
  __typename?: 'LearningMaterialCoveredSubTopicsResults';
  items: Array<Topic>;
};

export type LearningMaterialCoversTopic = {
  __typename?: 'LearningMaterialCoversTopic';
  createdAt: Scalars['Date'];
  createdByUserId?: Maybe<Scalars['String']>;
  learningMaterial: LearningMaterial;
  topic: Topic;
};

export type LearningMaterialHasPrerequisiteTopic = {
  __typename?: 'LearningMaterialHasPrerequisiteTopic';
  createdAt: Scalars['Date'];
  createdByUserId: Scalars['String'];
  learningMaterial: LearningMaterial;
  strength: Scalars['Float'];
  topic: Topic;
};

export type LearningMaterialRecommended = {
  __typename?: 'LearningMaterialRecommended';
  recommendedAt: Scalars['Date'];
};

export type LearningMaterialTag = {
  __typename?: 'LearningMaterialTag';
  name: Scalars['String'];
};

export type LearningMaterialTagSearchResult = {
  __typename?: 'LearningMaterialTagSearchResult';
  name: Scalars['String'];
  usageCount?: Maybe<Scalars['Int']>;
};

export enum LearningMaterialType {
  LearningPath = 'LearningPath',
  Resource = 'Resource'
}

export type LearningPath = LearningMaterial & {
  __typename?: 'LearningPath';
  _id: Scalars['String'];
  comments?: Maybe<CommentResults>;
  complementaryResources?: Maybe<Array<Resource>>;
  coveredSubTopics?: Maybe<LearningMaterialCoveredSubTopicsResults>;
  coveredSubTopicsTree?: Maybe<Array<Topic>>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  key: Scalars['String'];
  name: Scalars['String'];
  outro?: Maybe<Scalars['String']>;
  prerequisites?: Maybe<Array<LearningMaterialHasPrerequisiteTopic>>;
  public: Scalars['Boolean'];
  rating?: Maybe<Scalars['Float']>;
  recommendationsCount?: Maybe<Scalars['Int']>;
  recommended?: Maybe<LearningMaterialRecommended>;
  recommendedBy?: Maybe<Array<UserRecommendedLearningMaterial>>;
  resourceItems?: Maybe<Array<LearningPathResourceItem>>;
  showedIn?: Maybe<Array<Topic>>;
  started?: Maybe<LearningPathStarted>;
  startedBy?: Maybe<LearningPathStartedByResults>;
  tags?: Maybe<Array<LearningMaterialTag>>;
};


export type LearningPathCommentsArgs = {
  options: CommentOptions;
};


export type LearningPathCoveredSubTopicsArgs = {
  options: LearningMaterialCoveredSubTopicsOptions;
};


export type LearningPathRecommendedByArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type LearningPathStartedByArgs = {
  options: LearningPathStartedByOptions;
};

export type LearningPathCompletedResult = {
  __typename?: 'LearningPathCompletedResult';
  learningPath: LearningPath;
  user: CurrentUser;
};

export type LearningPathResourceItem = {
  __typename?: 'LearningPathResourceItem';
  description?: Maybe<Scalars['String']>;
  learningPathId: Scalars['String'];
  resource: Resource;
};

export type LearningPathStarted = {
  __typename?: 'LearningPathStarted';
  completedAt?: Maybe<Scalars['Date']>;
  startedAt: Scalars['Date'];
};

export type LearningPathStartedByItem = {
  __typename?: 'LearningPathStartedByItem';
  completedAt?: Maybe<Scalars['Date']>;
  startedAt: Scalars['Date'];
  user: User;
};

export type LearningPathStartedByOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type LearningPathStartedByResults = {
  __typename?: 'LearningPathStartedByResults';
  count: Scalars['Int'];
  items: Array<LearningPathStartedByItem>;
};

export type LearningPathStartedItem = {
  __typename?: 'LearningPathStartedItem';
  completedAt?: Maybe<Scalars['Date']>;
  learningPath: LearningPath;
  startedAt: Scalars['Date'];
};

export type LearningPathStartedResult = {
  __typename?: 'LearningPathStartedResult';
  learningPath: LearningPath;
  user: CurrentUser;
};

export type ListArticlesFilter = {
  contentType?: InputMaybe<ArticleContentType>;
};

export type ListArticlesOptions = {
  filter?: InputMaybe<ListArticlesFilter>;
  pagination?: InputMaybe<PaginationOptions>;
};

export type ListArticlesResult = {
  __typename?: 'ListArticlesResult';
  items: Array<Article>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  currentUser: CurrentUser;
  jwt: Scalars['String'];
  redirectUrl?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComplementaryResourceToLearningPath: ComplementaryResourceUpdatedResult;
  addLearningMaterialHasPrerequisiteTopic: LearningMaterial;
  addSubResource: SubResourceCreatedResult;
  addSubResourceToSeries: SubResourceSeriesCreatedResult;
  addSubTopic: Topic;
  addTagsToLearningMaterial: LearningMaterial;
  addTopicHasPrerequisiteTopic: AddTopicHasPrerequisiteTopicResult;
  addTopicTypesToTopic: Topic;
  adminUpdateUser: User;
  attachLearningGoalDependency: UpdateLearningGoalDependenciesResult;
  attachLearningGoalRequiresSubGoal: AttachLearningGoalRequiresSubGoalResult;
  attachLearningMaterialCoversTopics: LearningMaterial;
  attachTopicIsPartOfTopic: TopicIsPartOfTopic;
  attachTopicIsSubTopicOfTopic: TopicIsSubTopicOfTopic;
  completeLearningPath: LearningPathCompletedResult;
  createArticle: Article;
  createDisambiguationFromTopic: Topic;
  createLearningGoal: LearningGoal;
  createLearningPath: LearningPath;
  createResource: Resource;
  createSubResourceSeries: SubResourceSeriesCreatedResult;
  createTopic: Topic;
  deleteArticle: DeleteArticleResponse;
  deleteLearningGoal: DeleteLearningGoalMutationResult;
  deleteLearningPath: DeleteLearningPathResult;
  deleteResource: DeleteResourceResponse;
  deleteTopic: DeleteTopicResponse;
  detachLearningGoalDependency: UpdateLearningGoalDependenciesResult;
  detachLearningGoalRequiresSubGoal: DetachLearningGoalRequiresSubGoalResult;
  detachLearningMaterialCoversTopics: LearningMaterial;
  detachTopicIsPartOfTopic: DetachTopicIsPartOfTopicResult;
  detachTopicIsSubTopicOfTopic: DetachTopicIsSubTopicOfTopicResult;
  downvoteLearningMaterial: LearningMaterial;
  editComment: Comment;
  hideLearningGoalFromTopic: ShowLearningGoalInTopicResult;
  hideLearningMaterialFromTopic: LearningMaterial;
  indexLearningGoal: LearningGoalIndexedResult;
  login: LoginResponse;
  loginGoogle: LoginResponse;
  postComment: Comment;
  publishLearningGoal: LearningGoalPublishedResult;
  rateLearningGoal: LearningGoal;
  rateLearningMaterial: LearningMaterial;
  recommendLearningMaterial: LearningMaterial;
  register: CurrentUser;
  registerGoogle: CurrentUser;
  removeComplementaryResourceFromLearningPath: ComplementaryResourceUpdatedResult;
  removeLearningMaterialHasPrerequisiteTopic: LearningMaterial;
  removeTagsFromLearningMaterial: LearningMaterial;
  removeTopicHasPrerequisiteTopic: RemoveTopicHasPrerequisiteTopicResult;
  removeTopicTypesFromTopic: Topic;
  resetPassword: ResetPasswordResponse;
  setResourcesConsumed: Array<Resource>;
  setTopicsKnown: Array<Topic>;
  setTopicsUnknown: Array<Topic>;
  showLearningGoalInTopic: ShowLearningGoalInTopicResult;
  showLearningMaterialInTopic: LearningMaterial;
  startLearningGoal: LearningGoalStartedResult;
  startLearningPath: LearningPathStartedResult;
  triggerResetPassword: TriggerResetPasswordResponse;
  updateArticle: Article;
  updateCurrentUser: CurrentUser;
  updateLearningGoal: LearningGoal;
  updateLearningPath: LearningPath;
  updateResource: Resource;
  updateTopic: Topic;
  updateTopicContext: Topic;
  updateTopicIsPartOfTopic: TopicIsPartOfTopic;
  updateTopicIsSubTopicOfTopic: TopicIsSubTopicOfTopic;
  updateTopicTopicTypes: Topic;
  verifyEmailAddress: VerifyEmailResponse;
};


export type MutationAddComplementaryResourceToLearningPathArgs = {
  learningPathId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type MutationAddLearningMaterialHasPrerequisiteTopicArgs = {
  learningMaterialId: Scalars['String'];
  prerequisiteTopicId: Scalars['String'];
  strength?: InputMaybe<Scalars['Float']>;
};


export type MutationAddSubResourceArgs = {
  parentResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationAddSubResourceToSeriesArgs = {
  parentResourceId: Scalars['String'];
  previousResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationAddSubTopicArgs = {
  contextOptions?: InputMaybe<CreateTopicContextOptions>;
  parentTopicId: Scalars['String'];
  payload: CreateTopicPayload;
};


export type MutationAddTagsToLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationAddTopicHasPrerequisiteTopicArgs = {
  prerequisiteTopicId: Scalars['String'];
  strength?: InputMaybe<Scalars['Float']>;
  topicId: Scalars['String'];
};


export type MutationAddTopicTypesToTopicArgs = {
  topicId: Scalars['String'];
  topicTypes: Array<Scalars['String']>;
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['String'];
  payload: AdminUpdateUserPayload;
};


export type MutationAttachLearningGoalDependencyArgs = {
  learningGoalDependencyId: Scalars['String'];
  learningGoalId: Scalars['String'];
  parentLearningGoalId: Scalars['String'];
};


export type MutationAttachLearningGoalRequiresSubGoalArgs = {
  learningGoalId: Scalars['String'];
  payload: AttachLearningGoalRequiresSubGoalPayload;
  subGoalId: Scalars['String'];
};


export type MutationAttachLearningMaterialCoversTopicsArgs = {
  learningMaterialId: Scalars['String'];
  topicsIds: Array<Scalars['String']>;
};


export type MutationAttachTopicIsPartOfTopicArgs = {
  partOfTopicId: Scalars['String'];
  payload: AttachTopicIsPartOfTopicPayload;
  subTopicId: Scalars['String'];
};


export type MutationAttachTopicIsSubTopicOfTopicArgs = {
  parentTopicId: Scalars['String'];
  payload: AttachTopicIsSubTopicOfTopicPayload;
  subTopicId: Scalars['String'];
};


export type MutationCompleteLearningPathArgs = {
  completed: Scalars['Boolean'];
  learningPathId: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  payload: CreateArticlePayload;
};


export type MutationCreateDisambiguationFromTopicArgs = {
  existingTopicContextTopicId: Scalars['String'];
  existingTopicId: Scalars['String'];
};


export type MutationCreateLearningGoalArgs = {
  options?: InputMaybe<CreateLearningGoalOptions>;
  payload: CreateLearningGoalPayload;
};


export type MutationCreateLearningPathArgs = {
  payload: CreateLearningPathPayload;
};


export type MutationCreateResourceArgs = {
  options?: InputMaybe<CreateResourceOptions>;
  payload: CreateResourcePayload;
};


export type MutationCreateSubResourceSeriesArgs = {
  parentResourceId: Scalars['String'];
  subResourceId: Scalars['String'];
};


export type MutationCreateTopicArgs = {
  payload: CreateTopicPayload;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLearningGoalArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteLearningPathArgs = {
  learningPathId: Scalars['String'];
};


export type MutationDeleteResourceArgs = {
  resourceId: Scalars['String'];
};


export type MutationDeleteTopicArgs = {
  topicId: Scalars['String'];
};


export type MutationDetachLearningGoalDependencyArgs = {
  learningGoalDependencyId: Scalars['String'];
  learningGoalId: Scalars['String'];
  parentLearningGoalId: Scalars['String'];
};


export type MutationDetachLearningGoalRequiresSubGoalArgs = {
  learningGoalId: Scalars['String'];
  subGoalId: Scalars['String'];
};


export type MutationDetachLearningMaterialCoversTopicsArgs = {
  learningMaterialId: Scalars['String'];
  topicsIds: Array<Scalars['String']>;
};


export type MutationDetachTopicIsPartOfTopicArgs = {
  partOfTopicId: Scalars['String'];
  subTopicId: Scalars['String'];
};


export type MutationDetachTopicIsSubTopicOfTopicArgs = {
  parentTopicId: Scalars['String'];
  subTopicId: Scalars['String'];
};


export type MutationDownvoteLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['String'];
  payload: EditCommentPayload;
};


export type MutationHideLearningGoalFromTopicArgs = {
  learningGoalId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationHideLearningMaterialFromTopicArgs = {
  learningMaterialId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationIndexLearningGoalArgs = {
  learningGoalId: Scalars['String'];
};


export type MutationLoginArgs = {
  discourseSSO?: InputMaybe<DiscourseSso>;
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginGoogleArgs = {
  discourseSSO?: InputMaybe<DiscourseSso>;
  idToken: Scalars['String'];
};


export type MutationPostCommentArgs = {
  payload: PostCommentPayload;
};


export type MutationPublishLearningGoalArgs = {
  learningGoalId: Scalars['String'];
};


export type MutationRateLearningGoalArgs = {
  learningGoalId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationRateLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  value: Scalars['Float'];
};


export type MutationRecommendLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
};


export type MutationRegisterArgs = {
  payload: RegisterPayload;
};


export type MutationRegisterGoogleArgs = {
  payload: RegisterGooglePayload;
};


export type MutationRemoveComplementaryResourceFromLearningPathArgs = {
  learningPathId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type MutationRemoveLearningMaterialHasPrerequisiteTopicArgs = {
  learningMaterialId: Scalars['String'];
  prerequisiteTopicId: Scalars['String'];
};


export type MutationRemoveTagsFromLearningMaterialArgs = {
  learningMaterialId: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationRemoveTopicHasPrerequisiteTopicArgs = {
  prerequisiteTopicId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationRemoveTopicTypesFromTopicArgs = {
  topicId: Scalars['String'];
  topicTypes: Array<Scalars['String']>;
};


export type MutationResetPasswordArgs = {
  payload: ResetPasswordPayload;
};


export type MutationSetResourcesConsumedArgs = {
  payload: SetResourcesConsumedPayload;
};


export type MutationSetTopicsKnownArgs = {
  payload: SetTopicsKnownPayload;
};


export type MutationSetTopicsUnknownArgs = {
  topicIds: Array<Scalars['String']>;
};


export type MutationShowLearningGoalInTopicArgs = {
  learningGoalId: Scalars['String'];
  payload: ShowLearningGoalInTopicPayload;
  topicId: Scalars['String'];
};


export type MutationShowLearningMaterialInTopicArgs = {
  learningMaterialId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationStartLearningGoalArgs = {
  learningGoalId: Scalars['String'];
};


export type MutationStartLearningPathArgs = {
  learningPathId: Scalars['String'];
};


export type MutationTriggerResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  id: Scalars['String'];
  payload: UpdateArticlePayload;
};


export type MutationUpdateCurrentUserArgs = {
  payload: UpdateCurrentUserPayload;
};


export type MutationUpdateLearningGoalArgs = {
  _id: Scalars['String'];
  payload: UpdateLearningGoalPayload;
};


export type MutationUpdateLearningPathArgs = {
  learningPathId: Scalars['String'];
  payload: UpdateLearningPathPayload;
};


export type MutationUpdateResourceArgs = {
  payload: UpdateResourcePayload;
  resourceId: Scalars['String'];
};


export type MutationUpdateTopicArgs = {
  payload: UpdateTopicPayload;
  topicId: Scalars['String'];
};


export type MutationUpdateTopicContextArgs = {
  contextTopicId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationUpdateTopicIsPartOfTopicArgs = {
  partOfTopicId: Scalars['String'];
  payload: UpdateTopicIsPartOfTopicPayload;
  subTopicId: Scalars['String'];
};


export type MutationUpdateTopicIsSubTopicOfTopicArgs = {
  parentTopicId: Scalars['String'];
  payload: UpdateTopicIsSubTopicOfTopicPayload;
  subTopicId: Scalars['String'];
};


export type MutationUpdateTopicTopicTypesArgs = {
  topicId: Scalars['String'];
  topicTypesNames: Array<Scalars['String']>;
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
};

export type PaginationOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PostCommentPayload = {
  contentMarkdown: Scalars['String'];
  discussionId: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
};

export enum PrereqParentsPathStopCondition {
  CommonParent = 'common_parent'
}

export type PullDescriptionsQueryOptions = {
  aliases?: InputMaybe<Array<Scalars['String']>>;
  contextName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentTopicName?: InputMaybe<Scalars['String']>;
};

export type PulledDescription = {
  __typename?: 'PulledDescription';
  description: Scalars['String'];
  resultName?: Maybe<Scalars['String']>;
  sourceName: PulledDescriptionSourceName;
  sourceUrl: Scalars['String'];
};

export enum PulledDescriptionSourceName {
  Google = 'google',
  Wikipedia = 'wikipedia'
}

export type Query = {
  __typename?: 'Query';
  analyzeResourceUrl: AnalyzeResourceUrlResult;
  autocompleteTopicName: SearchTopicsResult;
  checkLearningGoalKeyAvailability: CheckLearningGoalKeyAvailabilityResult;
  checkTopicKeyAvailability: CheckTopicKeyAvailabilityResult;
  checkUserKeyAvailability: CheckUserKeyAvailabilityResult;
  currentUser?: Maybe<CurrentUser>;
  getArticleByKey: Article;
  getCommentById: Comment;
  getHomePageData: GetHomePageDataResults;
  getLearningGoalByKey: LearningGoal;
  getLearningPathById: LearningPath;
  getLearningPathByKey: LearningPath;
  getResourceById: Resource;
  getResourceByKey: Resource;
  getTopLevelTopics: GetTopLevelTopicsResults;
  getTopicById: Topic;
  getTopicByKey: Topic;
  getTopicValidContexts: GetTopicValidContextsResult;
  getTopicValidContextsFromDisambiguation: GetTopicValidContextsFromDisambiguation;
  getTopicValidContextsFromSameName: GetTopicValidContextsFromSameName;
  getUser: User;
  globalSearch: GlobalSearchResults;
  listArticles: ListArticlesResult;
  pullTopicDescriptions: Array<PulledDescription>;
  searchLearningGoals: SearchLearningGoalsResult;
  searchLearningMaterialTags: Array<LearningMaterialTagSearchResult>;
  searchResources: SearchResourcesResult;
  searchSubTopics: SearchTopicsResult;
  searchTopicTypes: Array<TopicType>;
  searchTopics: SearchTopicsResult;
};


export type QueryAnalyzeResourceUrlArgs = {
  url: Scalars['String'];
};


export type QueryAutocompleteTopicNameArgs = {
  partialName: Scalars['String'];
};


export type QueryCheckLearningGoalKeyAvailabilityArgs = {
  key: Scalars['String'];
};


export type QueryCheckTopicKeyAvailabilityArgs = {
  key: Scalars['String'];
};


export type QueryCheckUserKeyAvailabilityArgs = {
  key: Scalars['String'];
};


export type QueryGetArticleByKeyArgs = {
  key: Scalars['String'];
};


export type QueryGetCommentByIdArgs = {
  commentId: Scalars['String'];
};


export type QueryGetLearningGoalByKeyArgs = {
  key: Scalars['String'];
};


export type QueryGetLearningPathByIdArgs = {
  learningPathId: Scalars['String'];
};


export type QueryGetLearningPathByKeyArgs = {
  learningPathKey: Scalars['String'];
};


export type QueryGetResourceByIdArgs = {
  resourceId: Scalars['String'];
};


export type QueryGetResourceByKeyArgs = {
  resourceKey: Scalars['String'];
};


export type QueryGetTopicByIdArgs = {
  topicId: Scalars['String'];
};


export type QueryGetTopicByKeyArgs = {
  topicKey: Scalars['String'];
};


export type QueryGetTopicValidContextsArgs = {
  parentTopicId: Scalars['String'];
  topicId: Scalars['String'];
};


export type QueryGetTopicValidContextsFromDisambiguationArgs = {
  disambiguationTopicId: Scalars['String'];
  parentTopicId: Scalars['String'];
};


export type QueryGetTopicValidContextsFromSameNameArgs = {
  existingSameNameTopicId: Scalars['String'];
  parentTopicId: Scalars['String'];
};


export type QueryGetUserArgs = {
  key: Scalars['String'];
};


export type QueryGlobalSearchArgs = {
  options?: InputMaybe<GlobalSearchOptions>;
  query: Scalars['String'];
};


export type QueryListArticlesArgs = {
  options: ListArticlesOptions;
};


export type QueryPullTopicDescriptionsArgs = {
  queryOptions: PullDescriptionsQueryOptions;
};


export type QuerySearchLearningGoalsArgs = {
  options: SearchLearningGoalsOptions;
};


export type QuerySearchLearningMaterialTagsArgs = {
  options: SearchLearningMaterialTagsOptions;
};


export type QuerySearchResourcesArgs = {
  options: SearchResourcesOptions;
  query: Scalars['String'];
};


export type QuerySearchSubTopicsArgs = {
  options: SearchTopicsOptions;
  topicIds: Array<Scalars['String']>;
};


export type QuerySearchTopicTypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QuerySearchTopicsArgs = {
  options: SearchTopicsOptions;
};

export type RegisterGooglePayload = {
  displayName: Scalars['String'];
  idToken: Scalars['String'];
  key: Scalars['String'];
};

export type RegisterPayload = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  key: Scalars['String'];
  password: Scalars['String'];
};

export type RemoveTopicHasPrerequisiteTopicResult = {
  __typename?: 'RemoveTopicHasPrerequisiteTopicResult';
  prerequisiteTopic: Topic;
  topic: Topic;
};

export type RequiredInGoalItem = {
  __typename?: 'RequiredInGoalItem';
  goal: LearningGoal;
  strength: Scalars['Float'];
};

export type ResetPasswordPayload = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  currentUser: CurrentUser;
};

export type Resource = LearningMaterial & {
  __typename?: 'Resource';
  _id: Scalars['String'];
  comments?: Maybe<CommentResults>;
  consumed?: Maybe<ConsumedResource>;
  coveredSubTopics?: Maybe<LearningMaterialCoveredSubTopicsResults>;
  coveredSubTopicsTree?: Maybe<Array<Topic>>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  key: Scalars['String'];
  name: Scalars['String'];
  nextResource?: Maybe<Resource>;
  parentResources?: Maybe<Array<Resource>>;
  prerequisites?: Maybe<Array<LearningMaterialHasPrerequisiteTopic>>;
  previousResource?: Maybe<Resource>;
  rating?: Maybe<Scalars['Float']>;
  recommendationsCount?: Maybe<Scalars['Int']>;
  recommended?: Maybe<LearningMaterialRecommended>;
  recommendedBy?: Maybe<Array<UserRecommendedLearningMaterial>>;
  seriesParentResource?: Maybe<Resource>;
  showedIn?: Maybe<Array<Topic>>;
  subResourceSeries?: Maybe<Array<Resource>>;
  subResources?: Maybe<Array<Resource>>;
  tags?: Maybe<Array<LearningMaterialTag>>;
  types: Array<ResourceType>;
  url: Scalars['String'];
};


export type ResourceCommentsArgs = {
  options: CommentOptions;
};


export type ResourceCoveredSubTopicsArgs = {
  options: LearningMaterialCoveredSubTopicsOptions;
};


export type ResourceRecommendedByArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type ResourceData = {
  __typename?: 'ResourceData';
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  subResourceSeries?: Maybe<Array<SubResourceExtractedData>>;
  types?: Maybe<Array<ResourceType>>;
};

export enum ResourceType {
  Article = 'article',
  ArticleSeries = 'article_series',
  Book = 'book',
  Course = 'course',
  Documentary = 'documentary',
  Exercise = 'exercise',
  Infographic = 'infographic',
  OnlineBook = 'online_book',
  Other = 'other',
  Podcast = 'podcast',
  PodcastEpisode = 'podcast_episode',
  Project = 'project',
  ResearchPaper = 'research_paper',
  Talk = 'talk',
  Tweet = 'tweet',
  VideoGame = 'video_game',
  Website = 'website',
  YoutubePlaylist = 'youtube_playlist',
  YoutubeVideo = 'youtube_video'
}

export type SearchLearningGoalsOptions = {
  pagination: PaginationOptions;
  query?: InputMaybe<Scalars['String']>;
};

export type SearchLearningGoalsResult = {
  __typename?: 'SearchLearningGoalsResult';
  items: Array<LearningGoal>;
};

export type SearchLearningMaterialTagsOptions = {
  pagination: PaginationOptions;
  query: Scalars['String'];
};

export type SearchResourcesOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type SearchResourcesResult = {
  __typename?: 'SearchResourcesResult';
  items: Array<Resource>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  entity: SearchResultEntity;
  score: Scalars['Float'];
};

export type SearchResultEntity = LearningPath | Resource | Topic;

export type SearchTopicsOptions = {
  pagination: PaginationOptions;
  query: Scalars['String'];
};

export type SearchTopicsResult = {
  __typename?: 'SearchTopicsResult';
  items: Array<Topic>;
};

export type SetResourcesConsumedPayload = {
  resources: Array<SetResourcesConsumedPayloadResourcesField>;
};

export type SetResourcesConsumedPayloadResourcesField = {
  consumed?: InputMaybe<Scalars['Boolean']>;
  opened?: InputMaybe<Scalars['Boolean']>;
  resourceId: Scalars['String'];
};

export type SetTopicKnownPayloadTopicsField = {
  level?: InputMaybe<Scalars['Float']>;
  topicId: Scalars['String'];
};

export type SetTopicsKnownPayload = {
  topics: Array<SetTopicKnownPayloadTopicsField>;
};

export type ShowLearningGoalInTopicPayload = {
  index?: InputMaybe<Scalars['Float']>;
};

export type ShowLearningGoalInTopicResult = {
  __typename?: 'ShowLearningGoalInTopicResult';
  learningGoal: LearningGoal;
  topic: Topic;
};

export enum SortingDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SubGoal = LearningGoal | Topic;

export type SubGoalItem = {
  __typename?: 'SubGoalItem';
  strength: Scalars['Float'];
  subGoal: SubGoal;
};

export type SubResourceCreatedResult = {
  __typename?: 'SubResourceCreatedResult';
  parentResource: Resource;
  subResource: Resource;
};

export type SubResourceExtractedData = {
  __typename?: 'SubResourceExtractedData';
  description?: Maybe<Scalars['String']>;
  durationSeconds?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  types: Array<ResourceType>;
  url: Scalars['String'];
};

export type SubResourceSeriesCreatedResult = {
  __typename?: 'SubResourceSeriesCreatedResult';
  seriesParentResource: Resource;
  subResource: Resource;
};

export enum SubTopicRelationshipType {
  IsPartOf = 'IS_PART_OF',
  IsSubtopicOf = 'IS_SUBTOPIC_OF'
}

export type TagFilter = {
  __typename?: 'TagFilter';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type Topic = {
  __typename?: 'Topic';
  _id: Scalars['String'];
  aggregatedSubtopicsPrerequisites?: Maybe<Array<AggregatedSubtopicPrerequisite>>;
  aliases?: Maybe<Array<Scalars['String']>>;
  comments?: Maybe<CommentResults>;
  context?: Maybe<Scalars['String']>;
  contextTopic?: Maybe<Topic>;
  contextualisedTopics?: Maybe<Array<Topic>>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  descriptionSourceUrl?: Maybe<Scalars['String']>;
  disambiguationTopic?: Maybe<Topic>;
  followUps?: Maybe<Array<TopicHasPrerequisiteTopic>>;
  isDisambiguation?: Maybe<Scalars['Boolean']>;
  key: Scalars['String'];
  learningMaterials?: Maybe<TopicLearningMaterialsResults>;
  learningMaterialsAvailableTypeFilters?: Maybe<TopicLearningMaterialsAvailableTypeFilters>;
  learningMaterialsTotalCount?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Float']>;
  managePageComments?: Maybe<CommentResults>;
  name: Scalars['String'];
  otherContextsTopics?: Maybe<Array<Topic>>;
  parentTopic?: Maybe<Topic>;
  partOfTopics?: Maybe<Array<TopicIsPartOfTopic>>;
  prerequisites?: Maybe<Array<TopicHasPrerequisiteTopic>>;
  subTopics?: Maybe<Array<TopicIsSubTopicOfTopic>>;
  subTopicsTotalCount?: Maybe<Scalars['Int']>;
  topicTypes?: Maybe<Array<TopicType>>;
  wikipediaPageUrl?: Maybe<Scalars['String']>;
};


export type TopicAggregatedSubtopicsPrerequisitesArgs = {
  options: AggregatedSubtopicsPrerequisitesOptions;
};


export type TopicCommentsArgs = {
  options: CommentOptions;
};


export type TopicLearningMaterialsArgs = {
  options: TopicLearningMaterialsOptions;
};


export type TopicManagePageCommentsArgs = {
  options: CommentOptions;
};


export type TopicSubTopicsArgs = {
  options?: InputMaybe<TopicSubTopicsOptions>;
};

export type TopicHasPrerequisiteTopic = {
  __typename?: 'TopicHasPrerequisiteTopic';
  followUpTopic: Topic;
  prerequisiteTopic: Topic;
  strength: Scalars['Float'];
};

export type TopicIsPartOfTopic = {
  __typename?: 'TopicIsPartOfTopic';
  createdAt: Scalars['Date'];
  createdByUserId?: Maybe<Scalars['String']>;
  index: Scalars['Float'];
  partOfTopic: Topic;
  subTopic: Topic;
};

export type TopicIsSubTopicOfTopic = {
  __typename?: 'TopicIsSubTopicOfTopic';
  createdAt: Scalars['Date'];
  createdByUserId?: Maybe<Scalars['String']>;
  index: Scalars['Float'];
  parentTopic: Topic;
  relationshipType: SubTopicRelationshipType;
  subTopic: Topic;
};

export type TopicLearningMaterialsAvailableTypeFilters = {
  __typename?: 'TopicLearningMaterialsAvailableTypeFilters';
  geq30minCount: Scalars['Int'];
  learningPathsCount: Scalars['Int'];
  leq30minCount: Scalars['Int'];
  types: Array<ResourceType>;
};

export type TopicLearningMaterialsFilterOptions = {
  completedByUser?: InputMaybe<Scalars['Boolean']>;
  durationSecondsGeq?: InputMaybe<Scalars['Int']>;
  durationSecondsLeq?: InputMaybe<Scalars['Int']>;
  learningMaterialTagsIn?: InputMaybe<Array<Scalars['String']>>;
  learningMaterialTypeIn?: InputMaybe<Array<LearningMaterialType>>;
  resourceTypeIn?: InputMaybe<Array<ResourceType>>;
};

export type TopicLearningMaterialsOptions = {
  filter: TopicLearningMaterialsFilterOptions;
  pagination?: InputMaybe<PaginationOptions>;
  query?: InputMaybe<Scalars['String']>;
  sortingType: TopicLearningMaterialsSortingType;
};

export type TopicLearningMaterialsResults = {
  __typename?: 'TopicLearningMaterialsResults';
  availableTagFilters: Array<TagFilter>;
  items: Array<LearningMaterial>;
  totalCount: Scalars['Int'];
};

export enum TopicLearningMaterialsSortingType {
  MostRecommended = 'most_recommended',
  Newest = 'newest'
}

export type TopicSubTopicsFilterOptions = {
  currentTopicTypesNotIn?: InputMaybe<Array<Scalars['String']>>;
};

export type TopicSubTopicsOptions = {
  filter?: InputMaybe<TopicSubTopicsFilterOptions>;
};

export type TopicType = {
  __typename?: 'TopicType';
  color?: Maybe<TopicTypeColor>;
  iconName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  usageCount?: Maybe<Scalars['Int']>;
};

export enum TopicTypeColor {
  Blue = 'blue',
  Green = 'green',
  Orange = 'orange',
  Red = 'red'
}

export type TriggerResetPasswordResponse = {
  __typename?: 'TriggerResetPasswordResponse';
  errorMessage?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateArticlePayload = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCurrentUserPayload = {
  bio?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  profilePictureUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateLearningGoalDependenciesResult = {
  __typename?: 'UpdateLearningGoalDependenciesResult';
  learningGoal: LearningGoal;
  learningGoalDependency: LearningGoal;
  parentLearningGoal: LearningGoal;
};

export type UpdateLearningGoalPayload = {
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<LearningGoalType>;
};

export type UpdateLearningPathPayload = {
  description?: InputMaybe<Scalars['String']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  outro?: InputMaybe<Scalars['String']>;
  public?: InputMaybe<Scalars['Boolean']>;
  resourceItems?: InputMaybe<Array<CreateLearningPathResourceItem>>;
};

export type UpdateResourcePayload = {
  description?: InputMaybe<Scalars['String']>;
  durationSeconds?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<ResourceType>>;
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateTopicIsPartOfTopicPayload = {
  index?: InputMaybe<Scalars['Float']>;
};

export type UpdateTopicIsSubTopicOfTopicPayload = {
  index?: InputMaybe<Scalars['Float']>;
};

export type UpdateTopicPayload = {
  aliases?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  descriptionSourceUrl?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  wikipediaPageUrl?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  articles?: Maybe<ListArticlesResult>;
  bio?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  key: Scalars['String'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  role: UserRole;
};


export type UserArticlesArgs = {
  options: ListArticlesOptions;
};

export type UserConsumedResourceItem = {
  __typename?: 'UserConsumedResourceItem';
  consumedAt?: Maybe<Scalars['Date']>;
  lastOpenedAt?: Maybe<Scalars['Date']>;
  openedAt?: Maybe<Scalars['Date']>;
  resource: Resource;
};

export type UserConsumedResourcesFilter = {
  completed?: InputMaybe<Scalars['Boolean']>;
};

export type UserConsumedResourcesOptions = {
  filter?: InputMaybe<UserConsumedResourcesFilter>;
  pagination?: InputMaybe<PaginationOptions>;
  sorting: UserConsumedResourcesSortingType;
};

export type UserConsumedResourcesResult = {
  __typename?: 'UserConsumedResourcesResult';
  count: Scalars['Int'];
  items: Array<UserConsumedResourceItem>;
};

export enum UserConsumedResourcesSortingType {
  LastOpened = 'lastOpened'
}

export type UserLearningPathsOptions = {
  pagination?: InputMaybe<PaginationOptions>;
};

export type UserRecommendedLearningMaterial = {
  __typename?: 'UserRecommendedLearningMaterial';
  learningMaterial: LearningMaterial;
  recommendedAt: Scalars['Date'];
  user: User;
};

export enum UserRole {
  Admin = 'ADMIN',
  Contributor = 'CONTRIBUTOR',
  User = 'USER'
}

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  email: Scalars['String'];
};
