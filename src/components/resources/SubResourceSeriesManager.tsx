import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { last } from 'lodash';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import {
  ResourceDataFragment,
  ResourcePreviewCardDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { ResourceMiniCard } from './ResourceMiniCard';
import { ResourceSelectorModal } from './ResourceSelector';
import {
  useAddSubResourceToSeriesMutation,
  useCreateSubResourceSeriesMutation,
} from './SubResourceSeriesManager.generated';

interface StatelessSubResourceSeriesManagerProps {
  subResourceSeries?: ResourcePreviewCardDataFragment[];
  onSelect: (selectedResource: ResourceDataFragment) => void;
  editable?: boolean;
}
export const StatelessSubResourceSeriesManager: React.FC<StatelessSubResourceSeriesManagerProps> = ({
  subResourceSeries,
  onSelect,
  editable,
}) => {
  if (!editable && (!subResourceSeries || !subResourceSeries.length)) return null;
  return (
    <Flex direction="column" alignItems="stretch">
      {!subResourceSeries || !subResourceSeries.length ? (
        <Flex direction="column" alignItems="center">
          <Heading size="md">Start resource series</Heading>
          <ResourceSelectorModal
            onSelect={onSelect}
            renderTrigger={({ openModal }) => (
              <IconButton
                m={2}
                size="lg"
                isRound
                icon={<AddIcon />}
                aria-label="Add resource to series"
                onClick={() => openModal()}
              />
            )}
          />
        </Flex>
      ) : (
        <Stack direction="column" spacing={3}>
          <Heading size="lg" textAlign="center" color="gray.700">
            Parts
          </Heading>
          <Stack spacing={4}>
            {subResourceSeries.map((subResource) => (
              <ResourceMiniCard key={subResource._id} resource={subResource} />
            ))}
          </Stack>

          <Flex direction="column" alignItems="center">
            <ResourceSelectorModal
              onSelect={onSelect}
              renderTrigger={({ openModal }) => (
                <IconButton
                  m={2}
                  size="md"
                  isRound
                  icon={<AddIcon />}
                  aria-label="Add resource to series"
                  onClick={() => openModal()}
                />
              )}
            />
          </Flex>
        </Stack>
      )}
    </Flex>
  );
};

export const createSubResourceSeries = gql`
  mutation createSubResourceSeries($parentResourceId: String!, $subResourceId: String!) {
    createSubResourceSeries(parentResourceId: $parentResourceId, subResourceId: $subResourceId) {
      seriesParentResource {
        _id
        subResourceSeries {
          ...ResourceData
        }
      }
    }
  }
  ${ResourceData}
`;

export const addSubResourceToSeries = gql`
  mutation addSubResourceToSeries($parentResourceId: String!, $previousResourceId: String!, $subResourceId: String!) {
    addSubResourceToSeries(
      parentResourceId: $parentResourceId
      previousResourceId: $previousResourceId
      subResourceId: $subResourceId
    ) {
      seriesParentResource {
        _id
        subResourceSeries {
          ...ResourceData
          nextResource {
            ...ResourceData
          }
        }
      }
    }
  }
  ${ResourceData}
`;

interface SubResourceSeriesManagerProps {
  resourceId: string;
  subResourceSeries?: ResourcePreviewCardDataFragment[];
}

export const SubResourceSeriesManager: React.FC<SubResourceSeriesManagerProps> = ({
  resourceId,
  subResourceSeries,
}) => {
  const [addSubResourceToSeriesMutation] = useAddSubResourceToSeriesMutation();
  const [createSubResourceSeriesMutation] = useCreateSubResourceSeriesMutation();
  const { currentUser } = useCurrentUser();
  return (
    <StatelessSubResourceSeriesManager
      subResourceSeries={subResourceSeries}
      editable={!!currentUser}
      onSelect={(selectedResource) =>
        !subResourceSeries || subResourceSeries.length === 0
          ? createSubResourceSeriesMutation({
              variables: { parentResourceId: resourceId, subResourceId: selectedResource._id },
            })
          : addSubResourceToSeriesMutation({
              variables: {
                parentResourceId: resourceId,
                previousResourceId: (last(subResourceSeries) as ResourceDataFragment)._id,
                subResourceId: selectedResource._id,
              },
            })
      }
    />
  );
};
