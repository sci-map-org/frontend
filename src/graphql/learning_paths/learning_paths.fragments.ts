import gql from 'graphql-tag';
import { ResourcePreviewCardData } from '../resources/resources.fragments';
import { LearningPathDataFragment } from './learning_paths.fragments.generated';

export const LearningPathData = gql`
  fragment LearningPathData on LearningPath {
    _id
    key
    public
    name
    description
    durationSeconds
  }
`;

export const LearningPathLinkData = gql`
  fragment LearningPathLinkData on LearningPath {
    _id
    key
    name
  }
`;

export const LearningPathWithResourceItemsPreviewData = gql`
  fragment LearningPathWithResourceItemsPreviewData on LearningPath {
    ...LearningPathData
    resourceItems {
      resource {
        ...ResourcePreviewCardData
      }
      description
    }
  }
  ${LearningPathData}
  ${ResourcePreviewCardData}
`;

export const generateLearningPathData = (): LearningPathDataFragment => ({
  _id: Math.random().toString(),
  key: Math.random().toString(),
  name: 'Learning Path',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  public: false,
});
