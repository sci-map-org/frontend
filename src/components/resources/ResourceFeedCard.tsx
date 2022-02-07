import { Badge, Heading, Skeleton, Stack, Tooltip, useDisclosure } from '@chakra-ui/react';
import { intersection } from 'lodash';
import React, { forwardRef, ReactNode, useMemo } from 'react';
import { ResourceFeedCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourceType } from '../../graphql/types';
import { routerPushToPage } from '../../pages/PageInfo';
import { ResourcePageInfo } from '../../pages/RoutesPageInfos';
import { LearningMaterialFeedCardContainer } from '../learning_materials/LearningMaterialFeedCardContainer';
import { LearningMaterialRecommendButton } from '../learning_materials/LearningMaterialRecommendButton';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { DurationViewer } from './elements/Duration';
import { ResourceCompletedCheckbox } from './elements/ResourceCompletedCheckbox';
import { ResourceDescription } from './elements/ResourceDescription';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceUrlLinkViewer, ResourceUrlLinkWrapper } from './elements/ResourceUrl';
import { ResourceYoutubePlayer } from './elements/ResourceYoutubePlayer';

interface ResourceFeedCardProps {
  resource: ResourceFeedCardDataFragment;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  isLoading: boolean;
  showCompletedNotificationToast?: boolean;
  expandByDefault?: boolean;
  renderTopRight?: ReactNode;
}

const thumbnailHeight = 80;
export const ResourceFeedCard = forwardRef<HTMLDivElement, ResourceFeedCardProps>(
  (
    { resource, onResourceConsumed, isLoading, showCompletedNotificationToast, expandByDefault, renderTopRight = null },
    ref
  ) => {
    const resourceIsNew = useMemo(() => {
      return !isLoading && new Date(resource.createdAt).getTime() > Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;
    }, [resource.createdAt, isLoading]);
    const { isOpen: playerIsOpen, onOpen, onClose, onToggle } = useDisclosure();
    return (
      <LearningMaterialFeedCardContainer
        learningMaterial={resource}
        isLoading={isLoading}
        interactionButtons={[
          <ResourceCompletedCheckbox size="xs" resource={resource} isLoading={isLoading} />,
          <Tooltip label="Recommend">
            <LearningMaterialRecommendButton
              learningMaterialId={resource._id}
              isRecommended={!!resource.recommended}
              size="xs"
              isDisabled={isLoading}
            />
          </Tooltip>,
        ]}
        ref={ref}
        renderTitle={<TitleLink resource={resource} isLoading={isLoading} />}
        renderTopRight={
          resourceIsNew && (
            <Badge fontSize="md" colorScheme="purple">
              New
            </Badge>
          )
        }
        renderSubTitle={<SubTitle resource={resource} isLoading={isLoading} />}
        renderCentralBlock={
          <ResourceDescription description={resource.description} noOfLines={3} size="sm" isLoading={isLoading} />
        }
        renderPreview={
          intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length > 0 && (
            <BoxBlockDefaultClickPropagation {...(!playerIsOpen && { h: thumbnailHeight + 'px' })} onClick={onOpen}>
              <Skeleton isLoaded={!isLoading}>
                <ResourceYoutubePlayer
                  resource={resource}
                  playing={playerIsOpen}
                  skipThumbnail={expandByDefault}
                  {...(!playerIsOpen && { h: thumbnailHeight + 'px', w: (16 / 9) * thumbnailHeight + 'px' })}
                />
              </Skeleton>
            </BoxBlockDefaultClickPropagation>
          )
        }
        playerIsOpen={playerIsOpen}
        onClick={() => !isLoading && routerPushToPage(ResourcePageInfo(resource))}
      />
    );
  }
);

const SubTitle: React.FC<{ resource: ResourceFeedCardDataFragment; isLoading: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Stack spacing={1} direction="row" alignItems="center">
        {resource.types.map((type) => (
          <ResourceTypeBadge key={type} type={type} />
        ))}
        <DurationViewer value={resource.durationSeconds} />
      </Stack>
    </Skeleton>
  );
};

const TitleLink: React.FC<{ resource: ResourceFeedCardDataFragment; isLoading: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <BoxBlockDefaultClickPropagation>
      <ResourceUrlLinkWrapper
        display="flex"
        alignItems="baseline"
        flexDirection={{ base: 'column', md: 'row' }}
        resource={resource}
        isLoading={isLoading}
        flexWrap="wrap"
      >
        <Heading mr={1} as="h3" fontSize="22px" color="gray.700" noOfLines={1}>
          {resource.name}
        </Heading>
        <ResourceUrlLinkViewer resource={resource} maxLength={30} />
      </ResourceUrlLinkWrapper>
    </BoxBlockDefaultClickPropagation>
  );
};
