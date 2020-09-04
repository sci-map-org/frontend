import { Box, Input, Text } from '@chakra-ui/core';
import { useState, PropsWithChildren } from 'react';
import Autosuggest from 'react-autosuggest';

type EntityType = {
  name: string;
};

type EntitySelectorProps<T extends EntityType> = {
  entitySuggestions: T[];
  onSelect: (entity: T) => any;
  placeholder: string;
  showSuggestionsOnClear?: boolean;
  fetchEntitySuggestions: (value: string) => any;
};

export const EntitySelector = <T extends EntityType>({
  entitySuggestions,
  onSelect,
  placeholder,
  fetchEntitySuggestions,
}: PropsWithChildren<EntitySelectorProps<T>>) => {
  const [value, setValue] = useState('');
  const inputProps = {
    placeholder,
    value,
    onChange: (_event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };

  return (
    <Box marginBottom="16px">
      <Autosuggest
        shouldRenderSuggestions={() => {
          return true;
        }}
        suggestions={entitySuggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => fetchEntitySuggestions(v)}
        onSuggestionsClearRequested={() => fetchEntitySuggestions(value)}
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
          <Box {...containerProps} borderLeftWidth={1} borderRightWidth={1} position="sticky">
            {children}
          </Box>
        )}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => <Input variant="flushed" {...inputProps} />}
      />
    </Box>
  );
};
