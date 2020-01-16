import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import Router from 'next/router';

import { ResourcePreview } from '../../../../../src/components/resources/ResourcePreview';
import { useDeleteConcept, useGetConcept } from '../../../../../src/graphql/concepts/concepts.hooks';
import { useGetDomainByKey } from '../../../../../src/graphql/domains/domains.hooks';
import { UserRole } from '../../../../../src/graphql/types';
import { useCurrentUser } from '../../../../../src/graphql/users/users.hooks';
import { PageLayout } from '../../../layout/PageLayout';

export const ConceptPage: React.FC<{ domainKey: string; conceptId: string }> = ({ domainKey, conceptId }) => {
  const { currentUser } = useCurrentUser();
  const { deleteConcept } = useDeleteConcept();
  const { domain } = useGetDomainByKey(domainKey);
  const { concept } = useGetConcept(conceptId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!domain || !concept) return null;
  return (
    <PageLayout>
      <Flex direction="row" justify="space-between" align="center">
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
      <Box pt={10}>
        <Text pb={5}>{concept.description}</Text>
        <Text fontSize="2xl">Covered by: (resources)</Text>
        {concept.coveredByResources?.items.map(resource => (
          <ResourcePreview key={resource._id} resourcePreview={resource} />
        ))}
        <Text fontSize="2xl">Related concepts</Text>
        <Text fontSize="xl">Refers to</Text>
        <Text fontSize="xl">Referenced by</Text>
      </Box>
    </PageLayout>
  );
};
