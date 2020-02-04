import { ResourceType, Resource } from '../../graphql/types';
import { Badge, BadgeProps } from '@chakra-ui/core';

const colorMapping: { [key in ResourceType]: string } = {
  [ResourceType.Article]: 'green',
  [ResourceType.Course]: 'red',
  [ResourceType.Introduction]: 'blue',
  [ResourceType.Tutorial]: 'orange',
};

export const ResourceTypeBadge: React.FC<BadgeProps & { type: ResourceType }> = ({ type, ...badgeProps }) => {
  return (
    <Badge variantColor={colorMapping[type]} fontSize="0.8em" {...badgeProps}>
      {type}
    </Badge>
  );
};
