import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import {
  useAddLearningGoalToDomainMutation,
  useCreateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { CreateLearningGoalPayload } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { DomainSelector } from '../domains/DomainSelector';

interface NewLearningGoalData {
  domain?: DomainDataFragment;
  name: string;
  key: string;
  description?: string;
}
interface NewLearningGoalFormProps {
  onCreate: (payload: NewLearningGoalData) => void;
  onCancel: () => void;
  defaultPayload?: Partial<CreateLearningGoalPayload>;
  size?: 'md' | 'lg' | 'sm';
}
export const NewLearningGoalForm: React.FC<NewLearningGoalFormProps> = ({
  onCreate,
  onCancel,
  defaultPayload,
  size = 'md',
}) => {
  const [domain, setDomain] = useState<DomainDataFragment | null>(null);
  const [name, setName] = useState(defaultPayload?.name || '');
  const [key, setKey] = useState(defaultPayload?.key || '');
  const [description, setDescription] = useState(defaultPayload?.description || '');
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <Flex direction="column">
        <Text fontWeight={600}>
          In:{' '}
          <Text as="span" color="gray.600">
            {domain && domain.name}
          </Text>
          {domain && (
            <IconButton
              size="xs"
              variant="ghost"
              aria-label="remove selected domain"
              onClick={() => setDomain(null)}
              icon={<CloseIcon />}
            />
          )}
        </Text>
        <DomainSelector onSelect={(selectedDomain) => setDomain(selectedDomain)} />
      </Flex>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <InputGroup size={size}>
          {domain && <InputLeftAddon px={2} children={`${domain.name} - `} />}
          <Input
            placeholder={`E.g. "Solving quadratic equations" or "Design - Basics"`}
            size={size}
            variant="flushed"
            value={name}
            onChange={(e) => {
              if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
              setName(e.target.value);
            }}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="key" size={size}>
        <FormLabel>Key</FormLabel>
        <Input
          placeholder="Learning Goal Url Key"
          variant="flushed"
          value={key}
          size={size}
          onChange={(e) => setKey(e.target.value)}
        ></Input>
        {key && (
          <FormHelperText fontSize="xs">
            Url will look like{' '}
            <Text as="span" fontWeight={500}>
              {domain && `/domains/${domain.key}`}/goals/{!domain && 'XXXXXX_'}
              {key}
            </Text>
          </FormHelperText>
        )}
      </FormControl>
      <FormControl id="description" size={size}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Write something..."
          size={size}
          variant="flushed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
      </FormControl>
      <Flex justifyContent="flex-end">
        <ButtonGroup size={size} spacing={8}>
          <Button variant="outline" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            // w="18rem"
            variant="solid"
            colorScheme="brand"
            onClick={() => onCreate({ name, key, description: description || undefined, domain: domain || undefined })}
          >
            Add
          </Button>
        </ButtonGroup>
      </Flex>
    </Stack>
  );
};

interface NewLearningGoalProps extends Omit<NewLearningGoalFormProps, 'onCreate'> {
  onCreated?: (createdLearningGoal: LearningGoalDataFragment) => void;
}
export const NewLearningGoal: React.FC<NewLearningGoalProps> = ({ onCreated, onCancel, defaultPayload, size }) => {
  const [createLearningGoal] = useCreateLearningGoalMutation();
  const [addLearningGoalToDomain] = useAddLearningGoalToDomainMutation();

  return (
    <NewLearningGoalForm
      size={size}
      defaultPayload={defaultPayload}
      onCreate={async ({ name, key, description, domain }) => {
        let createdLearningGoal: LearningGoalDataFragment | undefined = undefined;
        if (domain) {
          const { data } = await addLearningGoalToDomain({
            variables: {
              domainId: domain._id,
              payload: {
                contextualName: name,
                contextualKey: key,
                description: description,
              },
            },
          });
          if (data) createdLearningGoal = data.addLearningGoalToDomain.learningGoal;
        } else {
          const { data } = await createLearningGoal({ variables: { payload: { name, key, description } } });
          if (data) createdLearningGoal = data.createLearningGoal;
        }
        onCreated && createdLearningGoal && onCreated(createdLearningGoal);
      }}
      onCancel={onCancel}
    />
  );
};
