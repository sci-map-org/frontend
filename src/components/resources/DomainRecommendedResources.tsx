import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Switch,
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
import BeatLoader from 'react-spinners/BeatLoader';
import { useDebounce } from 'use-debounce/lib';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { DomainResourcesOptions, DomainResourcesSortingType, ResourceType } from '../../graphql/types';
import { theme } from '../../theme/theme';
import { RoleAccess } from '../auth/RoleAccess';
import { ResourcePreviewCardList } from './ResourcePreviewCard';
import { ResourceTypeBadge, resourceTypeColorMapping, resourceTypeToLabel } from './elements/ResourceType';

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
      <Flex direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="2xl">Resources</Text>
        <Box pr={3}>
          <FormControl id="sort_by" display="flex" flexDir="row" alignItems="center">
            <FormLabel mb={0} fontWeight={300}>
              Sort by:
            </FormLabel>
            <Select
              w="8rem"
              size="sm"
              variant="flushed"
              onChange={(e) =>
                setResourcesOptions({ ...resourcesOptions, sortingType: e.target.value as DomainResourcesSortingType })
              }
              value={resourcesOptions.sortingType}
            >
              <option value={DomainResourcesSortingType.Recommended}>Most Relevant</option>
              <option value={DomainResourcesSortingType.Newest}>Newest First</option>
            </Select>
          </FormControl>
        </Box>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        mb={3}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 2, md: 8 }}
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
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
        <RoleAccess accessRule="loggedInUser">
          <Box mr={{ base: '0px', md: '30px' }} mt={{ base: 2, md: 0 }}>
            <FormControl id="show_completed" display="flex" flexDir="row" alignItems="center">
              <FormLabel mb={0} fontWeight={300}>
                Show completed
              </FormLabel>
              <Switch
                colorScheme="brand"
                onChange={(e) =>
                  setResourcesOptions({
                    ...resourcesOptions,
                    filter: { ...resourcesOptions.filter, consumedByUser: e.target.checked },
                  })
                }
              />
            </FormControl>
          </Box>
        </RoleAccess>
      </Flex>
      <ResourcePreviewCardList
        domainKey={domainKey}
        resourcePreviews={resourcePreviews}
        isLoading={isLoading}
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
  debounceDuration = 250,
}) => {
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, debounceDuration);
  useDidUpdateEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <InputGroup>
      <Input
        w="16rem"
        variant="outline"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {value !== query && (
        <InputRightElement w="68px" display="flex" alignItems="center" justifyContent="center">
          <BeatLoader size={8} margin={2} color={theme.colors.main} />
        </InputRightElement>
      )}
    </InputGroup>
  );
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
      <Box w="16rem">
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
        <Tag size="md" key={value} variant="subtle" colorScheme={resourceTypeColorMapping[value as ResourceType]}>
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
    <Text textColor="gray.400">Filter by type...</Text>
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
