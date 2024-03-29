import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningPathPreviewCardData } from '../../components/learning_paths/LearningPathPreviewCard';
import { TopicDescription } from '../../components/topics/fields/TopicDescription';
// import { TopicRecommendedLearningMaterials } from '../../components/topics/TopicRecommendedLearningMaterials';
import { ResourcePreviewCardData } from '../../graphql/resources/resources.fragments';
import {
  LearningMaterialType,
  ResourceType,
  TopicLearningMaterialsOptions,
  TopicLearningMaterialsSortingType,
} from '../../graphql/types';
import { TopicPageInfo } from '../RoutesPageInfos';
import { GetBestXPageDataQuery, useGetBestXPageDataQuery } from './BestXPage.generated';

export const getBestXPageData = gql`
  query getBestXPageData($key: String!, $learningMaterialsOptions: TopicLearningMaterialsOptions!) {
    getTopicByKey(topicKey: $key) {
      _id
      key
      name
      description
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
`;

export const BestXPage: React.FC<{ topicKey: string; x: ResourceType[] }> = ({ topicKey, x }) => {
  const [learningMaterialsOptions, setLearningMaterialsOptions] = useState<TopicLearningMaterialsOptions>({
    sortingType: TopicLearningMaterialsSortingType.MostRecommended,
    filter: { completedByUser: false, resourceTypeIn: x, learningMaterialTypeIn: [LearningMaterialType.Resource] },
  });

  const [topicData, setTopicData] = useState<GetBestXPageDataQuery['getTopicByKey']>();
  const {
    data,
    loading,
    refetch: refetchLearningMaterials,
  } = useGetBestXPageDataQuery({
    variables: { key: topicKey, learningMaterialsOptions: learningMaterialsOptions },
    onCompleted(data) {
      setTopicData(data.getTopicByKey);
    },
  });

  const topic = data?.getTopicByKey || topicData;
  if (!topic) return null;

  return (
    <PageLayout marginSize="md" breadCrumbsLinks={[TopicPageInfo(topic)]}>
      <Flex direction="row" w="100%" justifyContent="stretch">
        <Flex direction="column" flexGrow={1}>
          <Heading fontSize="4xl" fontWeight="normal" color="blackAlpha.800">
            Learn {topic.name}
          </Heading>
          {topic && topic.description && <TopicDescription topicDescription={topic.description} noOfLines={5} />}
        </Flex>
      </Flex>
      <Box my={8} />
      <Stack spacing={10} direction="row">
        <Flex flexGrow={1}>
          {/* <TopicRecommendedLearningMaterials
            topic={topic}
            learningMaterialsPreviews={topic.learningMaterials?.items || []}
            isLoading={loading}
            reloadRecommendedResources={() => refetchLearningMaterials()}
            learningMaterialsOptions={learningMaterialsOptions}
            setLearningMaterialsOptions={setLearningMaterialsOptions}
          /> */}
        </Flex>
      </Stack>
    </PageLayout>
  );
};
