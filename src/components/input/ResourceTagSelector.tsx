import { ResourceTag, ResourceTagSearchResult } from '../../graphql/types';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Box, Text, Input, Stack, Flex } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useSearchResourceTagsQuery, useSearchResourceTagsLazyQuery } from './ResourceTagSelector.generated';
import { uniqBy } from 'lodash';

interface ResourceTagSelectorProps {
  onSelect: (tag: ResourceTagSearchResult | { name: string; new: true }) => any;
  width?: string;
}

export const searchResourceTags = gql`
  query searchResourceTags($options: SearchResourceTagsOptions!) {
    searchResourceTags(options: $options) {
      name
      usageCount
    }
  }
`;
export const ResourceTagSelector: React.FC<ResourceTagSelectorProps> = ({ onSelect, width }) => {
  width = width || '200px';
  const [value, setValue] = useState('');
  const [refetch, { data }] = useSearchResourceTagsLazyQuery();

  const suggestions: ResourceTagSearchResult[] = uniqBy(
    [
      {
        name: value,
        usageCount: 0,
      },
      ...(data?.searchResourceTags || []),
    ],
    'name'
  );

  const inputProps = {
    placeholder: 'Search tags...',
    value,
    onChange: (
      event: any,
      { newValue, method }: { newValue: string; method: 'down' | 'up' | 'escape' | 'enter' | 'click' | 'type' }
    ) => {
      method === 'type' && setValue(newValue);
    },
  };
  return (
    <Box marginBottom="16px" flexBasis={width} flexShrink={0}>
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
          <Box
            {...containerProps}
            borderLeftWidth={1}
            borderRightWidth={1}
            zIndex={1000}
            position="absolute"
            width={width}
          >
            {children}
          </Box>
        )}
        getSuggestionValue={suggestion => suggestion.name}
        renderInputComponent={(inputProps: any) => <Input variant="flushed" {...inputProps} />}
      />
    </Box>
  );
};
