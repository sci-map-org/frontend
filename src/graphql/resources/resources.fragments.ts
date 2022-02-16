import gql from 'graphql-tag';
import { LearningMaterialRecommendationsViewerData } from '../../components/learning_materials/LearningMaterialRecommendationsViewer';
import { TopicLinkData } from '../topics/topics.fragments';
import { ResourceType } from '../types';
import {
  ResourceDataFragment,
  ResourceFeedCardDataFragment,
  ResourcePreviewCardDataFragment,
} from './resources.fragments.generated';

export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
    types
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
  url: 'https://myresource.url',
});

export const ResourceFeedCardData = gql`
  fragment ResourceFeedCardData on Resource {
    _id
    name
    types
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

    ...LearningMaterialRecommendationsViewerData
    coveredSubTopics(options: {}) {
      items {
        ...TopicLinkData
      }
    }
    prerequisites {
      topic {
        ...TopicLinkData
      }
    }
    subResourceSeries {
      _id
      name
    }
    subResources {
      _id
      name
    }
    createdAt
  }
  ${TopicLinkData}
  ${LearningMaterialRecommendationsViewerData}
`;
export const generateResourceFeedCardData = (): ResourceFeedCardDataFragment => ({
  _id: Math.random().toString(),
  name: 'My resource name',
  types: [ResourceType.Article],
  url: 'https://myresource.url',
  recommendationsCount: 2,
  createdAt: new Date().toISOString(),
});

export const ResourcePreviewCardData = gql`
  fragment ResourcePreviewCardData on Resource {
    _id
    name
    types
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
    ...LearningMaterialRecommendationsViewerData
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
  ${LearningMaterialRecommendationsViewerData}
`;

export const generateResourcePreviewCardData = (): ResourcePreviewCardDataFragment => ({
  _id: Math.random().toString(),
  name: 'My resource name',
  types: [ResourceType.Article],
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
