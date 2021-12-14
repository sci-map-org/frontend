import * as Types from '../types';

export type LearningMaterialWithCoveredTopicsData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined };

export type LearningMaterialWithCoveredTopicsData_Resource_Fragment = { __typename?: 'Resource', _id: string, coveredSubTopics?: { __typename?: 'LearningMaterialCoveredSubTopicsResults', items: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> } | null | undefined };

export type LearningMaterialWithCoveredTopicsDataFragment = LearningMaterialWithCoveredTopicsData_LearningPath_Fragment | LearningMaterialWithCoveredTopicsData_Resource_Fragment;
