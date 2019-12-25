import { ResourcePreviewFragment } from '../../graphql/resources/resources.generated';
import { Box, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

interface ResourcePreviewProps {
  resourcePreview: ResourcePreviewFragment;
}
export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resourcePreview }) => {
  return (
    <Box py={2}>
      <NextLink href={`/resources/${resourcePreview._id}`}>
        <Link>{resourcePreview.name}</Link>
      </NextLink>
    </Box>
  );
};
