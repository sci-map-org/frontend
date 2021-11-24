import { Badge, Box, Flex, FlexProps, Skeleton, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactNode } from 'react';
import {  LearningMaterialWithCoveredTopicsData } from '../../graphql/learning_materials/learning_materials.fragments';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import {
  LearningMaterialCardContainer,
  LearningMaterialCardCoveredTopics,
} from '../learning_materials/LearningMaterialCardContainer';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { StarsRatingViewer } from '../lib/StarsRating';
import { DurationViewer } from '../resources/elements/Duration';
import { ResourceDescription } from '../resources/elements/ResourceDescription';
import { UserAvatarData } from '../users/UserAvatar';
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
    ...LearningMaterialWithCoveredTopicsData
    createdBy {
      ...UserAvatarData
    }
  }
  ${LearningPathCompletionData}
  ${LearningPathData}
  ${UserAvatarData}
  ${LearningMaterialWithCoveredTopicsData}
`;

interface LearningPathPreviewCardProps {
  learningPath: LearningPathPreviewCardDataFragment;
  isLoading?: boolean;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  leftBlockWidth?: FlexProps['w'];
  renderTopRight?: ReactNode;
}
export const LearningPathPreviewCard: React.FC<LearningPathPreviewCardProps> = ({
  learningPath,
  isLoading,
  inCompactList,
  firstItemInCompactList,
  leftBlockWidth = '120px',
  renderTopRight = null,
}) => {
  return (
    <LearningMaterialCardContainer
      inCompactList={inCompactList}
      firstItemInCompactList={firstItemInCompactList}
      renderCenterLeft={
        <LearningPathCircularCompletion
          size="md"
          learningPath={learningPath}
          onStarted={() => routerPushToPage(LearningPathPageInfo(learningPath))}
        />
      }
      leftBlockWidth={leftBlockWidth}
      onClick={() => routerPushToPage(LearningPathPageInfo(learningPath))}
      renderRight={<Flex></Flex>}
      renderBottom={
        <Flex pb={2} pt={2} flexWrap="wrap">
          <BoxBlockDefaultClickPropagation>
            <EditableLearningMaterialTags learningMaterial={learningPath} isLoading={isLoading} isDisabled />
          </BoxBlockDefaultClickPropagation>
          <Box flexGrow={1} flexBasis={0} />

          {learningPath.coveredSubTopics && (
            <BoxBlockDefaultClickPropagation pr={2}>
              <Skeleton isLoaded={!isLoading}>
                <LearningMaterialCardCoveredTopics learningMaterial={learningPath} />
              </Skeleton>
            </BoxBlockDefaultClickPropagation>
          )}

          {/* Nb resources here like resource series -> future should be expandable */}
        </Flex>
      }
    >
      <Flex direction="row" justifyContent="space-between" flexGrow={1}>
        <Flex direction="column" flexGrow={1}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems="baseline"
            justifyContent={{ base: 'normal', md: 'space-between' }}
          >
            <Text fontSize="xl">{learningPath.name}</Text>
            {renderTopRight}
          </Flex>
          <Stack direction="row" alignItems="baseline" spacing={2}>
            <StarsRatingViewer pxSize={13} value={learningPath.rating} />
            <Badge colorScheme="teal" fontSize="0.8em">
              Learning Path
            </Badge>
            <DurationViewer value={learningPath.durationSeconds} />
          </Stack>
          <ResourceDescription description={learningPath.description} noOfLines={2} isLoading={isLoading} />
        </Flex>
        {/* {learningPath.createdBy && (
          <Flex direction="column" flexShrink={0} alignItems="center" pt={1} pr={2}>
            <Text fontSize="sm" fontWeight={300}>
              Curated By
            </Text>
            <UserAvatar user={learningPath.createdBy} size="xs" />
          </Flex>
        )} */}
        {/* Future: goals and prerequisites */}
        {/* Np people having started it */}
        {/* Comments, etc. */}
      </Flex>
    </LearningMaterialCardContainer>
  );
};
