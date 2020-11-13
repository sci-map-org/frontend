import {
  Box,
  BoxProps,
  Button,
  Center,
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
} from '@chakra-ui/core';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { flatten } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo } from '../../pages/resources/EditResourcePage';
import { ResourcePageInfo } from '../../pages/resources/ResourcePage';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningMaterialStarsRater, StarsRatingViewer } from '../learning_materials/LearningMaterialStarsRating';
import { EditableLearningMaterialTags } from '../learning_materials/LearningMaterialTagsEditor';
import { ResourceGroupIcon } from '../lib/icons/ResourceGroupIcon';
import { ResourceSeriesIcon } from '../lib/icons/ResourceSeriesIcon';
import { InternalLink } from '../navigation/InternalLink';
import { LearningMaterialDomainCoveredConceptsSelector } from './CoveredConceptsSelector';
import { DurationViewer } from './elements/Duration';
import { ResourceCompletedCheckbox } from './elements/ResourceCompletedCheckbox';
import { shortenDescription } from './elements/ResourceDescription';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceUpvoter } from './elements/ResourceUpvoter';
import { ResourceUrlLink } from './elements/ResourceUrl';
import { LearningMaterialCoveredConceptsByDomainViewer } from './LearningMaterialCoveredConceptsByDomainViewer';
import { LearningMaterialDomainAndCoveredConceptsSelector } from './LearningMaterialDomainAndCoveredConceptsSelector';

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
  borderTopColor?: string;
}
export const ResourcePreviewCard: React.FC<ResourcePreviewCardProps> = ({
  domainKey,
  resource,
  onResourceConsumed,
  borderTopColor,
  isLoading,
}) => {
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  return (
    <Flex
      direction="row"
      alignItems="stretch"
      borderLeftWidth={1}
      borderTopWidth={1}
      borderTopColor={borderTopColor || 'white'} // hacky stuff
      borderLeftColor="gray.200"
      borderRightWidth={1}
      borderRightColor="gray.200"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
      key={resource._id}
      _hover={{
        cursor: 'pointer',
        borderWidth: '1px',
        borderColor: 'gray.400',
      }}
      // mt="-1px"
      onClick={() => routerPushToPage(ResourcePageInfo(resource))}
    >
      <LeftBlock resource={resource} isLoading={isLoading} />

      <Flex direction="column" flexGrow={1} pt="4px">
        <Flex direction="row" flexGrow={1}>
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
                <Text fontWeight={250}>{resource.description && shortenDescription(resource.description)}</Text>
              </Box>
            )}
          </Flex>
        </Flex>
        <BottomBlock resource={resource} domainKey={domainKey} isLoading={isLoading} />
      </Flex>
      <Flex direction="row">
        <BoxBlockDefaultClickPropagation alignSelf="center" justifySelf="center" ml="32px" mr="4px">
          <ResourceCompletedCheckbox
            size="lg"
            resource={resource}
            isLoading={isLoading}
            onResourceConsumed={onResourceConsumed}
          />
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
          />
        </BoxBlockDefaultClickPropagation>
      </Flex>
    </Flex>
  );
};

const LeftBlock: React.FC<{ resource: ResourcePreviewDataFragment; isLoading?: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <Center w="100px">
      <BoxBlockDefaultClickPropagation>
        <ResourceUpvoter resource={resource} isLoading={isLoading} />
      </BoxBlockDefaultClickPropagation>
    </Center>
  );
};

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

const shortenCoveredConceptsList = (coveredConcepts: Pick<ConceptDataFragment, 'name'>[], maxLength: number = 40) => {
  const { s, count } = [...coveredConcepts]
    .sort((c1, c2) => c1.name.length - c2.name.length)
    .reduce(
      (o, concept, index) => {
        if (o.s.length > maxLength) {
          o.count = o.count + 1;
        } else {
          o.s = index > 0 ? o.s + ', ' + concept.name : concept.name;
        }
        return o;
      },
      { s: '', count: 0 }
    );
  return count ? `${s}, and more...` : s;
};

const BottomBlock: React.FC<{
  domainKey?: string;
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
}> = ({ domainKey, resource, isLoading }) => {
  const [coveredConceptsEditorMode, setCoveredConceptsEditorMode] = useState(false);
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();

  const domainCoveredConcepts = resource.coveredConceptsByDomain?.filter(
    (d) => !domainKey || d.domain.key === domainKey
  );
  return (
    <Flex pb={2} pt={2} flexWrap="wrap">
      <BoxBlockDefaultClickPropagation>
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
        {domainCoveredConcepts && (
          <Skeleton isLoaded={!isLoading}>
            <BoxBlockDefaultClickPropagation>
              <Popover placement="bottom-end" isLazy>
                <PopoverTrigger>
                  <Stack direction="row" spacing="1px" _hover={{ color: 'gray.800' }} fontSize="15px">
                    <Text color="gray.800" fontWeight={300} as="span">
                      About:{'  '}
                    </Text>
                    <Link color="gray.800" fontWeight={300} onClick={() => setCoveredConceptsEditorMode(false)}>
                      {shortenCoveredConceptsList(
                        flatten(domainCoveredConcepts.map(({ coveredConcepts }) => coveredConcepts)),
                        32
                      )}
                    </Link>
                    <IconButton
                      onClick={(e) => {
                        if (!currentUser) {
                          unauthentificatedModalDisclosure.onOpen();
                          e.preventDefault();
                          return;
                        }
                        setCoveredConceptsEditorMode(true);
                      }}
                      aria-label="Add or remove covered concepts"
                      variant="ghost"
                      size="xs"
                      color="gray.600"
                      icon={<SettingsIcon />}
                    />
                  </Stack>
                </PopoverTrigger>
                <PopoverContent zIndex={4} backgroundColor="white">
                  <PopoverArrow />
                  <PopoverHeader fontWeight={500}>Covered Concepts</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody pt={1}>
                    {coveredConceptsEditorMode ? (
                      domainCoveredConcepts.length === 1 ? (
                        <LearningMaterialDomainCoveredConceptsSelector
                          domainKey={domainCoveredConcepts[0].domain.key}
                          learningMaterialId={resource._id}
                          coveredConcepts={domainCoveredConcepts[0].coveredConcepts}
                        />
                      ) : (
                        <LearningMaterialDomainAndCoveredConceptsSelector learningMaterial={resource} />
                      )
                    ) : domainCoveredConcepts.length === 1 ? (
                      <Stack direction="column">
                        {domainCoveredConcepts[0].coveredConcepts.map((concept) => (
                          <Box key={concept._id}>
                            <InternalLink
                              routePath="/domains/[key]/concepts/[conceptKey]"
                              asHref={`/domains/${domainKey}/concepts/${concept.key}`}
                            >
                              {concept.name}
                            </InternalLink>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <LearningMaterialCoveredConceptsByDomainViewer learningMaterial={resource} />
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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
