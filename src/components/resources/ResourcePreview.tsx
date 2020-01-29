import { Box, Link, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';

interface ResourcePreviewProps {
  resourcePreview: ResourcePreviewDataFragment;
}
export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resourcePreview }) => {
  return (
    <Box p={2} display="flex">
      <Box>
        <NextLink href={`/resources/${resourcePreview._id}`}>
          <Link>{resourcePreview.name}</Link>
        </NextLink>
      </Box>
      <Box flexGrow={1}></Box>
      <Text fontWeight={600}>{resourcePreview.type}</Text>
    </Box>
  );
};
