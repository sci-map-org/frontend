import gql from 'graphql-tag';

export const DomainData = gql`
  fragment DomainData on Domain {
    _id
    name
    key
    description
  }
`;
