import gql from 'graphql-tag';
import { SubGoalCardData } from '../../components/learning_goals/SubGoalCard';
import { DomainData } from '../domains/domains.fragments';
import { LearningGoalData } from './learning_goals.fragments';

export const createLearningGoal = gql`
  mutation createLearningGoal($payload: CreateLearningGoalPayload!, $options: CreateLearningGoalOptions) {
    createLearningGoal(payload: $payload, options: $options) {
      ...LearningGoalData
    }
  }
  ${LearningGoalData}
`;

export const addLearningGoalToDomain = gql`
  mutation addLearningGoalToDomain(
    $domainId: String!
    $payload: AddLearningGoalToDomainPayload!
    $options: AddLearningGoalToDomainOptions
  ) {
    addLearningGoalToDomain(domainId: $domainId, payload: $payload, options: $options) {
      learningGoal {
        ...LearningGoalData
        domain {
          domain {
            ...DomainData
          }
          contextualKey
          contextualName
        }
      }
    }
  }
  ${DomainData}
  ${LearningGoalData}
`;

export const updateLearningGoal = gql`
  mutation updateLearningGoal($_id: String!, $payload: UpdateLearningGoalPayload!) {
    updateLearningGoal(_id: $_id, payload: $payload) {
      ...LearningGoalData
    }
  }
  ${LearningGoalData}
`;

export const deleteLearningGoal = gql`
  mutation deleteLearningGoal($_id: String!) {
    deleteLearningGoal(_id: $_id) {
      _id
      success
    }
  }
`;

export const attachLearningGoalRequiresSubGoal = gql`
  mutation attachLearningGoalRequiresSubGoal(
    $learningGoalId: String!
    $subGoalId: String!
    $payload: AttachLearningGoalRequiresSubGoalPayload!
  ) {
    attachLearningGoalRequiresSubGoal(learningGoalId: $learningGoalId, subGoalId: $subGoalId, payload: $payload) {
      learningGoal {
        _id
        requiredSubGoals {
          ...SubGoalCardData
        }
      }
    }
  }
  ${SubGoalCardData}
`;

export const detachLearningGoalRequiresSubGoal = gql`
  mutation detachLearningGoalRequiresSubGoal($learningGoalId: String!, $subGoalId: String!) {
    detachLearningGoalRequiresSubGoal(learningGoalId: $learningGoalId, subGoalId: $subGoalId) {
      learningGoal {
        _id
        requiredSubGoals {
          ...SubGoalCardData
        }
      }
    }
  }
  ${SubGoalCardData}
`;

export const startLearningGoal = gql`
  mutation startLearningGoal($learningGoalId: String!) {
    startLearningGoal(learningGoalId: $learningGoalId) {
      learningGoal {
        _id
        started {
          startedAt
        }
      }
      currentUser {
        startedLearningGoals(options: {}) {
          startedAt
          learningGoal {
            _id
          }
        }
      }
    }
  }
`;

export const publishLearningGoal = gql`
  mutation publishLearningGoal($learningGoalId: String!) {
    publishLearningGoal(learningGoalId: $learningGoalId) {
      learningGoal {
        _id
        publishedAt
        hidden
        requiredSubGoals {
          subGoal {
            ... on LearningGoal {
              _id
              publishedAt
              hidden
            }
          }
        }
      }
    }
  }
`;
