import * as Types from '../../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { SubTopicsTreeNodeDataFragment } from './SubTopicsTreeNode.generated';
export type SubTopicsTreeDataFragment = (
  { __typename?: 'Topic' }
  & { subTopics?: Types.Maybe<Array<(
    { __typename?: 'TopicIsSubTopicOfTopic' }
    & { subTopic: (
      { __typename?: 'Topic' }
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & { subTopic: (
          { __typename?: 'Topic' }
          & { subTopics?: Types.Maybe<Array<(
            { __typename?: 'TopicIsSubTopicOfTopic' }
            & SubTopicsTreeNodeDataFragment
          )>> }
        ) }
        & SubTopicsTreeNodeDataFragment
      )>> }
    ) }
    & SubTopicsTreeNodeDataFragment
  )>> }
  & TopicLinkDataFragment
);
