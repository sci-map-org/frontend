import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { omit, range } from 'lodash';
import { DependencyList, useEffect } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useDebounce } from 'use-debounce';
import { ResourcePreviewCardData } from '../../../graphql/resources/resources.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { ResourceType, TopicLearningMaterialsSortingType } from '../../../graphql/types';
import { theme } from '../../../theme/theme';
import {
  LearningPathPreviewCard,
  LearningPathPreviewCardData,
} from '../../../components/learning_paths/LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from '../../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningMaterialPreviewCardList } from '../../../components/resources/LearningMaterialPreviewCardList';
import { ResourcePreviewCard } from '../../../components/resources/ResourcePreviewCard';
import { ResourcePreviewCardDataFragment } from '../../../components/resources/ResourcePreviewCard.generated';
import { SubTopicFilter, SubTopicFilterData } from './SubTopicFilter';
import { SubTopicFilterDataFragment } from './SubTopicFilter.generated';
import { useGetTopicRecommendedLearningMaterialsQuery } from './TopicPageLearningMaterialsFeed.generated';
import { FeedAvailableFilters, TopicPageLearningMaterialsFeedOptions } from './TopicPageLearningMaterialsFeed';

export enum TopicPageLearningMaterialFeedTypeFilter {
  Course = 'Course',
  Video = 'Video',
  Podcast = 'Podcast',
  Short = 'Short',
  Long = 'Long',
  Article = 'Article',
  LearningPath = 'LearningPath',
}

interface LearningMaterialFiltersProps {
  feedOptions: TopicPageLearningMaterialsFeedOptions;
  setFeedOptions: (options: TopicPageLearningMaterialsFeedOptions) => void;
}

export const LearningMaterialsFilters: React.FC<LearningMaterialFiltersProps> = ({ feedOptions, setFeedOptions }) => {
  const toggleTypeFilter = useCallback(
    (typeFilterName: TopicPageLearningMaterialFeedTypeFilter) => {
      setFeedOptions({
        ...feedOptions,
        typeFilters: { ...feedOptions.typeFilters, [typeFilterName]: !feedOptions.typeFilters[typeFilterName] },
      });
    },
    [setFeedOptions, feedOptions]
  );
  return (
    <Flex direction="column" alignItems="stretch">
      <Flex direction="row" alignItems="baseline" pt={1} justifyContent="space-between">
        <Stack direction="row" alignItems="baseline">
          <Text fontSize="2xl" fontWeight={500}>
            Best Resources
          </Text>
          <SearchResourcesInput onChange={(value) => setFeedOptions({ ...feedOptions, query: value || undefined })} />
        </Stack>
        <FormControl id="sort_by" w="260px" display="flex" flexDir="row" alignItems="center" px={3}>
          <FormLabel mb={0} fontWeight={600} flexShrink={0} color="gray.600">
            Sort by:
          </FormLabel>
          <Select
            size="sm"
            fontWeight={500}
            borderColor="white"
            _focus={{}}
            onChange={(e) =>
              setFeedOptions({
                ...feedOptions,
                sorting: e.target.value as TopicLearningMaterialsSortingType,
              })
            }
            value={feedOptions.sorting}
          >
            <option value={TopicLearningMaterialsSortingType.Recommended}>Most Relevant</option>
            <option value={TopicLearningMaterialsSortingType.Rating}>Highest Rating</option>
            <option value={TopicLearningMaterialsSortingType.Newest}>Newest First</option>
          </Select>
        </FormControl>
      </Flex>
      <Flex direction="row" justifyContent="space-between" alignItems="baseline">
        <Wrap spacing="8px" mt={3}>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Course)}
              color="teal.600"
              isSelected={feedOptions.typeFilters.Course}
            >
              Course
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Video)}
              color="red.500"
              isSelected={feedOptions.typeFilters.Video}
            >
              Video
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Podcast)}
              color="orange.500"
              isSelected={feedOptions.typeFilters.Podcast}
            >
              Podcast
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Short)}
              color="blue.500"
              isSelected={feedOptions.typeFilters.Short}
            >
              Short<Text as="span" fontSize="sm">{`(<30min)`}</Text>
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              color="purple.500"
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Long)}
              isSelected={feedOptions.typeFilters.Long}
            >
              Long<Text as="span" fontSize="sm">{`(>30min)`}</Text>
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              color="yellow.500"
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Article)}
              isSelected={feedOptions.typeFilters.Article}
            >
              Article
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              color="teal.500"
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.LearningPath)}
              isSelected={feedOptions.typeFilters.LearningPath}
            >
              Learning Path
            </LearningMaterialFilterItem>
          </WrapItem>
        </Wrap>
        <Stack direction="row" alignItems="baseline">
          <Text fontWeight={600}>More Filters</Text>
          <ChevronDownIcon />
        </Stack>
      </Flex>
      <Flex
        pt={4}
        direction={{ base: 'column', md: 'row' }}
        pb={3}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 2, md: 8 }}
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
          {/* <LearningMaterialTypeFilter
      filterOptions={learningMaterialsOptions.filter}
      setFilterOptions={(filterOptions) =>
        setLearningMaterialsOptions({
          ...learningMaterialsOptions,
          filter: filterOptions,
        })
      }
    /> */}
        </Stack>
        <Box py={1}></Box>
      </Flex>
    </Flex>
  );
};

const LearningMaterialFilterItem: React.FC<{ color: string; isSelected?: boolean; onSelect: () => void }> = ({
  color,
  isSelected,
  onSelect,
  children,
}) => {
  return (
    <Text
      borderWidth={1}
      borderColor={color}
      color={isSelected ? 'white' : color}
      bgColor={isSelected ? color : 'white'}
      px={2}
      py="2px"
      borderRadius="50px"
      fontSize="18px"
      fontWeight={600}
      _hover={{
        cursor: 'pointer',
      }}
      onClick={onSelect}
    >
      {children}
    </Text>
  );
};

function useDidUpdateEffect(fn: () => void, inputs: DependencyList) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}

const SearchResourcesInput: React.FC<{
  onChange: (value: string) => void;
  debounceDuration?: number;
  minQueryLength?: number;
}> = ({ onChange, debounceDuration = 250, minQueryLength = 3 }) => {
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, debounceDuration);

  const shouldSearch = (newValue: string): boolean => {
    return newValue.length >= minQueryLength || !newValue;
  };

  useDidUpdateEffect(() => {
    if (shouldSearch(value)) {
      onChange(value);
    }
  }, [value]);
  return (
    <InputGroup w="14rem" size="sm">
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
      <Input
        variant="outline"
        placeholder="Search..."
        value={query}
        color="gray.600"
        onChange={(e) => setQuery(e.target.value)}
        borderRadius={20}
        // borderColor="white"
        borderWidth={1}
        // bgColor="white"
        _focus={{}}
      />
      {value !== query && shouldSearch(query) && (
        <InputRightElement w="auto" px={2}>
          <BeatLoader size={7} color={theme.colors.main} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
