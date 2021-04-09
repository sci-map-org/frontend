import * as Types from '../../graphql/types';

import { ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainLinkDataFragment, DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
export type TopicSubTopicsMenuDataFragment = (
  { __typename?: 'TopicIsSubTopicOfTopic' }
  & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
  & { subTopic: { __typename?: 'Domain' } | (
    { __typename?: 'Concept' }
    & ConceptLinkDataFragment
  ) | { __typename?: 'LearningGoal' } | { __typename?: 'Topic' } }
);

export type SubTopicMenuLinkData_Domain_Fragment = (
  { __typename?: 'Domain' }
  & DomainLinkDataFragment
);

export type SubTopicMenuLinkData_Concept_Fragment = (
  { __typename?: 'Concept' }
  & ConceptLinkDataFragment
);

export type SubTopicMenuLinkData_LearningGoal_Fragment = { __typename?: 'LearningGoal' };

export type SubTopicMenuLinkData_Topic_Fragment = { __typename?: 'Topic' };

export type SubTopicMenuLinkDataFragment = SubTopicMenuLinkData_Domain_Fragment | SubTopicMenuLinkData_Concept_Fragment | SubTopicMenuLinkData_LearningGoal_Fragment | SubTopicMenuLinkData_Topic_Fragment;
