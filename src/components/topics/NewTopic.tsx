import { useDisclosure } from '@chakra-ui/hooks';
import { CloseIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { uniqBy, upperFirst } from 'lodash';
import { ReactNode, useMemo, useState } from 'react';
import { TopicFullData, TopicLinkData } from '../../graphql/topics/topics.fragments';
import { TopicFullDataFragment, TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  useAttachTopicIsPartOfTopicMutation,
  useAttachTopicIsSubTopicOfTopicMutation,
} from '../../graphql/topics/topics.operations.generated';
import {
  CreateTopicContextOptions,
  CreateTopicPayload,
  PulledDescriptionSourceName,
  SubTopicRelationshipType,
  TopicType,
} from '../../graphql/types';
import { generateUrlKey } from '../../services/url.service';
import { getChakraRelativeSize } from '../../util/chakra.util';
import { FormButtons } from '../lib/buttons/FormButtons';
import { CollapsedField } from '../lib/CollapsedField';
import { Field } from '../lib/Field';
import { FormTitle } from '../lib/Typography';
import { TopicDescriptionField } from './fields/TopicDescription';
import { TopicLevelField } from './fields/TopicLevel';
import { TopicNameField } from './fields/TopicNameField';
import { TopicPrerequisitesField } from './fields/TopicPrerequisitesField';
import { TopicTypeField } from './fields/TopicTypeField';
import { TopicUrlKeyField, useCheckTopicKeyAvailability } from './fields/TopicUrlKey';
import { useAddSubTopicMutation, useCreateTopicMutation } from './NewTopic.generated';

type TopicCreationData = {
  name: string;
  key: string;
  description?: string;
  descriptionSourceUrl?: string;
  wikipediaPageUrl?: string;
  aliases: TopicNameAlias[];
  level: number | null; // null means not applicable
  contextTopic?: TopicLinkDataFragment;
  disambiguationTopic?: TopicLinkDataFragment;
  topicTypes: TopicType[];
  prerequisiteTopics: TopicLinkDataFragment[];
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
  const { isChecking, isAvailable } = useCheckTopicKeyAvailability(
    topicCreationData.contextTopic
      ? topicCreationData.key + `_(_${topicCreationData.contextTopic.key}_)`
      : topicCreationData.key
  );

  const { isOpen: customizeUrlFieldIsOpen, onToggle: customizeUrlFieldOnToggle } = useDisclosure();
  const { isOpen: prereqFieldIsOpen, onToggle: prereqFieldOnToggle } = useDisclosure();

  const fullTopicKey = useMemo(
    () => (topicCreationData.contextTopic ? `${topicCreationData.key}_(${topicCreationData.contextTopic.key})` : ''),
    [topicCreationData.contextTopic, topicCreationData.key]
  );

  const [showFormErrors, setShowFormErrors] = useState(false);

  const formErrors = useMemo(() => {
    let errors: { [key in 'name' | 'topicTypes' | 'key']?: string } = {};
    if (!topicCreationData.name) errors.name = 'Topic Name is required';
    if (topicCreationData.topicTypes.length < 1) errors.topicTypes = 'At least one Topic Type must be selected';
    if (!topicCreationData.key || !isAvailable) errors.key = 'An available Url key is required';
    return errors;
  }, [topicCreationData.name, topicCreationData.topicTypes, topicCreationData.key]);

  const formHasErrors = useMemo(() => Object.keys(formErrors).length > 0, [formErrors]);

  return (
    <Flex direction="column" w="100%">
      <Flex position="relative" justifyContent="center" alignItems="center" h="240px">
        {parentTopic && (
          <Heading size="md" fontWeight={500} position="absolute" left={5} top={5}>
            {parentTopic?.name}
          </Heading>
        )}
        <FormTitle position="relative" zIndex={1}>
          {parentTopic ? 'Add SubTopic' : 'New Topic'}
          <Image
            position="absolute"
            src="/images/topostain_pin_add_topic.svg"
            w="300px"
            maxW="300px"
            right="-250px"
            top="-100px"
            zIndex={0}
          />
        </FormTitle>
      </Flex>
      <Stack spacing={10} alignItems="stretch">
        <Center>
          <Field label="Topic Name" isInvalid={!!formErrors.name && showFormErrors}>
            <TopicNameField
              parentTopic={parentTopic}
              value={topicCreationData.name}
              contextTopic={topicCreationData.contextTopic}
              disambiguationTopic={topicCreationData.disambiguationTopic}
              onChange={(newNameValue) => {
                updateTopicCreationData({
                  name: upperFirst(newNameValue),
                  ...(topicCreationData.key === generateUrlKey(topicCreationData.name) && {
                    key: generateUrlKey(newNameValue),
                  }),
                  contextTopic: undefined,
                  disambiguationTopic: undefined,
                });
              }}
              setContextAndDisambiguationTopic={(
                contextTopic: TopicLinkDataFragment,
                disambiguationTopic: TopicLinkDataFragment
              ) => {
                updateTopicCreationData({
                  contextTopic,
                  disambiguationTopic,
                });
              }}
              onConnectSubTopic={onConnectSubTopic}
              w="500px"
            />
            <Box mt={1} pl={4}>
              <TopicNameAliasField
                aliases={topicCreationData.aliases}
                onChange={(aliases) => updateTopicCreationData({ aliases })}
              />
            </Box>
            <FormErrorMessage>Topic Name is required</FormErrorMessage>
          </Field>
        </Center>
        <Center>
          <TopicLevelField
            value={topicCreationData.level}
            onChange={(level) => updateTopicCreationData({ level })}
            w="500px"
          />
        </Center>

        <TopicDescriptionField
          value={topicCreationData.description}
          onChange={(newDescription) => updateTopicCreationData({ description: newDescription })}
          pullDescriptionsQueryData={{ name: topicCreationData.name }}
          onSelectPulledDescription={(pulledDescription) =>
            updateTopicCreationData({
              description: pulledDescription.description,
              descriptionSourceUrl: pulledDescription.sourceUrl,
              ...(pulledDescription.sourceName === PulledDescriptionSourceName.Wikipedia && {
                wikipediaPageUrl: pulledDescription.sourceUrl,
              }),
            })
          }
        />
        <TopicTypeField
          value={topicCreationData.topicTypes}
          onChange={(topicTypes) => updateTopicCreationData({ topicTypes })}
          isInvalid={!!formErrors.topicTypes && showFormErrors}
        />

        <Flex justifyContent="space-between" flexDir="row">
          <Box w="45%">
            <CollapsedField
              label="Customize URL"
              alignLabel="left"
              isOpen={customizeUrlFieldIsOpen}
              onToggle={customizeUrlFieldOnToggle}
              isInvalid={!!formErrors.key && showFormErrors}
            >
              <TopicUrlKeyField
                size={size}
                value={topicCreationData.key}
                fullTopicKey={fullTopicKey}
                onChange={(newKeyValue) => updateTopicCreationData({ key: generateUrlKey(newKeyValue) })}
                isChecking={isChecking}
                isAvailable={isAvailable}
              />
            </CollapsedField>
          </Box>
          <Box w="45%">
            <CollapsedField
              label="Select Prerequisites"
              alignLabel="left"
              isOpen={prereqFieldIsOpen}
              onToggle={prereqFieldOnToggle}
            >
              <TopicPrerequisitesField
                prerequisites={topicCreationData.prerequisiteTopics}
                onAdded={(prereq) =>
                  updateTopicCreationData({
                    prerequisiteTopics: uniqBy([...topicCreationData.prerequisiteTopics, prereq], '_id'),
                  })
                }
                onRemove={(prereqIdToRemove) =>
                  updateTopicCreationData({
                    prerequisiteTopics: topicCreationData.prerequisiteTopics.filter(
                      (prereq) => prereq._id !== prereqIdToRemove
                    ),
                  })
                }
              />
            </CollapsedField>
          </Box>
        </Flex>
        <FormButtons
          isPrimaryDisabled={formHasErrors && showFormErrors}
          primaryText={parentTopic ? 'Add SubTopic' : 'Create Topic'}
          onCancel={onCancel}
          size={getChakraRelativeSize(size, 1)}
          onPrimaryClick={() => {
            if (formHasErrors) setShowFormErrors(true);
            else onCreate();
          }}
        />
        {showFormErrors && formHasErrors && (
          <Stack>
            {Object.keys(formErrors).map((formErrorKey) => (
              <Alert key={formErrorKey} status="error">
                <AlertIcon />
                {/* @ts-ignore */}
                {formErrors[formErrorKey]}
              </Alert>
            ))}
          </Stack>
        )}
      </Stack>
    </Flex>
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
    aliases: [],
    level: 35,
    topicTypes: [],
    prerequisiteTopics: [],
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
      key: topicCreationData.contextTopic
        ? `${topicCreationData.key}_(${topicCreationData.contextTopic.key})`
        : topicCreationData.key,
      description: topicCreationData.description,
      descriptionSourceUrl: topicCreationData.descriptionSourceUrl,
      wikipediaPageUrl: topicCreationData.wikipediaPageUrl,
      aliases: topicCreationData.aliases.map(({ value }) => value),
      level: topicCreationData.level || undefined,
      topicTypes: topicCreationData.topicTypes?.map(({ name }) => name),
      prerequisitesTopicsIds: topicCreationData.prerequisiteTopics.map(({ _id }) => _id),
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

interface TopicNameAlias {
  id: string;
  value: string;
}
const TopicNameAliasField: React.FC<{ aliases: TopicNameAlias[]; onChange: (aliases: TopicNameAlias[]) => void }> = ({
  aliases,
  onChange,
}) => {
  return (
    <Stack spacing={1}>
      {aliases.map((alias) => (
        <Stack key={alias.id} direction="row" alignItems="center" spacing={1}>
          <Input
            size="xs"
            placeholder="e.g. NLP"
            onChange={(e) => {
              const updatedAliases = [...aliases];
              const index = updatedAliases.findIndex(({ id }) => id === alias.id);
              updatedAliases[index].value = e.target.value;
              onChange(updatedAliases);
            }}
          />
          <IconButton
            aria-label="remove alias"
            icon={<CloseIcon />}
            variant="ghost"
            size="xs"
            onClick={() => {
              let updatedAliases = [...aliases];
              const index = updatedAliases.findIndex(({ id }) => id === alias.id);
              updatedAliases.splice(index, 1);
              onChange(updatedAliases);
            }}
          />
        </Stack>
      ))}
      <Link
        color="blue.500"
        fontSize="sm"
        onClick={() =>
          onChange([
            ...aliases,
            {
              id: Math.random().toString(),
              value: '',
            },
          ])
        }
      >
        Add alias
      </Link>
    </Stack>
  );
};
