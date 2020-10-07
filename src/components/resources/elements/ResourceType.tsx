import { Badge, BadgeProps, FormControl, FormLabel, Select } from '@chakra-ui/core';
import { upperFirst, values } from 'lodash';
import { ResourceType } from '../../../graphql/types';

export const resourceTypeColorMapping: { [key in ResourceType]: string } = {
  [ResourceType.Article]: 'green',
  [ResourceType.ArticleSeries]: 'green',
  [ResourceType.Course]: 'red',
  [ResourceType.Podcast]: 'yellow',
  [ResourceType.PodcastSeries]: 'yellow',
  [ResourceType.Other]: 'gray',
  [ResourceType.Book]: 'red',
  [ResourceType.Documentary]: 'blue',
  [ResourceType.Tweet]: 'blue',
  [ResourceType.Talk]: 'orange',
  [ResourceType.Infographic]: 'yellow',
  [ResourceType.Website]: 'blue',
  [ResourceType.YoutubeVideo]: 'red',
  [ResourceType.YoutubeVideoSeries]: 'red',
  [ResourceType.VideoGame]: 'yellow',
};

export const resourceTypeToLabel = (type: ResourceType) => type.split('_').map(upperFirst).join(' ');

export const ResourceTypeBadge: React.FC<BadgeProps & { type: ResourceType }> = ({ type, ...badgeProps }) => {
  return (
    <Badge colorScheme={resourceTypeColorMapping[type]} fontSize="0.8em" {...badgeProps}>
      {resourceTypeToLabel(type)}
    </Badge>
  );
};

export const ResourceTypeSelector: React.FC<{ value: ResourceType; onSelect: (type: ResourceType) => void }> = ({
  onSelect,
  value,
}) => {
  return (
    <FormControl display="flex" flexDirection="row" alignItems="baseline" isRequired isInvalid={!value}>
      <FormLabel htmlFor="type">Type</FormLabel>
      <Select
        id="type"
        placeholder="Select Type"
        value={value}
        flexBasis="200px"
        onChange={(e) => onSelect(e.target.value as ResourceType)}
      >
        {values(ResourceType).map((type) => (
          <option key={type} value={type}>
            {resourceTypeToLabel(type)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
