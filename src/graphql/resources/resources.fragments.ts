import gql from 'graphql-tag';
import { ConceptData } from '../concepts/concepts.fragments';

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
  }
`;

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
    coveredConcepts(options: {}) {
      items {
        ...ConceptData
      }
    }
  }
  ${ConceptData}
`;
