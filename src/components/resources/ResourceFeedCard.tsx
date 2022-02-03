import { EditIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { intersection } from 'lodash';
import React, { forwardRef, ReactElement, ReactNode, useMemo } from 'react';
import {
  ResourceFeedCardDataFragment,
  ResourceLinkDataFragment,
  ResourcePreviewCardDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { ResourceType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo, ResourcePageInfo } from '../../pages/RoutesPageInfos';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningMaterialFeedCardContainer } from '../learning_materials/LearningMaterialFeedCardContainer';
import { LearningMaterialCardCoveredTopics } from '../learning_materials/LearningMaterialPreviewCardContainer';
import { LearningMaterialRecommendButton } from '../learning_materials/LearningMaterialRecommendButton';
import { LearningMaterialTag } from '../learning_materials/LearningMaterialTag';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { ResourceGroupIcon } from '../lib/icons/ResourceGroupIcon';
import { ResourceSeriesIcon } from '../lib/icons/ResourceSeriesIcon';
import { InternalLink } from '../navigation/InternalLink';
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
        interactionButtons={[
          <ResourceCompletedCheckbox size="xs" resource={resource} />,
          <Tooltip label="Recommend">
            <LearningMaterialRecommendButton
              learningMaterialId={resource._id}
              isRecommended={!!resource.recommended}
              size="xs"
            />
            {/* <HeartIcon boxSize={6} /> */}
            {/* <IconButton aria-label="recommend" icon={<HeartIcon />} variant="ghost" /> */}
          </Tooltip>,
        ]}
        ref={ref}
        renderTitle={<TitleLink resource={resource} isLoading={isLoading} />}
        // renderTitle={
        //   <Skeleton isLoaded={!isLoading}>
        //     <Flex h="36px" w="500px" bgColor="teal.200" />
        //   </Skeleton>
        // }
        // renderTopRight={<Flex h="32px" w="120px" bgColor="cyan.200" />}
        renderTopRight={
          resourceIsNew && (
            <Badge fontSize="md" colorScheme="purple">
              New
            </Badge>
          )
        }
        renderSubTitle={<SubTitle resource={resource} isLoading={isLoading} />}
        renderCentralBlock={<ResourceDescription description={resource.description} noOfLines={3} size="sm" />}
        // renderCentralBlock={<Flex h="60px" w="400px" bgColor="gray.200" />}
        // renderPreview={<Flex h="100px" w="180px" bgColor="red.200" />}
        renderPreview={
          intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length > 0 && (
            <BoxBlockDefaultClickPropagation
              // mt={playerIsOpen ? 0 : '-26px'}
              {...(!playerIsOpen && { h: thumbnailHeight + 'px' })}
              onClick={onOpen}
              // mx={playerIsOpen ? 0 : 4}
              // mb={playerIsOpen ? 3 : 0}
            >
              <ResourceYoutubePlayer
                resource={resource}
                playing={playerIsOpen}
                skipThumbnail={expandByDefault}
                {...(!playerIsOpen && { h: thumbnailHeight + 'px', w: (16 / 9) * thumbnailHeight + 'px' })}
              />
            </BoxBlockDefaultClickPropagation>
          )
        }
        playerIsOpen={playerIsOpen}
        // renderRight={null}
        // pageInfo={}
        // renderBottomLeft={<BottomBlock resource={resource} isLoading={isLoading} />}
        // renderBottomLeft={<Flex h="20px" w="200px" bgColor="purple.200" />}
        renderBottomLeft={<BottomLeftBar resource={resource} isLoading={isLoading} />}
        renderBottomRight={<Flex h="20px" w="150px" bgColor="yellow.200" />}
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
{
  /* <Flex direction="row" flexGrow={1} pt="4px">
          <Flex direction="column" flexGrow={1} justifyContent="center">
            <Flex direction={{ base: 'column', md: 'row' }} justifyContent={{ base: 'normal', md: 'space-between' }}>
              <Skeleton isLoaded={!isLoading}>
                <TitleLink resource={resource} isLoading={isLoading} />
              </Skeleton>
              {renderTopRight}
            </Flex>
            <Skeleton isLoaded={!isLoading}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack spacing={1} direction="row" alignItems="center">
                  {resource.types.map((type) => (
                    <ResourceTypeIcon key={type} resourceType={type} boxSize="20px" my="3px" />
                  ))}
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
        </Flex> */
}

const BottomLeftBar: React.FC<{ resource: ResourceFeedCardDataFragment; isLoading?: boolean }> = ({
  resource,
  isLoading,
}) => {
  return resource.tags ? (
    <Stack direction="row">
      {resource.tags.map((tag) => (
        <LearningMaterialTag tagName={tag.name} size="sm" />
      ))}
    </Stack>
  ) : null;
};

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
        <ResourceDescription
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

const BottomBlock: React.FC<{
  resource: ResourcePreviewCardDataFragment;
  isLoading?: boolean;
}> = ({ resource, isLoading }) => {
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
        {!!resource.coveredSubTopics?.items && (
          <Skeleton isLoaded={!isLoading}>
            <BoxBlockDefaultClickPropagation>
              <LearningMaterialCardCoveredTopics learningMaterial={resource} editable />
            </BoxBlockDefaultClickPropagation>
          </Skeleton>
        )}
      </Flex>
    </Flex>
  );
};

const SubResourcesButtonPopover: React.FC<{
  subResources: Pick<ResourceLinkDataFragment, '_id' | 'name'>[];
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
