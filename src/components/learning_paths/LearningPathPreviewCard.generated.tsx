import * as Types from '../../graphql/types';

import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { LearningPathCompletionDataFragment } from './LearningPathCompletion.generated';
import { LearningMaterialWithCoveredConceptsByDomainData_Resource_Fragment, LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
export type LearningPathPreviewCardDataFragment = (
  { __typename?: 'LearningPath' }
  & Pick<Types.LearningPath, 'rating'>
  & { tags?: Types.Maybe<Array<(
    { __typename?: 'LearningMaterialTag' }
    & Pick<Types.LearningMaterialTag, 'name'>
  )>> }
  & LearningPathDataFragment
  & LearningPathCompletionDataFragment
  & LearningMaterialWithCoveredConceptsByDomainData_LearningPath_Fragment
);
