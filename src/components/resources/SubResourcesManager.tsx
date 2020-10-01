import { Box, Flex, IconButton, Text, Wrap } from '@chakra-ui/core';
import { AddIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { shortenString } from '../../util/utils';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceSelectorModal } from './ResourceSelector';
import { useAddSubResourceMutation } from './SubResourcesManager.generated';

export const addSubResource = gql`
  mutation addSubResource($parentResourceId: String!, $subResourceId: String!) {
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
  subResources: ResourceDataFragment[];
  domains?: DomainDataFragment[];
}

export const SubResourcesManager: React.FC<SubResourcesManagerProps> = ({ resourceId, subResources, domains }) => {
  const [addSubResource] = useAddSubResourceMutation();
  return (
    <Flex direction="column" alignItems="stretch">
      <Box mb={2}>
        <Text fontSize="xl">Sub Resources</Text>
      </Box>
      <Wrap spacing={3}>
        {subResources.map((subResource) => (
          <SubResourceCard key={subResource._id} subResource={subResource} />
        ))}
        <CardFrame>
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
        </CardFrame>
      </Wrap>
    </Flex>
  );
};

const CardFrame: React.FC<{}> = ({ children }) => {
  return (
    <Flex
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
      {children}
    </Flex>
  );
};

const SubResourceCard: React.FC<{ subResource: ResourceDataFragment }> = ({ subResource }) => {
  return (
    <CardFrame>
      <InternalLink
        textAlign="center"
        fontSize="sm"
        routePath="/resources/[_id]"
        asHref={`/resources/${subResource._id}`}
      >
        {shortenString(subResource.name, 90)}
      </InternalLink>
    </CardFrame>
  );
};