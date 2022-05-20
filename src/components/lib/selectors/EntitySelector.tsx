import { Box, Flex, Input, InputGroup, InputLeftElement, InputProps, Text } from '@chakra-ui/react';
import { pick } from 'lodash';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';
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
  isDisabled?: boolean;
  suggestionContainerWidth?: number | string;
  creationHelperText?: string;
  inputLeftIcon?: ReactNode;
  inputProps?: InputProps;
  renderSuggestion?: (suggestion: T | NewEntity, options: { isHighlighted?: boolean }) => ReactNode;
};

export const EntitySelector = <T extends EntityType>({
  entitySuggestions,
  onSelect,
  placeholder,
  fetchEntitySuggestions,
  width = '180px',
  suggestionContainerWidth,
  isDisabled,
  allowCreation,
  onCreate,
  creationHelperText,
  inputLeftIcon,
  inputProps: inheritedInputProps,
  renderSuggestion,
}: PropsWithChildren<EntitySelectorProps<T>>) => {
  const [value, setValue] = useState('');
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
        inputProps={{
          placeholder,
          value,
          onChange: (_event: any, { newValue }: { newValue: string }) => {
            setValue(newValue);
          },
        }}
        onSuggestionsFetchRequested={({ value: v }) => fetchEntitySuggestions(v)}
        onSuggestionsClearRequested={() => fetchEntitySuggestions(value)}
        onSuggestionSelected={(e, { suggestion }) => {
          e.preventDefault();

          if ('new' in suggestion) onCreate && onCreate(suggestion);
          else onSelect(suggestion);
          setValue('');
        }}
        renderSuggestion={(suggestion, { isHighlighted }) =>
          !!renderSuggestion ? (
            renderSuggestion(suggestion, { isHighlighted })
          ) : (
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
          )
        }
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
        highlightFirstSuggestion={true}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(suggestInputProps: any) => (
          <InputGroup {...pick(inheritedInputProps, ['variant', 'size'])}>
            {inputLeftIcon && <InputLeftElement pointerEvents="none" children={inputLeftIcon} />}
            <Input
              variant="flushed"
              isDisabled={isDisabled}
              {...inheritedInputProps}
              {...suggestInputProps}
              w={width}
            />
          </InputGroup>
        )}
      />
    </Box>
  );
};
