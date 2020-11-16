import { Box, Flex, Input, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { LearningMaterialTagSearchResult } from '../../../graphql/types';
import { useSearchLearningMaterialTagsLazyQuery } from './LearningMaterialTagSelector.generated';

interface LearningMaterialTagSelectorProps {
  onSelect: (tag: LearningMaterialTagSearchResult | { name: string; new: true }) => any;
  width?: string;
  isDisabled?: boolean;
  size?: 'sm' | 'md';
  placeholder?: string;
}

export const searchLearningMaterialTags = gql`
  query searchLearningMaterialTags($options: SearchLearningMaterialTagsOptions!) {
    searchLearningMaterialTags(options: $options) {
      name
      usageCount
    }
  }
`;
export const LearningMaterialTagSelector: React.FC<LearningMaterialTagSelectorProps> = ({
  onSelect,
  width,
  isDisabled,
  size = 'md',
  placeholder,
}) => {
  width = width || '200px';
  const [value, setValue] = useState('');
  const [refetch, { data }] = useSearchLearningMaterialTagsLazyQuery();

  const suggestions: LearningMaterialTagSearchResult[] = uniqBy(
    [
      {
        name: value,
        usageCount: 0,
      },
      ...(data?.searchLearningMaterialTags || []),
    ],
    'name'
  );

  const inputProps = {
    placeholder: placeholder || 'Search tags...',
    value,
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
        getSuggestionValue={(suggestion) => suggestion.name}
        renderInputComponent={(inputProps: any) => (
          <Input size={size} isDisabled={isDisabled} variant="flushed" {...inputProps} />
        )}
      />
    </Box>
  );
};
