import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
export type SubTopicsTreeDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, 'description'>
  & { subTopics?: Types.Maybe<Array<(
    { __typename?: 'TopicIsSubTopicOfTopic' }
    & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
    & { subTopic: (
      { __typename?: 'Topic' }
      & Pick<Types.Topic, 'description'>
      & { subTopics?: Types.Maybe<Array<(
        { __typename?: 'TopicIsSubTopicOfTopic' }
        & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
        & { subTopic: (
          { __typename?: 'Topic' }
          & Pick<Types.Topic, 'description'>
          & { subTopics?: Types.Maybe<Array<(
            { __typename?: 'TopicIsSubTopicOfTopic' }
            & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
            & { subTopic: (
              { __typename?: 'Topic' }
              & TopicLinkDataFragment
            ) }
          )>> }
          & TopicLinkDataFragment
        ) }
      )>> }
      & TopicLinkDataFragment
    ) }
  )>> }
  & TopicLinkDataFragment
);
