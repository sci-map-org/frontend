import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LearningGoal } from '../../../graphql/types';
import { LearningGoalCardContainer } from './LearningGoalCardContainer';

interface LearningGoalCardWrapperProps<T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }> {
  learningGoalItems: T[];
  renderCard: (learningGoalItem: T, mouseHover: boolean) => ReactNode;
  spacing?: string;
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

export const LearningGoalCardWrapper = <T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }>({
  learningGoalItems,
  renderCard,
  spacing = '30px',
}: PropsWithChildren<LearningGoalCardWrapperProps<T>>) => {
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
