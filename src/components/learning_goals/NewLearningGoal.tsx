import { CheckIcon, CloseIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
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
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import {
  useCheckLearningGoalKeyAvailabilityLazyQuery,
  useCreateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { useCheckTopicKeyAvailabilityLazyQuery } from '../../graphql/topics/topics.operations.generated';
import { LearningGoalType } from '../../graphql/types';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { RoleAccess } from '../auth/RoleAccess';
import { FormButtons } from '../lib/buttons/FormButtons';
import { PageLink } from '../navigation/InternalLink';

interface NewLearningGoalData {
  name: string;
  key: string;
  type: LearningGoalType;
  description?: string;
  // TODO: Show in
  public?: boolean;
}
interface NewLearningGoalFormProps {
  onCreate: (payload: NewLearningGoalData) => void;
  onCancel: () => void;
  defaultData?: Partial<NewLearningGoalData>;
  allowDomainChange?: boolean;
  size?: 'md' | 'lg' | 'sm';
}
export const NewLearningGoalForm: React.FC<NewLearningGoalFormProps> = ({
  onCreate,
  onCancel,
  defaultData,
  allowDomainChange,
  size = 'md',
}) => {
  // const [domain, setDomain] = useState<DomainDataFragment | undefined>(defaultData?.domain);
  const [name, setName] = useState(defaultData?.name || '');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState(defaultData?.description || '');
  const [type, setType] = useState(defaultData?.type || LearningGoalType.Roadmap);
  const [checkLearningGoalKeyAvailability, { loading, data }] = useCheckLearningGoalKeyAvailabilityLazyQuery({
    errorPolicy: 'ignore',
  });
  const [keyValueToCheck] = useDebounce(key, 300);
  useEffect(() => {
    checkLearningGoalKeyAvailability({ variables: { key: keyValueToCheck } });
  }, [keyValueToCheck]);
  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      {/* <Stack>
        <Flex direction="column">
          <Text fontWeight={600}>
            In:{' '}
            {domain && (
              <PageLink pageInfo={DomainPageInfo(domain)} color="gray.600">
                {domain && domain.name}
              </PageLink>
            )}
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
      </Stack> */}
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
          <Input
            placeholder={`E.g. "Solving quadratic equations" or "Design - Basics"`}
            size={size}
            variant="flushed"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </InputGroup>
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
      <RoleAccess accessRule="contributorOrAdmin">
        <Accordion allowToggle py={5} w={{ base: '100%', md: '50%' }}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Customize Url
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel>
              <FormControl id="key" size={size}>
                <FormLabel>Key</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Learning Goal Url Key"
                    variant="flushed"
                    value={key}
                    size={size}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  {key && (
                    <InputRightElement
                      children={
                        !!loading ? (
                          <Spinner size="sm" />
                        ) : data?.checkLearningGoalKeyAvailability.available ? (
                          <CheckIcon color="green.500" />
                        ) : (
                          <Tooltip
                            hasArrow
                            aria-label="Key already in use"
                            label="Learning Goal key already in use"
                            placement="top"
                            bg="red.600"
                          >
                            <NotAllowedIcon color="red.500" />
                          </Tooltip>
                        )
                      }
                    />
                  )}
                </InputGroup>
                {/* {key && (
                  <FormHelperText fontSize="xs">
                    Url will look like{' '}
                    <Text as="span" fontWeight={500}>
                      {domain && `/areas/${domain.key}`}/goals/{key}
                    </Text>
                  </FormHelperText>
                )} */}
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </RoleAccess>
      <FormButtons
        isPrimaryDisabled={!name || (!!key && !data?.checkLearningGoalKeyAvailability.available)}
        onCancel={() => onCancel()}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={() => {
          onCreate({ name, key, description: description || undefined, type, public: defaultData?.public });
        }}
      />
    </Stack>
  );
};
export interface NewLearningGoalProps extends Omit<NewLearningGoalFormProps, 'onCreate'> {
  onCreated?: (createdLearningGoal: LearningGoalDataFragment) => void;
}
export const NewLearningGoal: React.FC<NewLearningGoalProps> = ({ onCreated, ...props }) => {
  const [createLearningGoal] = useCreateLearningGoalMutation();

  return (
    <NewLearningGoalForm
      onCreate={async ({ name, key, description, type, public: isPublic }) => {
        const { data } = await createLearningGoal({
          variables: {
            payload: { name, key, description, type },
            options: { public: !!isPublic },
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
> = ({ defaultData, onCreated, renderButton, onCancel }) => {
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
                defaultData={defaultData}
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
