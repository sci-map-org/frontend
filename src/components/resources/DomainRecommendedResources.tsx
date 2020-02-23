import { Box, Checkbox, Flex, Input, Stack, Text, useToast } from '@chakra-ui/core';
import { useState } from 'react';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourcePreviewCard } from './ResourcePreviewCard';

export const DomainRecommendedResources: React.FC<{
  domain: DomainDataFragment;
  resourcePreviews: ResourcePreviewDataFragment[];
}> = ({ domain, resourcePreviews }) => {
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
          {resourcePreviews
            .filter(r => !!showCheckedResources || !r.consumed || !r.consumed.consumedAt)
            .map(preview => (
              <ResourcePreviewCard key={preview._id} domainKey={domain.key} resource={preview} />
            ))}
        </Box>
      </Box>
    </Flex>
  );
};
