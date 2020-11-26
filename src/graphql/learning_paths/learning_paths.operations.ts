import gql from 'graphql-tag';
import { LearningPathWithResourceItemsPreviewData } from './learning_paths.fragments';

export const startLearningPath = gql`
  mutation startLearningPath($learningPathId: String!) {
    startLearningPath(learningPathId: $learningPathId) {
      learningPath {
        _id
        key
        started {
          startedAt
        }
      }
      user {
        _id
      }
    }
  }
`;

export const completeLearningPath = gql`
  mutation completeLearningPath($learningPathId: String!, $completed: Boolean!) {
    completeLearningPath(learningPathId: $learningPathId, completed: $completed) {
      learningPath {
        _id
        key
        started {
          startedAt
          completedAt
        }
      }
      user {
        _id
      }
    }
  }
`;

export const updateLearningPath = gql`
  mutation updateLearningPath($_id: String!, $payload: UpdateLearningPathPayload!) {
    updateLearningPath(_id: $_id, payload: $payload) {
      ...LearningPathWithResourceItemsPreviewData
    }
  }
  ${LearningPathWithResourceItemsPreviewData}
`;

export const deleteLearningPath = gql`
  mutation deleteLearningPath($_id: String!) {
    deleteLearningPath(_id: $_id) {
      _id
      success
    }
  }
`;
