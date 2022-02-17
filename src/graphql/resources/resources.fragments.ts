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
    key
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
    key
    name
  }
`;

export const generateResourceData = (): ResourceDataFragment => ({
  _id: Math.random().toString(),
  key: '23rmfsw_my_resource',
  name: 'My awesome resource name',
  types: [ResourceType.Article],
  url: 'https://myresource.url',
});

export const ResourceFeedCardData = gql`
  fragment ResourceFeedCardData on Resource {
    _id
    key
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
      ...ResourceLinkData
    }
    subResources {
      ...ResourceLinkData
    }
    createdAt
  }
  ${TopicLinkData}
  ${ResourceLinkData}
  ${LearningMaterialRecommendationsViewerData}
`;
export const generateResourceFeedCardData = (): ResourceFeedCardDataFragment => ({
  _id: Math.random().toString(),
  key: '12r3rf_my_resource',
  name: 'My resource name',
  types: [ResourceType.Article],
  url: 'https://myresource.url',
  recommendationsCount: 2,
  createdAt: new Date().toISOString(),
});

export const ResourcePreviewCardData = gql`
  fragment ResourcePreviewCardData on Resource {
    _id
    key
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
      ...ResourceLinkData
    }
    subResources {
      ...ResourceLinkData
    }
  }
  ${ResourceLinkData}
  ${TopicLinkData}
  ${LearningMaterialRecommendationsViewerData}
`;

export const generateResourcePreviewCardData = (): ResourcePreviewCardDataFragment => ({
  _id: Math.random().toString(),
  key: '124e3rf_my_resource_name',
  name: 'My resource name',
  types: [ResourceType.Article],
  url: 'https://myresource.url',
});

export const ResourceWithCoveredTopicsData = gql`
  fragment ResourceWithCoveredTopicsData on Resource {
    ...ResourceLinkData
    coveredSubTopics(options: {}) {
      items {
        ...TopicLinkData
      }
    }
  }
  ${ResourceLinkData}
`;
