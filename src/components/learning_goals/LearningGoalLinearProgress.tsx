import { Progress, ProgressProps } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningGoalLinearProgressDataFragment } from './LearningGoalLinearProgress.generated';

export const LearningGoalLinearProgressData = gql`
  fragment LearningGoalLinearProgressData on LearningGoal {
    _id
    progress {
      level
    }
  }
`;

interface LearningGoalLinearProgressProps {
  learningGoal: LearningGoalLinearProgressDataFragment;
  size?: ProgressProps['size'];
}

export const LearningGoalLinearProgress: React.FC<LearningGoalLinearProgressProps> = ({ learningGoal, size }) => {
  if (!learningGoal.progress) return null;

  return <Progress hasStripe value={learningGoal.progress.level} colorScheme="teal" size={size} />;
};
