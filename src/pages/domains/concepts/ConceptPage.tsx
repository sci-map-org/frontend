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

import { PageLayout } from '../../../components/layout/PageLayout';
import { ResourcePreviewCard, ResourcePreviewCardList } from '../../../components/resources/ResourcePreviewCard';
import { useDeleteConcept } from '../../../graphql/concepts/concepts.hooks';
import { useGetConceptByKeyQuery } from '../../../graphql/concepts/concepts.operations.generated';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { UserRole } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { NotFoundPage } from '../../NotFoundPage';
import { DomainPageInfo } from '../DomainPage';
import { ConceptListPageInfo } from './ConceptListPage';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { PageInfo } from '../../PageInfo';
import { RoleAccess } from '../../../components/auth/RoleAccess';

export const ConceptPagePath = (domainKey: string, conceptKey: string) =>
  `/domains/${domainKey}/concepts/${conceptKey}`;

export const ConceptPageInfo = (domain: DomainDataFragment, concept: ConceptDataFragment): PageInfo => ({
  name: `${domain.name} - ${concept.name}`,
  path: ConceptPagePath(domain.key, concept.key),
});

const ConceptPageRightIcons: React.FC<{ concept: ConceptDataFragment }> = ({ concept }) => {
  const { currentUser } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteConcept } = useDeleteConcept();
  return (
    <Flex direction="row" justify="space-between" align="center">
      <Box>
        <RoleAccess accessRule="admin">
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
                  <Button onClick={() => deleteConcept({ variables: { _id: concept._id } }).then(() => Router.back())}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </RoleAccess>
      </Box>
    </Flex>
  );
};

export const ConceptPage: React.FC<{ domainKey: string; conceptKey: string }> = ({ domainKey, conceptKey }) => {
  const { domain } = useGetDomainByKey(domainKey);
  const { data } = useGetConceptByKeyQuery({ variables: { key: conceptKey } });
  const concept = data?.getConceptByKey;
  if (!domain || !concept) return <NotFoundPage />;
  return (
    <PageLayout
      breadCrumbsLinks={[
        DomainPageInfo(domain),
        ConceptListPageInfo(domain),
        { ...ConceptPageInfo(domain, concept), currentPage: true },
      ]}
      title={domain.name + ' - ' + concept.name}
      renderRight={() => <ConceptPageRightIcons concept={concept} />}
    >
      <Box>
        <Text pb={5}>{concept.description}</Text>
        <Text fontSize="2xl">Covered by</Text>
        <ResourcePreviewCardList domainKey={domain.key} resourcePreviews={concept.coveredByResources?.items} />
        {/* <Text fontSize="2xl">Related concepts</Text>
        <Text fontSize="xl">Refers to</Text>
        <Text fontSize="xl">Referenced by</Text> */}
      </Box>
    </PageLayout>
  );
};
