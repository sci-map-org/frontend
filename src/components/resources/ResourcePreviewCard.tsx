import {
  Box,
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
  Tooltip,
} from '@chakra-ui/core';
import { ArrowDownIcon, ArrowUpIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useVoteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { ResourceVoteValue } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo } from '../../pages/resources/EditResourcePage';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox } from '../lib/CompletedCheckbox';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceDomainCoveredConceptsSelector } from './CoveredConceptsSelector';
import { shortenDescription } from './elements/ResourceDescription';
import { ResourceDuration } from './elements/ResourceDuration';
import { ResourceStarsRater, ResourceStarsRating } from './elements/ResourceStarsRating';
import { ResourceTagsEditor, SelectedTagsViewer } from './elements/ResourceTagsEditor';
import { ResourceTypeBadge } from './elements/ResourceType';
import { ResourceUrlLink } from './elements/ResourceUrl';

interface ResourcePreviewCardProps {
  domainKey: string;
  resource: ResourcePreviewDataFragment;
  onResourceConsumed: (resource: ResourcePreviewDataFragment, consumed: boolean) => void;
  isLoading?: boolean;
}
export const ResourcePreviewCard: React.FC<ResourcePreviewCardProps> = ({
  domainKey,
  resource,
  onResourceConsumed,
  isLoading,
}) => {
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  return (
    <Flex
      direction="row"
      alignItems="stretch"
      borderLeftColor="gray.200"
      borderRightColor="gray.200"
      borderLeftWidth={1}
      borderRightWidth={1}
      borderBottomColor="gray.200"
      borderBottomWidth={1}
      key={resource._id}
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
                <ResourceStarsRating value={resource.rating} pxSize={13} />
                <ResourceTypeBadge type={resource.type} />
                <ResourceDuration value={resource.durationMs} />

                <RoleAccess accessRule="contributorOrAdmin">
                  <ResourceStarsRater
                    resourceId={resource._id}
                    size="xs"
                    color="gray.500"
                    _hover={{ color: 'gray.900' }}
                  />
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
      <Flex direction="row" borderLeftWidth="0px" borderLeftColor="gray.100">
        <CompletedCheckbox
          size="lg"
          alignSelf="center"
          justifySelf="center"
          ml="32px"
          mr="4px"
          popoverLabel="Mark as completed"
          popoverDelay={500}
          isDisabled={isLoading}
          isChecked={!!resource.consumed && !!resource.consumed.consumedAt}
          onChange={async () => {
            if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
            onResourceConsumed(resource, !resource.consumed || !resource.consumed.consumedAt);
          }}
        />
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
      </Flex>
    </Flex>
  );
};

const LeftBlock: React.FC<{ resource: ResourcePreviewDataFragment; isLoading?: boolean }> = ({
  resource,
  isLoading,
}) => {
  const [voteResource] = useVoteResourceMutation();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const { currentUser } = useCurrentUser();
  return (
    <Flex direction="column" px={5} py={1} justifyContent="center" alignItems="center">
      <IconButton
        size="xs"
        aria-label="upvote"
        icon={<ArrowUpIcon />}
        variant="ghost"
        my={0}
        isDisabled={isLoading}
        onClick={() => {
          if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
          voteResource({ variables: { resourceId: resource._id, value: ResourceVoteValue.Up } });
        }}
      />
      <Skeleton isLoaded={!isLoading}>
        <Text>{resource.upvotes}</Text>
      </Skeleton>
      <IconButton
        size="xs"
        aria-label="downvote"
        icon={<ArrowDownIcon />}
        variant="ghost"
        my={0}
        isDisabled={isLoading}
        onClick={() => {
          if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
          voteResource({ variables: { resourceId: resource._id, value: ResourceVoteValue.Down } });
        }}
      />
    </Flex>
  );
};

const TitleLink: React.FC<{ resource: ResourcePreviewDataFragment; isLoading?: boolean }> = ({
  resource,
  isLoading,
}) => {
  return (
    <Box>
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
    </Box>
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
  domainKey: string;
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
}> = ({ domainKey, resource, isLoading }) => {
  const [tagEditorMode, setTagEditorMode] = useState(false);
  const [coveredConceptsEditorMode, setCoveredConceptsEditorMode] = useState(false);
  const wrapperRef = useRef(null);
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const useOutsideAlerter = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTagEditorMode(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const coveredConcepts = resource.coveredConceptsByDomain?.find((d) => d.domain.key === domainKey)?.coveredConcepts;
  useOutsideAlerter(wrapperRef);
  return (
    <Flex pb={2} pt={2} flexWrap="wrap">
      {tagEditorMode ? (
        <Box ref={wrapperRef}>
          <Skeleton isLoaded={!isLoading}>
            <ResourceTagsEditor size="sm" resource={resource} inputWidth="100px" />
          </Skeleton>
        </Box>
      ) : (
        <Stack direction="row" alignItems="center">
          {resource.tags?.length && (
            <Skeleton isLoaded={!isLoading}>
              <SelectedTagsViewer pb={0} selectedTags={resource.tags} />
            </Skeleton>
          )}
          <Tooltip hasArrow label={resource.tags?.length ? 'Add or remove tags' : 'Add tags'}>
            <IconButton
              isDisabled={isLoading}
              size="xs"
              variant="ghost"
              aria-label="add tag"
              onClick={(e) => {
                if (!currentUser) {
                  unauthentificatedModalDisclosure.onOpen();
                  e.preventDefault();
                  return;
                }
                setTagEditorMode(true);
              }}
              icon={<EditIcon />}
            />
          </Tooltip>
          )
        </Stack>
      )}
      <Box flexGrow={1} flexBasis={0} />
      <Flex flexShrink={0} direction="column" justifyContent="center">
        {coveredConcepts && (
          <Skeleton isLoaded={!isLoading}>
            <Box>
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <Stack direction="row" spacing="1px" _hover={{ color: 'gray.800' }} fontSize="15px">
                    <Text color="gray.800" fontWeight={300} as="span">
                      About:{'  '}
                    </Text>
                    <Link color="gray.800" fontWeight={300} onClick={() => setCoveredConceptsEditorMode(false)}>
                      {shortenCoveredConceptsList(coveredConcepts, 32)}
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
                      <ResourceDomainCoveredConceptsSelector
                        domainKey={domainKey}
                        resourceId={resource._id}
                        coveredConcepts={coveredConcepts}
                      />
                    ) : (
                      <Stack direction="column">
                        {coveredConcepts.map((concept) => (
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
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Skeleton>
        )}
      </Flex>
    </Flex>
  );
};
