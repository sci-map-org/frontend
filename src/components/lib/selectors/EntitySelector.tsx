import { Box, Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { PropsWithChildren, useRef, useState } from 'react';
import Autosuggest from 'react-autosuggest';

type EntityType = {
  name: string;
};

type NewEntity = {
  name: string;
  new: true;
};

type EntitySelectorProps<T extends EntityType> = {
  entitySuggestions: T[];
  allowCreation?: boolean;
  onCreate?: (newEntity: NewEntity) => void;
  onSelect: (entity: T) => any;
  placeholder: string;
  showSuggestionsOnClear?: boolean;
  fetchEntitySuggestions: (value: string) => any;
  width?: number | string;
  inputSize?: InputProps['size'];
  isDisabled?: boolean;
  suggestionContainerWidth?: number | string;
  creationHelperText?: string;
};

export const EntitySelector = <T extends EntityType>({
  entitySuggestions,
  onSelect,
  placeholder,
  fetchEntitySuggestions,
  width = '180px',
  inputSize = 'md',
  suggestionContainerWidth,
  isDisabled,
  allowCreation,
  onCreate,
  creationHelperText,
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
  const suggestions: (T | NewEntity)[] = [
    ...(!!allowCreation && !entitySuggestions.find((e) => e.name === value) && value.length
      ? [
          {
            name: value,
            new: true,
          } as NewEntity,
        ]
      : []),
    ...entitySuggestions,
  ];
  let inputRef = useRef<HTMLDivElement>(null);
  return (
    <Box w={width} ref={inputRef}>
      <Autosuggest
        shouldRenderSuggestions={() => {
          return true;
        }}
        suggestions={suggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => fetchEntitySuggestions(v)}
        onSuggestionsClearRequested={() => fetchEntitySuggestions(value)}
        onSuggestionSelected={(e, { suggestion }) => {
          e.preventDefault();

          if ('new' in suggestion) onCreate && onCreate(suggestion);
          else onSelect(suggestion);
          setValue('');
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
            {'new' in suggestion && (
              <Text fontWeight={400} px={2} color="gray.600">
                {creationHelperText || '(Create)'}
              </Text>
            )}
          </Flex>
        )}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <Box
            {...containerProps}
            borderLeftWidth={1}
            borderTopWidth={1}
            zIndex={4000}
            borderRightWidth={1}
            position="absolute"
            backgroundColor="white"
            w={inputRef.current?.offsetWidth || undefined}
            {...(!!suggestions.length &&
              suggestionContainerWidth && { w: suggestionContainerWidth, borderTopWidth: 1 })}
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
