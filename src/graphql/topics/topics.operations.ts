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
