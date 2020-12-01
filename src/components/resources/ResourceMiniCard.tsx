import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningPathPageInfo } from '../../pages/learning_paths/LearningPathPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { ResourcePageInfo } from '../../pages/resources/ResourcePage';
import { shortenString } from '../../util/utils';
import { LearningMaterialMiniCardContainer } from '../learning_materials/LearningMaterialMiniCardContainer';
import { StarsRatingViewer } from '../learning_materials/LearningMaterialStarsRating';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceUrlLink } from './elements/ResourceUrl';
import { ResourceMiniCardDataFragment } from './ResourceMiniCard.generated';
import { BoxBlockDefaultClickPropagation } from './ResourcePreviewCard';

export const ResourceMiniCardData = gql`
  fragment ResourceMiniCardData on Resource {
    _id
    name
    type
    url
    rating
  }
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
        <BoxBlockDefaultClickPropagation>
          <Link
            display="flex"
            alignItems="baseline"
            flexDirection={{ base: 'column', md: 'row' }}
            href={resource.url}
            isExternal
            textOverflow="ellipsis"
          >
            <Text as="span" fontSize="sm">
              {shortenString(resource.name, 32)}
            </Text>
            <ExternalLinkIcon ml="3px" fontSize="xs" />
          </Link>
        </BoxBlockDefaultClickPropagation>
      }
      renderSecondRow={
        <Stack direction="row" spacing={1}>
          <ResourceTypeBadge fontSize="xs" type={resource.type} />
          <StarsRatingViewer pxSize={13} value={resource.rating} />
        </Stack>
      }
      onClick={() => routerPushToPage(ResourcePageInfo(resource))}
    />
  );
};
