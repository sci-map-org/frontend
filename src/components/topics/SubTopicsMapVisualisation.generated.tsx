import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
export type MapVisualisationTopicDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, 'subTopicsTotalCount'>
  & TopicLinkDataFragment
);
