import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { values, without } from 'lodash';
import { DependencyList, useEffect, useMemo, useRef, useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import { Option } from 'react-multi-select-component/dist/lib/interfaces';
import BeatLoader from 'react-spinners/BeatLoader';
import { useDebounce } from 'use-debounce';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  LearningMaterialType,
  ResourceType,
  TopicLearningMaterialsFilterOptions,
  TopicLearningMaterialsOptions,
  TopicLearningMaterialsSortingType,
} from '../../graphql/types';
import { theme } from '../../theme/theme';
import { LearningPathPreviewCard, LearningPathPreviewCardData } from '../learning_paths/LearningPathPreviewCard';
import { LearningPathPreviewCardDataFragment } from '../learning_paths/LearningPathPreviewCard.generated';
import { ResourceTypeBadge, resourceTypeColorMapping, resourceTypeToLabel } from '../resources/elements/ResourceType';
import { LearningMaterialPreviewCardList } from '../resources/LearningMaterialPreviewCardList';
import { ResourcePreviewCard } from '../resources/ResourcePreviewCard';

export const getTopicRecommendedLearningMaterials = gql`
  query getDomainRecommendedLearningMaterials(
    $key: String!
    $learningMaterialsOptions: TopicLearningMaterialsOptions!
  ) {
    getTopicByKey(topicKey: $key) {
      _id
      learningMaterials(options: $learningMaterialsOptions) {
        items {
          ...ResourcePreviewData
          ...LearningPathPreviewCardData
        }
      }
    }
  }
  ${ResourcePreviewData}
  ${LearningPathPreviewCardData}
`;

function getLearningMaterialFilterString(types: LearningMaterialFilterType[], maxLength = 3): string {
  if (types.length === 1)
    return getLearningMaterialFilterTypeLabel(types[0]) + (types[0][types[0].length - 1] === 's' ? '' : 's');
  if (types.length > maxLength)
    return (
      types
        .map(getLearningMaterialFilterTypeLabel)
        .map((t) => (t[t.length - 1] === 's' ? t : t + 's'))
        .slice(0, maxLength)
        .join(', ') + '...'
    );
  return types
    .map(getLearningMaterialFilterTypeLabel)
    .map((t) => (t[t.length - 1] === 's' ? t : t + 's'))
    .join(', ');
}
/**
 * TODO ? could be nice, not 100% required
 */
function getTitle(options: TopicLearningMaterialsOptions, domainName: string) {
  let s1 = '';
  let s2 = '';
  let s3 = '';
  const types = getFilterTypesFromFilterOptions(options.filter);
  switch (options.sortingType) {
    case TopicLearningMaterialsSortingType.Recommended:
      s1 = 'Recommended';
      s2 = types.length <= 3 ? getLearningMaterialFilterString(types, 2) : '';
      s3 = 'For You';
      break;
    case TopicLearningMaterialsSortingType.Rating:
      s1 = 'Best'; // 'Highest rated' | 'Best' |  'Highest Rating' | ?
      s2 = types.length ? getLearningMaterialFilterString(types) : 'Learning Resources';
      s3 = 'in ' + domainName;
      break;
    case TopicLearningMaterialsSortingType.Newest:
      s1 = 'Recently added'; // 'Newest' | 'Latest' | ?
      s2 = types.length ? getLearningMaterialFilterString(types) : 'Learning Resources';
      s3 = 'in ' + domainName;
      break;
  }
  return { s1, s2, s3 };
}
export const TopicRecommendedLearningMaterials: React.FC<{
  topic: TopicLinkDataFragment;
  learningMaterialsPreviews: (ResourcePreviewDataFragment | LearningPathPreviewCardDataFragment)[];
  isLoading: boolean;
  learningMaterialsOptions: TopicLearningMaterialsOptions;
  setLearningMaterialsOptions: (learningMaterialsOptions: TopicLearningMaterialsOptions) => void;
  reloadRecommendedResources: () => void;
}> = ({
  topic,
  learningMaterialsPreviews,
  isLoading,
  reloadRecommendedResources,
  learningMaterialsOptions,
  setLearningMaterialsOptions,
}) => {
  const { s1, s2, s3 } = useMemo(() => getTitle(learningMaterialsOptions, topic.name), [
    topic,
    learningMaterialsOptions.sortingType,
    learningMaterialsOptions.filter,
  ]);
  return (
    <Flex direction="column" w="100%" borderTopRadius={2}>
      <Flex direction="column" alignItems="stretch" pl={3} bgColor="teal.600" color="white" borderTopRadius="inherit">
        <Flex direction="row" alignItems="baseline" pt={1}>
          <Text fontSize="2xl" fontWeight={500}>
            {s1 + ' '}
            {/* <Text fontSize="2xl" as="span" {...(s2 !== 'Learning Resources' && { color: 'blue.800' })}> */}
            {s2}
            {/* </Text> */}
            {' ' + s3}
          </Text>
          <Box pl={3}></Box>
        </Flex>
        <Flex
          pt={4}
          direction={{ base: 'column', md: 'row' }}
          pb={3}
          justifyContent={{ base: 'flex-start', md: 'space-between' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 2, md: 8 }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <SearchResourcesInput
              onChange={(value) =>
                setLearningMaterialsOptions({ ...learningMaterialsOptions, query: value || undefined })
              }
            />
            <LearningMaterialTypeFilter
              filterOptions={learningMaterialsOptions.filter}
              setFilterOptions={(filterOptions) =>
                setLearningMaterialsOptions({
                  ...learningMaterialsOptions,
                  filter: filterOptions,
                })
              }
            />
          </Stack>
          <Box py={1}>
            <FormControl id="sort_by" display="flex" flexDir="row" alignItems="center" px={3}>
              <FormLabel mb={0} fontWeight={600} flexShrink={0}>
                Sort by:
              </FormLabel>
              <Select
                size="sm"
                fontWeight={500}
                variant="outline"
                borderColor="white"
                _focus={{}}
                bgColor="teal.600"
                colorScheme="whiteAlpha"
                onChange={(e) =>
                  setLearningMaterialsOptions({
                    ...learningMaterialsOptions,
                    sortingType: e.target.value as TopicLearningMaterialsSortingType,
                  })
                }
                value={learningMaterialsOptions.sortingType}
              >
                <option value={TopicLearningMaterialsSortingType.Recommended}>Most Relevant</option>
                <option value={TopicLearningMaterialsSortingType.Rating}>Highest Rating</option>
                <option value={TopicLearningMaterialsSortingType.Newest}>Newest First</option>
              </Select>
            </FormControl>
          </Box>
        </Flex>
      </Flex>
      <LearningMaterialPreviewCardList
        learningMaterialsPreviewItems={learningMaterialsPreviews.map((learningMaterial) => ({ learningMaterial }))}
        isLoading={isLoading}
        loadingMessage="Finding the most adapted learning resources..."
        renderCard={({ learningMaterial }, idx) => {
          if (learningMaterial.__typename === 'Resource')
            return (
              <ResourcePreviewCard
                key={learningMaterial._id}
                domainKey={domain.key}
                resource={learningMaterial}
                onResourceConsumed={() => reloadRecommendedResources()}
                showCompletedNotificationToast={true}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
          if (learningMaterial.__typename === 'LearningPath')
            return (
              <LearningPathPreviewCard
                learningPath={learningMaterial}
                key={learningMaterial._id}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
        }}
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

export const SearchResourcesInput: React.FC<{
  onChange: (value: string) => void;
  debounceDuration?: number;
  minQueryLength?: number;
}> = ({ onChange, debounceDuration = 250, minQueryLength = 3 }) => {
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, debounceDuration);

  const shouldSearch = (newValue: string): boolean => {
    return newValue.length >= minQueryLength || !newValue;
  };

  useDidUpdateEffect(() => {
    if (shouldSearch(value)) {
      onChange(value);
    }
  }, [value]);
  return (
    <InputGroup w="14rem" size="sm">
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
      <Input
        variant="outline"
        placeholder="Search..."
        value={query}
        color="gray.500"
        onChange={(e) => setQuery(e.target.value)}
        borderRadius={20}
        borderColor="white"
        borderWidth={1}
        bgColor="white"
        _focus={{}}
      />
      {value !== query && shouldSearch(query) && (
        <InputRightElement w="auto" px={2}>
          <BeatLoader size={7} color={theme.colors.main} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

type LearningMaterialFilterType = ResourceType | typeof LearningMaterialType.LearningPath;

function getLearningMaterialFilterTypeLabel(type: LearningMaterialFilterType): string {
  return type === LearningMaterialType.LearningPath ? 'Learning Path' : resourceTypeToLabel(type);
}

const learningMaterialTypeToOption = (type: LearningMaterialFilterType) => ({
  value: type,
  label: getLearningMaterialFilterTypeLabel(type),
});

const optionsValues: LearningMaterialFilterType[] = [LearningMaterialType.LearningPath, ...values(ResourceType)];

const options = optionsValues.map(learningMaterialTypeToOption);

const learningMaterialFilterTypeColorMapping: { [key in LearningMaterialFilterType]: string } = {
  ...resourceTypeColorMapping,
  [LearningMaterialType.LearningPath]: 'teal',
};

function getFilterTypesFromFilterOptions(
  filterOptions: TopicLearningMaterialsFilterOptions
): LearningMaterialFilterType[] {
  const containsLearningPath =
    (!filterOptions.learningMaterialTypeIn && filterOptions.resourceTypeIn) ||
    (filterOptions.learningMaterialTypeIn &&
      filterOptions.learningMaterialTypeIn.indexOf(LearningMaterialType.LearningPath) > -1);
  const types: LearningMaterialFilterType[] = [];
  if (containsLearningPath) types.push(LearningMaterialType.LearningPath);
  if (filterOptions.resourceTypeIn) types.push(...filterOptions.resourceTypeIn);

  return types;
}

function getFilterOptionsFromFilterTypes(
  filterTypes: LearningMaterialFilterType[]
): Pick<TopicLearningMaterialsFilterOptions, 'learningMaterialTypeIn' | 'resourceTypeIn'> {
  if (!filterTypes.length)
    return {
      learningMaterialTypeIn: undefined,
      resourceTypeIn: undefined,
    };
  if (filterTypes.length === 1 && filterTypes[0] === LearningMaterialType.LearningPath) {
    return {
      learningMaterialTypeIn: [LearningMaterialType.LearningPath],
      resourceTypeIn: [],
    };
  }

  const resourceTypes = filterTypes.filter((value) => value !== LearningMaterialType.LearningPath) as ResourceType[];
  const containsLearningPath = filterTypes.indexOf(LearningMaterialType.LearningPath) > -1;
  if (!containsLearningPath) {
    return {
      learningMaterialTypeIn: [LearningMaterialType.Resource],
      resourceTypeIn: resourceTypes,
    };
  }
  return {
    learningMaterialTypeIn: undefined,
    resourceTypeIn: resourceTypes,
  };
}
const LearningMaterialTypeFilter: React.FC<{
  filterOptions: TopicLearningMaterialsFilterOptions;
  setFilterOptions: (filterOptions: TopicLearningMaterialsFilterOptions) => void;
}> = ({ filterOptions, setFilterOptions }) => {
  const selectedTypes = useMemo<LearningMaterialFilterType[]>(() => {
    return getFilterTypesFromFilterOptions(filterOptions);
  }, [filterOptions]);

  const onChange = (values: LearningMaterialFilterType[]) => {
    return setFilterOptions({
      ...filterOptions,
      ...getFilterOptionsFromFilterTypes(values),
    });
  };
  return (
    <Box w="14rem" fontSize="sm">
      <MultiSelect
        options={options}
        className="domain_lm_type_multiselect"
        value={(selectedTypes || []).map(learningMaterialTypeToOption)}
        onChange={(selectedOptions: { value: LearningMaterialFilterType }[]) =>
          onChange(selectedOptions.map((o) => o.value))
        }
        labelledBy={'Filter by type'}
        valueRenderer={(selectedOptions) => (<ValueRenderer selected={selectedOptions} onChange={onChange} />) as any}
        ItemRenderer={ItemRenderer}
        hasSelectAll={false}
      />
    </Box>
  );
};

const ValueRenderer: React.FC<{
  selected: Option[];
  onChange: (selectedTypes: LearningMaterialFilterType[]) => void;
}> = ({ selected, onChange }) => {
  return selected.length ? (
    <Stack spacing={2} direction="row">
      {selected.map(({ value, label }) => (
        <Tag
          size="md"
          key={value}
          variant="subtle"
          colorScheme={learningMaterialFilterTypeColorMapping[value as LearningMaterialFilterType]}
        >
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
      {option.value !== LearningMaterialType.LearningPath ? (
        <ResourceTypeBadge type={option.value as ResourceType} />
      ) : (
        <Badge colorScheme="teal">Learning Path</Badge>
      )}
    </Stack>
  );
};
