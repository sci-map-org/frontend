import * as Types from '../types';

import { DomainLinkDataFragment, DomainDataFragment } from '../domains/domains.fragments.generated';
import { ConceptLinkDataFragment } from '../concepts/concepts.fragments.generated';
import { LearningGoalLinkDataFragment } from '../learning_goals/learning_goals.fragments.generated';
export type TopicLinkData_Domain_Fragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, 'topicType'>
  & DomainLinkDataFragment
);

export type TopicLinkData_Concept_Fragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, 'topicType'>
  & ConceptLinkDataFragment
);

export type TopicLinkData_LearningGoal_Fragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, 'topicType'>
  & LearningGoalLinkDataFragment
);

export type TopicLinkDataFragment = TopicLinkData_Domain_Fragment | TopicLinkData_Concept_Fragment | TopicLinkData_LearningGoal_Fragment;
