import {
  Box,
  Stack,
  Text,
  Link,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import Router from 'next/router';
import { useSearchDomains } from '../../../graphql/domains/domains.hooks';
import { UserRole } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';

export const DomainsListPage: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { domains } = useSearchDomains();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Stack spacing={8} textAlign="center" width="36rem">
        <Text fontSize="4xl">Domains</Text>
        <Flex direction="column">
          {!!domains &&
            domains.map(domain => {
              return (
                <Box
                  key={domain._id}
                  shadow="md"
                  borderWidth="1px"
                  rounded={1}
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                >
                  <NextLink href={`/domains/${domain.key}`}>
                    <Link fontWeight={500}>{domain.name}</Link>
                  </NextLink>
                  {!!currentUser && currentUser.role === UserRole.Admin && (
                    <IconButton aria-label="Delete domain" icon="delete" size="sm" onClick={onOpen} />
                  )}

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent bg="inherit">
                      <ModalHeader>Delete Domain</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>Confirm deleting this domain ?</Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button variant="ghost">Delete</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              );
            })}
          <Box></Box>
        </Flex>
        <Button onClick={() => Router.push('/domains/new')}>+ New Domain</Button>
      </Stack>
    </Box>
  );
};
