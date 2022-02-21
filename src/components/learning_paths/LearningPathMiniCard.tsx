import gql from 'graphql-tag';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import { LearningMaterialMiniCardContainer } from '../learning_materials/LearningMaterialMiniCardContainer';
import { LearningPathMiniCardDataFragment } from './LearningPathMiniCard.generated';

export const LearningPathMiniCardData = gql`
  fragment LearningPathMiniCardData on LearningPath {
    _id
    key
    name
    recommendationsCount
    recommended {
      recommendedAt
    }
  }
`;

interface LearningPathMiniCardProps {
  learningPath: LearningPathMiniCardDataFragment;
}

export const LearningPathMiniCard: React.FC<LearningPathMiniCardProps> = ({ learningPath }) => {
  return (
    <LearningMaterialMiniCardContainer
      learningMaterial={learningPath}
      learningMaterialTypes={['LearningPath']}
      pageInfo={LearningPathPageInfo(learningPath)}
    />
  );
};
