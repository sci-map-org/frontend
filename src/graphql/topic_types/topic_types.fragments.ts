import gql from 'graphql-tag';

export const TopicTypeFullData = gql`
  fragment TopicTypeFullData on TopicType {
    name
    iconName
    color
    usageCount
  }
`;
