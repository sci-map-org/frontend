import { Badge, Stack } from '@chakra-ui/react';
import { LearningGoalIndexButton, LearningGoalPublishButton } from './LearningGoalPublishButton';
import { LearningGoalPublishButtonDataFragment } from './LearningGoalPublishButton.generated';

interface LearningGoalPublishStatusBarProps {
  learningGoal: LearningGoalPublishButtonDataFragment;
}
export const LearningGoalPublishStatusBar: React.FC<LearningGoalPublishStatusBarProps> = ({ learningGoal }) => {
  return (
    <Stack direction="row">
      {learningGoal.publishedAt ? (
        <Badge colorScheme="green" fontSize="lg">
          PUBLIC
        </Badge>
      ) : (
        <LearningGoalPublishButton learningGoal={learningGoal} />
      )}
      {learningGoal.publishedAt && learningGoal.hidden && <LearningGoalIndexButton learningGoal={learningGoal} />}
    </Stack>
  );
};
