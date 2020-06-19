import { Badge, BadgeProps, FormControl, FormLabel, Select } from '@chakra-ui/core';
import { upperFirst, values } from 'lodash';
import { ResourceMediaType } from '../../graphql/types';

export const ResourceMediaTypeBadge: React.FC<BadgeProps & { mediaType: ResourceMediaType }> = ({
  mediaType,
  ...badgeProps
}) => {
  return (
    <Badge variant="outline" color="green.800" fontSize="0.8em" {...badgeProps}>
      {mediaType}
    </Badge>
  );
};

export const ResourceMediaTypeSelector: React.FC<{
  value: ResourceMediaType;
  onSelect: (mediaType: ResourceMediaType) => void;
}> = ({ onSelect, value }) => {
  return (
    <FormControl display="flex" flexDirection="row" alignItems="baseline" isRequired isInvalid={!value}>
      <FormLabel htmlFor="type" whiteSpace="nowrap">
        Media Type
      </FormLabel>
      <Select
        placeholder="Select Media Type"
        value={value}
        onChange={(e) => onSelect(e.target.value as ResourceMediaType)}
      >
        {values(ResourceMediaType).map((mediaType) => (
          <option key={mediaType} value={mediaType}>
            {upperFirst(mediaType)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
