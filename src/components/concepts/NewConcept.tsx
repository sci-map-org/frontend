import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormHelperText,
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { useAddConceptToDomainMutation } from '../../graphql/concepts/concepts.operations.generated';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useCheckTopicKeyAvailabilityLazyQuery } from '../../graphql/topics/topics.operations.generated';
import { AddConceptToDomainPayload, TopicType } from '../../graphql/types';
import { ConceptPagePath } from '../../pages/RoutesPageInfos';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { DomainSelector } from '../domains/DomainSelector';
import { FormButtons } from '../lib/buttons/FormButtons';
import { StatelessConceptTypesEditor } from './ConceptTypesEditor';

interface NewConceptFormProps {
  domain?: DomainLinkDataFragment;
  parentTopicId?: string;
  defaultPayload?: Partial<AddConceptToDomainPayload>;
  size?: 'sm' | 'md' | 'lg';
  onCreate: (domainId: string, parentTopicId: string, payload: AddConceptToDomainPayload) => void;
  onCancel: () => void;
}
export const NewConceptForm: React.FC<NewConceptFormProps> = ({
  domain,
  parentTopicId,
  defaultPayload,
  size = 'md',
  onCancel,
  onCreate,
}) => {
  const [name, setName] = useState(defaultPayload?.name || '');
  const [key, setKey] = useState(defaultPayload?.key || '');
  const [types, setTypes] = useState(defaultPayload?.types || []);
  const [description, setDescription] = useState(defaultPayload?.description || undefined);
  const [selectedDomain, selectDomain] = useState(domain);

  const [checkTopicKeyAvailability, { loading, data }] = useCheckTopicKeyAvailabilityLazyQuery({
    errorPolicy: 'ignore',
  });

  const [keyValueToCheck] = useDebounce(key, 300);

  useEffect(() => {
    domain &&
      checkTopicKeyAvailability({
        variables: { topicType: TopicType.Concept, domainKey: domain.key, key: keyValueToCheck },
      });
  }, [keyValueToCheck]);

  return (
    <Stack spacing={4} direction="column" alignItems="stretch">
      {!domain && (
        <Flex direction="column">
          <Text fontWeight={600}>
            In:{' '}
            <Text as="span" color="gray.800">
              {selectedDomain && selectedDomain.name}
            </Text>
          </Text>
          <DomainSelector onSelect={(selectedDomain) => selectDomain(selectedDomain)} />
        </Flex>
      )}
      <Input
        placeholder="Topic Name"
        size={size}
        variant="flushed"
        value={name}
        onChange={(e) => {
          if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
          setName(e.target.value);
        }}
      ></Input>
      <FormControl id="key" size={getChakraRelativeSize(size, -1)}>
        <InputGroup>
          <Input
            placeholder="Topic Url Key"
            size={getChakraRelativeSize(size, -1)}
            variant="flushed"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></Input>
          {key && (
            <InputRightElement
              children={
                !!loading ? (
                  <Spinner size="sm" />
                ) : data?.checkTopicKeyAvailability.available ? (
                  <CheckIcon color="green.500" />
                ) : (
                  <Tooltip
                    hasArrow
                    aria-label="Key already in use"
                    label="key already in use"
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
        {key && domain && (
          <FormHelperText fontSize="xs">
            Url will look like{' '}
            <Text as="span" fontWeight={500}>
              {ConceptPagePath(domain.key, key)}
            </Text>
          </FormHelperText>
        )}
      </FormControl>

      <Textarea
        placeholder="Description"
        size={size}
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      <Box py={5}>
        <Center>
          <Text fontSize="lg" fontWeight={500} mb={3}>
            Select tags that apply
          </Text>
        </Center>
        <StatelessConceptTypesEditor
          selectedTypes={types}
          onAdded={(type) => setTypes([...types, type])}
          onRemove={(type) => setTypes(types.filter((t) => t !== type))}
        />
      </Box>
      <FormButtons
        isPrimaryDisabled={!name || !selectedDomain || !key || !data?.checkTopicKeyAvailability.available}
        onCancel={() => onCancel()}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={() =>
          selectedDomain &&
          onCreate(selectedDomain._id, parentTopicId || selectedDomain._id, { name, types, description, key })
        }
      />
    </Stack>
  );
};

interface NewConceptProps extends Omit<NewConceptFormProps, 'onCreate'> {
  onCreated?: (createdConcept: ConceptDataFragment) => void;
}
export const NewConcept: React.FC<NewConceptProps> = ({ onCreated, ...props }) => {
  const [addConceptToDomain] = useAddConceptToDomainMutation();
  return (
    <NewConceptForm
      onCreate={async (domainId, parentTopicId, payload) => {
        const { data } = await addConceptToDomain({
          variables: {
            domainId,
            parentTopicId,
            payload,
          },
        });
        if (!data) throw new Error('no data returned');
        !!onCreated && onCreated(data.addConceptToDomain.concept);
      }}
      {...props}
    />
  );
};

interface NewConceptModalProps extends NewConceptProps {
  isOpen: boolean;
  onClose: () => void;
}
export const NewConceptModal: React.FC<NewConceptModalProps> = ({ isOpen, onClose, onCreated, onCancel, ...props }) => {
  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{props.domain ? `Add SubTopic to ${props.domain.name}` : 'Create new Topic'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <NewConcept
              onCreated={(createdConcept) => {
                onClose();
                onCreated && onCreated(createdConcept);
              }}
              onCancel={() => {
                onClose();
                onCancel && onCancel();
              }}
              {...props}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
