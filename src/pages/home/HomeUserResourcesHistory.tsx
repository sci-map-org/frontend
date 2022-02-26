import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { LearningMaterialCardContainer } from '../../components/learning_materials/LearningMaterialPreviewCardContainer';
import { LearningMaterialRecommendationsCountViewer } from '../../components/learning_materials/LearningMaterialRecommendationsCountViewer';
import { LearningMaterialStarsRater } from '../../components/learning_materials/LearningMaterialStarsRating';
import { LearningMaterialTypeIcon } from '../../components/learning_materials/LearningMaterialTypeBadge';
import { BoxBlockDefaultClickPropagation } from '../../components/lib/BoxBlockDefaultClickPropagation';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceCompletedCheckbox } from '../../components/resources/elements/ResourceCompletedCheckbox';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { LearningMaterialPreviewCardList } from '../../components/resources/LearningMaterialPreviewCardList';
import { ResourceMiniCardDataFragment } from '../../components/resources/ResourceMiniCard.generated';
import { ResourceLinkData } from '../../graphql/resources/resources.fragments';
import { routerPushToPage } from '../PageInfo';
import { ResourcePageInfo } from '../RoutesPageInfos';
import { LastOpenedResourceCardDataFragment } from './HomeUserResourcesHistory.generated';

interface HomeUserResourcesHistoryProps {
  consumedResourcesItems: {
    consumedAt?: string | null;
    openedAt?: string | null;
    resource: ResourceMiniCardDataFragment;
  }[];
  isLoading?: boolean;
}
export const HomeUserResourcesHistory: React.FC<HomeUserResourcesHistoryProps> = ({
  consumedResourcesItems,
  isLoading,
}) => {
  return (
    <Flex direction="column" w="100%">
      <Heading size="md" mb={2} color="gray.700">
        Last Opened Resources
      </Heading>
      <LearningMaterialPreviewCardList
        isLoading={isLoading}
        maxH="200px"
        learningMaterialsPreviewItems={consumedResourcesItems}
        renderCard={(resourceItem, idx) => (
          <LastOpenedResourceCard
            key={resourceItem.resource._id}
            resourceItem={resourceItem}
            firstItemInList={idx === 0}
          />
        )}
        noItemsMessage="No resources opened"
      />
    </Flex>
  );
};

export const LastOpenedResourceCardData = gql`
  fragment LastOpenedResourceCardData on UserConsumedResourceItem {
    consumedAt
    openedAt
    resource {
      ...ResourceLinkData
      url
      types
      rating
      durationSeconds
      recommendationsCount
    }
  }
  ${ResourceLinkData}
`;

const LastOpenedResourceCard: React.FC<{
  resourceItem: LastOpenedResourceCardDataFragment;
  firstItemInList?: boolean;
}> = ({ resourceItem, firstItemInList }) => {
  return (
    <LearningMaterialCardContainer
      inCompactList
      firstItemInCompactList={firstItemInList}
      renderCenterLeft={<ResourceCompletedCheckbox size="sm" resource={resourceItem.resource} />}
      leftBlockWidth="70px"
      onClick={() => routerPushToPage(ResourcePageInfo(resourceItem.resource))}
      renderRight={<Flex></Flex>}
      renderBottom={null}
    >
      <Flex direction="row" justifyContent="space-between" flexGrow={1}>
        <Flex direction="column" flexGrow={1} h="56px">
          <Flex mb="2px">
            <Text fontSize="md" fontWeight={500} noOfLines={1}>
              {resourceItem.resource.name}
            </Text>
          </Flex>
          <Stack direction="row" spacing={1} alignItems="center">
            {/* 24px so that height doesn't change when rater appears */}
            <Stack spacing={1} direction="row" alignItems="center">
              {resourceItem.resource.types.map((type) => (
                <LearningMaterialTypeIcon key={type} type={type} boxSize="20px" my="3px" />
              ))}
              {typeof resourceItem.resource.recommendationsCount === 'number' && (
                <LearningMaterialRecommendationsCountViewer
                  recommendationsTotalCount={resourceItem.resource.recommendationsCount}
                  size="2xs"
                  isLoading={false}
                />
              )}
              <DurationViewer value={resourceItem.resource.durationSeconds} />
            </Stack>

            {/* <BoxBlockDefaultClickPropagation>
              <LearningMaterialStarsRater learningMaterial={resourceItem.resource} size="xs" />
            </BoxBlockDefaultClickPropagation> */}

            <BoxBlockDefaultClickPropagation>
              <ResourceUrlLink resource={resourceItem.resource} />
            </BoxBlockDefaultClickPropagation>
          </Stack>
        </Flex>
      </Flex>
    </LearningMaterialCardContainer>
  );
};
