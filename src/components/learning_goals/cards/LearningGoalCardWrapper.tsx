import { Box, Stack, useBreakpointValue, Wrap, WrapItem, WrapProps } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LearningGoal } from '../../../graphql/types';
import { LearningGoalCardContainer } from './LearningGoalCardContainer';

interface LearningGoalCardWrapperProps<T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }> {
  learningGoalItems: T[];
  renderCard: (learningGoalItem: T, mouseHover: boolean) => ReactNode;
  spacing?: string;
  oneLine?: boolean;
}

const nbItemsResponsiveMapping = {
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
};

const getWidthPercentage = (size: keyof typeof nbItemsResponsiveMapping) => {
  return Math.floor(100 / nbItemsResponsiveMapping[size]);
};

const widthMapping = (spacing: string): WrapProps['maxW'] =>
  Object.entries(nbItemsResponsiveMapping).reduce((acc, [key, value]) => {
    // @ts-ignore
    acc[key] = `calc(${getWidthPercentage(key)}% - ${spacing})`;
    return acc;
  }, {} as { [key in keyof typeof nbItemsResponsiveMapping]: string });
// Generic ?
export const LearningGoalCardWrapper = <T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }>({
  learningGoalItems,
  renderCard,
  spacing = '30px',
  oneLine,
}: PropsWithChildren<LearningGoalCardWrapperProps<T>>) => {
  const nbCardsPerRow = useBreakpointValue(nbItemsResponsiveMapping);

  if (oneLine && nbCardsPerRow && learningGoalItems.length > nbCardsPerRow)
    return (
      <Stack direction="row" overflowX="scroll" spacing={spacing}>
        {learningGoalItems.map((learningGoalItem) => (
          <Box
            maxW={widthMapping(spacing)}
            minW={widthMapping(spacing)}
            h="160px"
            key={learningGoalItem.learningGoal._id}
          >
            <LearningGoalCardContainer>{(hover) => renderCard(learningGoalItem, hover)}</LearningGoalCardContainer>
          </Box>
        ))}
      </Stack>
    );
  return (
    <Wrap w="100%" spacing={spacing} justify="center" justifyContent="space-between">
      {learningGoalItems.map((learningGoalItem) => (
        <WrapItem
          maxW={widthMapping(spacing)}
          minW={widthMapping(spacing)}
          h="160px"
          key={learningGoalItem.learningGoal._id}
        >
          <LearningGoalCardContainer>{(hover) => renderCard(learningGoalItem, hover)}</LearningGoalCardContainer>
        </WrapItem>
      ))}
    </Wrap>
  );
};
