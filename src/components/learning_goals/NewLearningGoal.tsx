import { CloseIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { useCreateLearningGoalMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { CreateLearningGoalPayload, LearningGoalType } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { DomainSelector } from '../domains/DomainSelector';
import { FormButtons } from '../lib/buttons/FormButtons';

interface NewLearningGoalData {
  name: string;
  key: string;
  type: LearningGoalType;
  description?: string;
}
interface NewLearningGoalFormProps {
  onCreate: (payload: NewLearningGoalData, options: { isPublic?: boolean; domainId?: string }) => void;
  onCancel: () => void;
  defaultPayload?: Partial<CreateLearningGoalPayload>;
  defaultDomain?: DomainDataFragment;
  allowDomainChange?: boolean;
  size?: 'md' | 'lg' | 'sm';
  publicByDefault?: boolean;
}
export const NewLearningGoalForm: React.FC<NewLearningGoalFormProps> = ({
  onCreate,
  onCancel,
  defaultPayload,
  defaultDomain,
  allowDomainChange,
  size = 'md',
  publicByDefault,
}) => {
  const [domain, setDomain] = useState<DomainDataFragment | undefined>(defaultDomain);
  const [name, setName] = useState(defaultPayload?.name || '');
  const [key, setKey] = useState(defaultPayload?.key || '');
  const [description, setDescription] = useState(defaultPayload?.description || '');
  const [type, setType] = useState(defaultPayload?.type || LearningGoalType.Roadmap);
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      <Stack>
        <Flex direction="column">
          <Text fontWeight={600}>
            In:{' '}
            <Text as="span" color="gray.600">
              {domain && domain.name}
            </Text>
            {domain && allowDomainChange && (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="remove selected domain"
                onClick={() => setDomain(undefined)}
                icon={<CloseIcon />}
              />
            )}
          </Text>
          {allowDomainChange && <DomainSelector onSelect={(selectedDomain) => setDomain(selectedDomain)} />}
        </Flex>
        {type === LearningGoalType.SubGoal && !domain && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>No domain selected</AlertTitle>
            <AlertDescription>You must select a domain to create a Concept Group</AlertDescription>
          </Alert>
        )}
      </Stack>
      <Center>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            mr="-px"
            isActive={type === LearningGoalType.Roadmap}
            _focus={{}}
            onClick={() => setType(LearningGoalType.Roadmap)}
          >
            Roadmap
          </Button>
          <Button
            _focus={{}}
            isActive={type === LearningGoalType.SubGoal}
            onClick={() => setType(LearningGoalType.SubGoal)}
          >
            Module
          </Button>
        </ButtonGroup>
      </Center>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <InputGroup size={size}>
          {/* {domain && <InputLeftAddon px={2} children={`${domain.name} - `} />} */}
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
      <FormButtons
        isPrimaryDisabled={!name || !key}
        onCancel={() => onCancel()}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={() =>
          onCreate(
            { name, key, description: description || undefined, type },
            { isPublic: publicByDefault, domainId: domain?._id }
          )
        }
      />
    </Stack>
  );
};

interface NewLearningGoalProps extends Omit<NewLearningGoalFormProps, 'onCreate'> {
  onCreated?: (createdLearningGoal: LearningGoalDataFragment) => void;
}
export const NewLearningGoal: React.FC<NewLearningGoalProps> = ({ onCreated, ...props }) => {
  const [createLearningGoal] = useCreateLearningGoalMutation();

  return (
    <NewLearningGoalForm
      onCreate={async ({ name, key, description, type }, { isPublic, domainId }) => {
        const { data } = await createLearningGoal({
          variables: {
            payload: { name, key, description, type },
            options: { public: isPublic, domainId },
          },
        });
        if (data) {
          const createdLearningGoal = data.createLearningGoal;
          onCreated && createdLearningGoal && onCreated(createdLearningGoal);
        } else {
          throw new Error('no data returned, createLearningGoal');
        }
      }}
      {...props}
    />
  );
};

export const NewLearningGoalModal: React.FC<
  { renderButton: (onClick: () => void) => ReactElement; onCancel?: () => void } & Omit<
    NewLearningGoalProps,
    'onCancel'
  >
> = ({ defaultPayload, onCreated, renderButton, onCancel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton(onOpen)}
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Create new Learning Goal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <NewLearningGoal
                defaultPayload={defaultPayload}
                onCreated={(learningGoalCreated) => {
                  onClose();
                  onCreated && onCreated(learningGoalCreated);
                }}
                onCancel={() => {
                  onClose();
                  onCancel && onCancel();
                }}
              />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
