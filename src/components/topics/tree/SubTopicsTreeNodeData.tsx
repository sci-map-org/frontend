import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';

export const SubTopicsTreeNodeData = gql`
  fragment SubTopicsTreeNodeData on TopicIsSubTopicOfTopic {
    index
    relationshipType
    subTopic {
      ...TopicLinkData
      contextTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;
