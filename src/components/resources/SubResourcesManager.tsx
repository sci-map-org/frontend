import { Heading, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { SquareResourceCardDataFragment } from './SquareResourceCard.generated';
import { SquareResourceCardWrapper } from './SquareResourceCardsWrapper';
import { useAddSubResourceMutation } from './SubResourcesManager.generated';

interface StatelessSubResourcesManagerProps {
  subResources: SquareResourceCardDataFragment[];
  domains?: DomainDataFragment[];
  addSubResource?: (subResource: ResourceDataFragment) => void;
  removeSubResource?: (subResource: SquareResourceCardDataFragment) => void;
  editable?: boolean;
  isLoading?: boolean;
}

export const StatelessSubResourcesManager: React.FC<StatelessSubResourcesManagerProps> = ({
  subResources,
  domains,
  addSubResource,
  removeSubResource,
  editable,
  isLoading,
}) => {
  return (
    <Stack direction="column" spacing={3}>
      <Heading size="md" textAlign="center">
        Sub Resources
      </Heading>
      <SquareResourceCardWrapper
        resources={subResources}
        onRemove={removeSubResource}
        onAdd={addSubResource}
        defaultAttachedDomains={domains}
        editable={editable}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export const addSubResource = gql`
  mutation addSubResource($parentResourceId: String!, $subResourceId: String!) {
    addSubResource(parentResourceId: $parentResourceId, subResourceId: $subResourceId) {
      parentResource {
        ...ResourceData
        subResources {
          _id
        }
      }
      subResource {
        ...ResourceData
        parentResources {
          _id
        }
      }
    }
  }
  ${ResourceData}
`;

interface ResourceSubResourcesManagerProps {
  resourceId: string;
  subResources: SquareResourceCardDataFragment[];
  domains?: DomainDataFragment[];
}

export const ResourceSubResourcesManager: React.FC<ResourceSubResourcesManagerProps> = ({
  resourceId,
  subResources,
  domains,
}) => {
  const [addSubResource] = useAddSubResourceMutation();
  const { currentUser } = useCurrentUser();
  return (
    <StatelessSubResourcesManager
      subResources={subResources}
      addSubResource={(subResource) =>
        addSubResource({ variables: { subResourceId: subResource._id, parentResourceId: resourceId } })
      }
      domains={domains}
      editable={!!currentUser}
    />
  );
};
