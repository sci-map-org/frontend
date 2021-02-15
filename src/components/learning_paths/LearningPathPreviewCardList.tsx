import { Flex, FlexProps } from '@chakra-ui/react';
import { LearningPathPreviewCard } from './LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from './LearningPathPreviewCard.generated';

interface LearningPathPreviewCardListProps {
  learningPaths: LearningPathPreviewCardDataFragment[];
  isLoading?: boolean;
  h?: FlexProps['h'];
}

/**Deprecated */
export const LearningPathPreviewCardList: React.FC<LearningPathPreviewCardListProps> = ({
  learningPaths,
  isLoading,
  h,
}) => {
  return (
    <Flex
      h={h}
      overflow="hidden"
      overflowY="scroll"
      direction="column"
      alignItems="stretch"
      backgroundColor="backgroundColor.0"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="gray.200"
    >
      {learningPaths.map((learningPath, index) => (
        <LearningPathPreviewCard key={learningPath._id} learningPath={learningPath} inCompactList />
      ))}
    </Flex>
  );
};
