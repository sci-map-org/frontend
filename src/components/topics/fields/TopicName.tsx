import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { useEffect, useRef, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDebouncedCallback } from 'use-debounce';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import {
  useSearchSubTopicsLazyQuery,
  useSearchTopicsLazyQuery,
} from '../../../graphql/topics/topics.operations.generated';
import { SearchTopicsOptions } from '../../../graphql/types';
import { useHandleClickOutside } from '../../../hooks/useHanldeClickOutside';
import { useAutocompleteTopicNameLazyQuery } from './TopicName.generated';

export const autocompleteTopicName = gql`
  query autocompleteTopicName($partialName: String!) {
    autocompleteTopicName(partialName: $partialName) {
      items {
        _id
        ...TopicLinkData
      }
    }
  }
  ${TopicLinkData}
`;

type TopicResultItem = TopicLinkDataFragment;

interface TopicNameFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  onSelect: (topic: TopicLinkDataFragment) => void;
}

export const TopicNameField: React.FC<TopicNameFieldProps> = ({ value, onChange, onSelect }) => {
  const [searchResults, setSearchResults] = useState<TopicResultItem[]>([]);
  const [shouldRenderSuggestions, setShouldRenderSuggestions] = useState(true);
  console.log(shouldRenderSuggestions);
  const suggestions = searchResults;

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

  // const [value, setValue] = useState('');

  const inputProps = {
    placeholder: 'Topic Name', //TODO
    value,
    isDisabled: false, // TODO
    onChange: (_event: any, { newValue }: { newValue: string }) => {
      !shouldRenderSuggestions && setShouldRenderSuggestions(true);
      onChange(newValue);
    },
  };

  let inputRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside(inputRef, () => {
    if (suggestions.length && value === suggestions[0].name && shouldRenderSuggestions) {
      console.log('trigger modal');
      onSelect(suggestions[0]);
    }
  });
  const suggestionContainerWidth = '300px';
  const width = suggestionContainerWidth;
  return (
    <Box w={width} ref={inputRef}>
      <Autosuggest
        shouldRenderSuggestions={() => shouldRenderSuggestions}
        suggestions={suggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => fetchEntitySuggestions(v)}
        onSuggestionsClearRequested={() => fetchEntitySuggestions(value)}
        onSuggestionSelected={(e, { suggestion }) => {
          e.preventDefault();

          //   if ('new' in suggestion) onCreate && onCreate(suggestion);
          onChange(suggestion.name);
          onSelect(suggestion);
          setShouldRenderSuggestions(false);
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
            {/* {'new' in suggestion && (
              <Text fontWeight={400} px={2} color="gray.600">
                {creationHelperText || '(Create)'}
              </Text>
            )} */}
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
        // highlightFirstSuggestion={true}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => <Input size="md" {...inputProps} w={width} />}
      />
    </Box>
  );
};
