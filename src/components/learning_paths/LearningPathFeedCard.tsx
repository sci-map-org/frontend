import {
  Badge,
  Box,
  Button,
  Heading,
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
  Tooltip,
} from '@chakra-ui/react';
import React, { forwardRef, ReactElement, useMemo } from 'react';
import { LearningPathFeedCardDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourceLinkDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import {
  LearningMaterialFeedCardBottomLeftBar,
  LearningMaterialFeedCardBottomRightBar,
  LearningMaterialFeedCardContainer,
} from '../learning_materials/LearningMaterialFeedCardContainer';
import { LearningMaterialRecommendButton } from '../learning_materials/LearningMaterialRecommendButton';
import { LearningMaterialTypeBadge } from '../learning_materials/LearningMaterialTypeBadge';
import { InternalLink } from '../navigation/InternalLink';
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
        renderBottomLeft={
          <LearningMaterialFeedCardBottomLeftBar learningMaterial={learningPath} isLoading={isLoading} />
        }
        renderBottomRight={
          <LearningMaterialFeedCardBottomRightBar learningMaterial={learningPath} isLoading={isLoading} />
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

// const MainContentBlock: React.FC<{
//   resource: ResourcePreviewCardDataFragment;
//   isLoading?: boolean;
//   expandByDefault?: boolean;
// }> = ({ resource, isLoading, expandByDefault }) => {
//   const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
//   const showPlayer = isOpen || expandByDefault;
//   const thumbnailHeight = 80;
//   return (
//     <Flex
//       direction={showPlayer ? 'column-reverse' : 'row'}
//       justifyContent={showPlayer ? 'start' : 'space-between'}
//       alignItems="stretch"
//     >
//       <Box>
//         <ResourceDescription
//           description={resource.description}
//           noOfLines={showPlayer ? undefined : 2}
//           isLoading={isLoading}
//         />
//       </Box>
//       {intersection(resource.types, [ResourceType.YoutubeVideo, ResourceType.YoutubePlaylist]).length > 0 && (
//         <Box display="flex" justifyContent="center">
//           <BoxBlockDefaultClickPropagation
//             mt={showPlayer ? 0 : '-26px'}
//             {...(!showPlayer && { h: thumbnailHeight + 'px' })}
//             onClick={onOpen}
//             mx={showPlayer ? 0 : 4}
//             mb={showPlayer ? 3 : 0}
//           >
//             <ResourceYoutubePlayer
//               resource={resource}
//               playing={isOpen}
//               skipThumbnail={expandByDefault}
//               {...(!showPlayer && { h: thumbnailHeight + 'px', w: (16 / 9) * thumbnailHeight + 'px' })}
//             />
//           </BoxBlockDefaultClickPropagation>
//         </Box>
//       )}
//     </Flex>
//   );
// };

// const BottomBlock: React.FC<{
//   resource: ResourcePreviewCardDataFragment;
//   isLoading?: boolean;
// }> = ({ resource, isLoading }) => {
//   const { currentUser } = useCurrentUser();
//   return (
//     <Flex pb={2} pt={2} flexWrap="wrap">
//       <BoxBlockDefaultClickPropagation display="flex" alignItems="center">
//         <EditableLearningMaterialTags learningMaterial={resource} isLoading={isLoading} isDisabled={!currentUser} />
//       </BoxBlockDefaultClickPropagation>
//       <Box flexGrow={1} flexBasis={0} />
//       <BoxBlockDefaultClickPropagation>
//         <Stack spacing={3} direction="row" alignItems="stretch" mr={4}>
//           {resource.subResourceSeries && resource.subResourceSeries.length && (
//             <SubResourcesButtonPopover
//               subResources={resource.subResourceSeries}
//               leftIcon={<ResourceSeriesIcon boxSize="24px" color="gray.700" _hover={{ color: 'black' }} />}
//               buttonText={resource.subResourceSeries.length.toString()}
//               headerTitle="Resource Series"
//             />
//           )}
//           {resource.subResources && resource.subResources.length && (
//             <SubResourcesButtonPopover
//               subResources={resource.subResources}
//               leftIcon={<ResourceGroupIcon boxSize="24px" color="gray.600" _hover={{ color: 'black' }} />}
//               buttonText={resource.subResources.length.toString()}
//               headerTitle="Sub Resources"
//             />
//           )}
//         </Stack>
//       </BoxBlockDefaultClickPropagation>
//       <Flex flexShrink={0} direction="column" justifyContent="center">
//         {!!resource.coveredSubTopics?.items && (
//           <Skeleton isLoaded={!isLoading}>
//             <BoxBlockDefaultClickPropagation>
//               <LearningMaterialCardCoveredTopics learningMaterial={resource} editable />
//             </BoxBlockDefaultClickPropagation>
//           </Skeleton>
//         )}
//       </Flex>
//     </Flex>
//   );
// };

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
