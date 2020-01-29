import * as Types from '../types';


export type DomainDataFragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, '_id' | 'name' | 'key' | 'description'>
);

