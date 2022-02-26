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
import { intersection } from 'lodash';
import React, { forwardRef, ReactElement, ReactNode } from 'react';
import {
  ResourceLinkDataFragment,
  ResourcePreviewCardDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { ResourceType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo, ResourcePageInfo } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningMaterialDescription } from '../learning_materials/LearningMaterialDescription';
import { LearningMaterialCardCoveredSubTopicsViewer } from '../learning_materials/LearningMaterialFeedCardContainer';
import { LearningMaterialCardContainer } from '../learning_materials/LearningMaterialPreviewCardContainer';
import { LearningMaterialStarsRater } from '../learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { LearningMaterialTypesViewer } from '../learning_materials/LearningMaterialTypesViewer';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { ResourceGroupIcon } from '../lib/icons/ResourceGroupIcon';
import { ResourceSeriesIcon } from '../lib/icons/ResourceSeriesIcon';
import { PageLink } from '../navigation/InternalLink';
import { DurationViewer } from './elements/Duration';
import { ResourceCompletedCheckbox } from './elements/ResourceCompletedCheckbox';
import { ResourceUrlLinkViewer, ResourceUrlLinkWrapper } from './elements/ResourceUrl';
import { ResourceYoutubePlayer } from './elements/ResourceYoutubePlayer';

interface ResourcePreviewCardProps {
  resource: ResourcePreviewCardDataFragment;
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
            uncheckedColor="gray.300"
          />
        }
        leftBlockWidth={leftBlockWidth}
        inCompactList={inCompactList}
        firstItemInCompactList={firstItemInCompactList}
        onClick={() => !isLoading && routerPushToPage(ResourcePageInfo(resource))}
        renderRight={null}
        renderBottom={<BottomBlock resource={resource} isLoading={isLoading} />}
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
                <Skeleton isLoaded={!isLoading}>
                  <Stack spacing={1} direction="row" alignItems="center">
                    <LearningMaterialTypesViewer learningMaterialTypes={resource.types} />
                    <DurationViewer value={resource.durationSeconds} />
                  </Stack>
                </Skeleton>
                {/* <RoleAccess accessRule="loggedInUser">
                  <BoxBlockDefaultClickPropagation>
                    <LearningMaterialStarsRater learningMaterial={resource} size="xs" />
                  </BoxBlockDefaultClickPropagation>
                </RoleAccess> */}
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
  resource: ResourcePreviewCardDataFragment;
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
        <LearningMaterialDescription
          description={resource.description}
          noOfLines={showPlayer ? undefined : 2}
          isLoading={isLoading}
        />
      </Box>
      {intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length > 0 && (
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

const TitleLink: React.FC<{ resource: ResourcePreviewCardDataFragment; isLoading?: boolean }> = ({
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
        <ResourceUrlLinkViewer resource={resource} maxLength={30} size="sm" />
      </ResourceUrlLinkWrapper>
    </BoxBlockDefaultClickPropagation>
  );
};

const BottomBlock: React.FC<{
  resource: ResourcePreviewCardDataFragment;
  isLoading?: boolean;
}> = ({ resource, isLoading }) => {
  const { currentUser } = useCurrentUser();
  return (
    <Flex pb={1} pt={2} flexWrap="wrap">
      <BoxBlockDefaultClickPropagation display="flex" alignItems="center">
        <EditableLearningMaterialTags
          learningMaterial={resource}
          isLoading={isLoading}
          isDisabled={!currentUser}
          size="sm"
        />
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
      <Flex flexShrink={0} direction="column" justifyContent="center" px={1}>
        <LearningMaterialCardCoveredSubTopicsViewer learningMaterial={resource} isLoading={isLoading} />
      </Flex>
    </Flex>
  );
};

const SubResourcesButtonPopover: React.FC<{
  subResources: ResourceLinkDataFragment[];
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
                <PageLink pageInfo={ResourcePageInfo(subResource)}>{subResource.name}</PageLink>
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const RightBlock: React.FC<{
  resource: ResourcePreviewCardDataFragment;
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
