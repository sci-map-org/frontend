import { Button, ButtonGroup, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { useUpdateLearningGoalMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType } from '../../graphql/types';

interface LearningGoalTypeEditorProps {
  learningGoal: Pick<LearningGoalDataFragment, '_id' | 'type'>;
}
export const LearningGoalTypeEditor: React.FC<LearningGoalTypeEditorProps> = ({ learningGoal }) => {
  const [selectedType, setSelectedType] = useState(learningGoal.type);
  const [updateLearningGoal] = useUpdateLearningGoalMutation();

  return (
    <Stack>
      <Text fontSize="lg" fontWeight={600}>
        Change learning goal type:
      </Text>
      <Stack direction="row">
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            mr="-px"
            isActive={selectedType === LearningGoalType.Roadmap}
            _focus={{}}
            onClick={() => setSelectedType(LearningGoalType.Roadmap)}
          >
            Roadmap
          </Button>
          <Button
            _focus={{}}
            isActive={selectedType === LearningGoalType.SubGoal}
            onClick={() => setSelectedType(LearningGoalType.SubGoal)}
          >
            Module
          </Button>
        </ButtonGroup>
        {selectedType !== learningGoal.type && (
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() =>
              updateLearningGoal({ variables: { _id: learningGoal._id, payload: { type: selectedType } } })
            }
          >
            Save
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
