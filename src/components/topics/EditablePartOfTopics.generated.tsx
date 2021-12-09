import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
export type EditablePartOfTopicsDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id'>
  & { partOfTopics?: Types.Maybe<Array<(
    { __typename?: 'TopicIsPartOfTopic' }
    & { partOfTopic: (
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    ) }
  )>> }
);
