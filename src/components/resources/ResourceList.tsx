import { Box } from '@chakra-ui/core';
import gql from 'graphql-tag';

import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { useListDomainResourcePreviewsQuery } from './ResourceList.generated';
import { ResourcePreview } from './ResourcePreview';
import { DomainResourcesSortingType, SortingDirection } from '../../graphql/types';

export const listDomainResourcePreviews = gql`
  query listDomainResourcePreviews($domainKey: String!, $options: DomainResourcesOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      name
      resources(options: $options) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ResourcePreviewData}
`;

interface ResourceListProps {
  domainKey: string;
}

export const ResourceList: React.FC<ResourceListProps> = ({ domainKey }) => {
  const { data } = useListDomainResourcePreviewsQuery({
    variables: {
      domainKey,
      options: {
        pagination: {},
        sorting: { type: DomainResourcesSortingType.CreationDate, direction: SortingDirection.Desc },
      },
    },
  });

  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius={4} p={4} width="100%">
      {data?.getDomainByKey.resources?.items &&
        data?.getDomainByKey.resources?.items.map((preview) => (
          <ResourcePreview key={preview._id} resourcePreview={preview} />
        ))}
    </Box>
  );
};
