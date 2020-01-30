import {
  Badge,
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
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';

interface ResourcePreviewCardProps {
  resource: ResourcePreviewDataFragment & {
    durationMn?: number;
    isChecked: boolean;
    comments: {
      items: Array<{
        _id: string;
        message: string;
      }>;
    };
  };
  onChecked: (id: string) => void;
}
export const ResourcePreviewCard: React.FC<ResourcePreviewCardProps> = ({ resource, onChecked }) => {
  return (
    <Flex
      direction="row"
      alignItems="center"
      borderLeftColor="gray.200"
      borderRightColor="gray.200"
      borderLeftWidth={1}
      borderRightWidth={1}
      borderBottomColor="gray.200"
      borderBottomWidth={1}
      key={resource._id}
      pb={2}
    >
      <Flex direction="column" alignItems="center" px={1}>
        <IconButton size="sm" aria-label="upvote" icon="chevron-up" variant="ghost" />
        <Text>32</Text>
        <IconButton size="sm" aria-label="downvote" icon="chevron-down" variant="ghost" />
      </Flex>
      <Flex direction="column" flexGrow={1}>
        <Flex direction="row" alignItems="flex-end">
          <NextLink href={`/resources/${resource._id}`}>
            <Link fontSize="xl">{resource.name}</Link>
          </NextLink>
          <Link fontSize="xl" href={resource.url} isExternal>
            <IconButton aria-label="upvote" size="sm" variant="ghost" icon="external-link" />
          </Link>
          {resource.durationMn && (
            <Text fontSize="sm" color="gray.400" mb={1}>
              {resource.durationMn}mn
            </Text>
          )}
          <Badge variantColor="blue" ml={2} mb={1}>
            {resource.type}
          </Badge>
        </Flex>
        <Text fontWeight={250} pb={2}>
          {resource.description}
        </Text>
        <Flex direction="row">
          {resource.tags && (
            <Stack direction="row">
              {resource.tags.map((tag, idx) => (
                <Tag size="sm" variantColor="gray" key={idx}>
                  <TagLabel>{tag.name}</TagLabel>
                </Tag>
              ))}
            </Stack>
          )}
          <Box flexGrow={1} />
          {resource.coveredConcepts && (
            <Box mx={4}>
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
                        <Link key={concept._id}>{concept.name}</Link>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          )}
          <Box>
            <Link color="gray.600" fontWeight={200}>
              {resource.comments.items.length} comments
            </Link>
          </Box>
        </Flex>
      </Flex>
      <Flex>
        <Tooltip aria-label="Welcome home" label="Mark as read/watched" placement="top">
          <Checkbox
            size="lg"
            m={4}
            isChecked={resource.isChecked}
            onChange={e => {
              onChecked(resource._id);
              // const r = [...resources];
              // r.splice(
              //   resources.findIndex(r => r._id === preview._id),
              //   1,
              //   { ...preview, checked: e.target.checked }
              // );
              // setResources(r);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
