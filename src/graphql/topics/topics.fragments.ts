import gql from 'graphql-tag';
import { TopicFullDataFragment } from './topics.fragments.generated';

export const TopicLinkData = gql`
  fragment TopicLinkData on Topic {
    _id
    key
    name
    context
  }
`;

export const TopicFullData = gql`
  fragment TopicFullData on Topic {
    _id
    name
    key
    context
    isDisambiguation
    description
    descriptionSourceUrl
    wikipediaPageUrl
    aliases
    level
    createdAt
  }
`;

export const generateTopicData = (): TopicFullDataFragment => ({
  _id: Math.random().toString(),
  name: 'Placeholder Name',
  key: Math.random().toString(),
  description: 'One line description',
  createdAt: new Date().toISOString(),
});
