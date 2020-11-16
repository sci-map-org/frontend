import { Box, Input, InputProps, Text } from '@chakra-ui/react';
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
  width?: number | string;
  inputSize?: InputProps['size'];
  isDisabled?: boolean;
};

export const EntitySelector = <T extends EntityType>({
  entitySuggestions,
  onSelect,
  placeholder,
  fetchEntitySuggestions,
  width = '180px',
  inputSize = 'md',
  isDisabled,
}: PropsWithChildren<EntitySelectorProps<T>>) => {
  const [value, setValue] = useState('');
  const inputProps = {
    placeholder,
    value,
    isDisabled,
    onChange: (_event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };

  return (
    <Box>
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
          <Box
            {...containerProps}
            borderLeftWidth={1}
            zIndex={4000}
            borderRightWidth={1}
            position="absolute"
            backgroundColor="white"
            w={width}
          >
            {children}
          </Box>
        )}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => (
          <Input size={inputSize} variant="flushed" {...inputProps} w={width} />
        )}
      />
    </Box>
  );
};
