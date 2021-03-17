import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { useEffect, useMemo, useRef, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { BeatLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';
import { routerPushToPage } from '../../../pages/PageInfo';
import {
  ConceptPageInfo,
  DomainPageInfo,
  LearningGoalPageInfo,
  LearningPathPageInfo,
  ResourcePageInfo,
} from '../../../pages/RoutesPageInfos';
import { theme } from '../../../theme/theme';
import { GlobalSearchQuery, useGlobalSearchLazyQuery } from './GlobalSearchBox.generated';
import { SearchResultCard, SearchResultCardData } from './search_results_cards/SearchResultCard';

export const globalSearch = gql`
  query globalSearch($query: String!, $options: GlobalSearchOptions) {
    globalSearch(query: $query, options: $options) {
      results {
        ...SearchResultCardData
      }
    }
  }
  ${SearchResultCardData}
`;
interface GlobalSearchBoxProps {
  placeholder?: string;
  isDisabled?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
  width?: string;
}

type SearchResult = GlobalSearchQuery['globalSearch']['results'][0];

export const GlobalSearchBox: React.FC<GlobalSearchBoxProps> = ({
  isDisabled,
  inputSize = 'sm',
  width = '180px',
  placeholder = 'Search...',
}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [pendingSearch, setPendingSearch] = useState(false);

  const [globalSearchLazyQuery, { loading }] = useGlobalSearchLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setSuggestions(data.globalSearch.results);
      setPendingSearch(false);
    },
  });

  const debouncedSearch = useDebouncedCallback((query: string) => {
    globalSearchLazyQuery({ variables: { query, options: { pagination: { limit: 6, offset: 0 } } } });
  }, 300);

  const isSearching = loading || pendingSearch;

  const shouldSearch = useMemo(() => {
    return value.length >= 3;
  }, [value]);

  useEffect(() => {
    if (shouldSearch) {
      debouncedSearch.callback(value);
      setPendingSearch(true);
    } else {
      debouncedSearch.cancel();
      setSuggestions([]);
    }
  }, [value]);

  const inputProps = {
    placeholder,
    value,
    isDisabled,
    onChange: (_event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };

  let inputRef = useRef<HTMLDivElement>(null);
  return (
    <Box w={width} ref={inputRef}>
      <Autosuggest
        shouldRenderSuggestions={() => {
          return true;
        }}
        suggestions={suggestions}
        inputProps={inputProps}
        onSuggestionsFetchRequested={({ value: v }) => setValue(v)}
        onSuggestionsClearRequested={() => {
          setSuggestions([]);
          setValue('');
        }}
        onSuggestionSelected={(e, { suggestion }) => {
          e.preventDefault();
          if (suggestion.entity.__typename === 'Domain') routerPushToPage(DomainPageInfo(suggestion.entity));
          if (suggestion.entity.__typename === 'Concept') {
            if (suggestion.entity.domain)
              routerPushToPage(ConceptPageInfo(suggestion.entity.domain, suggestion.entity));
            else throw new Error('Concept missing domain');
          }
          if (suggestion.entity.__typename === 'LearningGoal') {
            if (suggestion.entity) routerPushToPage(LearningGoalPageInfo(suggestion.entity));
          }
          if (suggestion.entity.__typename === 'Resource') routerPushToPage(ResourcePageInfo(suggestion.entity));
          if (suggestion.entity.__typename === 'LearningPath')
            routerPushToPage(LearningPathPageInfo(suggestion.entity));

          setValue('');
        }}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <SearchResultCard searchResult={suggestion} isHighlighted={isHighlighted} />
        )}
        renderSuggestionsContainer={({ containerProps, children }) =>
          children && (
            <Box {...containerProps} w="400px" borderTopWidth={1} zIndex={1000} position="absolute" bgColor="white">
              {children}
            </Box>
          )
        }
        highlightFirstSuggestion={true}
        getSuggestionValue={(suggestion) => value}
        renderInputComponent={(inputProps: any) => (
          <InputGroup size={inputSize}>
            <Input variant="outline" borderRadius={4} _focus={{ borderColor: 'gray.500' }} {...inputProps} w={width} />
            {isSearching && (
              <InputRightElement w="auto" px={2}>
                <BeatLoader size={{ sm: 5, md: 8, lg: 9 }[inputSize]} margin={2} color={theme.colors.main} />
              </InputRightElement>
            )}
          </InputGroup>
        )}
      />
    </Box>
  );
};
