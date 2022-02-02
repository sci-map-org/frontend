import { NetworkStatus } from '@apollo/client';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { omit, range } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import {
  LearningPathPreviewCard,
  LearningPathPreviewCardData,
} from '../../../components/learning_paths/LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from '../../../components/learning_paths/LearningPathPreviewCard.generated';
import { PageLink } from '../../../components/navigation/InternalLink';
import { LearningMaterialPreviewCardList } from '../../../components/resources/LearningMaterialPreviewCardList';
import { ResourceFeedCard } from '../../../components/resources/ResourceFeedCard';
import { ResourcePreviewCard } from '../../../components/resources/ResourcePreviewCard';
import { TopicDescription } from '../../../components/topics/fields/TopicDescription';
import { TopicSubHeader } from '../../../components/topics/TopicSubHeader';
import { ResourceFeedCardData, ResourcePreviewCardData } from '../../../graphql/resources/resources.fragments';
import {
  ResourceFeedCardDataFragment,
  ResourcePreviewCardDataFragment,
} from '../../../graphql/resources/resources.fragments.generated';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import {
  LearningMaterialType,
  ResourceType,
  TopicLearningMaterialsFilterOptions,
  TopicLearningMaterialsSortingType,
} from '../../../graphql/types';
import { useScroll } from '../../../hooks/useScroll';
import { TopicPageInfo } from '../../RoutesPageInfos';
import {
  LearningMaterialsFilters,
  LMFeedFiltersToResourceTypeMapping,
  TopicPageLearningMaterialFeedTypeFilter,
} from './LearningMaterialsFilters';
import { SubTopicFilter, SubTopicFilterData } from './SubTopicFilter';
import { SubTopicFilterDataFragment } from './SubTopicFilter.generated';
import { useGetTopicRecommendedLearningMaterialsQuery } from './TopicPageLearningMaterialsFeed.generated';

export const LM_FEED_RESULTS_PER_PAGE = 8;

export const getTopicRecommendedLearningMaterials = gql`
  query getTopicRecommendedLearningMaterials($key: String!, $learningMaterialsOptions: TopicLearningMaterialsOptions!) {
    getTopicByKey(topicKey: $key) {
      _id
      ...SubTopicFilterData
      learningMaterials(options: $learningMaterialsOptions) {
        items {
          ...ResourceFeedCardData
          ...LearningPathPreviewCardData
        }
        totalCount
        availableTagFilters {
          name
          count
        }
      }
      learningMaterialsTotalCount
      learningMaterialsAvailableTypeFilters {
        types
        learningPathsCount
        leq30minCount
        geq30minCount
      }
    }
  }
  ${ResourceFeedCardData}
  ${LearningPathPreviewCardData}
  ${SubTopicFilterData}
`;

export interface TopicPageLearningMaterialsFeedOptions {
  mainTopicKey: string;
  selectedSubTopicKey: string | null;
  sorting: TopicLearningMaterialsSortingType;
  query?: string;
  page: number;
  typeFilters: {
    [key in TopicPageLearningMaterialFeedTypeFilter]?: boolean;
  };
  tagsFilters: string[];
}

function getFilterOptionsFromFilterTypes(
  filterTypes: TopicPageLearningMaterialsFeedOptions['typeFilters']
): Pick<
  TopicLearningMaterialsFilterOptions,
  'learningMaterialTypeIn' | 'resourceTypeIn' | 'durationSecondsGeq' | 'durationSecondsLeq'
> {
  let durationSecondsGeq: number | undefined = undefined;
  let durationSecondsLeq: number | undefined = undefined;
  if (
    filterTypes[TopicPageLearningMaterialFeedTypeFilter.Short] &&
    filterTypes[TopicPageLearningMaterialFeedTypeFilter.Long]
  ) {
  } else {
    if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Short]) {
      durationSecondsLeq = 60 * 30;
    }
    if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Long]) {
      durationSecondsGeq = 60 * 30;
    }
  }

  const hasFilterEnabled = Object.keys(filterTypes)
    .filter(
      (type) =>
        !(
          type === TopicPageLearningMaterialFeedTypeFilter.Short ||
          type === TopicPageLearningMaterialFeedTypeFilter.Long
        )
    )
    .reduce((acc, key) => {
      if (!!filterTypes[key as keyof typeof filterTypes]) return true;
      return acc;
    }, false);
  if (!hasFilterEnabled)
    return {
      learningMaterialTypeIn: [LearningMaterialType.LearningPath, LearningMaterialType.Resource],
      resourceTypeIn: undefined,
      durationSecondsGeq,
      durationSecondsLeq,
    };
  const learningMaterialTypeIn: TopicLearningMaterialsFilterOptions['learningMaterialTypeIn'] = [];
  const resourceTypeIn: TopicLearningMaterialsFilterOptions['resourceTypeIn'] = [];
  if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.LearningPath]) {
    learningMaterialTypeIn.push(LearningMaterialType.LearningPath);
  }
  if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Read]) {
    if (!learningMaterialTypeIn.includes(LearningMaterialType.Resource))
      learningMaterialTypeIn.push(LearningMaterialType.Resource);
    resourceTypeIn.push(...LMFeedFiltersToResourceTypeMapping[TopicPageLearningMaterialFeedTypeFilter.Read]);
  }
  if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Watch]) {
    if (!learningMaterialTypeIn.includes(LearningMaterialType.Resource))
      learningMaterialTypeIn.push(LearningMaterialType.Resource);
    resourceTypeIn.push(...LMFeedFiltersToResourceTypeMapping[TopicPageLearningMaterialFeedTypeFilter.Watch]);
  }
  if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Listen]) {
    if (!learningMaterialTypeIn.includes(LearningMaterialType.Resource))
      learningMaterialTypeIn.push(LearningMaterialType.Resource);
    resourceTypeIn.push(...LMFeedFiltersToResourceTypeMapping[TopicPageLearningMaterialFeedTypeFilter.Listen]);
  }
  if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Study]) {
    if (!learningMaterialTypeIn.includes(LearningMaterialType.Resource))
      learningMaterialTypeIn.push(LearningMaterialType.Resource);
    resourceTypeIn.push(...LMFeedFiltersToResourceTypeMapping[TopicPageLearningMaterialFeedTypeFilter.Study]);
  }
  if (filterTypes[TopicPageLearningMaterialFeedTypeFilter.Practice]) {
    if (!learningMaterialTypeIn.includes(LearningMaterialType.Resource))
      learningMaterialTypeIn.push(LearningMaterialType.Resource);
    resourceTypeIn.push(...LMFeedFiltersToResourceTypeMapping[TopicPageLearningMaterialFeedTypeFilter.Practice]);
  }
  return {
    learningMaterialTypeIn,
    resourceTypeIn,
    durationSecondsGeq,
    durationSecondsLeq,
  };
}
export const useTopicPageLearningMaterialsFeed = (
  options: TopicPageLearningMaterialsFeedOptions
): {
  feedAvailableFilters?: FeedAvailableFilters;
  totalPages: number;
  lastSelectedTopic: SubTopicFilterDataFragment | null;
  learningMaterials: Array<ResourceFeedCardDataFragment | LearningPathPreviewCardDataFragment>;
  loading: boolean;
  initialLoading: boolean;
  isReloading: boolean;
  isRefetching: boolean;
  refetch: () => void;
} => {
  // Why creating a variable here and not using networkStatus along with notifyOnNetworkStatusChange ?
  // Pretty long story, in short in order to update the cards UI cleanly when recommending/completing a resource
  // we want to avoid showing a loading state again. useFragment (https://github.com/apollographql/apollo-client/issues/8236)
  // could help avoid this, but it would still be a bit complicated and fragile.
  // Overall we're entering Apollo Client's limitations with the feed's logic
  const [isRefetching, setIsRefetching] = useState(false);

  const [lastSelectedTopic, setLastSelectedTopic] = useState<SubTopicFilterDataFragment | null>(null);

  const [feedAvailableFilters, setFeedAvailableFilters] = useState<FeedAvailableFilters | undefined>();

  const filter = useMemo(() => {
    return getFilterOptionsFromFilterTypes(options.typeFilters);
  }, [options.typeFilters]);

  const { data, previousData, loading, refetch, networkStatus } = useGetTopicRecommendedLearningMaterialsQuery({
    variables: {
      key: options.selectedSubTopicKey || options.mainTopicKey,
      learningMaterialsOptions: {
        sortingType: options.sorting,
        query: options.query,
        filter: {
          ...filter,
          learningMaterialTagsIn: options.tagsFilters.length ? options.tagsFilters : undefined,
        },
        pagination: {
          offset: (options.page - 1) * LM_FEED_RESULTS_PER_PAGE,
          limit: LM_FEED_RESULTS_PER_PAGE,
        },
      },
    },
    // nextFetchPolicy: 'standby',
    fetchPolicy: 'network-only',
    ssr: false,
    // notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (!data) throw new Error('Fetch failed');
      setLastSelectedTopic(omit(data.getTopicByKey, ['learningMaterials']));
      if (
        data.getTopicByKey?.learningMaterials?.availableTagFilters &&
        data.getTopicByKey?.learningMaterialsAvailableTypeFilters
      ) {
        setFeedAvailableFilters({
          tagFilters: data.getTopicByKey.learningMaterials.availableTagFilters,
          ...data.getTopicByKey.learningMaterialsAvailableTypeFilters,
        });
      }
      // if (data.getTopicByKey.learningMaterials) {
      //   setLearningMaterialsTotalCount(data.getTopicByKey.learningMaterials.totalCount);
      // setLearningMaterialPreviews(data.getTopicByKey.learningMaterials.items);
      // }
    },
  });
  const lastFetchedData = data?.getTopicByKey || previousData?.getTopicByKey;
  const learningMaterialPreviews = lastFetchedData?.learningMaterials?.items || [];
  const learningMaterialsTotalCount = lastFetchedData?.learningMaterials?.totalCount;

  const totalPages = !!learningMaterialsTotalCount
    ? 1 + Math.floor((learningMaterialsTotalCount - 0.005) / LM_FEED_RESULTS_PER_PAGE)
    : 1;

  return {
    learningMaterials: learningMaterialPreviews,
    loading,
    initialLoading: networkStatus === NetworkStatus.loading,
    isReloading: networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.refetch,
    isRefetching,
    refetch: async () => {
      setIsRefetching(true);
      await refetch();
      setIsRefetching(false);
    },
    lastSelectedTopic,
    feedAvailableFilters,
    totalPages: totalPages,
  };
};

export interface FeedAvailableFilters {
  tagFilters: Array<{ name: string; count: number }>;
  types: ResourceType[];
  learningPathsCount: number;
  leq30minCount: number;
  geq30minCount: number;
}

interface TopicPageLearningMaterialsFeedProps {
  subTopics: TopicLinkDataFragment[];
  mainTopic: TopicLinkDataFragment;
  selectedSubTopic: SubTopicFilterDataFragment | null;
  learningMaterials: Array<ResourceFeedCardDataFragment | LearningPathPreviewCardDataFragment>;
  totalPages: number;
  feedAvailableFilters?: FeedAvailableFilters;
  feedOptions: TopicPageLearningMaterialsFeedOptions;
  setFeedOptions: (options: TopicPageLearningMaterialsFeedOptions) => void;
  isLoading: boolean;
  initialLoading: boolean;
  isReloading: boolean;
}

export const TopicPageLearningMaterialsFeed: React.FC<TopicPageLearningMaterialsFeedProps> = ({
  subTopics,
  mainTopic,
  selectedSubTopic,
  learningMaterials,
  totalPages,
  feedAvailableFilters,
  feedOptions,
  setFeedOptions,
  isLoading,
  initialLoading,
  isReloading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const partiallyLoadedSelectedSubTopic =
    selectedSubTopic || subTopics.find((subTopic) => subTopic.key === feedOptions.selectedSubTopicKey) || null;

  const { scrollToElement } = useScroll('auto');
  return (
    <Stack spacing={5} width="100%" position="relative">
      {!!subTopics.length && (
        <SubTopicFilter
          mainTopic={mainTopic}
          subTopics={subTopics.map((subTopic) => subTopic) || []}
          selectedSubTopic={
            selectedSubTopic || subTopics.find((subTopic) => subTopic.key === feedOptions.selectedSubTopicKey) || null
          }
          onChange={(selectedSubTopicKey) =>
            setFeedOptions({ ...feedOptions, selectedSubTopicKey, page: 1, tagsFilters: [] })
          }
          isLoading={isLoading}
        />
      )}
      <Flex
        ref={scrollRef}
        direction="column"
        px={{ base: feedOptions.selectedSubTopicKey ? 10 : 0, md: feedOptions.selectedSubTopicKey ? 10 : 0 }}
        alignItems="stretch"
      >
        {partiallyLoadedSelectedSubTopic && (
          <Box position="relative">
            <PageLink
              color="blue.500"
              display="flex"
              alignItems="baseline"
              position="absolute"
              right="6px"
              top="6px"
              pageInfo={TopicPageInfo(partiallyLoadedSelectedSubTopic)}
              isExternal
            >
              Explore
              <ExternalLinkIcon ml="6px" boxSize={4} />
            </PageLink>
            <Stack spacing={5} pb={3}>
              <Divider borderColor="gray.400" />

              <Stack alignItems="center">
                <PageLink pageInfo={TopicPageInfo(partiallyLoadedSelectedSubTopic)} isExternal>
                  <Heading color="gray.600" size="lg">
                    {partiallyLoadedSelectedSubTopic.name}
                  </Heading>
                </PageLink>
                {selectedSubTopic ? (
                  <TopicSubHeader topic={selectedSubTopic} size="sm" justify="center" subTopicsDisplay="count" />
                ) : (
                  <TopicSubHeader topic={partiallyLoadedSelectedSubTopic} size="sm" isLoading={true} />
                )}
                {selectedSubTopic && <TopicDescription topicDescription={selectedSubTopic.description || undefined} />}
              </Stack>
            </Stack>
          </Box>
        )}
        <LearningMaterialsFilters
          feedAvailableFilters={feedAvailableFilters}
          feedOptions={feedOptions}
          setFeedOptions={(options) => {
            setFeedOptions({ ...options, page: 1 });
          }}
        />
        <LearningMaterialPreviewCardList
          learningMaterialsPreviewItems={learningMaterials.map((learningMaterial) => ({ learningMaterial }))}
          isLoading={initialLoading}
          loadingMessage="Finding the most adapted learning resources..."
          renderCard={({ learningMaterial }, idx) => {
            if (learningMaterial.__typename === 'Resource')
              return (
                <ResourceFeedCard
                  key={learningMaterial._id}
                  resource={learningMaterial}
                  onResourceConsumed={() => console.log('reloading')}
                  showCompletedNotificationToast={true}
                  isLoading={isReloading}
                />
              );
            if (learningMaterial.__typename === 'LearningPath')
              return (
                <LearningPathPreviewCard
                  learningPath={learningMaterial}
                  key={learningMaterial._id}
                  leftBlockWidth="120px"
                  inCompactList
                  firstItemInCompactList={idx === 0}
                  isLoading={isReloading}
                />
              );
          }}
        />
        <Flex pt={2}>
          <Pagination
            currentPage={feedOptions.page}
            totalPages={totalPages}
            setCurrentPage={(page) => {
              scrollToElement(scrollRef);
              setFeedOptions({ ...feedOptions, page });
            }}
          />
        </Flex>
      </Flex>
    </Stack>
  );
};

const i = 2;
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  setCurrentPage: (newPage: number) => void;
}> = ({ currentPage, totalPages, setCurrentPage }) => {
  const shownPageNumbers = useMemo(() => {
    const pages = range(1, totalPages + 1);
    return pages.slice(Math.max(currentPage - 1 - i, 0), Math.min(currentPage + i, totalPages));
  }, [totalPages, currentPage]);

  return (
    <Stack direction="row">
      <Button
        size="sm"
        variant="outline"
        isDisabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      {shownPageNumbers[0] > 1 && (
        <>
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(1)}>
            1
          </Button>
          {shownPageNumbers[0] > 2 && <Text>..</Text>}
        </>
      )}
      {shownPageNumbers.map((shownPageNumber) => (
        <Button
          size="sm"
          key={shownPageNumber}
          isDisabled={currentPage === shownPageNumber}
          variant={currentPage === shownPageNumber ? 'solid' : 'outline'}
          colorScheme={currentPage === shownPageNumber ? 'blue' : 'gray'}
          onClick={() => setCurrentPage(shownPageNumber)}
        >
          {shownPageNumber}
        </Button>
      ))}
      {shownPageNumbers[shownPageNumbers.length - 1] <= totalPages - 1 && (
        <>
          {shownPageNumbers[shownPageNumbers.length - 1] <= totalPages - 2 && <Text>..</Text>}
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
      <Button
        size="sm"
        variant="outline"
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </Stack>
  );
};
