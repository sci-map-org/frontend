import { Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { last } from 'lodash';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import {
  ResourceDataFragment,
  ResourcePreviewDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { ResourceList, ResourceListBasicLayout } from './ResourceList';
import { ResourceSelectorModal } from './ResourceSelector';
import {
  useAddSubResourceToSeriesMutation,
  useCreateSubResourceSeriesMutation,
} from './SubResourceSeriesManager.generated';
import { DurationViewer } from './elements/Duration';
import { ResourceTypeBadge } from './elements/ResourceType';
import { InternalLink } from '../navigation/InternalLink';

interface StatelessSubResourceSeriesManagerProps {
  subResourceSeries?: ResourcePreviewDataFragment[];
  onSelect: (selectedResource: ResourceDataFragment) => void;
  domains?: DomainDataFragment[];
}
export const StatelessSubResourceSeriesManager: React.FC<StatelessSubResourceSeriesManagerProps> = ({
  subResourceSeries,
  onSelect,
  domains,
}) => {
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
            Resource Series
          </Heading>
          <ResourceListBasicLayout
            resources={subResourceSeries}
            renderTop={(resource) => (
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <InternalLink routePath="/resources/[_id]" asHref={`/resources/${resource._id}`}>
                    {resource.name}
                  </InternalLink>
                  <ResourceTypeBadge type={resource.type} />
                  <DurationViewer value={resource.durationSeconds} />
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
  return (
    <StatelessSubResourceSeriesManager
      subResourceSeries={subResourceSeries}
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
