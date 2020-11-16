import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathPageInfo } from '../../pages/learning_paths/LearningPathPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningMaterialCardContainer } from '../learning_materials/LearningMaterialCardContainer';
import { StarsRatingViewer } from '../learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { DurationViewer } from '../resources/elements/Duration';
import { shortenDescription } from '../resources/elements/ResourceDescription';
import { BoxBlockDefaultClickPropagation } from '../resources/ResourcePreviewCard';
import { LearningPathCircularCompletion, LearningPathCompletionData } from './LearningPathCompletion';
import { LearningPathPreviewCardDataFragment } from './LearningPathPreviewCard.generated';

export const LearningPathPreviewCardData = gql`
  fragment LearningPathPreviewCardData on LearningPath {
    ...LearningPathData
    ...LearningPathCompletionData
    tags {
      name
    }
    rating
  }
  ${LearningPathCompletionData}
  ${LearningPathData}
`;

interface LearningPathPreviewCardProps {
  learningPath: LearningPathPreviewCardDataFragment;
  isLoading?: boolean;
}
export const LearningPathPreviewCard: React.FC<LearningPathPreviewCardProps> = ({ learningPath, isLoading }) => {
  return (
    <LearningMaterialCardContainer
      renderCenterLeft={
        <LearningPathCircularCompletion
          size="sm"
          learningPath={learningPath}
          onStarted={() => routerPushToPage(LearningPathPageInfo(learningPath))}
        />
      }
      leftBlockWidth="130px"
      onClick={() => routerPushToPage(LearningPathPageInfo(learningPath))}
      renderRight={<Flex></Flex>}
      renderBottom={
        <Flex pb={2} pt={2} flexWrap="wrap">
          <BoxBlockDefaultClickPropagation>
            <EditableLearningMaterialTags learningMaterial={learningPath} isLoading={isLoading} />
          </BoxBlockDefaultClickPropagation>
          <Box flexGrow={1} flexBasis={0} />
          <Flex>
            {/* Nb resources here like resource series -> future should be expandable */}
            {/* Covered topics */}
          </Flex>
        </Flex>
      }
    >
      <Flex direction="column">
        <Text fontSize="xl">{learningPath.name}</Text>

        <Stack direction="row" alignItems="baseline" spacing={2}>
          <StarsRatingViewer pxSize={13} value={learningPath.rating} />
          <Badge colorScheme="teal" fontSize="0.8em">
            Learning Path
          </Badge>
          <DurationViewer value={learningPath.durationMs} />
        </Stack>
        <Box>
          <Text fontWeight={250}>{learningPath.description && shortenDescription(learningPath.description)}</Text>
        </Box>
        {/* Future: goals and prerequisites */}
        {/* Np people having started it */}
        {/* Comments, etc. */}
      </Flex>
    </LearningMaterialCardContainer>
  );
};
