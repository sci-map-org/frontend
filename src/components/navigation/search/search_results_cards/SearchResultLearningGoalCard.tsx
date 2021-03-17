import { Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { LearningGoalLinkData } from '../../../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalTypeIcon } from '../../../learning_goals/LearningGoalTypeIcon';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultLearningGoalCardDataFragment } from './SearchResultLearningGoalCard.generated';

export const SearchResultLearningGoalCardData = gql`
  fragment SearchResultLearningGoalCardData on LearningGoal {
    ...LearningGoalLinkData
    type
  }
  ${LearningGoalLinkData}
`;

export const SearchResultLearningGoalCard: React.FC<
  { learningGoal: SearchResultLearningGoalCardDataFragment } & Omit<SearchResultCardContainerProps, 'borderLeftColor'>
> = ({ learningGoal, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <LearningGoalTypeIcon type={learningGoal.type} {...props} />}
      borderLeftColor="red.200"
      {...props}
    >
      <Text fontWeight={500} noOfLines={2}>
        {learningGoal.name}
      </Text>
    </SearchResultCardContainer>
  );
};
