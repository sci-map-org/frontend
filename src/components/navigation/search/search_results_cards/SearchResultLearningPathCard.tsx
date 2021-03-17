import { Flex, Text, Stack } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import gql from 'graphql-tag';
import { LearningPathLinkData } from '../../../../graphql/learning_paths/learning_paths.fragments';
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
  }
  ${LearningPathLinkData}
`;

export const SearchResultLearningPathCard: React.FC<
  { learningPath: SearchResultLearningPathCardDataFragment } & SearchResultCardContainerProps
> = ({ learningPath, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <LearningPathIcon {...props} />}
      {...props}
      borderLeftColor="teal.300"
    >
      <Flex justifyContent="space-between" alignItems="baseline" w="100%">
        <Text fontWeight={500} noOfLines={2}>
          {learningPath.name}
        </Text>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <StarsRatingViewer value={learningPath.rating} pxSize={14} />
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
