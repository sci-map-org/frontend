import { Box, Input, Text } from '@chakra-ui/core';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';

const getConceptSuggestions = (concepts: ConceptDataFragment[], value: string): ConceptDataFragment[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : concepts.filter((concept) => concept.name.toLowerCase().indexOf(inputValue) >= 0).slice(0, 10);
};

export const DomainConceptSelector: React.FC<{
  conceptList: ConceptDataFragment[];
  onSelect: (concept: ConceptDataFragment) => any;
}> = ({ conceptList, onSelect }) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<ConceptDataFragment[]>([]);
  const [value, setValue] = useState('');

  const inputProps = {
    placeholder: 'Search concepts',
    value,
    onChange: (_event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };

  return (
    <Box marginBottom="16px">
      <Autosuggest
        suggestions={conceptSuggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => setConceptSuggestions(getConceptSuggestions(conceptList, v))}
        onSuggestionsClearRequested={() => setConceptSuggestions(getConceptSuggestions(conceptList, value))}
        onSuggestionSelected={(e, { suggestion }) => {
          onSelect(suggestion);
          setValue('');
        }}
        renderSuggestion={(suggestion) => (
          <Box px={5} py={1} borderBottomWidth={1}>
            <Text fontWeight={500}>{suggestion.name}</Text>
          </Box>
        )}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <Box {...containerProps} borderLeftWidth={1} borderRightWidth={1}>
            {children}
          </Box>
        )}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => <Input variant="flushed" {...inputProps} />}
      />
    </Box>
  );
};
