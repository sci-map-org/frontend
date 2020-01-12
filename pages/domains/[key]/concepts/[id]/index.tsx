import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Stack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';

import { useGetConcept, useDeleteConcept } from '../../../../../src/graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../../../src/graphql/domains/domains.hooks';
import { useCurrentUser } from '../../../../../src/graphql/users/users.hooks';
import { UserRole } from '../../../../../src/graphql/types';
import { ResourcePreview } from '../../../../../src/components/resources/ResourcePreview';

const ConceptPage: React.FC = () => {
  const router = useRouter();

  const { key, id } = router.query;
  const { currentUser } = useCurrentUser();
  const { deleteConcept } = useDeleteConcept();
  if (!key || typeof key !== 'string') return null;
  if (!id || typeof id !== 'string') return null;
  const { domain } = useGetDomainByKey(key);
  const { concept } = useGetConcept(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!domain || !concept) return null;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Flex width="80%" direction="row" justify="space-between" align="center">
        <Box>
          <NextLink href={`/domains/${domain.key}`}>
            <Link>
              Go back to <em>{domain.name}</em>
            </Link>
          </NextLink>
        </Box>
        <Text fontSize="3xl">
          {domain.name} - {concept.name}
        </Text>
        <Box>
          {currentUser && currentUser.role === UserRole.Admin && (
            <Stack spacing={2} direction="row">
              <Button size="sm" onClick={() => Router.push(Router.asPath + '/edit')}>
                Edit
              </Button>
              <IconButton aria-label="Delete article" icon="delete" size="sm" onClick={onOpen} />
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="white">
                  <ModalHeader>Delete Concept</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Confirm deleting this concept ?</Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => deleteConcept({ variables: { _id: concept._id } }).then(() => Router.back())}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          )}
        </Box>
      </Flex>
      <Box pt={10} width="80%">
        <Text pb={5}>{concept.description}</Text>
        <Text fontSize="2xl">Covered by: (resources)</Text>
        {concept.coveredByResources?.items.map(resource => (
          <ResourcePreview key={resource._id} resourcePreview={resource} />
        ))}
        <Text fontSize="2xl">Related concepts</Text>
        <Text fontSize="xl">Refers to</Text>
        <Text fontSize="xl">Referenced by</Text>
      </Box>
    </Box>
  );
};

export default ConceptPage;
