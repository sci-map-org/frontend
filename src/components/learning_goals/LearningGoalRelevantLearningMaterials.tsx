import { Flex } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { LearningPathPreviewCardData } from '../learning_paths/LearningPathPreviewCard';
import { LearningMaterialPreviewCardList } from '../resources/LearningMaterialPreviewCardList';
import { LearningGoalRelevantLearningMaterialsDataFragment } from './LearningGoalRelevantLearningMaterials.generated';

export const LearningGoalRelevantLearningMaterialsData = gql`
  fragment LearningGoalRelevantLearningMaterialsData on LearningGoal {
    _id
    relevantLearningMaterials(options: {}) {
      items {
        learningMaterial {
          ...ResourcePreviewData
          ...LearningPathPreviewCardData
        }
        coverage
      }
    }
  }
  ${ResourcePreviewData}
  ${LearningPathPreviewCardData}
`;
interface LearningGoalRelevantLearningMaterialsProps {
  learningGoal: LearningGoalRelevantLearningMaterialsDataFragment;
  isLoading?: boolean;
}
export const LearningGoalRelevantLearningMaterials: React.FC<LearningGoalRelevantLearningMaterialsProps> = ({
  learningGoal,
  isLoading,
}) => {
  return (
    <Flex>
      <LearningMaterialPreviewCardList
        learningMaterialsPreviews={(learningGoal.relevantLearningMaterials?.items || []).map(
          ({ learningMaterial }) => learningMaterial
        )}
        isLoading={isLoading}
      />
    </Flex>
  );
};
