import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicTypeFullData } from '../../../graphql/topic_types/topic_types.fragments';

export const SubTopicsTreeNodeData = gql`
  fragment SubTopicsTreeNodeData on TopicIsSubTopicOfTopic {
    index
    relationshipType
    subTopic {
      ...TopicLinkData
      level
      contextTopic {
        ...TopicLinkData
      }
      topicTypes {
        ...TopicTypeFullData
      }
    }
  }
  ${TopicLinkData}
  ${TopicTypeFullData}
`;
