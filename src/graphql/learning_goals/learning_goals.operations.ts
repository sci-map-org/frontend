import gql from 'graphql-tag';
import { SubGoalCardData } from '../../components/learning_goals/SubGoalCard';
import { LearningGoalData } from './learning_goals.fragments';

export const checkLearningGoalKeyAvailability = gql`
  query checkLearningGoalKeyAvailability($key: String!) {
    checkLearningGoalKeyAvailability(key: $key) {
      available
      existingLearningGoal {
        _id
        name
      }
    }
  }
`;

export const createLearningGoal = gql`
  mutation createLearningGoal($payload: CreateLearningGoalPayload!, $options: CreateLearningGoalOptions) {
    createLearningGoal(payload: $payload, options: $options) {
      ...LearningGoalData
      # domain {
      #   index
      #   domain {
      #     ...DomainLinkData
      #   }
      # }
    }
  }
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

export const indexLearningGoal = gql`
  mutation indexLearningGoal($learningGoalId: String!) {
    indexLearningGoal(learningGoalId: $learningGoalId) {
      learningGoal {
        _id
        hidden
        # domain {
        #   domain {
        #     learningGoals {
        #       learningGoal {
        #         _id
        #       }
        #       index
        #     }
        #   }
        # }
      }
    }
  }
`;

// TODO
// export const attachLearningGoalToDomain = gql`
//   mutation attachLearningGoalToDomain(
//     $learningGoalId: String!
//     $domainId: String!
//     $payload: AttachLearningGoalToDomainPayload!
//   ) {
//     attachLearningGoalToDomain(learningGoalId: $learningGoalId, domainId: $domainId, payload: $payload) {
//       learningGoal {
//         _id
//         domain {
//           index
//           domain {
//             ...DomainData
//           }
//         }
//       }
//     }
//   }
//   ${DomainData}
// `;

// export const detachLearningGoalFromDomain = gql`
//   mutation detachLearningGoalFromDomain($learningGoalId: String!, $domainId: String!) {
//     detachLearningGoalFromDomain(learningGoalId: $learningGoalId, domainId: $domainId) {
//       learningGoal {
//         _id
//         # ===> Ignore this as else it creates an error on a DLG page during domain change => domain doesn't exists anymore
//         # ===> Just switch domain instantly
//         # domain {
//         #   index
//         #   domain {
//         #     ...DomainData
//         #   }
//         # }
//       }
//     }
//   }
// `;

export const attachLearningGoalDependency = gql`
  mutation attachLearningGoalDependency(
    $parentLearningGoalId: String!
    $learningGoalId: String!
    $learningGoalDependencyId: String!
  ) {
    attachLearningGoalDependency(
      parentLearningGoalId: $parentLearningGoalId
      learningGoalId: $learningGoalId
      learningGoalDependencyId: $learningGoalDependencyId
    ) {
      parentLearningGoal {
        _id
        requiredSubGoals {
          subGoal {
            ... on LearningGoal {
              _id
              dependsOnLearningGoals {
                learningGoal {
                  _id
                }
                parentLearningGoalId
              }
            }
          }
        }
      }
      learningGoal {
        _id
        dependsOnLearningGoals {
          learningGoal {
            _id
          }
          parentLearningGoalId
        }
      }
      learningGoalDependency {
        _id
        dependantLearningGoals {
          learningGoal {
            _id
          }
          parentLearningGoalId
        }
      }
    }
  }
`;

export const detachLearningGoalDependency = gql`
  mutation detachLearningGoalDependency(
    $parentLearningGoalId: String!
    $learningGoalId: String!
    $learningGoalDependencyId: String!
  ) {
    detachLearningGoalDependency(
      parentLearningGoalId: $parentLearningGoalId
      learningGoalId: $learningGoalId
      learningGoalDependencyId: $learningGoalDependencyId
    ) {
      learningGoal {
        _id
        dependsOnLearningGoals {
          learningGoal {
            _id
          }
          parentLearningGoalId
        }
      }
      learningGoalDependency {
        _id
        dependantLearningGoals {
          learningGoal {
            _id
          }
          parentLearningGoalId
        }
      }
    }
  }
`;
