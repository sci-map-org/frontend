import { Flex } from '@chakra-ui/react';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathPreviewCardList } from '../../components/learning_paths/LearningPathPreviewCardList';

const learningPaths: LearningPathPreviewCardDataFragment[] = [];

export const HomeLearningPathsRecommendations: React.FC<{}> = () => {
  return (
    <Flex>
      <LearningPathPreviewCardList learningPaths={learningPaths} />
    </Flex>
  );
};
