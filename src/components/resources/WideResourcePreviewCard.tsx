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
} from '@chakra-ui/core';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  ResourceDataFragment,
  ResourcePreviewDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { useVoteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { ResourceVoteValue } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { RoleAccess } from '../auth/RoleAccess';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { CompletedCheckbox } from '../lib/CompletedCheckbox';
import { InternalLink } from '../navigation/InternalLink';
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
const TitleLink: React.FC<{ resource: ResourcePreviewDataFragment }> = ({ resource }) => {
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
        <Text
          mr={1}
          as="span"
          fontSize="xl"
          // flexBasis="400px"
          // flexGrow={2}
          // flex
          // textOverflow="ellipsis"
          // whiteSpace="nowrap"
          // overflow="hidden"
        >
          {resource.name} <ResourceUrlLink resource={resource} />
        </Text>
        {/* <Box>
        <ResourceUrlLink resource={resource} />
      </Box> */}
      </Link>
    </Box>
  );
};

const BottomBlock: React.FC<{ resource: ResourceDataFragment }> = ({ resource }) => {
  return (
    <Flex>
      <RoleAccess accessRule="loggedInUser">
        <ResourceTagsEditor size="sm" resource={resource} />
      </RoleAccess>
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
  // const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();

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
      pb={0}
    >
      <LeftBlock resource={resource} isLoading={isLoading} />
      <Flex direction="column">
        <Flex direction="row" flexGrow={1}>
          <Flex direction="column" flexGrow={1} justifyContent="center">
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={2} direction="row" alignItems="baseline" mr="10px">
                <TitleLink resource={resource} />
                {/* <Text>
              <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resource._id}`} fontSize="xl">
                {resource.name}
              </InternalLink>
            </Text>
            <ResourceUrlLink resource={resource} /> */}

                {/* <Box flexGrow={1} /> */}
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
              <Box pb={2}>
                <Text fontWeight={250}>{resource.description && shortenDescription(resource.description)}</Text>
                <SelectedTagsViewer selectedTags={resource.tags} />
              </Box>
            )}
          </Flex>
          <Flex flexBasis="100px" flexShrink={0} direction="column" justifyContent="center" py={2}>
            {resource.coveredConcepts && (
              <Skeleton isLoaded={!isLoading}>
                <Box>
                  <Popover>
                    <PopoverTrigger>
                      <Link color="gray.600" fontWeight={200}>
                        {resource.coveredConcepts?.items.length} Concept
                        {resource.coveredConcepts?.items.length === 1 ? '' : 's'}
                      </Link>
                    </PopoverTrigger>
                    <PopoverContent zIndex={4} backgroundColor="white">
                      <PopoverArrow />
                      <PopoverHeader>Concepts</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Stack direction="column">
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
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              </Skeleton>
            )}
            {/* {mockedFeaturesEnabled && (
          <Box>
            <Link color="gray.600" fontWeight={200}>
              3 comments
            </Link>
          </Box>
        )} */}
          </Flex>
          <Flex alignItems="center">
            <CompletedCheckbox
              size="lg"
              m={4}
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
        <BottomBlock resource={resource} />
      </Flex>
    </Flex>
  );
};
