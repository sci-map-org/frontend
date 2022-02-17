import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchIcon } from '@chakra-ui/icons';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  useSearchTopicsLazyQuery,
  useSearchSubTopicsLazyQuery,
} from '../../graphql/topics/topics.operations.generated';
import { SearchTopicsOptions } from '../../graphql/types';
import { EntitySelector } from '../lib/selectors/EntitySelector';

type TopicResultItem = TopicLinkDataFragment;

interface TopicSelectorProps {
  onSelect: (topic: TopicResultItem) => void;
  placeholder?: string;
  onlySubTopicsOf?: string[]; // Search only topics that descend from these topics
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
        ? searchSubTopicsLazyQuery({ variables: { topicIds: onlySubTopicsOf, options } })
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

  // TODO: accept topic creation
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [createSubTopicDefaultPayload, setCreateSubTopicDefaultPayload] = useState<{ name?: string; key?: string }>({});

  return (
    <>
      <Box>
        <EntitySelector
          width="100%"
          suggestionContainerWidth="300px"
          placeholder={placeholder || 'Search learning goal...'}
          entitySuggestions={searchResults}
          fetchEntitySuggestions={(query) =>
            query.length >= 2 ? debouncedSearchLazyQuery.callback(query) : setSearchResults([])
          }
          onSelect={onSelect}
          inputLeftIcon={<SearchIcon color="gray.300" />}
          inputProps={{
            variant: 'outline',
            size: 'sm',
            borderRadius: 4,
            _focus: { borderColor: 'blue.500' },
          }}
          renderSuggestion={(suggestion, { isHighlighted }) => (
            <Flex
              direction="row"
              alignItems="baseline"
              px={2}
              py={1}
              borderBottomWidth={1}
              // w={width}
              {...(isHighlighted && { backgroundColor: 'gray.100' })}
            >
              <Text
                fontWeight={500}
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                {...(!!(suggestion as TopicLinkDataFragment).context && { maxW: '60%' })}
              >
                {suggestion.name}
              </Text>
              {!!(suggestion as TopicLinkDataFragment).context && (
                <Text
                  fontSize="xs"
                  fontWeight={600}
                  color="gray.500"
                  ml={2}
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  ({(suggestion as TopicLinkDataFragment).context})
                </Text>
              )}
            </Flex>
          )}
        />
      </Box>
    </>
  );
};
