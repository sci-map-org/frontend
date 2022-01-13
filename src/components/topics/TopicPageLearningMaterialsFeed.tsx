import { Flex, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { TopicLearningMaterialsSortingType } from '../../graphql/types';
import { GetTopicByKeyTopicPageQuery } from '../../pages/topics/TopicPage.generated';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
import { ResourcePreviewCardDataFragment } from '../resources/ResourcePreviewCard.generated';
import { SubTopicFilter } from './SubTopicFilter';
import { TopicRecommendedLearningMaterials } from './TopicRecommendedLearningMaterials';
import { useGetTopicRecommendedLearningMaterialsQuery } from './TopicRecommendedLearningMaterials.generated';

export enum TopicPageLearningMaterialFeedTypeFilter {
  Course = 'Course',
  Video = 'Video',
  Podcast = 'Podcast',
  Short = 'Short',
  Long = 'Long',
  Article = 'Article',
  LearningPath = 'LearningPath',
}

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
  learningMaterials: Array<ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment>;
  loading: boolean;
  refetch: () => void;
} => {
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
      if (data?.getTopicByKey.learningMaterials?.items) {
        setLearningMaterialPreviews(data?.getTopicByKey.learningMaterials?.items);
      }
    },
  });
  const [learningMaterialPreviews, setLearningMaterialPreviews] = useState<
    (ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment)[]
  >([]);

  const learningMaterials = learningMaterialsData?.getTopicByKey?.learningMaterials?.items || learningMaterialPreviews; // ? after getDomainByKey because of https://github.com/apollographql/apollo-client/issues/6986
  return {
    learningMaterials,
    loading,
    refetch,
    topic: learningMaterialsData?.getTopicByKey,
    feedAvailableFilters: {},
    totalPages: 7,
  };
};

interface TopicPageLearningMaterialsFeedProps {
  subTopics: TopicLinkDataFragment[];
  selectedTopic: GetTopicByKeyTopicPageQuery['getTopicByKey'];
  learningMaterials: Array<ResourcePreviewCardDataFragment | LearningPathPreviewCardDataFragment>;
  totalPages: number;
  feedAvailableFilters: any;
  feedOptions: TopicPageLearningMaterialsFeedOptions;
  setFeedOptions: (options: TopicPageLearningMaterialsFeedOptions) => void;
  isLoading: boolean;
}

export const TopicPageLearningMaterialsFeed: React.FC<TopicPageLearningMaterialsFeedProps> = ({
  subTopics,
  selectedTopic,
  learningMaterials,
  totalPages,
  feedAvailableFilters,
  feedOptions,
  setFeedOptions,
  isLoading,
}) => {
  return (
    <Stack spacing={5}>
      <SubTopicFilter
        subTopics={subTopics.map((subTopic) => subTopic) || []}
        selectedSubTopic={subTopics.find((subTopic) => subTopic.key === feedOptions.selectedSubTopicKey) || null}
        onChange={(selectedSubTopicKey) => setFeedOptions({ ...feedOptions, selectedSubTopicKey })}
      />
      <Flex px={feedOptions.selectedSubTopicKey ? 10 : 0}>
        <TopicRecommendedLearningMaterials
          learningMaterialsPreviews={learningMaterials}
          isLoading={isLoading}
          // reloadRecommendedResources={() => refetchLearningMaterials()}
          reloadRecommendedResources={() => console.log('reloading')}
          feedOptions={feedOptions}
          setFeedOptions={setFeedOptions}
        />
      </Flex>
    </Stack>
  );
};
