import { Badge, Button } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { StartLearningGoalButtonDataFragment, useStartLearningGoalMutation } from './StartLearningGoalButton.generated';

export const StartLearningGoalButtonData = gql`
  fragment StartLearningGoalButtonData on LearningGoal {
    _id
    started {
      startedAt
    }
  }
`;

export const startLearningGoal = gql`
  mutation startLearningGoal($learningGoalId: String!) {
    startLearningGoal(learningGoalId: $learningGoalId) {
      learningGoal {
        ...StartLearningGoalButtonData
      }
      currentUser {
        startedLearningGoals(options: {}) {
          startedAt
          learningGoal {
            _id
          }
        }
      }
    }
  }
  ${StartLearningGoalButtonData}
`;

interface StartLearningGoalButtonProps {
  learningGoal: StartLearningGoalButtonDataFragment;
}

export const StartLearningGoalButton: React.FC<StartLearningGoalButtonProps> = ({ learningGoal }) => {
  const [startLearningGoalMutation, { loading }] = useStartLearningGoalMutation();
  return learningGoal.started ? (
    <Badge fontSize="xl" colorScheme="blue" variant="outline">
      In progress
    </Badge>
  ) : (
    <Button
      isLoading={loading}
      colorScheme="blue"
      variant="solid"
      size="md"
      onClick={() => startLearningGoalMutation({ variables: { learningGoalId: learningGoal._id } })}
    >
      Start Learning
    </Button>
  );
};
