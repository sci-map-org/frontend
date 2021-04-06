import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { useAddConceptToDomainMutation } from '../../graphql/concepts/concepts.operations.generated';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { AddConceptToDomainPayload } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { DomainSelector } from '../domains/DomainSelector';
import { FormButtons } from '../lib/buttons/FormButtons';

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
  const [description, setDescription] = useState(defaultPayload?.description || undefined);
  const [selectedDomain, selectDomain] = useState(domain);

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
        placeholder="Concept Name"
        size={size}
        variant="flushed"
        value={name}
        onChange={(e) => {
          if (key === generateUrlKey(name)) setKey(generateUrlKey(e.target.value));
          setName(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="Concept Url Key"
        size={size}
        variant="flushed"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      ></Input>
      <Textarea
        placeholder="Description"
        size={size}
        variant="flushed"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      <FormButtons
        isPrimaryDisabled={!name || !selectedDomain}
        onCancel={() => onCancel()}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={() =>
          selectedDomain &&
          onCreate(selectedDomain._id, parentTopicId || selectedDomain._id, { name, description, key })
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
          <ModalHeader>{props.domain ? `Add Concept to ${props.domain.name}` : 'Create new Concept'}</ModalHeader>
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
