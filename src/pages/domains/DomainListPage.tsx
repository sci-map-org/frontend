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
  Heading,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import Router from 'next/router';
import { useSearchDomains } from '../../graphql/domains/domains.hooks';
import { UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { InternalLink, InternalButtonLink } from '../../components/navigation/InternalLink';
import { Layout } from '../../components/layout/Layout';
import { PageLayout } from '../../components/layout/PageLayout';
import { RoleAccess } from '../../components/auth/RoleAccess';

export const DomainsListPage: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { domains } = useSearchDomains();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <PageLayout title="Domains" centerChildren>
      <Stack spacing={8} direction="column" width="36rem">
        <Flex
          direction="column"
          borderBottomWidth="1px"
          borderColor="grayDivider.400"
          backgroundColor="backgroundColor.0"
        >
          {!!domains &&
            domains.map((domain) => {
              return (
                <Flex
                  key={domain._id}
                  borderWidth="1px"
                  borderBottomWidth={0}
                  borderColor="grayDivider.400"
                  py={2}
                  px={4}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <InternalLink routePath="/domains/[key]" asHref={`/domains/${domain.key}`} fontWeight={500}>
                    {domain.name}
                  </InternalLink>

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
                </Flex>
              );
            })}
        </Flex>
        <RoleAccess accessRule="admin">
          <InternalButtonLink variant="outline" routePath="/domains/new" asHref="/domains/new">
            + New Domain
          </InternalButtonLink>
        </RoleAccess>
      </Stack>
    </PageLayout>
  );
};
