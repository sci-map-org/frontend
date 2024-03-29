import * as Types from '../../graphql/types';

export type TopicSubHeaderDataFragment = { __typename?: 'Topic', _id: string, key: string, name: string, level?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, subTopicsTotalCount?: number | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined };
