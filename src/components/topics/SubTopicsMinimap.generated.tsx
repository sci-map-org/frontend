import * as Types from '../../graphql/types';

export type MinimapTopicData_Domain_Fragment = (
  { __typename?: 'Domain' }
  & Pick<Types.Domain, '_id' | 'key' | 'topicType' | 'name' | 'size'>
);

export type MinimapTopicData_Concept_Fragment = (
  { __typename?: 'Concept' }
  & Pick<Types.Concept, '_id' | 'key' | 'topicType' | 'name' | 'size'>
);

export type MinimapTopicData_LearningGoal_Fragment = (
  { __typename?: 'LearningGoal' }
  & Pick<Types.LearningGoal, '_id' | 'key' | 'topicType' | 'name' | 'size'>
);

export type MinimapTopicDataFragment = MinimapTopicData_Domain_Fragment | MinimapTopicData_Concept_Fragment | MinimapTopicData_LearningGoal_Fragment;
