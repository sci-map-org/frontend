import { Badge, BadgeProps } from '@chakra-ui/core';
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
