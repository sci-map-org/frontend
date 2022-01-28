import gql from 'graphql-tag';
import { TopicLinkData } from '../topics/topics.fragments';
import { ResourceMediaType, ResourceType } from '../types';
import { ResourceDataFragment, ResourcePreviewCardDataFragment } from './resources.fragments.generated';

export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
    types
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
  types: [ResourceType.Article],
  mediaType: ResourceMediaType.Text,
  url: 'https://myresource.url',
});

export const ResourcePreviewCardData = gql`
  fragment ResourcePreviewCardData on Resource {
    _id
    name
    types
    mediaType
    url
    description
    durationSeconds
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
    coveredSubTopics(options: {}) {
      items {
        ...TopicLinkData
      }
    }
    rating
    subResourceSeries {
      _id
      name
    }
    subResources {
      _id
      name
    }
  }
  ${TopicLinkData}
`;

export const generateResourcePreviewCardData = (): ResourcePreviewCardDataFragment => ({
  _id: Math.random().toString(),
  name: 'My resource name',
  types: [ResourceType.Article],
  url: 'https://myresource.url',
  mediaType: ResourceMediaType.Text,
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
