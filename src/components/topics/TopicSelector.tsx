import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  useSearchTopicsLazyQuery,
  useSearchSubTopicsLazyQuery,
} from '../../graphql/topics/topics.operations.generated';
import { SearchTopicsOptions } from '../../graphql/types';
import { EntitySelector } from '../lib/selectors/EntitySelector';

type TopicResultItem = TopicLinkDataFragment;

interface TopicSelectorProps {
  //   domain: DomainDataFragment;
  onSelect: (topic: TopicResultItem) => void;
  placeholder?: string;
  onlySubTopicsOf?: string; // Search only topics that descend from this topic
  //   popoverTitle?: string;
  //   allowedSubTopicTypes?: TopicType[];
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  onSelect,
  placeholder,
  onlySubTopicsOf,
  //   popoverTitle,
  //   allowedSubTopicTypes,
}) => {
  const [searchResults, setSearchResults] = useState<TopicResultItem[]>([]);

  const [searchSubTopicsLazyQuery, { data: subTopicsSearchData }] = useSearchSubTopicsLazyQuery();
  const [searchTopicsLazyQuery, { data: topicsSearchData }] = useSearchTopicsLazyQuery();

  const debouncedSearchLazyQuery = useDebouncedCallback(
    (query: string) => {
      const options: SearchTopicsOptions = {
        query,
        pagination: { limit: 10 },
      };
      onlySubTopicsOf
        ? searchSubTopicsLazyQuery({ variables: { topicId: onlySubTopicsOf, options } })
        : searchTopicsLazyQuery({ variables: { options } });
    },

    300
  );

  useEffect(() => {
    if (!!subTopicsSearchData?.searchSubTopics.items) setSearchResults(subTopicsSearchData.searchSubTopics.items);
  }, [subTopicsSearchData]);

  useEffect(() => {
    if (!!topicsSearchData?.searchTopics.items) setSearchResults(topicsSearchData.searchTopics.items);
  }, [topicsSearchData]);

  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [createSubTopicDefaultPayload, setCreateSubTopicDefaultPayload] = useState<{ name?: string; key?: string }>({});

  return (
    <>
      <Box>
        <EntitySelector
          width="100%"
          //   allowCreation
          //   onCreate={(newLg) => {
          //     setCreateSubTopicDefaultPayload({ name: newLg.name, key: generateUrlKey(newLg.name) }); //TODO: proper validation
          //     onOpen();
          //   }}
          suggestionContainerWidth="300px"
          placeholder={placeholder || 'Search learning goal...'}
          entitySuggestions={searchResults}
          fetchEntitySuggestions={(query) =>
            query.length >= 1 ? debouncedSearchLazyQuery.callback(query) : setSearchResults([])
          }
          onSelect={onSelect}
        />
      </Box>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewTopic
              defaultPayload={createSubTopicDefaultPayload}
              onCreated={(createdTopic) => {
                onSelect(createdTopic);
                onClose();
              }}
              size="sm"
              parentDomain={domain}
              onCancel={() => onClose()}
              allowedTopicTypes={allowedSubTopicTypes}
            />
          </ModalBody>
        </ModalContent>
      </Modal> */}
      {/* // <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur={false} isLazy> */}
      {/* <PopoverTrigger> */}

      {/* </PopoverTrigger> */}

      {/* <PopoverContent>
          <PopoverHeader fontWeight="semibold">{popoverTitle || 'Create Learning Goal'}</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <NewTopic
              defaultPayload={createSubTopicDefaultPayload}
              onCreated={(createdTopic) => {
                onSelect(createdTopic);
                onClose();
              }}
              size="sm"
              parentDomain={domain}
              onCancel={() => onClose()}
              allowedTopicTypes={allowedSubTopicTypes}
            />
          </PopoverBody>
        </PopoverContent> */}
      {/* </Popover> */}
    </>
  );
};
