import * as Types from '../../graphql/types';

export type LearningMaterialShowedInData_LearningPath_Fragment = { __typename?: 'LearningPath', _id: string, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined };

export type LearningMaterialShowedInData_Resource_Fragment = { __typename?: 'Resource', _id: string, showedIn?: Array<{ __typename?: 'Topic', _id: string, key: string, name: string, context?: string | null | undefined }> | null | undefined };

export type LearningMaterialShowedInDataFragment = LearningMaterialShowedInData_LearningPath_Fragment | LearningMaterialShowedInData_Resource_Fragment;
