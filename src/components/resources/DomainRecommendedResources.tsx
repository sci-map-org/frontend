import { Box, Checkbox, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { DependencyList, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce/lib';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainResourcesOptions } from '../../graphql/types';
import { RoleAccess } from '../auth/RoleAccess';
import { ResourcePreviewCardList } from './ResourcePreviewCard';

export const getDomainRecommendedResources = gql`
  query getDomainRecommendedResources($key: String!, $resourcesOptions: DomainResourcesOptions!) {
    getDomainByKey(key: $key) {
      _id
      resources(options: $resourcesOptions) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ResourcePreviewData}
`;

export const DomainRecommendedResources: React.FC<{
  domainKey: string;
  resourcePreviews: ResourcePreviewDataFragment[];
  isLoading: boolean;
  resourcesOptions: DomainResourcesOptions;
  setResourcesOptions: (resourceOptions: DomainResourcesOptions) => void;
  reloadRecommendedResources: () => void;
}> = ({
  domainKey,
  resourcePreviews,
  isLoading,
  reloadRecommendedResources,
  resourcesOptions,
  setResourcesOptions,
}) => {
  // const [showCheckedResources, setShowCheckedResources] = useState(false);

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
                isChecked={resourcesOptions.filter?.consumedByUser || false}
                onChange={(e) =>
                  setResourcesOptions({
                    ...resourcesOptions,
                    filter: { ...resourcesOptions.filter, consumedByUser: e.target.checked },
                  })
                }
              ></Checkbox>
            </FormControl>
          </Stack>
        </RoleAccess>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <SearchResourcesInput
          onChange={(value) => setResourcesOptions({ ...resourcesOptions, query: value || undefined })}
        />
      </Stack>
      <ResourcePreviewCardList
        domainKey={domainKey}
        resourcePreviews={resourcePreviews}
        isLoading={isLoading}
        isReloading={isLoading}
        onResourceConsumed={() => reloadRecommendedResources()}
      />
    </Flex>
  );
};

function useDidUpdateEffect(fn: () => void, inputs: DependencyList) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}

export const SearchResourcesInput: React.FC<{ onChange: (value: string) => void; debounceDuration?: number }> = ({
  onChange,
  debounceDuration = 150,
}) => {
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, debounceDuration);
  useDidUpdateEffect(() => {
    onChange(value);
  }, [value]);
  return <Input w="16rem" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />;
};
