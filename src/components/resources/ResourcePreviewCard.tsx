import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  IconButton,
  Link,
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
} from '@chakra-ui/react';
import React, { forwardRef, ReactElement } from 'react';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo } from '../../pages/resources/EditResourcePage';
import { ResourcePageInfo } from '../../pages/resources/ResourcePage';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import {
  LearningMaterialCardContainer,
  LearningMaterialCardCoveredTopics,
} from '../learning_materials/LearningMaterialCardContainer';
import { LearningMaterialStarsRater, StarsRatingViewer } from '../learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { ResourceGroupIcon } from '../lib/icons/ResourceGroupIcon';
import { ResourceSeriesIcon } from '../lib/icons/ResourceSeriesIcon';
import { InternalLink } from '../navigation/InternalLink';
import { DurationViewer } from './elements/Duration';
import { ResourceCompletedCheckbox } from './elements/ResourceCompletedCheckbox';
import { ResourceDescription } from './elements/ResourceDescription';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceUpvoter } from './elements/ResourceUpvoter';
import { ResourceUrlLink } from './elements/ResourceUrl';

export const BoxBlockDefaultClickPropagation: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      _hover={{ cursor: 'auto' }}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick && props.onClick(e);
      }}
    >
      {children}
    </Box>
  );
};

interface ResourcePreviewCardProps {
  domainKey?: string;
  resource: ResourcePreviewDataFragment;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  isLoading?: boolean;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  showCompletedNotificationToast?: boolean;
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
    },
    ref
  ) => {
    return (
      <LearningMaterialCardContainer
        ref={ref}
        renderCenterLeft={
          <ResourceCompletedCheckbox
            size="lg"
            resource={resource}
            isLoading={isLoading}
            onResourceConsumed={onResourceConsumed}
            showCompletedNotificationToast={showCompletedNotificationToast}
          />
        }
        leftBlockWidth="100px"
        inCompactList={inCompactList}
        firstItemInCompactList={firstItemInCompactList}
        onClick={() => !isLoading && routerPushToPage(ResourcePageInfo(resource))}
        renderRight={<RightBlock resource={resource} isLoading={isLoading} onResourceConsumed={onResourceConsumed} />}
        renderBottom={<BottomBlock resource={resource} domainKey={domainKey} isLoading={isLoading} />}
      >
        <Flex direction="row" flexGrow={1} pt="4px">
          <Flex direction="column" flexGrow={1} justifyContent="center">
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={2} direction="row" alignItems="baseline" mr="10px">
                <TitleLink resource={resource} isLoading={isLoading} />
              </Stack>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={1} direction="row" alignItems="baseline" mr="10px">
                <StarsRatingViewer value={resource.rating} pxSize={13} />
                <ResourceTypeBadge type={resource.type} />
                <DurationViewer value={resource.durationMs} />

                <RoleAccess accessRule="contributorOrAdmin">
                  <BoxBlockDefaultClickPropagation>
                    <LearningMaterialStarsRater
                      learningMaterialId={resource._id}
                      size="xs"
                      color="gray.500"
                      _hover={{ color: 'gray.900' }}
                    />
                  </BoxBlockDefaultClickPropagation>
                </RoleAccess>
              </Stack>
            </Skeleton>
            {((resource.tags && resource.tags.length > 0) || resource.description) && (
              <Box>
                <ResourceDescription description={resource.description} noOfLines={2} isLoading={isLoading} />
              </Box>
            )}
          </Flex>
        </Flex>
      </LearningMaterialCardContainer>
    );
  }
);

const TitleLink: React.FC<{ resource: ResourcePreviewDataFragment; isLoading?: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <BoxBlockDefaultClickPropagation>
      <Link
        display="flex"
        alignItems="baseline"
        flexDirection={{ base: 'column', md: 'row' }}
        href={resource.url}
        isExternal
      >
        <Text mr={1} as="span" fontSize="xl">
          {/* @ts-ignore */}
          {resource.name} <ResourceUrlLink resource={resource} isLoading={isLoading} as="span" />
        </Text>
      </Link>
    </BoxBlockDefaultClickPropagation>
  );
};

const BottomBlock: React.FC<{
  domainKey?: string;
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
}> = ({ domainKey, resource, isLoading }) => {
  return (
    <Flex pb={2} pt={2} flexWrap="wrap">
      <BoxBlockDefaultClickPropagation display="flex" alignItems="center">
        <EditableLearningMaterialTags learningMaterial={resource} isLoading={isLoading} />
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
              <LearningMaterialCardCoveredTopics learningMaterial={resource} domainKey={domainKey} />
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
      <BoxBlockDefaultClickPropagation alignSelf="center" justifySelf="center" ml="32px" mr="4px">
        <ResourceUpvoter resource={resource} isLoading={isLoading} />
      </BoxBlockDefaultClickPropagation>
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
