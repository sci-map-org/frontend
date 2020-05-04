import { Box, Checkbox, Flex, Input, Stack, Text, useToast } from '@chakra-ui/core';
import { useState } from 'react';

import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourcePreviewCard, ResourcePreviewCardList } from './ResourcePreviewCard';
import { Access } from '../auth/Access';
import { RoleAccess } from '../auth/RoleAccess';

export const DomainRecommendedResources: React.FC<{
  domain: DomainDataFragment;
  resourcePreviews: ResourcePreviewDataFragment[];
}> = ({ domain, resourcePreviews }) => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [showCheckedResources, setShowCheckedResources] = useState(false);

  return (
    <Flex direction="column" mb={4}>
      <Stack direction="row" isInline alignItems="center" spacing={4} mb={3}>
        <Text fontSize="2xl">Resources</Text>
        {/* <Input
          width="20rem"
          variant="flushed"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        ></Input> */}
        <Box flexGrow={1} />
        <RoleAccess accessRule="loggedInUser">
          <Text fontWeight={300}>Show completed</Text>
          <Checkbox
            size="lg"
            px={1}
            isChecked={showCheckedResources}
            onChange={(e: any) => setShowCheckedResources(e.target.checked)}
          />
        </RoleAccess>
      </Stack>

      <ResourcePreviewCardList
        domainKey={domain.key}
        resourcePreviews={resourcePreviews.filter(
          (r) => !!showCheckedResources || !r.consumed || !r.consumed.consumedAt
        )}
      />
    </Flex>
  );
};
