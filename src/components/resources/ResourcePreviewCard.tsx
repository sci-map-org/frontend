import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FlexProps,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { forwardRef, ReactElement, ReactNode } from 'react';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourceType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo, ResourcePageInfo } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import {
  LearningMaterialCardContainer,
  LearningMaterialCardCoveredTopics,
} from '../learning_materials/LearningMaterialCardContainer';
import { LearningMaterialStarsRater } from '../learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { ResourceGroupIcon } from '../lib/icons/ResourceGroupIcon';
import { ResourceSeriesIcon } from '../lib/icons/ResourceSeriesIcon';
import { StarsRatingViewer } from '../lib/StarsRating';
import { InternalLink } from '../navigation/InternalLink';
import { DurationViewer } from './elements/Duration';
import { ResourceCompletedCheckbox } from './elements/ResourceCompletedCheckbox';
import { ResourceDescription } from './elements/ResourceDescription';
import { ResourceTypeIcon } from './elements/ResourceType';
import { ResourceUrlLinkViewer, ResourceUrlLinkWrapper } from './elements/ResourceUrl';
import { ResourceYoutubePlayer } from './elements/ResourceYoutubePlayer';

interface ResourcePreviewCardProps {
  domainKey?: string;
  resource: ResourcePreviewDataFragment;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  isLoading?: boolean;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  showCompletedNotificationToast?: boolean;
  leftBlockWidth?: FlexProps['w'];
  expandByDefault?: boolean;
  renderTopRight?: ReactNode;
}

export const ResourcePreviewCard = forwardRef<HTMLDivElement, ResourcePreviewCardProps>(
  (
    {
      domainKey,
      resource,
      onResourceConsumed,
      isLoading,
      inCompactList,
      firstItemInCompactList,
      showCompletedNotificationToast,
      leftBlockWidth = '100px',
      expandByDefault,
      renderTopRight = null,
    },
    ref
  ) => {
    return (
      <LearningMaterialCardContainer
        ref={ref}
        renderCenterLeft={
          <ResourceCompletedCheckbox
            size="md"
            resource={resource}
            isLoading={isLoading}
            onResourceConsumed={onResourceConsumed}
            showCompletedNotificationToast={showCompletedNotificationToast}
          />
        }
        leftBlockWidth={leftBlockWidth}
        inCompactList={inCompactList}
        firstItemInCompactList={firstItemInCompactList}
        onClick={() => !isLoading && routerPushToPage(ResourcePageInfo(resource))}
        renderRight={null}
        renderBottom={<BottomBlock resource={resource} domainKey={domainKey} isLoading={isLoading} />}
      >
        <Flex direction="row" flexGrow={1} pt="4px">
          <Flex direction="column" flexGrow={1} justifyContent="center">
            <Flex direction={{ base: 'column', md: 'row' }} justifyContent={{ base: 'normal', md: 'space-between' }}>
              <Skeleton isLoaded={!isLoading}>
                <TitleLink resource={resource} isLoading={isLoading} />
              </Skeleton>
              {renderTopRight}
            </Flex>
            <Skeleton isLoaded={!isLoading}>
              <Stack direction="row" spacing={1} alignItems="center">
                {/* 24px so that height doesn't change when rater appears */}
                <Stack spacing={1} direction="row" alignItems="center">
                  <ResourceTypeIcon resourceType={resource.type} boxSize="20px" my="3px" />
                  <StarsRatingViewer value={resource.rating} pxSize={15} />
                  <DurationViewer value={resource.durationSeconds} />
                </Stack>
                <RoleAccess accessRule="loggedInUser">
                  <BoxBlockDefaultClickPropagation>
                    <LearningMaterialStarsRater learningMaterial={resource} size="xs" />
                  </BoxBlockDefaultClickPropagation>
                </RoleAccess>
              </Stack>
            </Skeleton>
            <MainContentBlock expandByDefault={expandByDefault} resource={resource} isLoading={isLoading} />
          </Flex>
        </Flex>
      </LearningMaterialCardContainer>
    );
  }
);

const MainContentBlock: React.FC<{
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
  expandByDefault?: boolean;
}> = ({ resource, isLoading, expandByDefault }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const showPlayer = isOpen || expandByDefault;
  const thumbnailHeight = 80;
  return (
    <Flex
      direction={showPlayer ? 'column-reverse' : 'row'}
      justifyContent={showPlayer ? 'start' : 'space-between'}
      alignItems="stretch"
    >
      <Box>
        <ResourceDescription
          description={resource.description}
          noOfLines={showPlayer ? undefined : 2}
          isLoading={isLoading}
        />
      </Box>
      {(resource.type === ResourceType.YoutubeVideo || resource.type === ResourceType.YoutubePlaylist) && (
        <Box display="flex" justifyContent="center">
          <BoxBlockDefaultClickPropagation
            mt={showPlayer ? 0 : '-26px'}
            {...(!showPlayer && { h: thumbnailHeight + 'px' })}
            onClick={onOpen}
            mx={showPlayer ? 0 : 4}
            mb={showPlayer ? 3 : 0}
          >
            <ResourceYoutubePlayer
              resource={resource}
              playing={isOpen}
              skipThumbnail={expandByDefault}
              {...(!showPlayer && { h: thumbnailHeight + 'px', w: (16 / 9) * thumbnailHeight + 'px' })}
            />
          </BoxBlockDefaultClickPropagation>
        </Box>
      )}
    </Flex>
  );
};

const TitleLink: React.FC<{ resource: ResourcePreviewDataFragment; isLoading?: boolean }> = ({
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
      >
        <Text mr={1} as="span" fontSize="xl">
          {resource.name}
        </Text>
        <ResourceUrlLinkViewer resource={resource} maxLength={30} />
      </ResourceUrlLinkWrapper>
    </BoxBlockDefaultClickPropagation>
  );
};

const BottomBlock: React.FC<{
  domainKey?: string;
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
}> = ({ domainKey, resource, isLoading }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex pb={2} pt={2} flexWrap="wrap">
      <BoxBlockDefaultClickPropagation display="flex" alignItems="center">
        <EditableLearningMaterialTags learningMaterial={resource} isLoading={isLoading} isDisabled={!currentUser} />
      </BoxBlockDefaultClickPropagation>
      <Box flexGrow={1} flexBasis={0} />
      <BoxBlockDefaultClickPropagation>
        <Stack spacing={3} direction="row" alignItems="stretch" mr={4}>
          {resource.subResourceSeries && resource.subResourceSeries.length && (
            <SubResourcesButtonPopover
              subResources={resource.subResourceSeries}
              leftIcon={<ResourceSeriesIcon boxSize="24px" color="gray.700" _hover={{ color: 'black' }} />}
              buttonText={resource.subResourceSeries.length.toString()}
              headerTitle="Resource Series"
            />
          )}
          {resource.subResources && resource.subResources.length && (
            <SubResourcesButtonPopover
              subResources={resource.subResources}
              leftIcon={<ResourceGroupIcon boxSize="24px" color="gray.600" _hover={{ color: 'black' }} />}
              buttonText={resource.subResources.length.toString()}
              headerTitle="Sub Resources"
            />
          )}
        </Stack>
      </BoxBlockDefaultClickPropagation>
      <Flex flexShrink={0} direction="column" justifyContent="center">
        {resource.coveredConceptsByDomain && (
          <Skeleton isLoaded={!isLoading}>
            <BoxBlockDefaultClickPropagation>
              <LearningMaterialCardCoveredTopics learningMaterial={resource} domainKey={domainKey} editable />
            </BoxBlockDefaultClickPropagation>
          </Skeleton>
        )}
      </Flex>
    </Flex>
  );
};

const SubResourcesButtonPopover: React.FC<{
  subResources: Pick<ResourcePreviewDataFragment, '_id' | 'name'>[];
  leftIcon: ReactElement;
  buttonText: string;
  headerTitle: string;
}> = ({ subResources, leftIcon, headerTitle, buttonText }) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button leftIcon={leftIcon} size="xs" variant="ghost">
          {buttonText}
        </Button>
      </PopoverTrigger>

      <PopoverContent zIndex={4} backgroundColor="white">
        <PopoverArrow />
        <PopoverHeader fontWeight={500}>{headerTitle}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody pt={1}>
          <Stack direction="column">
            {subResources.map((subResource) => (
              <Box key={subResource._id}>
                <InternalLink routePath="/resources/[_id]" asHref={`/resources/${subResource._id}`}>
                  {subResource.name}
                </InternalLink>
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const RightBlock: React.FC<{
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
}> = ({ resource, isLoading }) => {
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  return (
    <Flex direction="row">
      {/* <BoxBlockDefaultClickPropagation alignSelf="center" justifySelf="center" ml="32px" mr="4px">
        <ResourceUpvoter resource={resource} isLoading={isLoading} />
      </BoxBlockDefaultClickPropagation> */}
      <BoxBlockDefaultClickPropagation>
        <IconButton
          m={1}
          aria-label="edit resource"
          color="gray.600"
          size="xs"
          icon={<EditIcon />}
          variant="ghost"
          onClick={() => {
            if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
            routerPushToPage(EditResourcePageInfo(resource));
          }}
          isDisabled={isLoading}
        />
      </BoxBlockDefaultClickPropagation>
    </Flex>
  );
};
