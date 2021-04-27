import * as Types from '../../graphql/types';

export type MapVisualisationTopicData_Domain_Fragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, '_id' | 'key' | 'topicType' | 'name' | 'size'>
);

export type MapVisualisationTopicData_Concept_Fragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'topicType' | 'name' | 'size'>
);

export type MapVisualisationTopicData_LearningGoal_Fragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'topicType' | 'name' | 'size'>
);

export type MapVisualisationTopicDataFragment = MapVisualisationTopicData_Domain_Fragment | MapVisualisationTopicData_Concept_Fragment | MapVisualisationTopicData_LearningGoal_Fragment;
