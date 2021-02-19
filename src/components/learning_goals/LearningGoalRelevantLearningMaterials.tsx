import { Flex } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { LearningPathPreviewCard, LearningPathPreviewCardData } from '../learning_paths/LearningPathPreviewCard';
import { LearningMaterialPreviewCardList } from '../resources/LearningMaterialPreviewCardList';
import { ResourcePreviewCard } from '../resources/ResourcePreviewCard';
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
    <Flex direction="column" w="100%" justifyContent="stretch" alignItems="stretch">
      <LearningMaterialPreviewCardList
        learningMaterialsPreviewItems={learningGoal.relevantLearningMaterials?.items || []}
        renderCard={({ learningMaterial, coverage }, idx) => {
          if (learningMaterial.__typename === 'Resource')
            return (
              <ResourcePreviewCard
                key={learningMaterial._id}
                resource={learningMaterial}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
          if (learningMaterial.__typename === 'LearningPath')
            return (
              <LearningPathPreviewCard
                learningPath={learningMaterial}
                key={learningMaterial._id}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
        }}
        isLoading={isLoading}
      />
    </Flex>
  );
};
