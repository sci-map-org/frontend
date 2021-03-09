import { Flex, Heading } from '@chakra-ui/react';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathPreviewCardList } from '../../components/learning_paths/LearningPathPreviewCardList';

export const HomeLearningPathsRecommendations: React.FC<{
  learningPaths: LearningPathPreviewCardDataFragment[];
  isLoading?: boolean;
}> = ({ learningPaths, isLoading }) => {
  return (
    <Flex direction="column">
      <Flex mb={2}>
        <Heading size="md" color="gray.700">
          Trending Paths
        </Heading>
      </Flex>
      <LearningPathPreviewCardList learningPaths={learningPaths} isLoading={isLoading} />
    </Flex>
  );
};
