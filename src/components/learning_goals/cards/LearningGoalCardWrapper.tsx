import { Box, BoxProps, Flex, Stack, Wrap, WrapItem, WrapProps } from '@chakra-ui/react';
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
  base: 2,
  sm: 3,
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

const aspectRatio = 1.8;
const responsiveCardWidthPx = { base: 160, md: 220 };
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

const responsiveWrapperHeight = Object.keys(responsiveCardWidthPx).reduce((obj, key) => {
  //@ts-ignore
  obj[key] = responsiveCardWidthPx[key as keyof typeof responsiveCardWidthPx] / aspectRatio + 8 + 'px';
  return obj;
}, {} as BoxProps['h']);

// Generic ?
export const LearningGoalCardWrapper = <T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }>({
  learningGoalItems,
  renderCard,
  spacing = '30px',
  oneLine,
}: PropsWithChildren<LearningGoalCardWrapperProps<T>>) => {
  if (oneLine)
    /**
     * Really shouldn't be that complex, ended up hacking it but needs to be cleaned up
     */
    return (
      <Box position="relative" overflow="hidden" overflowX="scroll" minH={responsiveWrapperHeight}>
        <Stack direction="row" position="absolute" minH={responsiveWrapperHeight}>
          {learningGoalItems.map((learningGoalItem) => (
            <Box w={responsiveCardWidth} h={responsiveCardHeight} key={learningGoalItem.learningGoal._id}>
              <LearningGoalCardContainer>{(hover) => renderCard(learningGoalItem, hover)}</LearningGoalCardContainer>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  return (
    <Wrap w="100%" spacing={spacing} justify="center" justifyContent="space-between">
      {learningGoalItems.map((learningGoalItem) => (
        <WrapItem
          maxW={widthMapping(spacing)}
          minW={widthMapping(spacing)}
          h={{ base: '100px', md: '140px' }}
          key={learningGoalItem.learningGoal._id}
        >
          <LearningGoalCardContainer>{(hover) => renderCard(learningGoalItem, hover)}</LearningGoalCardContainer>
        </WrapItem>
      ))}
    </Wrap>
  );
};
