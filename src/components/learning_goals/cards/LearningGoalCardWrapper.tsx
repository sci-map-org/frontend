import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LearningGoal } from '../../../graphql/types';
import { LearningGoalCardContainer } from './LearningGoalCardContainer';

interface LearningGoalCardWrapperProps<T extends { learningGoal: Pick<LearningGoal, '_id' | '__typename'> }> {
  learningGoalItems: T[];
  renderCard: (learningGoalItem: T, mouseHover: boolean) => ReactNode;
  spacing?: string;
  nbItemsResponsiveMapping?: typeof defaultNbItemsResponsiveMapping;
}

const defaultNbItemsResponsiveMapping = {
  base: 2,
  sm: 3,
  md: 3,
  lg: 4,
  xl: 4,
};

const getWidthPercentage = (
  size: keyof typeof defaultNbItemsResponsiveMapping,
  nbItemsResponsiveMapping: typeof defaultNbItemsResponsiveMapping
) => {
  return Math.floor(100 / nbItemsResponsiveMapping[size]);
};

const widthMapping = (
  spacing: string,
  nbItemsResponsiveMapping: typeof defaultNbItemsResponsiveMapping
): WrapProps['maxW'] =>
  Object.entries(nbItemsResponsiveMapping).reduce((acc, [key, value]) => {
    // @ts-ignore
    acc[key] = `calc(${getWidthPercentage(key, nbItemsResponsiveMapping)}% - ${spacing})`;
    return acc;
  }, {} as { [key in keyof typeof nbItemsResponsiveMapping]: string });

export const LearningGoalCardWrapper = <
  T extends {
    learningGoal: Pick<LearningGoal, '_id' | '__typename'>;
  }
>({
  learningGoalItems,
  renderCard,
  nbItemsResponsiveMapping = defaultNbItemsResponsiveMapping,
  spacing = '30px',
}: PropsWithChildren<LearningGoalCardWrapperProps<T>>) => {
  return (
    <Wrap w="100%" spacing={spacing} justify="center" justifyContent="space-between">
      {learningGoalItems.map((learningGoalItem) => (
        <WrapItem
          maxW={widthMapping(spacing, nbItemsResponsiveMapping)}
          minW={widthMapping(spacing, nbItemsResponsiveMapping)}
          h={{ base: '100px', md: '140px' }}
          key={learningGoalItem.learningGoal._id}
        >
          <LearningGoalCardContainer>{(hover) => renderCard(learningGoalItem, hover)}</LearningGoalCardContainer>
        </WrapItem>
      ))}
    </Wrap>
  );
};
