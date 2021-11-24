import gql from 'graphql-tag';
import { ResourceMediaType, ResourceType } from '../types';
import { ResourceDataFragment } from './resources.fragments.generated';

export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
    type
    mediaType
    url
    description
    durationSeconds
    rating
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
  }
`;

export const ResourceLinkData = gql`
  fragment ResourceLinkData on Resource {
    _id
    name
  }
`;

export const generateResourceData = (): ResourceDataFragment => ({
  _id: Math.random().toString(),
  name: 'My awesome resource name',
  type: ResourceType.Article,
  mediaType: ResourceMediaType.Text,
  url: 'https://myresource.url',
});

export const ResourceWithCoveredTopicsData = gql`
  fragment ResourceWithCoveredTopicsData on Resource {
    _id
    coveredSubTopics(options: {}) {
      items {
        ...TopicLinkData
      }
    }
  }
`;
