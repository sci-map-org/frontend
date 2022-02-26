import { Flex, Text, Stack } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import gql from 'graphql-tag';
import { LearningPathLinkData } from '../../../../graphql/learning_paths/learning_paths.fragments';
import { LearningMaterialRecommendationsCountViewer } from '../../../learning_materials/LearningMaterialRecommendationsCountViewer';
import { LearningPathIcon } from '../../../lib/icons/LearningPathIcon';
import { ResourceSeriesIcon } from '../../../lib/icons/ResourceSeriesIcon';
import { StarsRatingViewer } from '../../../lib/StarsRating';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultLearningPathCardDataFragment } from './SearchResultLearningPathCard.generated';

export const SearchResultLearningPathCardData = gql`
  fragment SearchResultLearningPathCardData on LearningPath {
    ...LearningPathLinkData
    resourceItems {
      resource {
        _id
      }
    }
    durationSeconds
    rating
    recommendationsCount
  }
  ${LearningPathLinkData}
`;

export const SearchResultLearningPathCard: React.FC<
  { learningPath: SearchResultLearningPathCardDataFragment } & Omit<SearchResultCardContainerProps, 'borderLeftColor'>
> = ({ learningPath, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <LearningPathIcon {...props} />}
      {...props}
      borderLeftColor="teal.300"
    >
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Text fontWeight={500} noOfLines={2}>
          {learningPath.name}
        </Text>
        <Stack direction="row" alignItems="center" spacing={2}>
          {typeof learningPath.recommendationsCount === 'number' && (
            <LearningMaterialRecommendationsCountViewer
              recommendationsTotalCount={learningPath.recommendationsCount}
              size="2xs"
              isLoading={false}
            />
          )}
          {!!learningPath.resourceItems?.length && (
            <Tooltip label={`${learningPath.resourceItems.length} resources in ${learningPath.name}`}>
              <Stack direction="row" spacing="2px" ml={8} alignItems="start">
                <Text fontWeight={500} color="gray.700">
                  {learningPath.resourceItems.length}
                </Text>
                <ResourceSeriesIcon boxSize={6} color="gray.700" />
              </Stack>
            </Tooltip>
          )}
        </Stack>
      </Flex>
    </SearchResultCardContainer>
  );
};
