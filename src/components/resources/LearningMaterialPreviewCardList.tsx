import { Flex, Spinner, Text } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';

interface LearningMaterialPreviewCardListProps<
  T extends { learningMaterial: ResourcePreviewDataFragment | LearningPathDataFragment }
> {
  learningMaterialsPreviewItems: T[];
  isLoading?: boolean;
  renderCard: (cardItem: T, idx: number) => ReactNode;
}

export const LearningMaterialPreviewCardList = <
  T extends { learningMaterial: ResourcePreviewDataFragment | LearningPathDataFragment }
>({
  learningMaterialsPreviewItems,
  renderCard,

  isLoading,
}: PropsWithChildren<LearningMaterialPreviewCardListProps<T>>) => {
  if (!isLoading && !learningMaterialsPreviewItems.length)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        py="50px"
        backgroundColor="backgroundColor.0"
        borderColor="gray.200"
        borderWidth="1px"
      >
        <Text fontSize="xl" fontStyle="italic">
          No results found
        </Text>
      </Flex>
    );
  return (
    <Flex direction="column" alignItems="stretch" backgroundColor="backgroundColor.0">
      {isLoading ? (
        <Flex
          backgroundColor="backgroundColor.0"
          direction="column"
          alignItems="center"
          h="1000px"
          pt="200px"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Spinner size="xl" m={4} />
          <Text fontStyle="italic">Finding the most adapted learning resources...</Text>
        </Flex>
      ) : (
        learningMaterialsPreviewItems.map((item, idx) => renderCard(item, idx))
      )}
    </Flex>
  );
};
