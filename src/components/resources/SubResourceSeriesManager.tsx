import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { last } from 'lodash';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import {
  ResourceDataFragment,
  ResourcePreviewDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { StarsRatingViewer } from '../lib/StarsRating';
import { InternalLink } from '../navigation/InternalLink';
import { DurationViewer } from './elements/Duration';
import { ResourceTypeIcon } from './elements/ResourceType';
import { ResourceListBasicLayout } from './ResourceList';
import { ResourceSelectorModal } from './ResourceSelector';
import {
  useAddSubResourceToSeriesMutation,
  useCreateSubResourceSeriesMutation,
} from './SubResourceSeriesManager.generated';

interface StatelessSubResourceSeriesManagerProps {
  subResourceSeries?: ResourcePreviewDataFragment[];
  onSelect: (selectedResource: ResourceDataFragment) => void;
  domains?: DomainDataFragment[];
  editable?: boolean;
}
export const StatelessSubResourceSeriesManager: React.FC<StatelessSubResourceSeriesManagerProps> = ({
  subResourceSeries,
  onSelect,
  domains,
  editable,
}) => {
  if (!editable && (!subResourceSeries || !subResourceSeries.length)) return null;
  return (
    <Flex direction="column" alignItems="stretch">
      {!subResourceSeries || !subResourceSeries.length ? (
        <Flex direction="column" alignItems="center">
          <Heading size="md">Start resource series</Heading>
          <ResourceSelectorModal
            defaultAttachedDomains={domains}
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
          <Heading size="sm" textAlign="center">
            Parts
          </Heading>
          <ResourceListBasicLayout
            resources={subResourceSeries}
            renderTop={(resource) => (
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <ResourceTypeIcon resourceType={resource.type} boxSize={5} />
                  <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resource._id}`}>
                    {resource.name}
                  </InternalLink>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <StarsRatingViewer value={resource.rating} pxSize={14} />

                    <DurationViewer value={resource.durationSeconds} />
                  </Stack>
                </Stack>
              </Stack>
            )}
          />
          <Flex direction="column" alignItems="center">
            <ResourceSelectorModal
              defaultAttachedDomains={domains}
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
  subResourceSeries?: ResourcePreviewDataFragment[];
  domains?: DomainDataFragment[];
}

export const SubResourceSeriesManager: React.FC<SubResourceSeriesManagerProps> = ({
  resourceId,
  domains,
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
