import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { routerPushToPage } from '../../pages/PageInfo';
import { ResourcePageInfo } from '../../pages/RoutesPageInfos';
import { shortenString } from '../../util/utils';
import { LearningMaterialMiniCardContainer } from '../learning_materials/LearningMaterialMiniCardContainer';
import {
  LearningMaterialStarsRater,
  LearningMaterialStarsRaterData,
} from '../learning_materials/LearningMaterialStarsRating';
import { StarsRatingViewer } from '../lib/StarsRating';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceMiniCardDataFragment } from './ResourceMiniCard.generated';

export const ResourceMiniCardData = gql`
  fragment ResourceMiniCardData on Resource {
    _id
    name
    types
    url
    rating
    ...LearningMaterialStarsRaterData
  }
  ${LearningMaterialStarsRaterData}
`;

interface ResourceMiniCardProps {
  resource: ResourceMiniCardDataFragment;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
}

export const ResourceMiniCard: React.FC<ResourceMiniCardProps> = ({
  resource,
  inCompactList,
  firstItemInCompactList,
}) => {
  return (
    <LearningMaterialMiniCardContainer
      inCompactList={inCompactList}
      firstItemInCompactList={firstItemInCompactList}
      renderFirstRow={
        <Text fontSize="sm" textOverflow="ellipsis">
          {shortenString(resource.name, 32)}
        </Text>
      }
      renderSecondRow={
        <Stack direction="row" spacing={1} alignItems="baseline">
          <ResourceTypeBadge fontSize="xs" type={resource.type} />
          <StarsRatingViewer pxSize={13} value={resource.rating} />
          <BoxBlockDefaultClickPropagation>
            <LearningMaterialStarsRater learningMaterial={resource} size="xs" />
          </BoxBlockDefaultClickPropagation>
        </Stack>
      }
      onClick={() => routerPushToPage(ResourcePageInfo(resource))}
    />
  );
};
