import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { debounce, intersection, xor } from 'lodash';
import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useDebounce } from 'use-debounce';
import { ResourceType, TopicLearningMaterialsSortingType } from '../../../graphql/types';
import { theme } from '../../../theme/theme';
import { FeedAvailableFilters, TopicPageLearningMaterialsFeedOptions } from './TopicPageLearningMaterialsFeed';

export enum TopicPageLearningMaterialFeedTypeFilter {
  Course = 'Course',
  Video = 'Video',
  Podcast = 'Podcast',
  Short = 'Short',
  Long = 'Long',
  Article = 'Article',
  LearningPath = 'LearningPath',
  // Exercise = 'Exercise'
}

export const LMFeedFiltersToVerbMapping = {
  [TopicPageLearningMaterialFeedTypeFilter.Course]: 'Study',
  [TopicPageLearningMaterialFeedTypeFilter.Video]: 'Watch',
  [TopicPageLearningMaterialFeedTypeFilter.Podcast]: 'Listen',
  [TopicPageLearningMaterialFeedTypeFilter.Short]: 'Short', // ?
  [TopicPageLearningMaterialFeedTypeFilter.Long]: 'Long', // ?
  [TopicPageLearningMaterialFeedTypeFilter.Article]: 'Read',
  // [TopicPageLearningMaterialFeedTypeFilter.Exercise]: 'Practice',
  // [TopicPageLearningMaterialFeedTypeFilter.LearningPath  ]: '', Follow ?
};

export const LMFeedFiltersToResourceTypeMapping = {
  [TopicPageLearningMaterialFeedTypeFilter.Course]: [ResourceType.Course],
  [TopicPageLearningMaterialFeedTypeFilter.Video]: [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist],
  [TopicPageLearningMaterialFeedTypeFilter.Podcast]: [ResourceType.Podcast, ResourceType.PodcastEpisode],
  [TopicPageLearningMaterialFeedTypeFilter.Article]: [ResourceType.Article, ResourceType.ArticleSeries],
  // [TopicPageLearningMaterialFeedTypeFilter.]
};

interface LearningMaterialFiltersProps {
  feedAvailableFilters?: FeedAvailableFilters;
  feedOptions: TopicPageLearningMaterialsFeedOptions;
  setFeedOptions: (options: TopicPageLearningMaterialsFeedOptions) => void;
}

export const LearningMaterialsFilters: React.FC<LearningMaterialFiltersProps> = ({
  feedOptions,
  setFeedOptions,
  feedAvailableFilters,
}) => {
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
    <Flex direction="column" alignItems="stretch" pb={3}>
      <Flex direction="row" alignItems="baseline" pt={1} justifyContent="space-between">
        <Wrap>
          <WrapItem>
            <Text fontSize="2xl" fontWeight={500}>
              Best Resources
            </Text>
          </WrapItem>
          <WrapItem>
            <SearchResourcesInput onChange={(value) => setFeedOptions({ ...feedOptions, query: value || undefined })} />
          </WrapItem>
        </Wrap>
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
            {/* <option value={TopicLearningMaterialsSortingType.Recommended}>Most Relevant</option> */}
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
              isDisabled={
                feedAvailableFilters && intersection(feedAvailableFilters.types, [ResourceType.Course]).length === 0
              }
            >
              Course
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Video)}
              color="red.500"
              isSelected={feedOptions.typeFilters.Video}
              isDisabled={
                feedAvailableFilters &&
                intersection(feedAvailableFilters.types, [ResourceType.YoutubePlaylist, ResourceType.YoutubeVideo])
                  .length === 0
              }
            >
              Video
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Podcast)}
              color="orange.500"
              isSelected={feedOptions.typeFilters.Podcast}
              isDisabled={
                feedAvailableFilters &&
                intersection(feedAvailableFilters.types, [ResourceType.Podcast, ResourceType.PodcastEpisode]).length ===
                  0
              }
            >
              Podcast
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Short)}
              color="blue.500"
              isSelected={feedOptions.typeFilters.Short}
              isDisabled={feedAvailableFilters && feedAvailableFilters.leq30minCount === 0}
            >
              Short<Text as="span" fontSize="sm">{`(<30min)`}</Text>
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              color="purple.500"
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Long)}
              isSelected={feedOptions.typeFilters.Long}
              isDisabled={feedAvailableFilters && feedAvailableFilters.geq30minCount === 0}
            >
              Long<Text as="span" fontSize="sm">{`(>30min)`}</Text>
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              color="yellow.500"
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Article)}
              isSelected={feedOptions.typeFilters.Article}
              isDisabled={
                feedAvailableFilters &&
                intersection(feedAvailableFilters.types, [ResourceType.Article, ResourceType.ArticleSeries]).length ===
                  0
              }
            >
              Article
            </LearningMaterialFilterItem>
          </WrapItem>
          <WrapItem>
            <LearningMaterialFilterItem
              color="teal.500"
              onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.LearningPath)}
              isSelected={feedOptions.typeFilters.LearningPath}
              isDisabled={feedAvailableFilters && feedAvailableFilters.learningPathsCount === 0}
            >
              Learning Path
            </LearningMaterialFilterItem>
          </WrapItem>
        </Wrap>
        {/* <Stack direction="row" alignItems="baseline">
          <Text fontWeight={600}>More Filters</Text>
          <ChevronDownIcon />
        </Stack> */}
      </Flex>
      {!!feedAvailableFilters?.tagFilters?.length && (
        <Flex pt={3}>
          <LearningMaterialsTagsFilters
            feedAvailableFilters={feedAvailableFilters}
            feedOptions={feedOptions}
            setFeedOptions={setFeedOptions}
          />
        </Flex>
      )}
    </Flex>
  );
};

const LearningMaterialFilterItem: React.FC<{
  color: string;
  isSelected?: boolean;
  onSelect: () => void;
  isDisabled?: boolean;
}> = ({ color, isSelected, onSelect, children, isDisabled }) => {
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
        cursor: isDisabled ? 'unset' : 'pointer',
      }}
      {...(!isDisabled && { onClick: onSelect })}
      {...(isDisabled && { opacity: 0.5 })}
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

const LearningMaterialTagFitlterItem: React.FC<{
  name: string;
  count: number;
  isSelected?: boolean;
  onSelect: () => void;
}> = ({ name, count, isSelected, onSelect }) => {
  return (
    <Text
      fontSize="14px"
      fontWeight={500}
      borderRadius="14px"
      pt="2px"
      pb="4px"
      px="8px"
      _hover={{
        cursor: 'pointer',
      }}
      {...(isSelected ? { color: 'white', bgColor: 'gray.600' } : { color: 'gray.600', bgColor: 'gray.100' })}
      onClick={() => onSelect()}
      letterSpacing="0.03em"
    >
      {name}{' '}
      <Text as="span" fontWeight={600}>
        ({count})
      </Text>
    </Text>
  );
};

const wrapPxSpacing = 4;
const wrapItemPxHeight = 27;

const LearningMaterialsTagsFilters: React.FC<{
  feedAvailableFilters: FeedAvailableFilters;
  feedOptions: TopicPageLearningMaterialsFeedOptions;
  setFeedOptions: (options: TopicPageLearningMaterialsFeedOptions) => void;
}> = ({ feedAvailableFilters, feedOptions, setFeedOptions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  useEffect(() => {
    const checkIsExpandable = () => {
      if (containerRef.current && !isExpanded) {
        const { clientHeight, scrollHeight } = containerRef.current;

        setIsExpandable(scrollHeight - wrapPxSpacing / 2 > clientHeight);
      }
    };

    const debouncedCheck = debounce(checkIsExpandable, 50);

    checkIsExpandable();
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [containerRef.current, feedAvailableFilters]);
  return (
    <Flex direction="row" alignItems="stretch">
      <Wrap
        ref={containerRef}
        spacing={`${wrapPxSpacing}px`}
        {...(!isExpanded && {
          maxH: 2 * wrapItemPxHeight + wrapPxSpacing + 'px',
          overflow: 'hidden',
        })}
      >
        <WrapItem h={`${wrapItemPxHeight}px`}>
          <Text fontSize="14px" fontWeight={500} color="gray.400">
            Filter by Tags
          </Text>
        </WrapItem>
        {feedAvailableFilters.tagFilters.map((tagFilter) => (
          <WrapItem key={tagFilter.name} h={`${wrapItemPxHeight}px`}>
            <LearningMaterialTagFitlterItem
              name={tagFilter.name}
              count={tagFilter.count}
              isSelected={feedOptions.tagsFilters.includes(tagFilter.name)}
              onSelect={() => {
                setFeedOptions({ ...feedOptions, tagsFilters: xor(feedOptions.tagsFilters, [tagFilter.name]) }); // toggle this tag filter
              }}
            />
          </WrapItem>
        ))}
      </Wrap>
      {isExpandable && (
        <Flex>
          <IconButton
            aria-label="expand tags filters"
            size="sm"
            isRound
            fontSize="1em"
            variant="ghost"
            icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </Flex>
      )}
    </Flex>
  );
};
