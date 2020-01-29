import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  Link,
  Badge,
  Checkbox,
  Stack,
  Tag,
  TagIcon,
  TagLabel,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Tooltip,
} from '@chakra-ui/core';
import { useState } from 'react';
import NextLink from 'next/link';

import { DomainDataFragment } from '../../graphql/domains/domains.generated';

export const DomainRecommendedResources: React.FC<{ domain: DomainDataFragment }> = ({ domain }) => {
  const recommendedResources = [
    {
      _id: 'fewrfg',
      name: 'My Amazing resource',
      durationMn: 5,
      type: 'Article',
      url: 'https://google.com',
      keywords: ['Practical', 'Visual'],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...`,

      checked: false,
    },
    {
      _id: 'efgbfh',
      name: 'My Great resource',
      durationMn: 30,
      type: 'Video tutorial',
      url: 'https://google.com',
      keywords: ['Theoritical', 'Abstract'],
      expectedKnowledge: ['programming basics', 'mathematics basics'],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...`,
      checked: false,
    },
  ];
  const [resources, setResources] = useState(recommendedResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckedResources, setShowCheckedResources] = useState(false);
  return (
    <Flex direction="column" mb={4}>
      <Stack direction="row" isInline alignItems="center" spacing={4} mb={3}>
        <Text fontSize="2xl">Resources</Text>
        <Input
          width="20rem"
          variant="flushed"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        ></Input>
        <Box flexGrow={1} />
        <Text fontWeight={300}>Show all</Text>
        <Checkbox
          size="lg"
          px={1}
          isChecked={showCheckedResources}
          onChange={(e: any) => setShowCheckedResources(e.target.checked)}
        />
      </Stack>

      <Box>
        <Box borderTop="1px solid" borderTopColor="gray.200" width="100%">
          {resources
            .filter(r => !!showCheckedResources || !r.checked)
            .map((preview, previewIdx) => (
              <Flex
                direction="row"
                alignItems="center"
                borderLeftColor="gray.200"
                borderRightColor="gray.200"
                borderLeftWidth={1}
                borderRightWidth={1}
                borderBottomColor="gray.200"
                borderBottomWidth={1}
                key={preview._id}
                pb={2}
              >
                <Flex direction="column" alignItems="center" px={1}>
                  <IconButton size="sm" aria-label="upvote" icon="chevron-up" variant="ghost" />
                  <Text>32</Text>
                  <IconButton size="sm" aria-label="downvote" icon="chevron-down" variant="ghost" />
                </Flex>
                <Flex direction="column" flexGrow={1}>
                  <Flex direction="row" alignItems="flex-end">
                    <NextLink href={`/resources/${preview._id}`}>
                      <Link fontSize="xl">{preview.name}</Link>
                    </NextLink>
                    <Link fontSize="xl" href={preview.url} isExternal>
                      <IconButton aria-label="upvote" size="sm" variant="ghost" icon="external-link" />
                    </Link>
                    <Text fontSize="sm" color="gray.400" mb={1}>
                      {preview.durationMn}mn
                    </Text>
                    <Badge variantColor="blue" ml={2} mb={1}>
                      {preview.type}
                    </Badge>
                  </Flex>
                  <Text fontWeight={250} pb={2}>
                    {preview.description}
                  </Text>
                  <Flex direction="row">
                    <Stack direction="row">
                      {preview.keywords.map((keyword, idx) => (
                        <Tag size="sm" variantColor="gray" key={idx}>
                          <TagLabel>{keyword}</TagLabel>
                        </Tag>
                      ))}
                    </Stack>
                    <Box flexGrow={1} />
                    <Box mx={4}>
                      <Popover>
                        <PopoverTrigger>
                          <Link color="gray.600" fontWeight={200}>
                            4 Concepts Covered
                          </Link>
                        </PopoverTrigger>
                        <PopoverContent zIndex={4} backgroundColor="white">
                          <PopoverArrow />
                          <PopoverHeader>Concepts</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Stack direction="column">
                              {['concept 1', 'concept 2'].map(concept => (
                                <Link key={concept}>{concept}</Link>
                              ))}
                            </Stack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Box>
                    <Box>
                      <Link color="gray.600" fontWeight={200}>
                        12 comments
                      </Link>
                    </Box>
                  </Flex>
                </Flex>
                <Flex>
                  <Tooltip aria-label="Welcome home" label="Mark as read/watched" placement="top">
                    <Checkbox
                      size="lg"
                      m={4}
                      isChecked={preview.checked}
                      onChange={e => {
                        const r = [...resources];
                        r.splice(
                          resources.findIndex(r => r._id === preview._id),
                          1,
                          { ...preview, checked: e.target.checked }
                        );
                        setResources(r);
                      }}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            ))}
        </Box>
      </Box>
    </Flex>
  );
};
