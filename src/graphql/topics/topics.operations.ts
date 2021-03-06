import gql from 'graphql-tag';

export const checkTopicKeyAvailability = gql`
  query checkTopicKeyAvailability($key: String!, $topicType: TopicType!, $domainKey: String) {
    checkTopicKeyAvailability(key: $key, topicType: $topicType, domainKey: $domainKey) {
      available
      existingTopic {
        _id
        name
      }
    }
  }
`;

export const attachTopicIsSubTopicOfTopic = gql`
  mutation attachTopicIsSubTopicOfTopic(
    $parentTopicId: String!
    $subTopicId: String!
    $payload: AttachTopicIsSubTopicOfTopicPayload!
  ) {
    attachTopicIsSubTopicOfTopic(parentTopicId: $parentTopicId, subTopicId: $subTopicId, payload: $payload) {
      parentTopic {
        _id
        subTopics(options: { sorting: { type: index, direction: ASC } }) {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        ... on Domain {
          parentTopics(options: { sorting: { type: index, direction: ASC } }) {
            index
            parentTopic {
              _id
            }
          }
        }
        ... on Concept {
          parentTopic {
            index
            parentTopic {
              _id
            }
          }
        }
        ... on LearningGoal {
          parentTopic {
            index
            parentTopic {
              _id
            }
          }
        }
      }
    }
  }
`;

export const updateTopicIsSubTopicOfTopic = gql`
  mutation updateTopicIsSubTopicOfTopic(
    $parentTopicId: String!
    $subTopicId: String!
    $payload: UpdateTopicIsSubTopicOfTopicPayload!
  ) {
    updateTopicIsSubTopicOfTopic(parentTopicId: $parentTopicId, subTopicId: $subTopicId, payload: $payload) {
      parentTopic {
        _id
        subTopics(options: { sorting: { type: index, direction: ASC } }) {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        ... on Domain {
          parentTopics(options: { sorting: { type: index, direction: ASC } }) {
            index
            parentTopic {
              _id
            }
          }
        }
        ... on Concept {
          parentTopic {
            index
            parentTopic {
              _id
            }
          }
        }
        ... on LearningGoal {
          parentTopic {
            index
            parentTopic {
              _id
            }
          }
        }
      }
    }
  }
`;

export const detachTopicIsSubTopicOfTopic = gql`
  mutation detachTopicIsSubTopicOfTopic($parentTopicId: String!, $subTopicId: String!) {
    detachTopicIsSubTopicOfTopic(parentTopicId: $parentTopicId, subTopicId: $subTopicId) {
      parentTopic {
        _id
        subTopics(options: { sorting: { type: index, direction: ASC } }) {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        ... on Domain {
          parentTopics(options: { sorting: { type: index, direction: ASC } }) {
            index
            parentTopic {
              _id
            }
          }
        }
        ... on Concept {
          parentTopic {
            index
            parentTopic {
              _id
            }
          }
        }
        ... on LearningGoal {
          parentTopic {
            index
            parentTopic {
              _id
            }
          }
        }
      }
    }
  }
`;
