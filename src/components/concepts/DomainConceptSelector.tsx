import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import Autosuggest from 'react-autosuggest';
import { useState } from 'react';
import { Box, Input } from '@chakra-ui/core';

const getConceptSuggestions = (concepts: ConceptDataFragment[], value: string): ConceptDataFragment[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : concepts.filter(concept => concept.name.toLowerCase().indexOf(inputValue) >= 0).slice(0, 10);
};

export const DomainConceptSelector: React.FC<{
  conceptList: ConceptDataFragment[];
  onChange: (concept: ConceptDataFragment) => any;
}> = ({ conceptList, onChange }) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<ConceptDataFragment[]>([]);
  const [value, setValue] = useState('');

  const inputProps = {
    placeholder: 'Search concepts',
    value,
    onChange: (event: any, { newValue }: { newValue: string }) => {
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
          onChange(suggestion);
          setValue('');
        }}
        renderSuggestion={suggestion => (
          <Box px={5} py={1} borderBottomWidth={1} fontWeight={500}>
            {suggestion.name}
          </Box>
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
