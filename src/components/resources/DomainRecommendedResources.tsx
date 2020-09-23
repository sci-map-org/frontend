import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/core';
import { AddIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { values, without } from 'lodash';
import { DependencyList, useEffect, useRef, useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import { Option } from 'react-multi-select-component/dist/lib/interfaces';
import { useDebounce } from 'use-debounce/lib';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainResourcesOptions, ResourceType } from '../../graphql/types';
import { RoleAccess } from '../auth/RoleAccess';
import { ResourcePreviewCardList } from './ResourcePreviewCard';
import { ResourceTypeBadge, resourceTypeColorMapping, resourceTypeToLabel } from './ResourceType';

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
      <Stack direction="row" spacing={8} alignItems="center">
        <SearchResourcesInput
          onChange={(value) => setResourcesOptions({ ...resourcesOptions, query: value || undefined })}
        />
        <ResourceTypeFilter
          selectedTypes={resourcesOptions.filter?.resourceTypeIn || []}
          onChange={(selectedTypes) =>
            setResourcesOptions({
              ...resourcesOptions,
              filter: { ...resourcesOptions.filter, resourceTypeIn: selectedTypes.length ? selectedTypes : null },
            })
          }
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

const resourceTypetoOption = (type: ResourceType) => ({
  value: type,
  label: resourceTypeToLabel(type),
});

const options = values(ResourceType).map(resourceTypetoOption);

const ResourceTypeFilter: React.FC<{
  selectedTypes?: ResourceType[];
  onChange: (selectedTypes: ResourceType[]) => void;
}> = ({ selectedTypes, onChange }) => {
  return (
    <Stack direction="row" alignItems="baseline">
      <Box w="18rem">
        <MultiSelect
          options={options}
          value={(selectedTypes || []).map(resourceTypetoOption)}
          onChange={(selectedOptions: { value: ResourceType }[]) => onChange(selectedOptions.map((o) => o.value))}
          labelledBy={'Filter by type'}
          valueRenderer={(selectedOptions) => (<ValueRenderer selected={selectedOptions} onChange={onChange} />) as any}
          ItemRenderer={ItemRenderer}
          hasSelectAll={false}
        />
      </Box>
      {[ResourceType.Podcast, ResourceType.Course, ResourceType.Book]
        .filter((defaultTypeFilter) => !selectedTypes || selectedTypes.indexOf(defaultTypeFilter) === -1)
        .map((defaultTypeFilter) => (
          <Button
            key={defaultTypeFilter}
            size="xs"
            variant="outline"
            colorScheme={resourceTypeColorMapping[defaultTypeFilter]}
            leftIcon={<AddIcon />}
            onClick={() => onChange([...(selectedTypes || []), defaultTypeFilter])}
          >
            {resourceTypeToLabel(defaultTypeFilter)}
          </Button>
        ))}
    </Stack>
  );
};

const ValueRenderer: React.FC<{
  selected: Option[];
  onChange: (selectedTypes: ResourceType[]) => void;
}> = ({ selected, onChange }) => {
  return selected.length ? (
    <Stack spacing={2} direction="row">
      {selected.map(({ value, label }) => (
        <Tag size="md" variant="subtle" colorScheme={resourceTypeColorMapping[value as ResourceType]}>
          <TagLabel>{label}</TagLabel>
          <TagCloseButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(
                without(
                  selected.map((s) => s.value),
                  value
                )
              );
            }}
          />
        </Tag>
      ))}
    </Stack>
  ) : (
    <Text as="span">Filter by type...</Text>
  );
};

const ItemRenderer = ({
  checked,
  option,
  onClick,
  disabled,
}: {
  checked: boolean;
  option: Option;
  disabled?: boolean;
  onClick: any;
}) => {
  return (
    <Stack spacing={4} direction="row" alignItems="center">
      <Checkbox onChange={onClick} isChecked={checked} isDisabled={disabled} />
      <ResourceTypeBadge type={option.value as ResourceType} />
    </Stack>
  );
};
