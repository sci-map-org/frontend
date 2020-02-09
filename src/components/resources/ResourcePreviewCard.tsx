import {
  Box,
  Checkbox,
  Flex,
  Icon,
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
} from '@chakra-ui/core';
import NextLink from 'next/link';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useMockedFeaturesEnabled } from '../../hooks/useMockedFeaturesEnabled';
import { toUrlPreview } from '../../services/url.service';
import { ResourceTypeBadge } from './ResourceType';

const shortenDescription = (description: string, maxLength = 200) => {
  return description.length > 200 ? description.slice(0, 200) + '...' : description;
};

interface ResourcePreviewCardProps {
  domainKey: string;
  resource: ResourcePreviewDataFragment & {
    isChecked?: boolean;
  };
  onChecked: (id: string) => void;
}
export const ResourcePreviewCard: React.FC<ResourcePreviewCardProps> = ({ domainKey, resource, onChecked }) => {
  const { mockedFeaturesEnabled } = useMockedFeaturesEnabled();
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
          <Link fontSize="sm" color="blue.700" href={resource.url} isExternal>
            {toUrlPreview(resource.url)}
            <Icon name="external-link" mx="2px" />
          </Link>
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
            isChecked={resource.isChecked}
            onChange={e => {
              onChecked(resource._id);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
