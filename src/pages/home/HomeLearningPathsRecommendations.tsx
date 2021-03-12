import { Flex, Heading, Stack } from '@chakra-ui/react';
import { LearningPathPreviewCardDataFragment } from '../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningPathPreviewCardList } from '../../components/learning_paths/LearningPathPreviewCardList';
import { LearningPathIcon } from '../../components/lib/icons/LearningPathIcon';

export const HomeLearningPathsRecommendations: React.FC<{
  learningPaths: LearningPathPreviewCardDataFragment[];
  isLoading?: boolean;
}> = ({ learningPaths, isLoading }) => {
  return (
    <Flex direction="column" alignItems="stretch">
      <Stack mb={3} direction="row" alignItems="stretch">
        <LearningPathIcon boxSize="33px" />
        <Heading size="lg" color="gray.700">
          Trending Paths
        </Heading>
      </Stack>
      <LearningPathPreviewCardList learningPaths={learningPaths} isLoading={isLoading} />
    </Flex>
  );
};
