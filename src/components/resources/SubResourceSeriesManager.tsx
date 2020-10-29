import { Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/core';
import { AddIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { last } from 'lodash';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import {
  ResourceDataFragment,
  ResourcePreviewDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { ResourceList } from './ResourceList';
import { ResourceSelectorModal } from './ResourceSelector';
import {
  useAddSubResourceToSeriesMutation,
  useCreateSubResourceSeriesMutation,
} from './SubResourceSeriesManager.generated';

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
    <Flex direction="column" alignItems="stretch">
      {!subResourceSeries || !subResourceSeries.length ? (
        <Flex direction="column" alignItems="center">
          <Heading size="sm">Start resource series</Heading>
          <ResourceSelectorModal
            defaultAttachedDomains={domains}
            onSelect={(selectedResource) =>
              createSubResourceSeriesMutation({
                variables: { parentResourceId: resourceId, subResourceId: selectedResource._id },
              })
            }
            renderButton={({ openModal }) => (
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
      ) : (
        <Stack direction="column" spacing={3}>
          <Heading size="sm" textAlign="center">
            Resource Series
          </Heading>
          <ResourceList resources={subResourceSeries} />
          <Flex direction="column" alignItems="center">
            <ResourceSelectorModal
              defaultAttachedDomains={domains}
              onSelect={(selectedResource) =>
                addSubResourceToSeriesMutation({
                  variables: {
                    parentResourceId: resourceId,
                    previousResourceId: (last(subResourceSeries) as ResourceDataFragment)._id,
                    subResourceId: selectedResource._id,
                  },
                })
              }
              renderButton={({ openModal }) => (
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
