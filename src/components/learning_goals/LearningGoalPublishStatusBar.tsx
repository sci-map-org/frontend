import { Badge, Stack } from '@chakra-ui/react';
import { LearningGoalIndexButton, LearningGoalPublishButton } from './LearningGoalPublishButton';
import { LearningGoalPublishButtonDataFragment } from './LearningGoalPublishButton.generated';

interface LearningGoalPublishStatusBarProps {
  learningGoal: LearningGoalPublishButtonDataFragment;
}
export const LearningGoalPublishStatusBar: React.FC<LearningGoalPublishStatusBarProps> = ({ learningGoal }) => {
  return (
    <Stack direction="row" alignItems="center">
      {learningGoal.publishedAt ? (
        <Badge colorScheme="green" fontSize="lg">
          PUBLIC
        </Badge>
      ) : (
        <LearningGoalPublishButton size="sm" learningGoal={learningGoal} />
      )}
      {learningGoal.publishedAt && learningGoal.hidden && (
        <LearningGoalIndexButton size="sm" learningGoal={learningGoal} />
      )}
    </Stack>
  );
};
