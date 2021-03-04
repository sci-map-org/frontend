import gql from 'graphql-tag';
import { StarsRater, StarsRaterProps } from '../lib/StarsRating';
import { useRateLearningGoalMutation } from './LearningGoalStarsRater.generated';

export const rateLearningGoal = gql`
  mutation rateLearningGoal($learningGoalId: String!, $value: Float!) {
    rateLearningGoal(learningGoalId: $learningGoalId, value: $value) {
      _id
      rating
    }
  }
`;

export const LearningGoalStarsRater: React.FC<
  {
    learningGoalId: string;
  } & Omit<StarsRaterProps, 'onRating'>
> = ({ learningGoalId, ...props }) => {
  const [rateLearningGoalMutation] = useRateLearningGoalMutation();

  return (
    <StarsRater
      onRating={async (value) => {
        await rateLearningGoalMutation({ variables: { learningGoalId, value } });
      }}
      {...props}
    />
  );
};
