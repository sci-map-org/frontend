import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactNode, useState } from 'react';
import { TopicFullData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicFullDataFragment, TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { useAttachTopicIsSubTopicOfTopicMutation } from '../../graphql/topics/topics.operations.generated';
import { CreateTopicContextOptions, CreateTopicPayload, SubTopicRelationshipType } from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { FormButtons } from '../lib/buttons/FormButtons';
import { useAttachTopicIsPartOfTopicMutation } from './EditablePartOfTopics.generated';
import { TopicDescriptionField } from './fields/TopicDescription';
import { TopicNameField } from './fields/TopicNameField';
import { TopicUrlKeyField, useCheckTopicKeyAvailability } from './fields/TopicUrlKey';
import { useAddSubTopicMutation, useCreateTopicMutation } from './NewTopic.generated';

type TopicCreationData = CreateTopicPayload & {
  contextTopic?: TopicLinkDataFragment;
  disambiguationTopic?: TopicLinkDataFragment;
};
interface NewTopicFormProps {
  parentTopic?: TopicLinkDataFragment;
  topicCreationData: TopicCreationData;
  updateTopicCreationData: (newData: Partial<TopicCreationData>) => void;
  onCreate: () => void;
  onConnectSubTopic: (
    parentTopic: TopicLinkDataFragment,
    subTopic: TopicLinkDataFragment,
    relationshipType: SubTopicRelationshipType
  ) => void;
  onCancel: () => void;
  size?: 'md' | 'lg' | 'sm';
}
const NewTopicForm: React.FC<NewTopicFormProps> = ({
  parentTopic,
  topicCreationData,
  updateTopicCreationData,
  onCancel,
  onCreate,
  onConnectSubTopic,
  size = 'md',
}) => {
  const { isChecking, isAvailable } = useCheckTopicKeyAvailability(topicCreationData.key);
  return (
    <Stack spacing={4} w="100%">
      <TopicNameField
        parentTopic={parentTopic}
        value={topicCreationData.name}
        onChange={(newNameValue) => {
          updateTopicCreationData({
            name: newNameValue,
            ...(topicCreationData.key === generateUrlKey(topicCreationData.name) && {
              key: generateUrlKey(newNameValue),
            }),
          });
        }}
        setContextAndDisambiguationTopic={(
          contextTopic: TopicLinkDataFragment,
          disambiguationTopic: TopicLinkDataFragment
        ) => {
          updateTopicCreationData({
            contextTopic,
            disambiguationTopic,
            key: generateUrlKey(`${topicCreationData.key}_(${contextTopic.key})`),
          });
        }}
        onCancelTopicCreation={onCancel}
        onConnectSubTopic={onConnectSubTopic}
      />
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
  mutation addSubTopic(
    $parentTopicId: String!
    $payload: CreateTopicPayload!
    $contextOptions: CreateTopicContextOptions
  ) {
    addSubTopic(parentTopicId: $parentTopicId, payload: $payload, contextOptions: $contextOptions) {
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
  onSubTopicConnected?: (connectedSubTopic: TopicLinkDataFragment) => void;
  defaultCreationData?: { name?: string; key?: string };
  size?: 'sm' | 'md' | 'lg';
}

export const NewTopic: React.FC<NewTopicProps> = ({
  onCancel,
  onCreated,
  parentTopic,
  defaultCreationData,
  size,
  onSubTopicConnected,
}) => {
  const [topicCreationData, setTopicCreationData] = useState<TopicCreationData>({
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

  const [attachTopicIsSubTopicOfTopicMutation] = useAttachTopicIsSubTopicOfTopicMutation();
  const [attachTopicIsPartOfTopicMutation] = useAttachTopicIsPartOfTopicMutation();
  const createTopic = async () => {
    const payload: CreateTopicPayload = {
      name: topicCreationData.name,
      key: topicCreationData.key,
      description: topicCreationData.description,
    };
    const contextOptions: CreateTopicContextOptions | undefined =
      topicCreationData.contextTopic && topicCreationData.disambiguationTopic
        ? {
            contextTopicId: topicCreationData.contextTopic._id,
            disambiguationTopicId: topicCreationData.disambiguationTopic._id,
          }
        : undefined;
    if (parentTopic) {
      addSubTopicMutation({
        variables: { parentTopicId: parentTopic._id, payload, contextOptions },
      });
    } else {
      createTopicMutation({ variables: { payload } });
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
      onConnectSubTopic={async (parentTopic, subTopic, relationshipType) => {
        if (relationshipType === SubTopicRelationshipType.IsPartOf) {
          await attachTopicIsPartOfTopicMutation({
            variables: {
              partOfTopicId: parentTopic._id,
              subTopicId: subTopic._id,
              payload: {},
            },
          });
        } else {
          await attachTopicIsSubTopicOfTopicMutation({
            variables: {
              parentTopicId: parentTopic._id,
              subTopicId: subTopic._id,
              payload: {},
            },
          });
        }
        onSubTopicConnected && onSubTopicConnected(subTopic);
      }}
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
  onSubTopicConnected,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton(onOpen)}
      {isOpen && (
        <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
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
                  onSubTopicConnected={(connectedSubTopic) => {
                    onClose();
                    onSubTopicConnected && onSubTopicConnected(connectedSubTopic);
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
