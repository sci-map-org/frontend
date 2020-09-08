import { Badge, BadgeProps, FormControl, FormLabel, Select } from '@chakra-ui/core';
import { upperFirst, values } from 'lodash';
import { ResourceMediaType } from '../../graphql/types';

export const ResourceMediaTypeBadge: React.FC<BadgeProps & { mediaType: ResourceMediaType }> = ({
  mediaType,
  ...badgeProps
}) => {
  return (
    <Badge variant="outline" color="green.800" fontSize="0.8em" {...badgeProps}>
      {mediaType.split('_').join(' ')}
    </Badge>
  );
};

export const ResourceMediaTypeSelector: React.FC<{
  value: ResourceMediaType;
  onSelect: (mediaType: ResourceMediaType) => void;
}> = ({ onSelect, value }) => {
  return (
    <FormControl display="flex" flexDirection="row" alignItems="baseline" isRequired isInvalid={!value}>
      <FormLabel htmlFor="media_type" whiteSpace="nowrap">
        Media Type
      </FormLabel>
      <Select
        id="media_type"
        placeholder="Select Media Type"
        value={value}
        flexBasis="200px"
        flexGrow={0}
        onChange={(e) => onSelect(e.target.value as ResourceMediaType)}
      >
        {values(ResourceMediaType).map((mediaType) => (
          <option key={mediaType} value={mediaType}>
            {mediaType.split('_').map(upperFirst).join(' ')}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
