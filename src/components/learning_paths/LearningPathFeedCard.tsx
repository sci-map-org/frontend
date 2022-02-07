import { Badge, Heading, Skeleton, Stack, Text, Tooltip } from '@chakra-ui/react';
import React, { forwardRef, useMemo } from 'react';
import { LearningPathFeedCardDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import { LearningMaterialFeedCardContainer } from '../learning_materials/LearningMaterialFeedCardContainer';
import { LearningMaterialRecommendButton } from '../learning_materials/LearningMaterialRecommendButton';
import { LearningMaterialTypeBadge } from '../learning_materials/LearningMaterialTypeBadge';
import { DurationViewer } from '../resources/elements/Duration';
import { ResourceDescription } from '../resources/elements/ResourceDescription';

interface LearningPathFeedCardProps {
  learningPath: LearningPathFeedCardDataFragment;
  isLoading: boolean;
}

export const LearningPathFeedCard = forwardRef<HTMLDivElement, LearningPathFeedCardProps>(
  ({ learningPath, isLoading }, ref) => {
    const learningPathIsNew = useMemo(() => {
      return !isLoading && new Date(learningPath.createdAt).getTime() > Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;
    }, [learningPath.createdAt, isLoading]);

    return (
      <LearningMaterialFeedCardContainer
        learningMaterial={learningPath}
        isLoading={isLoading}
        interactionButtons={[
          <Tooltip label="Recommend">
            <LearningMaterialRecommendButton
              learningMaterialId={learningPath._id}
              isRecommended={!!learningPath.recommended}
              size="xs"
              isDisabled={isLoading}
            />
          </Tooltip>,
        ]}
        ref={ref}
        renderTitle={
          <Skeleton isLoaded={!isLoading}>
            <Stack direction="row" alignItems="baseline">
              <Heading mr={1} as="h3" fontSize="22px" color="gray.700" noOfLines={1}>
                {learningPath.name}
              </Heading>
              <Text
                textTransform="uppercase"
                borderWidth={2}
                borderRadius={2}
                fontWeight={600}
                lineHeight="1.1em"
                borderColor="green.500"
                color="green.500"
                px="3px"
              >
                {learningPath.started?.startedAt ? 'Started' : 'Start'}
              </Text>
            </Stack>
          </Skeleton>
        }
        renderTopRight={
          learningPathIsNew && (
            <Badge fontSize="md" colorScheme="purple">
              New
            </Badge>
          )
        }
        renderSubTitle={<SubTitle learningPath={learningPath} isLoading={isLoading} />}
        renderCentralBlock={
          <ResourceDescription description={learningPath.description} noOfLines={3} size="sm" isLoading={isLoading} />
        }
        onClick={() => !isLoading && routerPushToPage(LearningPathPageInfo(learningPath))}
      />
    );
  }
);

const SubTitle: React.FC<{ learningPath: LearningPathFeedCardDataFragment; isLoading: boolean }> = ({
  learningPath,
  isLoading,
}) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Stack spacing={1} direction="row" alignItems="center">
        <LearningMaterialTypeBadge type="LearningPath" />
        <DurationViewer value={learningPath.durationSeconds} />
      </Stack>
    </Skeleton>
  );
};
