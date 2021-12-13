import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
export type ParentTopicsBreadcrumbsDataFragment = (
  { __typename?: 'Topic' }
  & { parentTopic?: Types.Maybe<(
    { __typename?: 'Topic' }
    & { parentTopic?: Types.Maybe<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
    & TopicLinkDataFragment
  )> }
  & TopicLinkDataFragment
);
