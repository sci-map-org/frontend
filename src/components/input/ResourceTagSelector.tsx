import { ResourceTag, ResourceTagSearchResult } from '../../graphql/types';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Box, Text, Input, Stack, Flex } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useSearchResourceTagsQuery, useSearchResourceTagsLazyQuery } from './ResourceTagSelector.generated';
import { uniqBy } from 'lodash';

interface ResourceTagSelectorProps {
  onSelect: (tag: ResourceTagSearchResult | { name: string; new: true }) => any;
}

export const searchResourceTags = gql`
  query searchResourceTags($options: SearchResourceTagsOptions!) {
    searchResourceTags(options: $options) {
      name
      usageCount
    }
  }
`;
export const ResourceTagSelector: React.FC<ResourceTagSelectorProps> = ({ onSelect }) => {
  const [value, setValue] = useState('');
  const [refetch, { data }] = useSearchResourceTagsLazyQuery();

  const suggestions: ResourceTagSearchResult[] = uniqBy(
    (data?.searchResourceTags || []).concat({
      name: value,
      usageCount: 0,
    }),
    'name'
  );

  const inputProps = {
    placeholder: 'Search concepts',
    value,
    onChange: (
      event: any,
      { newValue, method }: { newValue: string; method: 'down' | 'up' | 'escape' | 'enter' | 'click' | 'type' }
    ) => {
      setValue(newValue);
    },
  };
  return (
    <Box marginBottom="16px">
      <Autosuggest
        suggestions={suggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) =>
          refetch({ variables: { options: { query: v, pagination: {} } } })
        }
        onSuggestionsClearRequested={() => refetch({ variables: { options: { query: '', pagination: {} } } })}
        onSuggestionSelected={(e, { suggestion }) => {
          onSelect(suggestion);
          setValue('');
        }}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <Flex
            justifyContent="space-between"
            direction="row"
            px={2}
            py={1}
            borderBottomWidth={1}
            backgroundColor={isHighlighted ? 'gray.200' : 'white'}
          >
            <Text fontWeight={500}>{suggestion.name}</Text>
            {(suggestion.usageCount || suggestion.usageCount === 0) && (
              <Text fontWeight={300}>({suggestion.usageCount === 0 ? 'new' : suggestion.usageCount})</Text>
            )}
          </Flex>
        )}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <Box {...containerProps} borderLeftWidth={1} borderRightWidth={1}>
            {children}
          </Box>
        )}
        getSuggestionValue={suggestion => suggestion.name}
        renderInputComponent={(inputProps: any) => <Input variant="flushed" {...inputProps} />}
      />
    </Box>
  );
};
