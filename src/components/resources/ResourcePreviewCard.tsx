import {
  Box,
  Checkbox,
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
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useToast,
  Button,
  Alert,
  AlertIcon,
  CloseButton,
  AlertDescription,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import NextLink from 'next/link';

import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { useSetResourceConsumedMutation } from './ResourcePreviewCard.generated';
import { ResourceTypeBadge } from './ResourceType';
import { ResourceUrlLink } from './ResourceUrl';
import { useVoteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { ResourceVoteValue } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { SelectedTagsViewer } from './ResourceTagsEditor';
import { InternalLink } from '../navigation/InternalLink';

const shortenDescription = (description: string, maxLength = 200) => {
  return description.length > 200 ? description.slice(0, 200) + '...' : description;
};

export const setResourceConsumed = gql`
  mutation setResourceConsumed($resourceId: String!, $consumed: Boolean!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, consumed: $consumed }] }) {
      ...ResourcePreviewData
    }
  }
  ${ResourcePreviewData}
`;

interface ResourcePreviewCardProps {
  domainKey: string;
  resource: ResourcePreviewDataFragment;
  onResourceConsumed?: (resource: ResourcePreviewDataFragment) => void;
}
export const ResourcePreviewCard: React.FC<ResourcePreviewCardProps> = ({
  domainKey,
  resource,
  onResourceConsumed,
}) => {
  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();
  const [setResourceConsumed] = useSetResourceConsumedMutation();
  const [voteResource] = useVoteResourceMutation();
  const checkedResourceToast = useToast();
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
      <Flex direction="row" alignItems="center" px={0}>
        <IconButton
          size="sm"
          aria-label="upvote"
          icon="arrow-up"
          variant="ghost"
          my={0}
          onClick={() => {
            if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
            voteResource({ variables: { resourceId: resource._id, value: ResourceVoteValue.Up } });
          }}
        />
        <Text>{resource.upvotes}</Text>
        {/*
 // @ts-ignore */}
        <IconButton
          size="sm"
          aria-label="downvote"
          icon="arrow-down"
          variant="ghost"
          my={0}
          onClick={() => {
            if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
            voteResource({ variables: { resourceId: resource._id, value: ResourceVoteValue.Down } });
          }}
        />
      </Flex>
      <Flex direction="column" flexGrow={1} justifyContent="center">
        <Stack spacing={2} direction="row" alignItems="baseline">
          <Text>
            <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resource._id}`} fontSize="xl">
              {resource.name}
            </InternalLink>
          </Text>
          <ResourceUrlLink resource={resource} />
          <ResourceTypeBadge type={resource.type} />
          {resource.durationMn && (
            <Text fontSize="sm" color="gray.400" mb={1}>
              {resource.durationMn}mn
            </Text>
          )}
        </Stack>
        {((resource.tags && resource.tags.length > 0) || resource.description) && (
          <Box pb={2}>
            <Text fontWeight={250}>
              <SelectedTagsViewer selectedTags={resource.tags} />
              {resource.description && shortenDescription(resource.description)}
            </Text>
          </Box>
        )}
      </Flex>
      <Flex flexBasis="160px" flexShrink={0} direction="column" justifyContent="center" py={2}>
        {resource.coveredConcepts && (
          <Box>
            <Popover>
              <PopoverTrigger>
                <Link color="gray.600" fontWeight={200}>
                  {resource.coveredConcepts?.items.length} Concept
                  {resource.coveredConcepts?.items.length === 1 ? '' : 's'} Covered
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
        )}
        {mockedFeaturesEnabled && (
          <Box>
            <Link color="gray.600" fontWeight={200}>
              3 comments
            </Link>
          </Box>
        )}
      </Flex>
      <Flex>
        <Tooltip aria-label="Welcome home" label="Mark as read/watched" placement="top">
          <Checkbox
            size="lg"
            m={4}
            isChecked={!!resource.consumed && !!resource.consumed.consumedAt}
            onChange={async (e) => {
              if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
              const setResourceConsumedValue = !resource.consumed || !resource.consumed.consumedAt;
              await setResourceConsumed({
                variables: {
                  resourceId: resource._id,
                  consumed: setResourceConsumedValue,
                },
              });
              checkedResourceToast({
                render: ({ onClose, id }) => (
                  <Alert
                    status="success"
                    variant="solid"
                    id={id}
                    textAlign="left"
                    boxShadow="lg"
                    rounded="md"
                    alignItems="start"
                    m={2}
                    pr={8}
                  >
                    <AlertIcon />
                    <Box flexDirection="row" alignItems="baseline" flex="1">
                      <AlertDescription>
                        The resource was marked as {setResourceConsumedValue ? `consumed` : 'not consumed'}
                        <Button
                          ml={6}
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setResourceConsumed({
                              variables: {
                                resourceId: resource._id,
                                consumed: !setResourceConsumedValue,
                              },
                            }).then(() => onClose())
                          }
                        >
                          Undo
                        </Button>
                      </AlertDescription>
                    </Box>
                    <CloseButton size="sm" onClick={onClose} position="absolute" right="4px" top="4px" />
                  </Alert>
                ),
                position: 'bottom-left',
                duration: 3000,
              });
              onResourceConsumed && onResourceConsumed(resource);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export const ResourcePreviewCardList: React.FC<{
  domainKey: string;
  resourcePreviews?: ResourcePreviewDataFragment[];
}> = ({ resourcePreviews, domainKey }) => {
  if (!resourcePreviews || !resourcePreviews.length) return null;
  return (
    <Box borderTop="1px solid" borderTopColor="gray.200" width="100%" backgroundColor="backgroundColor.0">
      {resourcePreviews.map((preview) => (
        <ResourcePreviewCard key={preview._id} domainKey={domainKey} resource={preview} />
      ))}
    </Box>
  );
};
