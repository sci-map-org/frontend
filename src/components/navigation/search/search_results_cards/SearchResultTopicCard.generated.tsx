import * as Types from '../../../../graphql/types';

import { TopicLinkDataFragment } from '../../../../graphql/topics/topics.fragments.generated';
export type SearchResultTopicCardDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, 'subTopicsTotalCount' | 'learningMaterialsTotalCount'>
  & TopicLinkDataFragment
);
