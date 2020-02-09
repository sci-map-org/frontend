import { Box, Checkbox, Flex, Input, Stack, Text, useToast } from '@chakra-ui/core';
import { useState } from 'react';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourceMediaType, ResourceType } from '../../graphql/types';
import { ResourcePreviewCard } from './ResourcePreviewCard';

export const DomainRecommendedResources: React.FC<{
  domain: DomainDataFragment;
  resourcePreviews: ResourcePreviewDataFragment[];
}> = ({ domain, resourcePreviews }) => {
  const recommendedResources: Array<ResourcePreviewDataFragment & {
    durationMn?: number;
    isChecked: boolean;
    comments: {
      items: Array<{
        _id: string;
        message: string;
      }>;
    };
  }> = [
    {
      _id: 'fewrfg',
      name: 'My Amazing resource',
      durationMn: 5,
      type: ResourceType.Article,
      mediaType: ResourceMediaType.Text,
      url: 'https://google.com',
      tags: [{ name: 'Practical' }, { name: 'Visual' }],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...`,
      isChecked: false,
      coveredConcepts: {
        items: [
          {
            _id: '1',
            name: 'one concept',
            key: 'fw',
          },
        ],
      },
      comments: {
        items: [
          {
            _id: 'fwerg',
            message: 'ferbg',
          },
          {
            _id: 'fwergfew',
            message: 'ferbg',
          },
        ],
      },
    },
    {
      _id: 'efgbfh',
      name: 'My Great resource',
      durationMn: 30,
      type: ResourceType.Course,
      mediaType: ResourceMediaType.Video,
      url: 'https://google.com',
      tags: [{ name: 'Theoritical' }, { name: 'Abstract' }],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...`,
      isChecked: false,
      coveredConcepts: {
        items: [
          {
            _id: '1',
            name: 'one concept',
            key: 'few',
          },
        ],
      },
      comments: {
        items: [],
      },
    },
  ];
  const [resources, setResources] = useState<Array<ResourcePreviewDataFragment & { isChecked?: boolean }>>(
    resourcePreviews
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckedResources, setShowCheckedResources] = useState(false);
  const checkedResourceToast = useToast();
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
            .filter(r => !!showCheckedResources || !r.isChecked)
            .map((preview, previewIdx) => (
              <ResourcePreviewCard
                key={preview._id}
                domainKey={domain.key}
                resource={preview}
                onChecked={id => {
                  const r = [...resources];
                  r.splice(
                    resources.findIndex(r => r._id === id),
                    1,
                    { ...preview, isChecked: !preview.isChecked }
                  );
                  setResources(r);
                  checkedResourceToast({
                    position: 'bottom-left',
                    title: 'Resource completed',
                    description: 'The resource was marked as completed',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                  });
                  //TODO: Undo button on the toast
                }}
              />
            ))}
        </Box>
      </Box>
    </Flex>
  );
};
