import * as Types from '../../graphql/types';

import { ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainLinkDataFragment, DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
export type SubTopicsMenuDataFragment = (
  { __typename?: 'TopicIsSubTopicOfTopic' }
  & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
  & { subTopic: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'topicType' | 'size'>
    & DomainLinkDataFragment
  ) | (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, 'types' | '_id' | 'topicType' | 'size'>
    & { known?: Types.Maybe<(
      { __typename?: 'KnownConcept' }
      & Pick<Types.KnownConcept, 'level'>
    )>, subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
      & { subTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id' | 'topicType'>
        & DomainLinkDataFragment
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, 'types' | '_id' | 'topicType'>
        & { known?: Types.Maybe<(
          { __typename?: 'KnownConcept' }
          & Pick<Types.KnownConcept, 'level'>
        )> }
        & ConceptLinkDataFragment
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, 'key' | 'name' | '_id' | 'topicType'>
      ) }
    )>> }
    & ConceptLinkDataFragment
  ) | (
    { __typename?: 'LearningGoal' }
    & Pick<Types.LearningGoal, 'key' | 'name' | '_id' | 'topicType' | 'size'>
  ) }
);
