import { Box, Flex, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceTypeBadge } from './elements/ResourceType';

interface ResourceListProps {
  resources: ResourceDataFragment[];
  renderRightItem?: (resource: ResourceDataFragment) => ReactElement;
}

export const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  return (
    <Flex direction="column" alignItems="stretch" borderWidth="1px 1px 0px 1px" borderColor="gray.200" width="100%">
      {resources.map((resource) => (
        <ResourceListItem key={resource._id} resource={resource} />
      ))}
    </Flex>
  );
};

interface ResourceListItemProps {
  resource: ResourceDataFragment;
  renderRight?: (resource: ResourceDataFragment) => ReactElement;
}
export const ResourceListItem: React.FC<ResourceListItemProps> = ({ resource, renderRight }) => {
  return (
    <Flex p={2} direction="row" borderBottomWidth="1px" borderColor="gray.200">
      <Stack direction="row" alignItems="center" spacing={2}>
        <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resource._id}`}>
          {resource.name}
        </InternalLink>
        <ResourceTypeBadge type={resource.type} />
      </Stack>
      <Box flexGrow={1}></Box>
      {renderRight && <Box>{renderRight(resource)}</Box>}
    </Flex>
  );
};
