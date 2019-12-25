import * as Types from '../types';

export type DomainDataFragment = { __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'name' | 'key' | 'description'>;

export type GetDomainByKeyQueryVariables = {
  key: Types.Scalars['String'];
};

export type GetDomainByKeyQueryResult = { __typename?: 'Query' } & {
  getDomainByKey: { __typename?: 'Domain' } & DomainDataFragment;
};

export type SearchDomainsQueryVariables = {
  options: Types.SearchDomainsOptions;
};

export type SearchDomainsQueryResult = { __typename?: 'Query' } & {
  searchDomains: { __typename?: 'SearchDomainsResult' } & {
    items: Array<{ __typename?: 'Domain' } & DomainDataFragment>;
  };
};

export type CreateDomainMutationVariables = {
  payload: Types.CreateDomainPayload;
};

export type CreateDomainMutationResult = { __typename?: 'Mutation' } & {
  createDomain: { __typename?: 'Domain' } & DomainDataFragment;
};

import gql from 'graphql-tag';
export const DomainData = gql`
  fragment DomainData on Domain {
    _id
    name
    key
    description
  }
`;
export const GetDomainByKeyOperation = gql`
  query getDomainByKey($key: String!) {
    getDomainByKey(key: $key) {
      ...DomainData
    }
  }
  ${DomainData}
`;
export const SearchDomainsOperation = gql`
  query searchDomains($options: SearchDomainsOptions!) {
    searchDomains(options: $options) {
      items {
        ...DomainData
      }
    }
  }
  ${DomainData}
`;
export const CreateDomainOperation = gql`
  mutation createDomain($payload: CreateDomainPayload!) {
    createDomain(payload: $payload) {
      ...DomainData
    }
  }
  ${DomainData}
`;
