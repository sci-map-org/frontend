import gql from 'graphql-tag';
import { LearningGoalLinkData } from '../../../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalTypeIcon } from '../../../learning_goals/LearningGoalTypeIcon';
import { LearningGoalIcon } from '../../../lib/icons/LearningGoalIcon';
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
  { learningGoal: SearchResultLearningGoalCardDataFragment } & SearchResultCardContainerProps
> = ({ learningGoal, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <LearningGoalTypeIcon type={learningGoal.type} {...props} />}
      {...props}
    >
      {learningGoal.name}
    </SearchResultCardContainer>
  );
};
