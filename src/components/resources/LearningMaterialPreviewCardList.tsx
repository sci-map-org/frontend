import { Flex, Spinner, Stack, StackProps, Text } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

interface LearningMaterialPreviewCardListProps<T extends object> {
  learningMaterialsPreviewItems: T[];
  isLoading?: boolean;
  renderCard: (cardItem: T, idx: number) => ReactNode;
  maxH?: string;
  spacing?: StackProps['spacing'];
  noItemsMessage?: string;
  loadingMessage?: string;
}

export const LearningMaterialPreviewCardList = <T extends object>({
  learningMaterialsPreviewItems,
  renderCard,
  spacing = 0,
  maxH,
  isLoading,
  loadingMessage,
  noItemsMessage = 'No results found',
}: PropsWithChildren<LearningMaterialPreviewCardListProps<T>>) => {
  if (!isLoading && !learningMaterialsPreviewItems.length)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        py="50px"
        h={maxH}
        backgroundColor="backgroundColor.0"
        borderColor="gray.200"
        borderWidth="1px"
      >
        <Text fontSize="xl" fontStyle="italic">
          {noItemsMessage}
        </Text>
      </Flex>
    );
  return (
    <Flex
      direction="column"
      alignItems="stretch"
      backgroundColor="backgroundColor.0"
      maxH={maxH}
      {...(!!maxH && { overflowY: 'scroll' })}
    >
      {isLoading ? (
        <Flex
          backgroundColor="backgroundColor.0"
          direction="column"
          alignItems="center"
          {...(maxH && { justifyContent: 'center' })}
          h={maxH || '1000px'}
          pt={maxH ? 0 : '200px'}
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Spinner size="xl" m={4} />
          {!!loadingMessage && <Text fontStyle="italic">{loadingMessage}</Text>}
        </Flex>
      ) : (
        <Stack spacing={spacing}>{learningMaterialsPreviewItems.map((item, idx) => renderCard(item, idx))}</Stack>
      )}
    </Flex>
  );
};
