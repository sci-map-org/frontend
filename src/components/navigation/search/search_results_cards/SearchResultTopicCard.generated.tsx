import * as Types from '../../../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../../../graphql/topics/topics.fragments.generated';
export type SearchResultTopicCardDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, 'isDisambiguation' | 'context' | 'subTopicsTotalCount' | 'learningMaterialsTotalCount'>
  & TopicLinkDataFragment
);
