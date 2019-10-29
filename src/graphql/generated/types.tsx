export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  _id: Scalars['String'],
  email: Scalars['String'],
  displayName: Scalars['String'],
  uniqueName: Scalars['String'],
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
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  payload: RegisterPayload
};

export type Query = {
   __typename?: 'Query',
  currentUser: CurrentUser,
};

export type RegisterPayload = {
  displayName: Scalars['String'],
  uniqueName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  _id: Scalars['String'],
  email: Scalars['String'],
  displayName: Scalars['String'],
  uniqueName: Scalars['String'],
};

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutationResult = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', jwt: string, currentUser: { __typename?: 'CurrentUser', _id: string, email: string, uniqueName: string } } };

export type RegisterMutationVariables = {
  payload: RegisterPayload
};


export type RegisterMutationResult = { __typename?: 'Mutation', register: { __typename?: 'CurrentUser', _id: string, email: string, uniqueName: string } };

export type CurrentUserQueryVariables = {};


export type CurrentUserQueryResult = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', _id: string, email: string, uniqueName: string } };
