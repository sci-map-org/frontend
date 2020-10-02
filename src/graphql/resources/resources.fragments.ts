import gql from 'graphql-tag';
import { ConceptData } from '../concepts/concepts.fragments';
import { DomainData } from '../domains/domains.fragments';
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
    durationMs
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
    durationMs
    tags {
      name
    }
    consumed {
      openedAt
      consumedAt
    }
    coveredConceptsByDomain {
      domain {
        _id
        key
      }
      coveredConcepts {
        ...ConceptData
      }
    }
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
  ${ConceptData}
`;

export const generateResourcePreviewData = (): ResourcePreviewDataFragment => ({
  _id: Math.random().toString(),
  name: 'My resource name',
  type: ResourceType.Article,
  url: 'https://myresource.url',
  mediaType: ResourceMediaType.Text,
});

export const ResourceWithCoveredConceptsByDomainData = gql`
  fragment ResourceWithCoveredConceptsByDomainData on Resource {
    _id
    coveredConceptsByDomain {
      domain {
        ...DomainData
      }
      coveredConcepts {
        ...ConceptData
      }
    }
  }
  ${DomainData}
  ${ConceptData}
`;
