import * as Types from '../../graphql/types';

import { ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainLinkDataFragment, DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
export type SubTopicsMenuDataFragment = (
  { __typename?: 'TopicIsSubTopicOfTopic' }
  & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
  & { subTopic: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id'>
    & DomainLinkDataFragment
  ) | (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id'>
    & { known?: Types.Maybe<(
      { __typename?: 'KnownConcept' }
      & Pick<Types.KnownConcept, 'level'>
    )>, subTopics?: Types.Maybe<Array<(
      { __typename?: 'TopicIsSubTopicOfTopic' }
      & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
      & { subTopic: (
        { __typename?: 'Domain' }
        & Pick<Types.Domain, '_id'>
        & DomainLinkDataFragment
      ) | (
        { __typename?: 'Concept' }
        & Pick<Types.Concept, '_id'>
        & { known?: Types.Maybe<(
          { __typename?: 'KnownConcept' }
          & Pick<Types.KnownConcept, 'level'>
        )> }
        & ConceptLinkDataFragment
      ) | (
        { __typename?: 'LearningGoal' }
        & Pick<Types.LearningGoal, '_id'>
      ) }
    )>> }
    & ConceptLinkDataFragment
  ) | (
    { __typename?: 'LearningGoal' }
    & Pick<Types.LearningGoal, '_id'>
  ) }
);
