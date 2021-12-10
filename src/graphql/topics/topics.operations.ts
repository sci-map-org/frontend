import gql from 'graphql-tag';
import { TopicFullData, TopicLinkData } from './topics.fragments';

export const searchTopics = gql`
  query searchTopics($options: SearchTopicsOptions!) {
    searchTopics(options: $options) {
      items {
        _id
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

export const searchSubTopics = gql`
  query searchSubTopics($topicId: String!, $options: SearchTopicsOptions!) {
    searchSubTopics(topicId: $topicId, options: $options) {
      items {
        _id
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

export const updateTopic = gql`
  mutation updateTopic($topicId: String!, $payload: UpdateTopicPayload!) {
    updateTopic(topicId: $topicId, payload: $payload) {
      ...TopicFullData
    }
  }
  ${TopicFullData}
`;

export const deleteTopic = gql`
  mutation deleteTopic($topicId: String!) {
    deleteTopic(topicId: $topicId) {
      _id
      success
    }
  }
`;

export const checkTopicKeyAvailability = gql`
  query checkTopicKeyAvailability($key: String!) {
    checkTopicKeyAvailability(key: $key) {
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
        subTopics {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        parentTopic {
          _id
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
        subTopics {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        parentTopic {
          _id
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
        subTopics {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        parentTopic {
          _id
        }
      }
    }
  }
`;
export const attachTopicIsPartOfTopic = gql`
  mutation attachTopicIsPartOfTopic(
    $partOfTopicId: String!
    $subTopicId: String!
    $payload: AttachTopicIsPartOfTopicPayload!
  ) {
    attachTopicIsPartOfTopic(partOfTopicId: $partOfTopicId, subTopicId: $subTopicId, payload: $payload) {
      partOfTopic {
        ...TopicLinkData
        subTopics {
          relationshipType
          index
          subTopic {
            ...TopicLinkData
          }
        }
      }
      subTopic {
        ...TopicLinkData
        partOfTopics {
          partOfTopic {
            ...TopicLinkData
          }
        }
      }
    }
  }
  ${TopicLinkData}
`;

export const detachTopicIsPartOfTopic = gql`
  mutation detachTopicIsPartOfTopic($partOfTopicId: String!, $subTopicId: String!) {
    detachTopicIsPartOfTopic(partOfTopicId: $partOfTopicId, subTopicId: $subTopicId) {
      partOfTopic {
        ...TopicLinkData
        subTopics {
          relationshipType
          index
          subTopic {
            ...TopicLinkData
          }
        }
      }
      subTopic {
        ...TopicLinkData
        partOfTopics {
          partOfTopic {
            ...TopicLinkData
          }
        }
      }
    }
  }
  ${TopicLinkData}
`;

export const updateTopicIsPartOfTopic = gql`
  mutation updateTopicIsPartOfTopic(
    $partOfTopicId: String!
    $subTopicId: String!
    $payload: UpdateTopicIsPartOfTopicPayload!
  ) {
    updateTopicIsPartOfTopic(partOfTopicId: $partOfTopicId, subTopicId: $subTopicId, payload: $payload) {
      partOfTopic {
        _id
        subTopics {
          index
          subTopic {
            _id
          }
        }
      }
      subTopic {
        _id
        partOfTopics {
          partOfTopic {
            _id
          }
        }
      }
    }
  }
`;

export const updateTopicContext = gql`
  mutation updateTopicContext($topicId: String!, $contextTopicId: String!) {
    updateTopicContext(topicId: $topicId, contextTopicId: $contextTopicId) {
      ...TopicLinkData
      contextTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;
