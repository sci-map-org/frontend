import { Box, Text } from '@chakra-ui/core';

import { useListDomainResourcesPreviews } from '../../graphql/resources/resources.hooks';
import { ResourcePreview } from './ResourcePreview';

interface ResourceListProps {
  domainKey: string;
}

export const ResourceList: React.FC<ResourceListProps> = ({ domainKey }) => {
  const { resourcePreviews } = useListDomainResourcesPreviews(domainKey);

  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius={4} p={4} my={5} width="100%">
      {resourcePreviews &&
        resourcePreviews.map(preview => <ResourcePreview key={preview._id} resourcePreview={preview} />)}
    </Box>
  );
};
