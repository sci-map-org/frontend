import gql from 'graphql-tag';
import { ConceptLinkData } from '../concepts/concepts.fragments';
import { DomainLinkData } from '../domains/domains.fragments';
import { LearningGoalLinkData } from '../learning_goals/learning_goals.fragments';

export const TopicLinkData = gql`
  fragment TopicLinkData on ITopic {
    topicType
    ...DomainLinkData
    ...ConceptLinkData
    ...LearningGoalLinkData
  }
  ${DomainLinkData}
  ${ConceptLinkData}
  ${LearningGoalLinkData}
`;
