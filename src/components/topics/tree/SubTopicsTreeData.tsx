import gql from 'graphql-tag';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { SubTopicsTreeNodeData } from './SubTopicsTreeNodeData';

export const SubTopicsTreeData = gql`
  fragment SubTopicsTreeData on Topic {
    ...TopicLinkData
    subTopics {
      ...SubTopicsTreeNodeData
      subTopic {
        subTopics {
          ...SubTopicsTreeNodeData
          subTopic {
            subTopics {
              ...SubTopicsTreeNodeData
            }
          }
        }
      }
    }
  }
  ${TopicLinkData}
  ${SubTopicsTreeNodeData}
`;
