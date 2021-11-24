import gql from 'graphql-tag';
import { ResourceMediaType, ResourceType } from '../types';
import { ResourcePreviewDataFragment, ResourceDataFragment } from './resources.fragments.generated';

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

export const ResourcePreviewData = gql`
  fragment ResourcePreviewData on Resource {
    _id
    name
    type
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
    # coveredConceptsByDomain {
    #   domain {
    #     ...DomainData
    #   }
    #   coveredConcepts {
    #     ...ConceptData
    #   }
    # }
    upvotes
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
`;

export const generateResourcePreviewData = (): ResourcePreviewDataFragment => ({
  _id: Math.random().toString(),
  name: 'My resource name',
  type: ResourceType.Article,
  url: 'https://myresource.url',
  mediaType: ResourceMediaType.Text,
  upvotes: 32,
});

export const ResourceWithCoveredConceptsByDomainData = gql`
  fragment ResourceWithCoveredConceptsByDomainData on Resource {
    _id
    # coveredConceptsByDomain {
    #   domain {
    #     ...DomainData
    #   }
    #   coveredConcepts {
    #     ...ConceptData
    #   }
    # }
  }
`;
