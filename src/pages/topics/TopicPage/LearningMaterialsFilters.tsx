import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
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
import { TopicTreePage } from '../TopicTreePage';
import { FeedAvailableFilters, TopicPageLearningMaterialsFeedOptions } from './TopicPageLearningMaterialsFeed';

// export enum TopicPageLearningMaterialFeedTypeFilter {
//   Course = 'Course',
//   Video = 'Video',
//   Podcast = 'Podcast',
//   Short = 'Short',
//   Long = 'Long',
//   Article = 'Article',
//   LearningPath = 'LearningPath',
//   // Exercise = 'Exercise'
// }

export enum TopicPageLearningMaterialFeedTypeFilter {
  Read = 'Read',
  Watch = 'Watch',
  Listen = 'Listen',
  Study = 'Study',
  Practice = 'Practice',
  Short = 'Short',
  Long = 'Long',
  LearningPath = 'LearningPath',
}

// export const LMFeedFiltersToVerbMapping = {
//   [TopicPageLearningMaterialFeedTypeFilter.Stu]: 'Study',
//   [TopicPageLearningMaterialFeedTypeFilter.Video]: 'Watch',
//   [TopicPageLearningMaterialFeedTypeFilter.Podcast]: 'Listen',
//   [TopicPageLearningMaterialFeedTypeFilter.Short]: 'Short', // ?
//   [TopicPageLearningMaterialFeedTypeFilter.Long]: 'Long', // ?
//   [TopicPageLearningMaterialFeedTypeFilter.Article]: 'Read',
//   // [TopicPageLearningMaterialFeedTypeFilter.Exercise]: 'Practice',
//   // [TopicPageLearningMaterialFeedTypeFilter.LearningPath  ]: '', Follow ?
// };

export const LMFeedFiltersToResourceTypeMapping = {
  [TopicPageLearningMaterialFeedTypeFilter.Read]: [
    ResourceType.Article,
    ResourceType.ArticleSeries,
    ResourceType.Book,
    ResourceType.OnlineBook,
    ResourceType.ResearchPaper,
  ],
  [TopicPageLearningMaterialFeedTypeFilter.Watch]: [
    ResourceType.YoutubeVideo,
    ResourceType.YoutubePlaylist,
    ResourceType.Talk,
    ResourceType.Documentary,
  ],
  [TopicPageLearningMaterialFeedTypeFilter.Listen]: [
    ResourceType.Podcast,
    ResourceType.PodcastEpisode,
    ResourceType.Talk,
  ],

  [TopicPageLearningMaterialFeedTypeFilter.Study]: [ResourceType.Course],
  [TopicPageLearningMaterialFeedTypeFilter.Practice]: [
    ResourceType.Project,
    ResourceType.Exercise,
    ResourceType.VideoGame, // ? Or Play filter ?
  ],
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
      <Flex direction="row" alignItems="baseline" pt={1} justifyContent="space-between" flexWrap="wrap">
        <Text fontSize="2xl" fontWeight={500} mr={2}>
          Best Resources
        </Text>
        <Flex direction="row" justifyContent="space-between" flexGrow={1} flexWrap="wrap">
          <Box py={1}>
            <SearchResourcesInput onChange={(value) => setFeedOptions({ ...feedOptions, query: value || undefined })} />
          </Box>
          <FormControl id="sort_by" w="260px" display="flex" flexDir="row" alignItems="center" pl={1} pr={3} py={1}>
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
      </Flex>
      <Wrap spacing="8px" mt={3} justify={{ base: 'center', lg: 'normal' }}>
        <WrapItem>
          <LearningMaterialFilterItem
            color="yellow.500"
            onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Read)}
            isSelected={feedOptions.typeFilters.Read}
            isDisabled={
              feedAvailableFilters &&
              intersection(feedAvailableFilters.types, LMFeedFiltersToResourceTypeMapping.Read).length === 0
            }
          >
            Read
          </LearningMaterialFilterItem>
        </WrapItem>
        <WrapItem>
          <LearningMaterialFilterItem
            onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Watch)}
            color="red.500"
            isSelected={feedOptions.typeFilters.Watch}
            isDisabled={
              feedAvailableFilters &&
              intersection(feedAvailableFilters.types, LMFeedFiltersToResourceTypeMapping.Watch).length === 0
            }
          >
            Watch
          </LearningMaterialFilterItem>
        </WrapItem>
        <WrapItem>
          <LearningMaterialFilterItem
            onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Listen)}
            color="orange.500"
            isSelected={feedOptions.typeFilters.Listen}
            isDisabled={
              feedAvailableFilters &&
              intersection(feedAvailableFilters.types, LMFeedFiltersToResourceTypeMapping.Listen).length === 0
            }
          >
            Listen
          </LearningMaterialFilterItem>
        </WrapItem>
        <WrapItem>
          <LearningMaterialFilterItem
            onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Study)}
            color="teal.600"
            isSelected={feedOptions.typeFilters.Study}
            isDisabled={
              feedAvailableFilters &&
              intersection(feedAvailableFilters.types, LMFeedFiltersToResourceTypeMapping.Study).length === 0
            }
          >
            Study
          </LearningMaterialFilterItem>
        </WrapItem>
        <WrapItem>
          <LearningMaterialFilterItem
            onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.Practice)}
            color="gray.600"
            isSelected={feedOptions.typeFilters.Practice}
            isDisabled={
              feedAvailableFilters &&
              intersection(feedAvailableFilters.types, LMFeedFiltersToResourceTypeMapping.Practice).length === 0
            }
          >
            Practice
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
            color="teal.500"
            onSelect={() => toggleTypeFilter(TopicPageLearningMaterialFeedTypeFilter.LearningPath)}
            isSelected={feedOptions.typeFilters.LearningPath}
            isDisabled={feedAvailableFilters && feedAvailableFilters.learningPathsCount === 0}
          >
            Learning Path
          </LearningMaterialFilterItem>
        </WrapItem>
      </Wrap>
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
    <Flex direction="row">
      <Wrap
        ref={containerRef}
        spacing={`${wrapPxSpacing}px`}
        {...(!isExpanded && {
          maxH: wrapItemPxHeight + wrapPxSpacing + 'px',
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
        <Center h={`${wrapItemPxHeight}px`}>
          <IconButton
            aria-label="expand tags filters"
            size="xs"
            isRound
            fontSize="1em"
            variant="ghost"
            icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </Center>
      )}
    </Flex>
  );
};
