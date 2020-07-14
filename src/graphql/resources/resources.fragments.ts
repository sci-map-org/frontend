import gql from 'graphql-tag';
import { ConceptData } from '../concepts/concepts.fragments';
import { ResourceMediaType, ResourceType } from '../types';
import { ResourcePreviewDataFragment, ResourceDataFragment } from './resources.fragments.generated';

// Define fragment based on components use cases

export const ResourceData = gql`
  fragment ResourceData on Resource {
    _id
    name
    type
    mediaType
    url
    description
    durationMn
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
  }
`;

export const generateResourceData = (): ResourceDataFragment => ({
  _id: Math.random().toString(),
  name: 'My awesome resource name',
  type: ResourceType.Article,
  mediaType: ResourceMediaType.Text,
  url: 'https://myresource.url',
});

export const ResourcePreviewData = gql`
  fragment ResourcePreviewData on Resource {
    _id
    name
    type
    mediaType
    url
    description
    durationMn
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
    coveredConcepts(options: {}) {
      items {
        ...ConceptData
      }
    }
    upvotes
  }
  ${ConceptData}
`;

export const generateResourcePreviewData = (): ResourcePreviewDataFragment => ({
  _id: Math.random().toString(),
  name: 'My resource name',
  type: ResourceType.Article,
  url: 'https://myresource.url',
  mediaType: ResourceMediaType.Text,
});
