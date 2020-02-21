import { Icon, Link } from '@chakra-ui/core';
import gql from 'graphql-tag';

import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { toUrlPreview } from '../../services/url.service';
import { useSetResourceOpenedMutation } from './ResourceUrl.generated';

export const setResourceOpened = gql`
  mutation setResourceOpened($resourceId: String!) {
    setResourcesConsumed(payload: { resources: [{ resourceId: $resourceId, opened: true }] }) {
      _id
      consumed {
        openedAt
      }
    }
  }
`;

export const ResourceUrlLink: React.FC<{
  resource: Pick<ResourcePreviewDataFragment, '_id' | 'consumed' | 'url'>;
}> = ({ resource }) => {
  const [setResourceOpened] = useSetResourceOpenedMutation({ variables: { resourceId: resource._id } });
  return (
    <Link
      fontSize="sm"
      color={resource.consumed && resource.consumed.openedAt ? 'blue.400' : 'blue.700'}
      href={resource.url}
      onClick={() => {
        if (!resource.consumed || !resource.consumed.openedAt) {
          setResourceOpened();
        }
      }}
      isExternal
    >
      {toUrlPreview(resource.url)}
      <Icon name="external-link" mx="2px" />
    </Link>
  );
};
