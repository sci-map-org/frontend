import { NetworkStatus } from '@apollo/client';
import { Box, Checkbox, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { DependencyList, useEffect, useRef, useState } from 'react';
import { atomFamily, useRecoilState, useRecoilValue } from 'recoil';
import { useDebounce, useDebouncedCallback } from 'use-debounce/lib';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainResourcesOptions, DomainResourcesSortingType } from '../../graphql/types';
import { RoleAccess } from '../auth/RoleAccess';
import {
  useGetDomainRecommendedResourcesLazyQuery,
  useGetDomainRecommendedResourcesQuery,
} from './DomainRecommendedResources.generated';
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

export const DomainPageResourcesOptionsState = atomFamily<DomainResourcesOptions, string>({
  key: 'DomainPageResourcesOptions',
  default: () => ({
    sortingType: DomainResourcesSortingType.Recommended,
  }),
});

export const useDomainRecommendedResources = (domainKey: string) => {
  const resourcesOptions = useRecoilValue(DomainPageResourcesOptionsState(domainKey));
  const { data, loading, error, refetch, networkStatus } = useGetDomainRecommendedResourcesQuery({
    variables: { key: domainKey, resourcesOptions },
    notifyOnNetworkStatusChange: true,
  });
  console.log('status: ' + networkStatus);
  const reload = () => {
    console.log('reload');
    refetch({ key: domainKey, resourcesOptions });
  };
  return {
    resources: data?.getDomainByKey.resources?.items || [],
    loading: [NetworkStatus.loading, NetworkStatus.refetch, NetworkStatus.setVariables].indexOf(networkStatus) > 1,
    error,
    reload,
  };
};
export const DomainRecommendedResources: React.FC<{
  domainKey: string;
  // resourcePreviews: ResourcePreviewDataFragment[];
  // isLoading: boolean;
  // isReloading: boolean;
  // reloadRecommendedResources: (resourceOptions?: DomainResourcesOptions) => void;
  // initialResourcesOptions: DomainResourcesOptions;
  // setResourcesOptions: (options: DomainResourcesOptions) => void;
}> = ({
  domainKey,
  // resourcePreviews,
  // isLoading,
  // isReloading,
  // reloadRecommendedResources,
  // initialResourcesOptions,
  // setResourcesOptions,
}) => {
  const [showCheckedResources, setShowCheckedResources] = useState(false);
  // const [query, setQuery] = useState('');
  const [resourcesOptions, setResourcesOptions] = useRecoilState(DomainPageResourcesOptionsState(domainKey));
  const { resources: resourcePreviews, loading, reload } = useDomainRecommendedResources(domainKey);
  // useEffect(() => {});
  console.log('loading: ' + loading);
  // const [
  //   getDomainRecommendedResourcesLazyQuery,
  //   { data, error, loading, networkStatus },
  // ] = useGetDomainRecommendedResourcesLazyQuery({
  //   variables: { key: domain.key, resourcesOptions },
  //   // partialRefetch: true,
  //   // fetchPolicy: 'cache-first',
  // });

  // const resourcePreviews = data?.getDomainByKey.resources?.items || initialResourcePreviews;
  console.log(resourcePreviews);
  // console.log(networkStatus);
  console.log('rerendering domain recommended resources');
  // useEffect(() => {
  //   reloadRecommendedResources(resourcesOptions);
  // getDomainRecommendedResourcesLazyQuery({ key: domain.key, resourcesOptions });

  // setReloading(false);
  // }, [resourcesOptions]);
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
      <Stack direction="row" spacing={1} alignItems="center">
        <SearchResourcesInput
          // value={resourcesOptions.query || ''}
          onChange={(value) => setResourcesOptions({ ...resourcesOptions, query: value || undefined })}
        />
      </Stack>
      <ResourcePreviewCardList
        domainKey={domainKey}
        resourcePreviews={resourcePreviews.filter(
          (r) => !!showCheckedResources || !r.consumed || !r.consumed.consumedAt
        )}
        isLoading={false}
        isReloading={loading}
        // isReloading={networkStatus === NetworkStatus.setVariables || networkStatus === NetworkStatus.loading}
        onResourceConsumed={() => reload()}
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
  debounceDuration = 500,
}) => {
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, debounceDuration);
  console.log('rerendering search input');
  useDidUpdateEffect(() => {
    onChange(value);
    console.log('changed ' + value);
  }, [value]);
  // useEffect(() => {
  //   onChange(value);
  //   console.log('changed ' + value);
  // }, [value]);
  // const [debouncedCallback] = useDebouncedCallback(
  //   // function
  //   (queryValue: string) => {
  //     onChange(queryValue);
  //   },
  //   // delay in ms
  //   1000
  // );
  return <Input w="16rem" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />;
};
