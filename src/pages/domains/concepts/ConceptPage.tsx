import {
  Box,
  Button,
  Flex,
  IconButton,
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
  Heading,
} from '@chakra-ui/core';
import Router from 'next/router';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { PageLayout } from '../../../components/layout/PageLayout';
import { ResourcePreviewCardList } from '../../../components/resources/ResourcePreviewCard';
import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { useDeleteConcept } from '../../../graphql/concepts/concepts.hooks';
import { useGetConceptByKeyQuery } from '../../../graphql/concepts/concepts.operations.generated';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
import { NotFoundPage } from '../../NotFoundPage';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';
import { ConceptListPageInfo } from './ConceptListPage';

export const ConceptPagePath = (domainKey: string, conceptKey: string) =>
  `/domains/${domainKey}/concepts/${conceptKey}`;

export const ConceptPageInfo = (domain: DomainDataFragment, concept: ConceptDataFragment): PageInfo => ({
  name: `${domain.name} - ${concept.name}`,
  path: ConceptPagePath(domain.key, concept.key),
  routePath: ConceptPagePath('[key]', '[conceptKey]'),
});

const ConceptPageRightIcons: React.FC<{ concept: ConceptDataFragment }> = ({ concept }) => {
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
      renderRight={<ConceptPageRightIcons concept={concept} />}
    >
      <Box>
        <Text pb={5}>{concept.description}</Text>
        <Heading fontWeight="light" fontSize="2xl" mb={2}>
          Covered by
        </Heading>
        <ResourcePreviewCardList domainKey={domain.key} resourcePreviews={concept.coveredByResources?.items} />
      </Box>
    </PageLayout>
  );
};
