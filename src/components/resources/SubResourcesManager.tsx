import { Box, Flex, IconButton, Text, Wrap } from '@chakra-ui/core';
import { AddIcon } from '@chakra-ui/icons';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';
import { NewResourceModal } from './NewResource';

interface SubResourcesManagerProps {
  resourceId: string;
  subResources: ResourcePreviewDataFragment[];
  domains?: DomainDataFragment[];
}

export const SubResourcesManager: React.FC<SubResourcesManagerProps> = ({ resourceId, subResources, domains }) => {
  return (
    <Flex direction="column" alignItems="stretch">
      <Box>
        <Text fontSize="xl">Sub Resources</Text>
      </Box>
      <Flex>
        <Wrap>
          {subResources.map((subResource) => (
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
            <NewResourceModal
              renderButton={(onClick) => (
                <IconButton
                  aria-label="add subResource"
                  icon={<AddIcon />}
                  size="lg"
                  isRound
                  mb={3}
                  onClick={onClick}
                />
              )}
              defaultAttachedDomains={domains}
            />
            <Text fontWeight={500}>Add sub resource</Text>
          </Flex>
        </Wrap>
      </Flex>
    </Flex>
  );
};
