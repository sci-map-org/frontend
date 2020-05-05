import { Box, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';

interface ResourcePreviewProps {
  resourcePreview: ResourcePreviewDataFragment;
}
export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resourcePreview }) => {
  return (
    <Box p={2} display="flex">
      <Box>
        <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resourcePreview._id}`}>
          {resourcePreview.name}
        </InternalLink>
      </Box>
      <Box flexGrow={1}></Box>
      <Text fontWeight={600}>{resourcePreview.type}</Text>
    </Box>
  );
};
