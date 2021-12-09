import * as Types from '../../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../../graphql/topics/topics.fragments.generated';
export type SubTopicsTreeNodeDataFragment = (
  { __typename?: 'TopicIsSubTopicOfTopic' }
  & Pick<Types.TopicIsSubTopicOfTopic, 'index' | 'relationshipType'>
  & { subTopic: (
    { __typename?: 'Topic' }
    & TopicLinkDataFragment
  ) }
);
