import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningMaterialCardContainer } from '../../components/learning_materials/LearningMaterialCardContainer';
import { LearningMaterialStarsRaterData } from '../../components/learning_materials/LearningMaterialStarsRating';
import { LearningPathCircularCompletion } from '../../components/learning_paths/LearningPathCompletion';
import { ResourceDescription } from '../../components/resources/elements/ResourceDescription';
import { routerPushToPage } from '../PageInfo';
import { LearningPathPageInfo } from '../RoutesPageInfos';
import { StartedLearningPathCardDataFragment } from './HomeUserStartedPaths.generated';

export const HomeUserStartedPaths: React.FC<{
  startedPaths: StartedLearningPathCardDataFragment[];
  isLoading?: boolean;
}> = ({ startedPaths, isLoading }) => {
  return (
    <Flex direction="column" maxH="200px">
      <Box mb={2}>
        <Heading size="md" color="gray.700">
          Started Paths
        </Heading>
      </Box>

      <Stack spacing={0} alignItems="stretch" direction="column" overflow="hidden" overflowY="scroll">
        {startedPaths.map((startedPath, idx) => (
          <StartedLearningPathCard key={startedPath._id} learningPath={startedPath} firstItemInList={idx === 0} />
        ))}
      </Stack>
    </Flex>
  );
};

export const StartedLearningPathCardData = gql`
  fragment StartedLearningPathCardData on LearningPath {
    _id
    key
    name
    rating
    description
    durationSeconds
    ...LearningMaterialStarsRaterData
  }
  ${LearningMaterialStarsRaterData}
`;

const StartedLearningPathCard: React.FC<{
  learningPath: StartedLearningPathCardDataFragment;
  firstItemInList?: boolean;
}> = ({ learningPath, firstItemInList }) => {
  return (
    <LearningMaterialCardContainer
      inCompactList
      firstItemInCompactList={firstItemInList}
      renderCenterLeft={
        <LearningPathCircularCompletion
          size="sm"
          learningPath={learningPath}
          onStarted={() => routerPushToPage(LearningPathPageInfo(learningPath))}
        />
      }
      leftBlockWidth="70px"
      onClick={() => routerPushToPage(LearningPathPageInfo(learningPath))}
      renderRight={<Flex></Flex>}
      renderBottom={null}
    >
      <Flex direction="row" justifyContent="space-between" flexGrow={1}>
        <Flex direction="column" flexGrow={1} h="56px">
          <Flex mb="2px">
            <Text fontSize="md" fontWeight={500} noOfLines={1}>
              {learningPath.name}
            </Text>
          </Flex>

          <ResourceDescription description={learningPath.description} noOfLines={1} />
        </Flex>
        <Center>
          <Button
            size="xs"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => routerPushToPage(LearningPathPageInfo(learningPath))}
            variant="outline"
            colorScheme="blue"
            mx={3}
          >
            Resume
          </Button>
        </Center>
      </Flex>
    </LearningMaterialCardContainer>
  );
};
