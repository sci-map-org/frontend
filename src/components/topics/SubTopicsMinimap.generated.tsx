import * as Types from '../../graphql/types';

export type MinimapTopicDataFragment = (
  { __typename?: 'TopicIsSubTopicOfTopic' }
  & Pick<Types.TopicIsSubTopicOfTopic, 'index'>
  & { subTopic: (
    { __typename?: 'Domain' }
    & Pick<Types.Domain, '_id' | 'key' | 'topicType' | 'name' | 'size'>
  ) | (
    { __typename?: 'Concept' }
    & Pick<Types.Concept, '_id' | 'key' | 'topicType' | 'name' | 'size'>
  ) | (
    { __typename?: 'LearningGoal' }
    & Pick<Types.LearningGoal, '_id' | 'key' | 'topicType' | 'name' | 'size'>
  ) }
);
