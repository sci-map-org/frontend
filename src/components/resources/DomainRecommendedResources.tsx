import { Box, Checkbox, Flex, FormControl, FormLabel, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { RoleAccess } from '../auth/RoleAccess';
import { ResourcePreviewCardList } from './ResourcePreviewCard';

export const DomainRecommendedResources: React.FC<{
  domain: DomainDataFragment;
  resourcePreviews: ResourcePreviewDataFragment[];
  isLoading: boolean;
  isReloading: boolean;
  reloadRecommendedResources: () => void;
}> = ({ domain, resourcePreviews, isLoading, isReloading, reloadRecommendedResources }) => {
  const [showCheckedResources, setShowCheckedResources] = useState(false);

  return (
    <Flex direction="column" mb={4}>
      <Stack direction="row" isInline alignItems="center" spacing={4} mb={3} pr={3}>
        <Text fontSize="2xl">Resources</Text>
        <Box flexGrow={1} />
        <RoleAccess accessRule="loggedInUser">
          <Stack spacing={2} direction="row" ml="16px">
            <FormControl id="show_completed" display="flex" flexDir="row" alignItems="baseline" as="span">
              <FormLabel fontWeight={300}>Show completed</FormLabel>
              <Checkbox
                size="lg"
                px={1}
                id="show_completed"
                colorScheme="brand"
                isChecked={showCheckedResources}
                onChange={(e) => setShowCheckedResources(e.target.checked)}
              ></Checkbox>
            </FormControl>
          </Stack>
        </RoleAccess>
      </Stack>

      <ResourcePreviewCardList
        domainKey={domain.key}
        resourcePreviews={resourcePreviews.filter(
          (r) => !!showCheckedResources || !r.consumed || !r.consumed.consumedAt
        )}
        isLoading={isLoading}
        isReloading={isReloading}
        onResourceConsumed={() => reloadRecommendedResources()}
      />
    </Flex>
  );
};
