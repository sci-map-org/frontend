import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, InputGroup, InputLeftElement, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { TopicType, TopicTypeColor } from '../../../graphql/types';
import { Field } from '../../lib/Field';
import { useSearchTopicTypesLazyQuery } from './TopicTypeField.generated';
import { TopicTypeViewer } from './TopicTypeViewer';

const TopicTypeSuggestions: TopicType[] = [
  { name: 'concept', color: TopicTypeColor.Orange },
  { name: 'field', color: TopicTypeColor.Red },
  { name: 'idea', color: TopicTypeColor.Orange },
  { name: 'tool', color: TopicTypeColor.Green },
  { name: 'problem', color: TopicTypeColor.Green },
  { name: 'theory', color: TopicTypeColor.Red },
  { name: 'method', color: TopicTypeColor.Red },
  { name: 'application', color: TopicTypeColor.Green },
];
export const TopicTypeField: React.FC<{ value?: TopicType[]; onChange: (topicTypes: TopicType[]) => void }> = ({
  value,
  onChange,
}) => {
  const [showSelector, setShowSelector] = useState(false);
  return (
    <Field
      label="Topic Types"
      renderRightOfLabel={
        value && (
          <Stack direction="row" alignItems="flex-end">
            {value.map((selectedTopicType) => (
              <TopicTypeViewer
                key={selectedTopicType.name}
                topicType={selectedTopicType}
                onClick={() => onChange(value.filter((v) => v.name !== selectedTopicType.name))}
              />
            ))}
          </Stack>
        )
      }
      helperText="Select all that applies. Pick at least one."
    >
      <Wrap spacing={4} align="center">
        {[...TopicTypeSuggestions, ...(showSelector ? [] : [{ name: 'other' }])]
          .filter((suggestion) => !value?.find((v) => v.name === suggestion.name))
          .map((topicType) => (
            <WrapItem key={topicType.name}>
              <TopicTypeViewer
                topicType={topicType}
                size="md"
                onClick={async () => {
                  if (topicType.name === 'other') {
                    setShowSelector(true);
                  } else {
                    onChange(uniqBy([...(value || []), topicType], 'name'));
                  }
                }}
              />
            </WrapItem>
          ))}
        {showSelector && (
          <WrapItem>
            <TopicTypeSelector
              size="xs"
              onSelect={(selected) => onChange(uniqBy([...(value || []), selected], 'name'))}
            />
          </WrapItem>
        )}
      </Wrap>
    </Field>
  );
};

export const searchTopicTypes = gql`
  query searchTopicTypes($query: String!) {
    searchTopicTypes(query: $query) {
      name
      color
      usageCount
    }
  }
`;

const TopicTypeSelector: React.FC<{
  onSelect: (topicType: TopicType | { name: string; new: true }) => any;
  width?: string;
  isDisabled?: boolean;
  size?: 'xs' | 'sm' | 'md';
  placeholder?: string;
}> = ({ onSelect, width, isDisabled, size = 'xs', placeholder }) => {
  width = width || '160px';
  const [value, setValue] = useState('');
  const [searchTopicTypesLazyQuery, { data, loading }] = useSearchTopicTypesLazyQuery();
  const suggestions: TopicType[] = uniqBy(
    [
      {
        name: value,
        usageCount: 0,
      },
      ...(data?.searchTopicTypes || []),
    ],
    'name'
  );

  const inputProps = {
    placeholder: placeholder || 'Search or create Type...',
    value,
    autoFocus: true,
    onChange: (
      event: any,
      { newValue, method }: { newValue: string; method: 'down' | 'up' | 'escape' | 'enter' | 'click' | 'type' }
    ) => {
      method === 'type' && setValue(newValue);
    },
  };
  return (
    <Box marginBottom={size} flexBasis={width} flexShrink={0}>
      <Autosuggest
        suggestions={suggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => searchTopicTypesLazyQuery({ variables: { query: v } })}
        onSuggestionsClearRequested={() => searchTopicTypesLazyQuery({ variables: { query: '' } })}
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
            py="2px"
            borderBottomWidth={1}
            alignItems="center"
            backgroundColor={isHighlighted ? 'gray.100' : 'white'}
          >
            <TopicTypeViewer topicType={suggestion} size="sm" />
            {(suggestion.usageCount || suggestion.usageCount === 0) && (
              <Text fontSize="sm" color="gray.700" fontWeight={500}>
                {suggestion.usageCount === 0 ? 'Create' : `(${suggestion.usageCount})`}
              </Text>
            )}
          </Flex>
        )}
        renderSuggestionsContainer={({ containerProps, children }) =>
          !!children && (
            <Box
              {...containerProps}
              borderLeftWidth={1}
              borderRightWidth={1}
              borderBottomWidth={1}
              borderTopWidth={1}
              mt="-1px"
              borderBottomLeftRadius={3}
              borderBottomRightRadius={3}
              borderColor="gray.400"
              zIndex={1000}
              position="absolute"
              width={width}
            >
              {children}
            </Box>
          )
        }
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => (
          <InputGroup size={size}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input
              size={size}
              _focus={{ borderColor: 'blue.500' }}
              isDisabled={isDisabled}
              variant="outline"
              borderRadius={6}
              {...inputProps}
            />
          </InputGroup>
        )}
      />
    </Box>
  );
};
