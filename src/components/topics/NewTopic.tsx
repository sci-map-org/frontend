import { useDisclosure } from '@chakra-ui/hooks';
import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactNode, useState } from 'react';
import { TopicFullData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicFullDataFragment, TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { CreateTopicPayload, Topic } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { FormButtons } from '../lib/buttons/FormButtons';
import { TopicDescriptionField } from './fields/TopicDescription';
import { TopicUrlKeyField, useCheckTopicKeyAvailability } from './fields/TopicUrlKey';
import { useAddSubTopicMutation, useCreateTopicMutation } from './NewTopic.generated';

interface NewTopicFormProps {
  parentTopic?: TopicLinkDataFragment;
  topicCreationData: CreateTopicPayload;
  updateTopicCreationData: (newData: Partial<CreateTopicPayload>) => void;
  onCreate: () => void;
  onCancel: () => void;
  size?: 'md' | 'lg' | 'sm';
}
const NewTopicForm: React.FC<NewTopicFormProps> = ({
  parentTopic,
  topicCreationData,
  updateTopicCreationData,
  onCancel,
  onCreate,
  size = 'md',
}) => {
  const { isChecking, isAvailable } = useCheckTopicKeyAvailability(topicCreationData.key);

  return (
    <Stack spacing={4} w="100%">
      <Input
        placeholder="Name"
        size={size}
        variant="flushed"
        value={topicCreationData.name}
        onChange={(e) => {
          updateTopicCreationData({
            name: e.target.value,
            ...(topicCreationData.key === generateUrlKey(topicCreationData.name) && {
              key: generateUrlKey(e.target.value),
            }),
          });
        }}
      ></Input>
      <TopicUrlKeyField
        size={size}
        value={topicCreationData.key}
        onChange={(newKeyValue) => updateTopicCreationData({ key: generateUrlKey(newKeyValue) })}
        isChecking={isChecking}
        isAvailable={isAvailable}
      />

      <TopicDescriptionField
        size={size}
        value={topicCreationData.description}
        onChange={(newDescription) => updateTopicCreationData({ description: newDescription })}
      />

      <FormButtons
        isPrimaryDisabled={!topicCreationData.name || !topicCreationData.key || !isAvailable}
        onCancel={onCancel}
        size={getChakraRelativeSize(size, 1)}
        onPrimaryClick={onCreate}
      />
    </Stack>
  );
};

export const createTopic = gql`
  mutation createTopic($payload: CreateTopicPayload!) {
    createTopic(payload: $payload) {
      ...TopicFullData
    }
  }
  ${TopicFullData}
`;

export const addSubTopic = gql`
  mutation addSubTopic($parentTopicId: String!, $payload: CreateTopicPayload!) {
    addSubTopic(parentTopicId: $parentTopicId, payload: $payload) {
      ...TopicFullData
      parentTopic {
        ...TopicLinkData
      }
    }
  }
  ${TopicFullData}
  ${TopicLinkData}
`;

interface NewTopicProps {
  parentTopic?: TopicLinkDataFragment;
  onCancel: () => void;
  onCreated?: (createdTopic: TopicFullDataFragment) => void;
  defaultCreationData?: { name?: string; key?: string };
  size?: 'sm' | 'md' | 'lg';
}

export const NewTopic: React.FC<NewTopicProps> = ({ onCancel, onCreated, parentTopic, defaultCreationData, size }) => {
  const [topicCreationData, setTopicCreationData] = useState<CreateTopicPayload>({
    name: '',
    key: '',
    ...defaultCreationData,
  });

  const [createTopicMutation] = useCreateTopicMutation({
    onCompleted(data) {
      onCreated && onCreated(data.createTopic);
    },
  });
  const [addSubTopicMutation] = useAddSubTopicMutation({
    onCompleted(data) {
      onCreated && onCreated(data.addSubTopic);
    },
  });

  const createTopic = async () => {
    if (parentTopic) {
      addSubTopicMutation({ variables: { parentTopicId: parentTopic._id, payload: topicCreationData } });
    } else {
      createTopicMutation({ variables: { payload: topicCreationData } });
    }
  };
  return (
    <NewTopicForm
      parentTopic={parentTopic}
      topicCreationData={topicCreationData}
      updateTopicCreationData={(newData) =>
        setTopicCreationData({
          ...topicCreationData,
          ...newData,
        })
      }
      onCreate={() => createTopic()}
      onCancel={onCancel}
    />
  );
};

interface NewTopicModalProps extends Omit<NewTopicProps, 'onCancel'> {
  title?: string;
  onCancel?: () => void;
  renderButton: (openModal: () => void) => ReactNode;
}

export const NewTopicModal: React.FC<NewTopicModalProps> = ({
  title = 'Add SubTopic',
  renderButton,
  onCancel,
  onCreated,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton(onOpen)}
      {isOpen && (
        <Modal onClose={onClose} size="xl" isOpen={isOpen}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <NewTopic
                  onCreated={(createdTopic) => {
                    onClose();
                    onCreated && onCreated(createdTopic);
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
      )}
    </>
  );
};
