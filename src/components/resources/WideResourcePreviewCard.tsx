import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { ArrowDownIcon, ArrowUpIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import {
  useDeleteResourceMutation,
  useVoteResourceMutation,
} from '../../graphql/resources/resources.operations.generated';
import { ResourceVoteValue } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { EditResourcePageInfo } from '../../pages/resources/EditResourcePage';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox } from '../lib/CompletedCheckbox';
import { DomainCoveredConceptSelector } from './CoveredConceptsSelector';
import { shortenDescription } from './ResourceDescription';
import { ResourceDuration } from './ResourceDuration';
import { ResourceStarsRating } from './ResourceStarsRating';
import { ResourceTagsEditor, SelectedTagsViewer } from './ResourceTagsEditor';
import { ResourceTypeBadge } from './ResourceType';
import { ResourceUrlLink } from './ResourceUrl';

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
        // flexGrow={1}
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
  const { s, count } = coveredConcepts
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
  return count ? `${s},...(+ ${count})` : s;
};

const BottomBlock: React.FC<{
  domainKey: string;
  resource: ResourcePreviewDataFragment;
  isLoading?: boolean;
}> = ({ domainKey, resource, isLoading }) => {
  const [editorMode, setEditorMode] = useState(false);
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEditorMode(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  return (
    <Flex height="32px">
      <RoleAccess
        accessRule="loggedInUser"
        renderAccessDenied={() => <SelectedTagsViewer selectedTags={resource.tags} />}
      >
        {editorMode ? (
          <Box ref={wrapperRef}>
            <ResourceTagsEditor size="sm" resource={resource} inputWidth="100px" />
          </Box>
        ) : (
          <Stack direction="row" alignItems="center">
            <SelectedTagsViewer pb={0} selectedTags={resource.tags} />
            <Tooltip hasArrow label="Add or remove tags">
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="add tag"
                onClick={() => setEditorMode(true)}
                icon={<EditIcon />}
              />
            </Tooltip>
          </Stack>
        )}
      </RoleAccess>
      <Box flexGrow={1} />
      <Flex flexShrink={0} direction="column" justifyContent="center" py={2}>
        {resource.coveredConcepts && (
          <Skeleton isLoaded={!isLoading}>
            <Box>
              <Popover>
                <PopoverTrigger>
                  <Link color="teal.500" fontWeight={500} mr={1}>
                    {shortenCoveredConceptsList(resource.coveredConcepts?.items)}
                  </Link>
                </PopoverTrigger>
                <PopoverContent zIndex={4} backgroundColor="white">
                  <PopoverArrow />
                  <PopoverHeader>Covered Concepts</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <DomainCoveredConceptSelector domainKey={domainKey} resource={resource} />
                    {/* <CoveredConceptsSelector
                      resourceId={resource._id}
                      coveredConcepts={resource.coveredConcepts.items}
                      conceptList={domainConceptList}
                    /> */}
                    {/* <Stack direction="column">
                      {resource.coveredConcepts.items.map((concept) => (
                        <Box key={concept._id}>
                          <InternalLink
                            routePath="/domains/[key]/concepts/[conceptKey]"
                            asHref={`/domains/${domainKey}/concepts/${concept.key}`}
                          >
                            {concept.name}
                          </InternalLink>
                        </Box>
                      ))}
                    </Stack> */}
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
interface WideResourcePreviewCardProps {
  domainKey: string;
  resource: ResourcePreviewDataFragment;
  onResourceConsumed: (resource: ResourcePreviewDataFragment, consumed: boolean) => void;
  isLoading?: boolean;
}
export const WideResourcePreviewCard: React.FC<WideResourcePreviewCardProps> = ({
  domainKey,
  resource,
  onResourceConsumed,
  isLoading,
}) => {
  const { currentUser } = useCurrentUser();
  const [deleteResourceMutation] = useDeleteResourceMutation();
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
      pb={0}
    >
      <LeftBlock resource={resource} isLoading={isLoading} />
      <Flex direction="column" flexGrow={1}>
        <Flex direction="row" flexGrow={1}>
          <Flex direction="column" flexGrow={1} justifyContent="center">
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={2} direction="row" alignItems="baseline" mr="10px">
                <TitleLink resource={resource} isLoading={isLoading} />
              </Stack>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={1} direction="row" alignItems="baseline" mr="10px">
                <ResourceTypeBadge type={resource.type} />
                <ResourceDuration value={resource.durationMs} />
                <ResourceStarsRating value={resource.rating} pxSize={13} />
              </Stack>
            </Skeleton>
            {((resource.tags && resource.tags.length > 0) || resource.description) && (
              <Box>
                <Text fontWeight={250}>{resource.description && shortenDescription(resource.description)}</Text>
              </Box>
            )}
          </Flex>
          <Flex direction="column">
            <Menu>
              <MenuButton
                m={1}
                alignSelf="flex-end"
                size="xs"
                as={IconButton}
                variant="ghost"
                icon={<HamburgerIcon />}
              ></MenuButton>
              <MenuList>
                <MenuItem onClick={() => routerPushToPage(EditResourcePageInfo(resource))}>Edit</MenuItem>
                <MenuItem
                  onClick={() => {
                    if (window.confirm('Are you sure to delete this resource?')) {
                      deleteResourceMutation({ variables: { _id: resource._id } });
                    }
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
            <CompletedCheckbox
              size="lg"
              alignSelf="center"
              mx="32px"
              popoverLabel="Mark as completed"
              popoverDelay={500}
              isDisabled={isLoading}
              isChecked={!!resource.consumed && !!resource.consumed.consumedAt}
              onChange={async () => {
                if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
                onResourceConsumed(resource, !resource.consumed || !resource.consumed.consumedAt);
              }}
            />
          </Flex>
        </Flex>
        <BottomBlock resource={resource} domainKey={domainKey} />
      </Flex>
    </Flex>
  );
};
