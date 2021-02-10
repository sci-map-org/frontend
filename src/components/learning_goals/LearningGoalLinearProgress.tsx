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

interface LearningGoalLinearProgressProps extends ProgressProps {
  learningGoal: LearningGoalLinearProgressDataFragment;
}

export const LearningGoalLinearProgress: React.FC<LearningGoalLinearProgressProps> = ({ learningGoal, ...props }) => {
  if (!learningGoal.progress) return null;

  return <Progress value={learningGoal.progress.level} colorScheme="teal" {...props} />;
};
