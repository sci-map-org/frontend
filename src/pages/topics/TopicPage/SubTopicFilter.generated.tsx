import * as Types from '../../../graphql/types';

export type SubTopicFilterDataFragment = { __typename?: 'Topic', description?: string | null | undefined, _id: string, key: string, name: string, context?: string | null | undefined, level?: number | null | undefined, learningMaterialsTotalCount?: number | null | undefined, topicTypes?: Array<{ __typename?: 'TopicType', name: string, iconName?: string | null | undefined, color?: Types.TopicTypeColor | null | undefined, usageCount?: number | null | undefined }> | null | undefined };
