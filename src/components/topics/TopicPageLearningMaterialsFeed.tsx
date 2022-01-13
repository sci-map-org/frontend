import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { omit, range } from 'lodash';
import { useMemo, useState } from 'react';
import { ResourcePreviewCardData } from '../../graphql/resources/resources.fragments';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicLearningMaterialsSortingType } from '../../graphql/types';
import { GetTopicByKeyTopicPageQuery } from '../../pages/topics/TopicPage.generated';
import { LearningPathPreviewCardData } from '../learning_paths/LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
import { ResourcePreviewCardDataFragment } from '../resources/ResourcePreviewCard.generated';
import { SubTopicFilter, SubTopicFilterData } from './SubTopicFilter';
import { SubTopicFilterDataFragment } from './SubTopicFilter.generated';
import { useGetTopicRecommendedLearningMaterialsQuery } from './TopicPageLearningMaterialsFeed.generated';
import { TopicRecommendedLearningMaterials } from './TopicRecommendedLearningMaterials';

export enum TopicPageLearningMaterialFeedTypeFilter {
  Course = 'Course',
  Video = 'Video',
  Podcast = 'Podcast',
  Short = 'Short',
  Long = 'Long',
  Article = 'Article',
  LearningPath = 'LearningPath',
}

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
  feedAvailableFilters: {};
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

  const {
    data: learningMaterialsData,
    loading,
    refetch,
  } = useGetTopicRecommendedLearningMaterialsQuery({
    variables: {
      key: options.selectedSubTopicKey || options.mainTopicKey,
      learningMaterialsOptions: {
        sortingType: options.sorting,
        query: options.query,
        filter: { completedByUser: false },
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

  const learningMaterials = learningMaterialsData?.getTopicByKey?.learningMaterials?.items || learningMaterialPreviews; // ? after getDomainByKey because of https://github.com/apollographql/apollo-client/issues/6986
  return {
    learningMaterials,
    loading,
    refetch,
    lastSelectedSubTopic,
    topic: learningMaterialsData?.getTopicByKey,
    feedAvailableFilters: {},
    totalPages: 7,
  };
};

interface TopicPageLearningMaterialsFeedProps {
  subTopics: TopicLinkDataFragment[];
  mainTopic: TopicLinkDataFragment;
  selectedSubTopic: SubTopicFilterDataFragment | null;
  learningMaterials: Array<ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment>;
  totalPages: number;
  feedAvailableFilters: any;
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
        <TopicRecommendedLearningMaterials
          learningMaterialsPreviews={learningMaterials}
          isLoading={isLoading}
          // reloadRecommendedResources={() => refetchLearningMaterials()}
          reloadRecommendedResources={() => console.log('reloading')}
          feedOptions={feedOptions}
          setFeedOptions={setFeedOptions}
        />
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
