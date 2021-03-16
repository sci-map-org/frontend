import gql from 'graphql-tag';
import { LearningGoalLinkData } from '../../../../graphql/learning_goals/learning_goals.fragments';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultLearningGoalCardDataFragment } from './SearchResultLearningGoalCard.generated';

export const SearchResultLearningGoalCardData = gql`
  fragment SearchResultLearningGoalCardData on LearningGoal {
    ...LearningGoalLinkData
  }
  ${LearningGoalLinkData}
`;

export const SearchResultLearningGoalCard: React.FC<
  { learningGoal: SearchResultLearningGoalCardDataFragment } & SearchResultCardContainerProps
> = ({ learningGoal, ...props }) => {
  return <SearchResultCardContainer {...props}>{learningGoal.name}</SearchResultCardContainer>;
};
