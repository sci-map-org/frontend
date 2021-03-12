import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { LearningMaterialCardContainer } from '../../components/learning_materials/LearningMaterialCardContainer';
import { LearningMaterialStarsRater } from '../../components/learning_materials/LearningMaterialStarsRating';
import { BoxBlockDefaultClickPropagation } from '../../components/lib/BoxBlockDefaultClickPropagation';
import { StarsRatingViewer } from '../../components/lib/StarsRating';
import { DurationViewer } from '../../components/resources/elements/Duration';
import { ResourceCompletedCheckbox } from '../../components/resources/elements/ResourceCompletedCheckbox';
import { ResourceTypeIcon } from '../../components/resources/elements/ResourceType';
import { ResourceUrlLink } from '../../components/resources/elements/ResourceUrl';
import { ResourceMiniCardDataFragment } from '../../components/resources/ResourceMiniCard.generated';
import { routerPushToPage } from '../PageInfo';
import { ResourcePageInfo } from '../RoutesPageInfos';
import { LastOpenedResourceCardDataFragment } from './HomeUserResourcesHistory.generated';

interface HomeUserResourcesHistoryProps {
  consumedResourcesItems: {
    consumedAt?: string | null;
    openedAt?: string | null;
    resource: ResourceMiniCardDataFragment;
  }[];
}
export const HomeUserResourcesHistory: React.FC<HomeUserResourcesHistoryProps> = ({ consumedResourcesItems }) => {
  return (
    <Flex direction="column" w="100%">
      <Heading size="md" mb={2} color="gray.700">
        Last Opened Resources
      </Heading>
      <Flex alignItems="stretch" direction="column" overflow="hidden" overflowY="scroll" h="200px">
        {consumedResourcesItems.map((resourceItem, idx) => (
          <LastOpenedResourceCard
            key={resourceItem.resource._id}
            resourceItem={resourceItem}
            firstItemInList={idx === 0}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export const LastOpenedResourceCardData = gql`
  fragment LastOpenedResourceCardData on UserConsumedResourceItem {
    consumedAt
    openedAt
    resource {
      _id
      name
      url
      type
      rating
      durationSeconds
    }
  }
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
              <ResourceTypeIcon resourceType={resourceItem.resource.type} boxSize="20px" my="3px" />
              <StarsRatingViewer value={resourceItem.resource.rating} pxSize={15} />
              <DurationViewer value={resourceItem.resource.durationSeconds} />
            </Stack>

            <BoxBlockDefaultClickPropagation>
              <LearningMaterialStarsRater learningMaterial={resourceItem.resource} size="xs" />
            </BoxBlockDefaultClickPropagation>

            <BoxBlockDefaultClickPropagation>
              <ResourceUrlLink resource={resourceItem.resource} />
            </BoxBlockDefaultClickPropagation>
          </Stack>
        </Flex>
      </Flex>
    </LearningMaterialCardContainer>
  );
};
