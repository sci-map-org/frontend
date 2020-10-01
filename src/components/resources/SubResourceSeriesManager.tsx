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
      parentResource {
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
      parentResource {
        _id
        subResourceSeries {
          ...ResourceData
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
            onSelect={(selectedResource) =>
              createSubResourceSeriesMutation({
                variables: { parentResourceId: resourceId, subResourceId: selectedResource._id },
              })
            }
            renderButton={({ openModal }) => (
              <IconButton icon={<AddIcon />} aria-label="Add resource to series" onClick={() => openModal()} />
            )}
          />
        </Flex>
      ) : (
        <Flex direction="column" width="24rem">
          <Heading size="sm" textAlign="center" mb={2}>
            Resource Series
          </Heading>
          <ResourceList resources={subResourceSeries} />
          <Flex direction="column" alignItems="center">
            {/* <Text fontWeight={500}>Add resource to series</Text> */}
            <ResourceSelectorModal
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
        </Flex>
      )}
    </Flex>
  );
};
