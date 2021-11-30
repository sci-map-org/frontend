import * as Types from '../types';

import { TopicLinkDataFragment, TopicFullDataFragment } from '../topics/topics.fragments.generated';
export type LearningMaterialWithCoveredTopicsData_Resource_Fragment = (
  { __typename?: 'Resource' }
  & Pick<Types.Resource, '_id'>
  & { coveredSubTopics?: Types.Maybe<(
    { __typename?: 'LearningMaterialCoveredSubTopicsResults' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
  )> }
);

export type LearningMaterialWithCoveredTopicsData_LearningPath_Fragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, '_id'>
  & { coveredSubTopics?: Types.Maybe<(
    { __typename?: 'LearningMaterialCoveredSubTopicsResults' }
    & { items: Array<(
      { __typename?: 'Topic' }
      & TopicLinkDataFragment
    )> }
  )> }
);

export type LearningMaterialWithCoveredTopicsDataFragment = LearningMaterialWithCoveredTopicsData_Resource_Fragment | LearningMaterialWithCoveredTopicsData_LearningPath_Fragment;
