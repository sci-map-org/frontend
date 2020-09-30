import { Box, Flex, IconButton, Text, useDisclosure, Wrap } from '@chakra-ui/core';
import { AddIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceSelectorModal } from './ResourceSelector';
import { useAddSubResourceSubResourcesManagerMutation } from './SubResourcesManager.generated';

export const addSubResourceSubResourcesManager = gql`
  mutation addSubResourceSubResourcesManager($parentResourceId: String!, $subResourceId: String!) {
    addSubResource(parentResourceId: $parentResourceId, subResourceId: $subResourceId) {
      parentResource {
        _id
        subResources {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ResourcePreviewData}
`;

interface SubResourcesManagerProps {
  resourceId: string;
  subResources: ResourcePreviewDataFragment[];
  domains?: DomainDataFragment[];
}

export const SubResourcesManager: React.FC<SubResourcesManagerProps> = ({ resourceId, subResources, domains }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addSubResource] = useAddSubResourceSubResourcesManagerMutation();
  return (
    <Flex direction="column" alignItems="stretch">
      <Box>
        <Text fontSize="xl">Sub Resources</Text>
      </Box>
      <Flex>
        <Wrap>
          {subResources.map((subResource) => (
            // Create SquareResourcePreviewCard + Frame HOC
            <Flex
              key={subResource._id}
              backgroundColor="whiteAlpha.500"
              boxSize="10rem"
              direction="column"
              alignItems="center"
              justifyContent="center"
              borderWidth="1px"
              borderColor="gray.300"
              p={2}
              borderRadius={4}
            >
              <InternalLink routePath="/resources/[_id]" asHref={`/resources/${subResource._id}`}>
                {subResource.name}
              </InternalLink>
            </Flex>
          ))}
          <Flex
            backgroundColor="whiteAlpha.500"
            boxSize="10rem"
            direction="column"
            alignItems="center"
            justifyContent="center"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius={4}
          >
            <ResourceSelectorModal
              onSelect={(subResource) =>
                addSubResource({ variables: { subResourceId: subResource._id, parentResourceId: resourceId } })
              }
              defaultAttachedDomains={domains}
              renderButton={({ openModal }) => (
                <IconButton
                  aria-label="add subResource"
                  icon={<AddIcon />}
                  size="lg"
                  isRound
                  mb={3}
                  onClick={() => openModal()}
                />
              )}
            />
            <Text fontWeight={500}>Add sub resource</Text>
          </Flex>
        </Wrap>
      </Flex>
    </Flex>
  );
};
