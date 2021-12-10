import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDebouncedCallback } from 'use-debounce';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { SubTopicRelationshipType } from '../../../graphql/types';
import { useHandleClickOutside } from '../../../hooks/useHanldeClickOutside';
import { HelperText } from '../../lib/HelperText';
import { TopicLink } from '../../lib/links/TopicLink';
import {
  GetTopicByIdDisambiguationModalQuery,
  TopicSuggestionDataFragment,
  useAutocompleteTopicNameLazyQuery,
  useCreateDisambiguationFromTopicMutation,
  useGetTopicByIdDisambiguationModalQuery,
  useGetTopicValidContextsFromSameNameQuery,
  useGetTopicValidContextsFromDisambiguationQuery,
} from './TopicNameField.generated';

export const TopicSuggestionData = gql`
  fragment TopicSuggestionData on Topic {
    context
    ...TopicLinkData
  }
  ${TopicLinkData}
`;
export const autocompleteTopicName = gql`
  query autocompleteTopicName($partialName: String!) {
    autocompleteTopicName(partialName: $partialName) {
      items {
        ...TopicSuggestionData
      }
    }
  }
  ${TopicSuggestionData}
`;

type TopicResultItem = TopicSuggestionDataFragment;

interface TopicNameAutocompleteProps {
  value: string;
  onChange: (newValue: string) => void;
  onSelect: (topic: TopicLinkDataFragment) => void;
  placeholder?: string;
  isDisabled?: boolean;
}

export const TopicNameAutocomplete: React.FC<TopicNameAutocompleteProps> = ({
  placeholder = 'Topic Name',
  isDisabled,
  value,
  onChange,
  onSelect,
}) => {
  const [searchResults, setSearchResults] = useState<TopicResultItem[]>([]);
  const suggestions = uniqBy(searchResults, 'name');

  const [autocompleteTopicNameLazyQuery, { data: topicsSearchData }] = useAutocompleteTopicNameLazyQuery();

  const debouncedSearchLazyQuery = useDebouncedCallback(
    (query: string) => autocompleteTopicNameLazyQuery({ variables: { partialName: query } }),
    1
  );

  useEffect(() => {
    if (!!topicsSearchData?.autocompleteTopicName.items) setSearchResults(topicsSearchData.autocompleteTopicName.items);
  }, [topicsSearchData]);

  const fetchEntitySuggestions = (query: string) => {
    query.length >= 1 ? debouncedSearchLazyQuery.callback(query) : setSearchResults([]);
  };

  const inputProps = {
    placeholder,
    value,
    isDisabled, // TODO
    onChange: (_event: any, { newValue }: { newValue: string }) => {
      onChange(newValue);
    },
  };

  let inputRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside(inputRef, () => {
    if (suggestions.length && value.toLocaleLowerCase() === suggestions[0].name.toLocaleLowerCase()) {
      onSelect(suggestions[0]);
    }
  });
  const suggestionContainerWidth = '300px';
  const width = suggestionContainerWidth;
  return (
    <Box w={width} ref={inputRef}>
      <Autosuggest
        focusInputOnSuggestionClick={false}
        suggestions={suggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => fetchEntitySuggestions(v)}
        onSuggestionsClearRequested={() => fetchEntitySuggestions(value)}
        onSuggestionSelected={(e, { suggestion }) => {
          e.preventDefault();

          onChange(suggestion.name);
          onSelect(suggestion);
        }}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <Flex
            direction="row"
            px={5}
            py={1}
            borderBottomWidth={1}
            w={width}
            {...(isHighlighted && { backgroundColor: 'gray.100' })}
          >
            <Text fontWeight={500}>{suggestion.name}</Text>
            {suggestion.context && (
              <Text fontWeight={600} px={2} color="gray.500">
                ({suggestion.context})
              </Text>
            )}
          </Flex>
        )}
        renderSuggestionsContainer={({ containerProps, children }) =>
          children && (
            <Box
              {...containerProps}
              borderLeftWidth={1}
              borderTopWidth={1}
              borderRightWidth={1}
              zIndex={4000}
              position="absolute"
              bgColor="white"
              w={inputRef.current?.offsetWidth || undefined}
              {...(!!suggestions.length &&
                suggestionContainerWidth && { w: suggestionContainerWidth, borderTopWidth: 1 })}
            >
              {children}
            </Box>
          )
        }
        highlightFirstSuggestion={
          !!suggestions.length && suggestions[0].name.toLocaleLowerCase() === value.toLocaleLowerCase()
        }
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => <Input size="md" {...inputProps} w={width} />}
      />
    </Box>
  );
};

interface TopicNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  parentTopic?: TopicLinkDataFragment;
  onCancelTopicCreation: () => void;
  onConnectSubTopic: (
    parentTopic: TopicLinkDataFragment,
    subTopic: TopicLinkDataFragment,
    relationshipType: SubTopicRelationshipType
  ) => void;
  setContextAndDisambiguationTopic: (
    contextTopic: TopicLinkDataFragment,
    disambiguationTopic: TopicLinkDataFragment
  ) => void;
}

export const TopicNameField: React.FC<TopicNameFieldProps> = ({
  value,
  onChange,
  parentTopic,
  onCancelTopicCreation,
  onConnectSubTopic,
  setContextAndDisambiguationTopic,
}) => {
  const [existingSameNameTopic, setExistingSameNameTopic] = useState<TopicLinkDataFragment>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openDesembiguationModal = (topic: TopicLinkDataFragment) => {
    setExistingSameNameTopic(topic);
    onOpen();
  };
  return (
    <>
      <TopicNameAutocomplete
        onSelect={(selectedTopic) => openDesembiguationModal(selectedTopic)}
        value={value}
        onChange={onChange}
      />
      {existingSameNameTopic && (
        <DisambiguationModal
          parentTopic={parentTopic}
          existingSameNameTopic={existingSameNameTopic}
          isOpen={isOpen}
          onCloseDisambiguationModal={onClose}
          onCancelTopicCreation={() => {
            onClose();
            onCancelTopicCreation();
          }}
          onCreateContextualisedTopic={(disambiguationTopic, contextTopic) => {
            setContextAndDisambiguationTopic(contextTopic, disambiguationTopic);

            onClose();
          }}
          onConnectSubTopic={onConnectSubTopic}
        />
      )}
    </>
  );
};

export const getTopicByIdDisambiguationModal = gql`
  query getTopicByIdDisambiguationModal($topicId: String!) {
    getTopicById(topicId: $topicId) {
      ...TopicLinkData
      disambiguationTopic {
        ...TopicLinkData
        contextualisedTopics {
          ...TopicLinkData
          partOfTopics {
            partOfTopic {
              ...TopicLinkData
            }
          }
          parentTopic {
            ...TopicLinkData
            parentTopic {
              ...TopicLinkData
            }
          }
          contextTopic {
            ...TopicLinkData
          }
        }
      }
      parentTopic {
        ...TopicLinkData
        parentTopic {
          ...TopicLinkData
        }
      }
      partOfTopics {
        partOfTopic {
          ...TopicLinkData
        }
      }
    }
  }
  ${TopicLinkData}
`;

export const createDisambiguationFromTopic = gql`
  mutation createDisambiguationFromTopic($existingTopicId: String!, $existingTopicContextTopicId: String!) {
    createDisambiguationFromTopic(
      existingTopicId: $existingTopicId
      existingTopicContextTopicId: $existingTopicContextTopicId
    ) {
      ...TopicLinkData
    }
  }
  ${TopicLinkData}
`;

const DisambiguationModal: React.FC<{
  parentTopic?: TopicLinkDataFragment;
  existingSameNameTopic: TopicLinkDataFragment;
  isOpen: boolean;
  onCloseDisambiguationModal: () => void;
  onCancelTopicCreation: () => void;
  onCreateContextualisedTopic: (
    disambiguationTopic: TopicLinkDataFragment,
    contextTopic: TopicLinkDataFragment
  ) => void;
  onConnectSubTopic: (
    parentTopic: TopicLinkDataFragment,
    subTopic: TopicLinkDataFragment,
    relationshipType: SubTopicRelationshipType
  ) => void;
}> = ({
  parentTopic,
  existingSameNameTopic,
  isOpen,
  onCloseDisambiguationModal,
  onCancelTopicCreation,
  onConnectSubTopic,
  onCreateContextualisedTopic,
}) => {
  // from existing same name topic (which is not disambiguation), find the disambiguation then query all its
  // const selected

  // contextualised version
  const { data, loading } = useGetTopicByIdDisambiguationModalQuery({
    variables: { topicId: existingSameNameTopic._id },
  });

  const [createDisambiguationFromTopicMutation] = useCreateDisambiguationFromTopicMutation();

  // handle case no disambiguation
  // handle case no parent topic id

  if (!data) return null;

  const existingSameNameTopicWithSameParent: TopicLinkDataFragment | undefined = parentTopic
    ? data.getTopicById.parentTopic?._id === parentTopic._id ||
      !!data.getTopicById.partOfTopics?.find(({ partOfTopic }) => partOfTopic._id === parentTopic._id)
      ? data.getTopicById // case no disabiguation topic, we just check the same topic's parent
      : data.getTopicById.disambiguationTopic?.contextualisedTopics?.find((contextualisedTopic) => {
          //case has disambiguation
          return (
            contextualisedTopic.parentTopic?._id === parentTopic._id ||
            !!contextualisedTopic.partOfTopics?.find(({ partOfTopic }) => partOfTopic._id === parentTopic._id)
          );
        })
    : undefined;

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onCloseDisambiguationModal} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Disambiguation</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={8} pt={8} pb={16} display="flex" alignItems="stretch" justifyContent="stretch">
          {loading || !data ? (
            <Center py={24}>
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              {existingSameNameTopicWithSameParent && parentTopic && (
                <Stack w="100%" alignItems="center" spacing={5}>
                  <Text textAlign="center">
                    {existingSameNameTopicWithSameParent.name} is already a subTopic of {parentTopic.name}!
                  </Text>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      onCancelTopicCreation();
                    }}
                  >
                    Close
                  </Button>
                </Stack>
              )}
              {parentTopic && !existingSameNameTopicWithSameParent && data.getTopicById.disambiguationTopic && (
                <HasDisambiguationTopicModalContent
                  parentTopic={parentTopic}
                  existingSameNameTopic={data.getTopicById}
                  disambiguationTopic={data.getTopicById.disambiguationTopic}
                  onConnectAsSubTopic={(subTopic) => {
                    onConnectSubTopic(parentTopic, subTopic, SubTopicRelationshipType.IsPartOf);
                    onCloseDisambiguationModal();
                  }}
                  onCreateContextualisedTopic={onCreateContextualisedTopic}
                />
              )}
              {parentTopic && !existingSameNameTopicWithSameParent && !data.getTopicById.disambiguationTopic && (
                <NoDisambiguationTopicModalContent
                  existingSameNameTopic={data.getTopicById}
                  parentTopic={parentTopic}
                  onConnectAsSubTopic={(topicToConnect, topicToConnectParent) => {
                    if (!!topicToConnectParent) {
                      // if has parentTopic, add IS_PART_OF
                      onConnectSubTopic(parentTopic, topicToConnect, SubTopicRelationshipType.IsPartOf);
                    } else {
                      // else add IS_SUBTOPIC_OF
                      onConnectSubTopic(parentTopic, topicToConnect, SubTopicRelationshipType.IsSubtopicOf);
                    }
                    onCloseDisambiguationModal();
                  }}
                  onCreateContextualisedTopicAndDisambiguation={async (
                    contextTopic,
                    sameNameTopic,
                    existingSameNameTopicContextTopic
                  ) => {
                    const { data: createdDisambiguationTopicData } = await createDisambiguationFromTopicMutation({
                      variables: {
                        existingTopicId: sameNameTopic._id,
                        existingTopicContextTopicId: existingSameNameTopicContextTopic._id,
                      },
                    });
                    if (!createdDisambiguationTopicData) throw new Error('Should have created a disambiguation topic');
                    onCreateContextualisedTopic(
                      createdDisambiguationTopicData.createDisambiguationFromTopic,
                      contextTopic
                    );
                  }}
                />
              )}
              {!parentTopic && !existingSameNameTopicWithSameParent && (
                <NewTopicHasExistingSameNameTopicModal
                  onCancelTopicCreation={onCancelTopicCreation}
                  existingSameNameTopic={data.getTopicById}
                />
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const getTopicValidContextsFromDisambiguation = gql`
  query getTopicValidContextsFromDisambiguation($parentTopicId: String!, $disambiguationTopicId: String!) {
    getTopicValidContextsFromDisambiguation(
      parentTopicId: $parentTopicId
      disambiguationTopicId: $disambiguationTopicId
    ) {
      validContexts {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

interface HasDisambiguationTopicModalContentProps {
  parentTopic: TopicLinkDataFragment;
  existingSameNameTopic: GetTopicByIdDisambiguationModalQuery['getTopicById'];
  disambiguationTopic: NonNullable<GetTopicByIdDisambiguationModalQuery['getTopicById']['disambiguationTopic']>;
  onConnectAsSubTopic: (existingContextualisedTopic: GetTopicByIdDisambiguationModalQuery['getTopicById']) => void;
  onCreateContextualisedTopic: (
    disambiguationTopic: TopicLinkDataFragment,
    contextTopic: TopicLinkDataFragment
  ) => void;
}
const HasDisambiguationTopicModalContent: React.FC<HasDisambiguationTopicModalContentProps> = ({
  parentTopic,
  existingSameNameTopic,
  disambiguationTopic,
  onConnectAsSubTopic,
  onCreateContextualisedTopic,
}) => {
  const [newTopicSelectedContext, setNewTopicSelectedContext] = useState<TopicLinkDataFragment>();
  const { data } = useGetTopicValidContextsFromDisambiguationQuery({
    variables: {
      parentTopicId: parentTopic._id,
      disambiguationTopicId: disambiguationTopic._id,
    },
    onCompleted(result) {
      result.getTopicValidContextsFromDisambiguation.validContexts &&
        setNewTopicSelectedContext(result.getTopicValidContextsFromDisambiguation.validContexts[0]);
    },
  });
  if (!data?.getTopicValidContextsFromDisambiguation.validContexts?.length) {
    // TODO
    return <Text>Error: No valid contexts</Text>;
  }
  if (!data || !newTopicSelectedContext) return null;
  return (
    <Stack alignItems="stretch">
      <Text textAlign="center" mb={5}>
        Topics with the name <b>{existingSameNameTopic.name}</b> already exist in different contexts. Do you want to
        connect an existing one as a SubTopic of Computer Science as well or create a new one ?
      </Text>

      <Section title="Connect an existing Topic">
        <Stack alignItems="flex-end" w="100%">
          {disambiguationTopic.contextualisedTopics?.map((contextualisedTopic) => (
            <Stack key={contextualisedTopic._id} direction="row" spacing={4} alignItems="center">
              <Stack direction="column" spacing={0} alignItems="flex-end">
                <Stack direction="row" alignItems="baseline">
                  {/* TODO: on hover, show tooltip with path ? */}
                  <Text fontWeight={600}>{contextualisedTopic.name}</Text>
                  <Text fontWeight={600} color="gray.500">
                    ({contextualisedTopic.contextTopic?.name})
                  </Text>
                </Stack>
                <Text fontSize="sm" fontWeight={400}>
                  {contextualisedTopic.parentTopic?.parentTopic?.name} / {contextualisedTopic.parentTopic?.name} /{' '}
                  {contextualisedTopic.name}
                </Text>
              </Stack>

              <Button
                colorScheme="blue"
                onClick={() => {
                  if (!contextualisedTopic.parentTopic) {
                    throw new Error(
                      `Topic ${contextualisedTopic._id} has a context but no parent, which should never happen.`
                    );
                  }
                  onConnectAsSubTopic(contextualisedTopic);
                }}
                size="sm"
              >
                Connect as SubTopic
              </Button>
            </Stack>
          ))}
        </Stack>
      </Section>
      <Section title="Create new Topic">
        <Stack direction="row" spacing={4} alignItems="center" justifyContent="flex-end">
          <Stack direction="column" spacing={0} alignItems="flex-end">
            <Stack direction="row" alignItems="baseline">
              {/* TODO: on hover, show tooltip with path ? */}
              <Text fontWeight={600}>{existingSameNameTopic.name}</Text>

              <Stack direction="row" alignItems="baseline">
                <Text as="span" fontSize="sm" fontWeight={600} color="gray.500">
                  (Ctx:
                </Text>
                <SelectContextTopic
                  contexts={data.getTopicValidContextsFromDisambiguation.validContexts}
                  selectedContext={newTopicSelectedContext}
                  onSelect={setNewTopicSelectedContext}
                />
                <Text as="span" fontSize="sm" fontWeight={600} color="gray.500">
                  )
                </Text>
              </Stack>
            </Stack>
            <Text fontSize="sm" fontWeight={400}>
              {parentTopic.name} / {existingSameNameTopic.name}
            </Text>
          </Stack>

          <Button
            colorScheme="blue"
            onClick={() => onCreateContextualisedTopic(disambiguationTopic, newTopicSelectedContext)}
            size="sm"
          >
            Create new SubTopic
          </Button>
        </Stack>
        <HelperText mt={5}>
          <Text>
            <Text as="span" fontWeight={600} color="gray.600">
              Context
            </Text>{' '}
            is used to easily differentiate between topics having the same name, for instance when they appear in search
            results.
          </Text>
        </HelperText>
      </Section>
    </Stack>
  );
};

export const getTopicValidContextsFromSameName = gql`
  query getTopicValidContextsFromSameName($parentTopicId: String!, $existingSameNameTopicId: String!) {
    getTopicValidContextsFromSameName(
      parentTopicId: $parentTopicId
      existingSameNameTopicId: $existingSameNameTopicId
    ) {
      validContexts {
        ...TopicLinkData
      }
      validSameNameTopicContexts {
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

const NoDisambiguationTopicModalContent: React.FC<{
  existingSameNameTopic: GetTopicByIdDisambiguationModalQuery['getTopicById'];
  parentTopic: TopicLinkDataFragment;
  onConnectAsSubTopic: (topicToConnect: TopicLinkDataFragment, topicToConnectParent?: TopicLinkDataFragment) => void;
  onCreateContextualisedTopicAndDisambiguation: (
    contextTopic: TopicLinkDataFragment,
    existingSameNameTopic: TopicLinkDataFragment,
    existingSameNameTopicContextTopic: TopicLinkDataFragment
  ) => void;
}> = ({ existingSameNameTopic, parentTopic, onConnectAsSubTopic, onCreateContextualisedTopicAndDisambiguation }) => {
  const [newTopicSelectedContext, setNewTopicSelectedContext] = useState<TopicLinkDataFragment>();
  const [existingTopicSelectedContext, setExistingTopicSelectedContext] = useState<TopicLinkDataFragment>();

  const { data } = useGetTopicValidContextsFromSameNameQuery({
    variables: {
      parentTopicId: parentTopic._id,
      existingSameNameTopicId: existingSameNameTopic._id,
    },
    onCompleted(result) {
      result.getTopicValidContextsFromSameName.validContexts &&
        setNewTopicSelectedContext(result.getTopicValidContextsFromSameName.validContexts[0]);
      result.getTopicValidContextsFromSameName.validSameNameTopicContexts &&
        setExistingTopicSelectedContext(result.getTopicValidContextsFromSameName.validSameNameTopicContexts[0]);
    },
  });

  const validContexts = (data?.getTopicValidContextsFromSameName.validContexts || []).map((c) => ({
    ...c,
    disabled: existingTopicSelectedContext?._id === c._id,
  }));
  const validSameNameTopicContexts = (data?.getTopicValidContextsFromSameName.validSameNameTopicContexts || []).map(
    (c) => ({
      ...c,
      disabled: newTopicSelectedContext?._id === c._id,
    })
  );
  if (!data) return null;
  return existingSameNameTopic.parentTopic ? (
    <Stack alignItems="stretch">
      <Text alignItems="center">
        {existingSameNameTopic.name} already exists under{' '}
        <Text as="span" fontWeight={600}>
          {existingSameNameTopic.parentTopic?.parentTopic?.name}{' '}
          {!!existingSameNameTopic.parentTopic?.name && '/ ' + existingSameNameTopic.parentTopic?.name}
        </Text>
      </Text>
      <Flex justifyContent="flex-end" borderWidth={2} borderRadius={4} p={4} borderColor="teal.600">
        <Stack direction="row" alignItems="center">
          <Text>
            Add{' '}
            <Text as="span" fontWeight={600} color="gray.700">
              {existingSameNameTopic.name}
            </Text>{' '}
            as a subtopic of{' '}
            <Text as="span" fontWeight={600} color="gray.500">
              {parentTopic.name}
            </Text>{' '}
            as well ?
          </Text>
          <Button
            colorScheme="blue"
            onClick={() => onConnectAsSubTopic(existingSameNameTopic, existingSameNameTopic.parentTopic || undefined)}
            size="sm"
          >
            Connect as SubTopic
          </Button>
        </Stack>
      </Flex>
      <Stack direction="column" alignItems="stretch" borderWidth={2} borderRadius={4} p={4} borderColor="teal.600">
        <Text alignItems="center">
          Create new subTopic{' '}
          <Text as="span" fontWeight={600} color="gray.700">
            {existingSameNameTopic.name}
          </Text>{' '}
          under{' '}
          <Text as="span" fontWeight={600} color="gray.500">
            {parentTopic.name}
          </Text>{' '}
          ?
        </Text>
        <Stack alignItems="flex-end">
          <Stack direction="row" alignItems="center">
            <Text whiteSpace="nowrap">New Subtopic Context: </Text>

            <SelectContextTopic
              contexts={validContexts}
              selectedContext={newTopicSelectedContext}
              onSelect={setNewTopicSelectedContext}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <Text whiteSpace="nowrap">Existing Topic Context: </Text>

            <SelectContextTopic
              contexts={validSameNameTopicContexts}
              selectedContext={existingTopicSelectedContext}
              onSelect={setExistingTopicSelectedContext}
            />
          </Stack>
          <Button
            colorScheme="blue"
            disabled={!existingTopicSelectedContext || !newTopicSelectedContext}
            onClick={() =>
              existingTopicSelectedContext &&
              newTopicSelectedContext &&
              onCreateContextualisedTopicAndDisambiguation(
                newTopicSelectedContext,
                existingSameNameTopic,
                existingTopicSelectedContext
              )
            }
            size="sm"
          >
            Create new and attach contexts
          </Button>
        </Stack>
        <Flex>
          <HelperText mt={5}>
            <Text as="span" fontWeight={600}>
              Context
            </Text>{' '}
            is used to easily differentiate between topics having the same name, for instance for when they appear as
            search results.
          </HelperText>
        </Flex>
      </Stack>
    </Stack>
  ) : (
    <Stack alignItems="stretch">
      <Text textAlign="center">
        {existingSameNameTopic.name} already exists, but is unclassified (no parent topic). Add it as a subtopic of{' '}
        {parentTopic.name} ?
      </Text>
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" onClick={async () => onConnectAsSubTopic(existingSameNameTopic)} size="sm">
          Connect as SubTopic
        </Button>
      </Flex>
    </Stack>
  );
};

const NewTopicHasExistingSameNameTopicModal: React.FC<{
  existingSameNameTopic: GetTopicByIdDisambiguationModalQuery['getTopicById'];
  onCancelTopicCreation: () => void;
}> = ({ existingSameNameTopic, onCancelTopicCreation }) => {
  return (
    <Stack alignItems="center" spacing={4}>
      <Text textAlign="center">
        <b>{existingSameNameTopic.name}</b> already exists under{' '}
        <Text as="span" fontWeight={600}>
          {existingSameNameTopic.parentTopic?.parentTopic?.name}{' '}
          {!!existingSameNameTopic.parentTopic?.name && '/ ' + existingSameNameTopic.parentTopic?.name}.
        </Text>{' '}
        / <TopicLink topic={existingSameNameTopic} />.
      </Text>
      <Text textAlign="center">
        You can not create a new, unclassified topic with the same name. If this existing topic does not correspond to
        the one you want to create, add this new topic as a subtopic of an already existing one.
      </Text>
      <Button colorScheme="blue" onClick={() => onCancelTopicCreation()}>
        Close
      </Button>
    </Stack>
  );
};

export const SelectContextTopic: React.FC<{
  contexts: Array<TopicLinkDataFragment & { disabled?: boolean }>;
  selectedContext?: TopicLinkDataFragment;
  onSelect: (selectedContext: TopicLinkDataFragment) => void;
}> = ({ contexts, selectedContext, onSelect }) => {
  return (
    // <Stack direction="row" alignItems="baseline">
    //   <Text as="span" fontSize="sm" fontWeight={600} color="gray.500">
    //     (Ctx:
    //   </Text>
    // <Text as="span" fontSize="sm" fontWeight={600} color="gray.500">
    //   )
    // </Text>
    // </Stack>
    <Select
      size="sm"
      fontWeight={600}
      color="gray.500"
      value={selectedContext?._id}
      onChange={(e) => {
        const selected = contexts.find((validContext) => validContext._id === e.target.value);
        if (!selected) throw new Error('error selecting context');
        onSelect(selected);
      }}
    >
      {contexts.map((validContext) => (
        <option key={validContext._id} value={validContext._id} disabled={validContext.disabled}>
          {validContext.name}
        </option>
      ))}
    </Select>
    // <Text as="span" fontSize="sm" fontWeight={600} color="gray.500">
    //   )
    // </Text>
    // </Stack>
  );
};

const Section: React.FC<{ title?: string }> = ({ title, children }) => {
  return (
    <Flex
      direction="column"
      justifyContent="stretch"
      alignItems="stretch"
      borderWidth={2}
      borderRadius={4}
      px={4}
      pt={3}
      pb={4}
      borderColor="teal.600"
    >
      {title && (
        <Text fontSize="xl" fontWeight={800} color="gray.700" mb={3}>
          {title}
        </Text>
      )}
      {children}
    </Flex>
  );
};
