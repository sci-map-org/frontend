import {
  Box,
  Button,
  Flex,
  Heading,
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
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { differenceBy } from 'lodash';
import Router from 'next/router';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { ConceptsPicker } from '../../../components/concepts/ConceptsPicker';
import { PageLayout } from '../../../components/layout/PageLayout';
import { ResourcePreviewCardList } from '../../../components/resources/ResourcePreviewCard';
import { ConceptData, generateConceptData } from '../../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { useDeleteConcept } from '../../../graphql/concepts/concepts.hooks';
import { DomainData, generateDomainData } from '../../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../../graphql/domains/domains.fragments.generated';
import { generateResourceData, ResourcePreviewData } from '../../../graphql/resources/resources.fragments';
import { NotFoundPage } from '../../NotFoundPage';
import { PageInfo } from '../../PageInfo';
import { DomainPageInfo } from '../DomainPage';
import { ConceptListPageInfo } from './ConceptListPage';
import {
  GetConceptConceptPageQuery,
  useAddConceptReferencesConceptMutation,
  useGetConceptConceptPageQuery,
  useRemoveConceptReferencesConceptMutation,
} from './ConceptPage.generated';

export const ConceptPagePath = (domainKey: string, conceptKey: string) =>
  `/domains/${domainKey}/concepts/${conceptKey}`;

export const ConceptPageInfo = (domain: DomainDataFragment, concept: ConceptDataFragment): PageInfo => ({
  name: `${domain.name} - ${concept.name}`,
  path: ConceptPagePath(domain.key, concept.key),
  routePath: ConceptPagePath('[key]', '[conceptKey]'),
});

const ConceptPageRightIcons: React.FC<{ concept: ConceptDataFragment; isDisabled?: boolean }> = ({
  concept,
  isDisabled,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteConcept } = useDeleteConcept();
  return (
    <Flex direction="row" justify="space-between" align="center">
      <Box>
        <RoleAccess accessRule="admin">
          <Stack spacing={2} direction="row">
            <Button size="sm" onClick={() => Router.push(Router.asPath + '/edit')} isDisabled={isDisabled}>
              Edit
            </Button>
            <IconButton aria-label="Delete article" icon="delete" size="sm" onClick={onOpen} isDisabled={isDisabled} />
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

export const getConceptConceptPage = gql`
  query getConceptConceptPage($key: String!) {
    getConceptByKey(key: $key) {
      ...ConceptData
      referencingConcepts {
        concept {
          ...ConceptData
        }
      }
      coveredByResources(options: {}) {
        items {
          ...ResourcePreviewData
        }
      }
      domain {
        ...DomainData
        concepts(options: { sorting: { entity: relationship, field: index, direction: ASC } }) {
          items {
            concept {
              ...ConceptData
            }
          }
        }
      }
    }
  }
  ${ResourcePreviewData}
  ${ConceptData}
  ${DomainData}
`;

export const addConceptReferencesConcept = gql`
  mutation addConceptReferencesConcept($conceptId: String!, $referencedConceptId: String!) {
    addConceptReferencesConcept(conceptId: $conceptId, referencedConceptId: $referencedConceptId) {
      _id
    }
  }
`;

export const removeConceptReferencesConcept = gql`
  mutation removeConceptReferencesConcept($conceptId: String!, $referencedConceptId: String!) {
    removeConceptReferencesConcept(conceptId: $conceptId, referencedConceptId: $referencedConceptId) {
      _id
    }
  }
`;

const conceptPlaceholder: GetConceptConceptPageQuery['getConceptByKey'] = {
  ...generateConceptData(),
  coveredByResources: { items: [0, 0].map(generateResourceData) },
  domain: generateDomainData(),
};

export const ConceptPage: React.FC<{ domainKey: string; conceptKey: string }> = ({ conceptKey }) => {
  const { data, loading, error } = useGetConceptConceptPageQuery({
    variables: { key: conceptKey },
  });
  const concept = data?.getConceptByKey || conceptPlaceholder;
  const domainConcepts = concept.domain?.concepts?.items.map((item) => item.concept) || [];
  const referencingConcepts = concept.referencingConcepts?.map((item) => item.concept) || [];
  const [addConceptReferencesConceptMutation] = useAddConceptReferencesConceptMutation();
  const [removeConceptReferencesConcept] = useRemoveConceptReferencesConceptMutation();
  if (error) return <NotFoundPage />;
  if (!concept.domain) throw new Error('Concept has no domain');
  return (
    <PageLayout
      breadCrumbsLinks={[
        DomainPageInfo(concept.domain),
        ConceptListPageInfo(concept.domain),
        { ...ConceptPageInfo(concept.domain, concept), currentPage: true },
      ]}
      title={concept.domain.name + ' - ' + concept.name}
      renderRight={<ConceptPageRightIcons concept={concept} isDisabled={loading} />}
      isLoading={loading}
    >
      <Box>
        <Text pb={5}>{concept.description}</Text>
        <Heading fontWeight="light" fontSize="2xl" mb={2}>
          Covered by
        </Heading>
        <ResourcePreviewCardList
          domainKey={concept.domain.key}
          resourcePreviews={concept.coveredByResources?.items}
          isLoading={loading}
        />

        <RoleAccess accessRule="admin">
          <Box mt={5}>
            <ConceptsPicker
              title="Referenced Concepts"
              pickableConceptList={differenceBy(domainConcepts, referencingConcepts, [concept], (concept) => {
                return concept._id;
              })}
              pickedConceptList={referencingConcepts}
              onSelect={(conceptToAdd) =>
                addConceptReferencesConceptMutation({
                  variables: { conceptId: concept._id, referencedConceptId: conceptToAdd._id },
                })
              }
              onRemove={(conceptToRemove) =>
                removeConceptReferencesConcept({
                  variables: { conceptId: concept._id, referencedConceptId: conceptToRemove._id },
                })
              }
            />
          </Box>
        </RoleAccess>
      </Box>
    </PageLayout>
  );
};
