import gql from 'graphql-tag';
import { DomainData } from '../domains/domains.fragments';
import { LearningGoalData } from './learning_goals.fragments';

export const createLearningGoal = gql`
  mutation createLearningGoal($payload: CreateLearningGoalPayload!) {
    createLearningGoal(payload: $payload) {
      ...LearningGoalData
    }
  }
  ${LearningGoalData}
`;

export const addLearningGoalToDomain = gql`
  mutation addLearningGoalToDomain($domainId: String!, $payload: AddLearningGoalToDomainPayload!) {
    addLearningGoalToDomain(domainId: $domainId, payload: $payload) {
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
