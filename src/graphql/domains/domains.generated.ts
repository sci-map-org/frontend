import * as Types from '../types';

export type GetDomainByKeyQueryVariables = {
  key: Types.Scalars['String'];
};

export type GetDomainByKeyQueryResult = { __typename?: 'Query' } & {
  getDomainByKey: { __typename?: 'Domain' } & Pick<Types.Domain, '_id' | 'name'>;
};

import gql from 'graphql-tag';

export const GetDomainByKeyOperation = gql`
  query getDomainByKey($key: String!) {
    getDomainByKey(key: $key) {
      _id
      name
    }
  }
`;
