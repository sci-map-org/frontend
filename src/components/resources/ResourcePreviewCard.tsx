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
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import NextLink from 'next/link';

import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { useSetResourceConsumedMutation } from './ResourcePreviewCard.generated';
import { ResourceTypeBadge } from './ResourceType';
import { ResourceUrlLink } from './ResourceUrl';

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
  const checkedResourceToast = useToast();

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
        <IconButton size="sm" aria-label="upvote" icon="arrow-up" variant="ghost" my={0} />
        <Text>32</Text>
        {/*
 // @ts-ignore */}
        <IconButton size="sm" aria-label="downvote" icon="arrow-down" variant="ghost" my={0} />
      </Flex>
      <Flex direction="column" flexGrow={1} justifyContent="center">
        <Stack spacing={2} direction="row" alignItems="baseline">
          <Text>
            <NextLink href={`/resources/${resource._id}`}>
              <Link fontSize="xl">{resource.name}</Link>
            </NextLink>
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
              {resource.tags && resource.tags.length > 0 && (
                <>
                  {resource.tags.map((tag, idx) => (
                    <Tag size="sm" variantColor="gray" key={idx} mr={2} as="span">
                      <TagLabel>{tag.name}</TagLabel>
                    </Tag>
                  ))}
                </>
              )}
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
                  {resource.coveredConcepts?.items.length} Concepts Covered
                </Link>
              </PopoverTrigger>
              <PopoverContent zIndex={4} backgroundColor="white">
                <PopoverArrow />
                <PopoverHeader>Concepts</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Stack direction="column">
                    {resource.coveredConcepts.items.map(concept => (
                      <Box key={concept._id}>
                        <NextLink href={`/domains/${domainKey}/concepts/${concept.key}`}>
                          <Link>{concept.name}</Link>
                        </NextLink>
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
            onChange={async e => {
              await setResourceConsumed({
                variables: { resourceId: resource._id, consumed: !resource.consumed || !resource.consumed.consumedAt },
              });
              checkedResourceToast({
                position: 'bottom-left',
                title: 'Resource completed',
                description: 'The resource was marked as completed',
                status: 'info',
                duration: 3000,
                isClosable: true,
              });
              onResourceConsumed && onResourceConsumed(resource);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
