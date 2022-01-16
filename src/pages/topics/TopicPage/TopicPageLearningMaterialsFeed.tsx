import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { omit, range } from 'lodash';
import { useMemo, useState } from 'react';
import {
  LearningPathPreviewCard,
  LearningPathPreviewCardData,
} from '../../../components/learning_paths/LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from '../../../components/learning_paths/LearningPathPreviewCard.generated';
import { LearningMaterialPreviewCardList } from '../../../components/resources/LearningMaterialPreviewCardList';
import { ResourcePreviewCard } from '../../../components/resources/ResourcePreviewCard';
import { ResourcePreviewCardDataFragment } from '../../../components/resources/ResourcePreviewCard.generated';
import { ResourcePreviewCardData } from '../../../graphql/resources/resources.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { ResourceType, TopicLearningMaterialsSortingType } from '../../../graphql/types';
import { LearningMaterialsFilters, TopicPageLearningMaterialFeedTypeFilter } from './LearningMaterialsFilters';
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
          ...ResourcePreviewCardData
          ...LearningPathPreviewCardData
        }
      }
      learningMaterialsFilters {
        types
        tagFilters {
          name
          count
        }
      }
      learningMaterialsTotalCount
    }
  }
  ${ResourcePreviewCardData}
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

export const useTopicPageLearningMaterialsFeed = (
  options: TopicPageLearningMaterialsFeedOptions
): {
  topic: any; // TODO
  feedAvailableFilters?: FeedAvailableFilters;
  totalPages: number;
  lastSelectedSubTopic: SubTopicFilterDataFragment | null;
  learningMaterials: Array<ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment>;
  loading: boolean;
  refetch: () => void;
} => {
  const [lastSelectedSubTopic, setLastSelectedSubTopic] = useState<SubTopicFilterDataFragment | null>(null);
  const [learningMaterialPreviews, setLearningMaterialPreviews] = useState<
    (ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment)[]
  >([]);

  const { data, loading, refetch } = useGetTopicRecommendedLearningMaterialsQuery({
    variables: {
      key: options.selectedSubTopicKey || options.mainTopicKey,
      learningMaterialsOptions: {
        sortingType: options.sorting,
        query: options.query,
        filter: { completedByUser: false },
        pagination: {
          offset: (options.page - 1) * LM_FEED_RESULTS_PER_PAGE,
          limit: LM_FEED_RESULTS_PER_PAGE,
        },
      },
    },
    fetchPolicy: 'no-cache',
    ssr: false,
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      if (!data) throw new Error('Fetch failed');
      setLastSelectedSubTopic(omit(data.getTopicByKey, ['learningMaterials']));
      if (data.getTopicByKey.learningMaterials?.items) {
        setLearningMaterialPreviews(data?.getTopicByKey.learningMaterials?.items);
      }
    },
  });
  console.log(data?.getTopicByKey?.learningMaterialsFilters);
  const learningMaterials = data?.getTopicByKey?.learningMaterials?.items || learningMaterialPreviews; // ? after getDomainByKey because of https://github.com/apollographql/apollo-client/issues/6986

  const totalPages = !!data?.getTopicByKey?.learningMaterialsTotalCount
    ? 1 + Math.floor((data.getTopicByKey.learningMaterialsTotalCount - 0.005) / LM_FEED_RESULTS_PER_PAGE)
    : 1;
  // 6/5 -
  // => +1 ?

  // modulo === 0 -> same page
  // 4/4 -> 1
  // 2/4 -> 0
  // 6/4 -> 1
  // console.log(totalPages, LM_FEED_RESULTS_PER_PAGE, data?.getTopicByKey?.learningMaterialsTotalCount);
  return {
    learningMaterials,
    loading,
    refetch,
    lastSelectedSubTopic,
    topic: data?.getTopicByKey,
    feedAvailableFilters: data?.getTopicByKey?.learningMaterialsFilters || undefined,
    totalPages: totalPages,
  };
};

export interface FeedAvailableFilters {
  types: ResourceType[];
  tagFilters: Array<{ name: string; count: number }>;
}

interface TopicPageLearningMaterialsFeedProps {
  subTopics: TopicLinkDataFragment[];
  mainTopic: TopicLinkDataFragment;
  selectedSubTopic: SubTopicFilterDataFragment | null;
  learningMaterials: Array<ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment>;
  totalPages: number;
  feedAvailableFilters?: FeedAvailableFilters;
  feedOptions: TopicPageLearningMaterialsFeedOptions;
  setFeedOptions: (options: TopicPageLearningMaterialsFeedOptions) => void;
  isLoading: boolean;
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
}) => {
  return (
    <Stack spacing={5} width="100%">
      <SubTopicFilter
        subTopics={subTopics.map((subTopic) => subTopic) || []}
        selectedSubTopic={
          selectedSubTopic || subTopics.find((subTopic) => subTopic.key === feedOptions.selectedSubTopicKey) || null
        }
        onChange={(selectedSubTopicKey) => setFeedOptions({ ...feedOptions, selectedSubTopicKey })}
      />
      <Flex direction="column" px={feedOptions.selectedSubTopicKey ? 10 : 0} alignItems="stretch">
        <Flex direction="column" w="100%">
          <LearningMaterialsFilters feedOptions={feedOptions} setFeedOptions={setFeedOptions} />
          <LearningMaterialPreviewCardList
            learningMaterialsPreviewItems={learningMaterials.map((learningMaterial) => ({ learningMaterial }))}
            isLoading={isLoading}
            loadingMessage="Finding the most adapted learning resources..."
            renderCard={({ learningMaterial }, idx) => {
              if (learningMaterial.__typename === 'Resource')
                return (
                  <ResourcePreviewCard
                    key={learningMaterial._id}
                    resource={learningMaterial}
                    onResourceConsumed={() => console.log('reloading')}
                    showCompletedNotificationToast={true}
                    leftBlockWidth="120px"
                    inCompactList
                    firstItemInCompactList={idx === 0}
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
                  />
                );
            }}
          />
        </Flex>
        <Flex>
          <Pagination
            currentPage={feedOptions.page}
            totalPages={totalPages}
            setCurrentPage={(page) => setFeedOptions({ ...feedOptions, page })}
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
          <Text>..</Text>
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
      {currentPage < totalPages - 2 && (
        <>
          <Text>..</Text>
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
