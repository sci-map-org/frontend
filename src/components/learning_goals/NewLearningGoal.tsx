import { Button, ButtonGroup, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { CreateLearningGoalPayload } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { useCreateLearningGoalMutation } from './NewLearningGoal.generated';

export const StatelessNewLearningGoal: React.FC<{
  onCreate: (payload: CreateLearningGoalPayload) => void;
  onCancel: () => void;
}> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <Input
        placeholder="Learning Goal Name"
        size="md"
        variant="flushed"
        value={name}
        onChange={(e) => {
          if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="Learning Goal Url Key"
        size="md"
        variant="flushed"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      ></Input>
      <Textarea
        placeholder="Description"
        size="md"
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      <Flex justifyContent="flex-end">
        <ButtonGroup spacing={8}>
          <Button size="lg" w="18rem" variant="outline" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            size="lg"
            w="18rem"
            variant="solid"
            colorScheme="brand"
            onClick={() => onCreate({ name, key, description })}
          >
            Add
          </Button>
        </ButtonGroup>
      </Flex>
    </Stack>
  );
};

export const createLearningGoal = gql`
  mutation createLearningGoal($payload: CreateLearningGoalPayload!) {
    createLearningGoal(payload: $payload) {
      ...LearningGoalData
    }
  }
  ${LearningGoalData}
`;
export const NewLearningGoal: React.FC<{
  onCreated?: (createdLearningGoal: LearningGoalDataFragment) => void;
  onCancel?: () => void;
}> = ({ onCreated, onCancel }) => {
  const [createLearningGoal] = useCreateLearningGoalMutation();
  return (
    <StatelessNewLearningGoal
      onCreate={(payload) =>
        createLearningGoal({ variables: { payload } }).then(
          ({ data }) => onCreated && data && onCreated(data.createLearningGoal)
        )
      }
      onCancel={() => onCancel && onCancel()}
    />
  );
};
