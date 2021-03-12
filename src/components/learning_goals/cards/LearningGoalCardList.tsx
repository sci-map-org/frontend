import { Box, Flex, Stack, BoxProps, Center, Text, Spinner } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LearningGoal } from '../../../graphql/types';
import { LearningGoalCardContainer } from './LearningGoalCardContainer';

interface LearningGoalCardListProps<T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }> {
  learningGoalItems: T[];
  renderCard: (learningGoalItem: T, mouseHover: boolean) => ReactNode;
  spacing?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  noItemsMessage?: string;
}

const aspectRatio = 1.8;
const responsiveCardWidthPx = { base: 180, md: 220 };
const responsiveCardWidth = Object.keys(responsiveCardWidthPx).reduce((obj, key) => {
  //@ts-ignore
  obj[key] = responsiveCardWidthPx[key] + 'px';
  return obj;
}, {} as BoxProps['w']);
const responsiveCardHeight = Object.keys(responsiveCardWidthPx).reduce((obj, key) => {
  //@ts-ignore
  obj[key] = responsiveCardWidthPx[key as keyof typeof responsiveCardWidthPx] / aspectRatio + 'px';
  return obj;
}, {} as BoxProps['h']);

export const LearningGoalCardList = <T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }>({
  learningGoalItems,
  renderCard,
  spacing = '30px',
  isLoading,
  loadingMessage,
  noItemsMessage = 'No goals found',
}: PropsWithChildren<LearningGoalCardListProps<T>>) => {
  return (
    <Flex direction="row" w="100%">
      {!learningGoalItems.length || isLoading ? (
        <Center h={responsiveCardHeight} w="100%" bgColor="gray.50">
          {isLoading ? (
            <Center>
              <Spinner size="lg" m={4} />
              {!!loadingMessage && <Text fontStyle="italic">{loadingMessage}</Text>}
            </Center>
          ) : (
            <Text fontSize="xl" fontStyle="italic">
              {noItemsMessage}
            </Text>
          )}
        </Center>
      ) : (
        <Stack overflowX="scroll" w={0} flexGrow={1} direction="row" spacing={spacing}>
          {learningGoalItems.map((learningGoalItem) => (
            <Box
              minW={responsiveCardWidth}
              maxW={responsiveCardWidth}
              minH={responsiveCardHeight}
              maxH={responsiveCardHeight}
              key={learningGoalItem.learningGoal._id}
            >
              <LearningGoalCardContainer>{(hover) => renderCard(learningGoalItem, hover)}</LearningGoalCardContainer>
            </Box>
          ))}
        </Stack>
      )}
    </Flex>
  );
};
