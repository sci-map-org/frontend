import * as Types from '../../graphql/types';

import { TopicLinkData_Domain_Fragment, TopicLinkData_Concept_Fragment, TopicLinkData_LearningGoal_Fragment } from '../../graphql/topics/topics.fragments.generated';
export type MapVisualisationTopicData_Domain_Fragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, 'size'>
  & TopicLinkData_Domain_Fragment
);

export type MapVisualisationTopicData_Concept_Fragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, 'size'>
  & TopicLinkData_Concept_Fragment
);

export type MapVisualisationTopicData_LearningGoal_Fragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, 'size'>
  & TopicLinkData_LearningGoal_Fragment
);

export type MapVisualisationTopicDataFragment = MapVisualisationTopicData_Domain_Fragment | MapVisualisationTopicData_Concept_Fragment | MapVisualisationTopicData_LearningGoal_Fragment;
