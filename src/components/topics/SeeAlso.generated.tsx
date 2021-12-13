import * as Types from '../../graphql/types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../../graphql/topics/topics.fragments.generated';
export type SeeAlsoDataFragment = (
  { __typename?: 'Topic' }
  & Pick<Types.Topic, '_id'>
  & { disambiguationTopic?: Types.Maybe<(
    { __typename?: 'Topic' }
    & { contextualisedTopics?: Types.Maybe<Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )>> }
  )> }
);
