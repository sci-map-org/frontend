import { Box, Button, Center, Heading, Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { differenceBy } from 'lodash';
import Router from 'next/router';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { useUnauthentificatedModal } from '../../../components/auth/UnauthentificatedModal';
import { DomainConceptsPicker } from '../../../components/concepts/DomainConceptsPicker';
import { PageLayout } from '../../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../../components/lib/buttons/DeleteButtonWithConfirmation';
import { CompletedCheckbox } from '../../../components/lib/CompletedCheckbox';
import { ResourcePreviewCardList } from '../../../components/resources/ResourcePreviewCardList';
import { ConceptData, generateConceptData } from '../../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { useDeleteConcept } from '../../../graphql/concepts/concepts.hooks';
import {
  useSetConceptsKnownMutation,
  useSetConceptsUnknownMutation,
} from '../../../graphql/concepts/concepts.operations.generated';
import { DomainData, generateDomainData } from '../../../graphql/domains/domains.fragments';
import { generateResourceData, ResourcePreviewData } from '../../../graphql/resources/resources.fragments';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { NotFoundPage } from '../../NotFoundPage';
import { ConceptListPageInfo, ConceptPageInfo, DomainPageInfo } from '../../RoutesPageInfos';
import {
  GetConceptConceptPageQuery,
  useAddConceptBelongsToConceptMutation,
  useAddConceptReferencesConceptMutation,
  useGetConceptConceptPageQuery,
  useRemoveConceptBelongsToConceptMutation,
  useRemoveConceptReferencesConceptMutation,
} from './ConceptPage.generated';

const ConceptPageRightIcons: React.FC<{ concept: ConceptDataFragment; isDisabled?: boolean }> = ({
  concept,
  isDisabled,
}) => {
  const { deleteConcept } = useDeleteConcept();
  return (
    <Stack spacing={2} direction="row">
      <RoleAccess accessRule="contributorOrAdmin">
        <Button size="sm" onClick={() => Router.push(Router.asPath + '/edit')} isDisabled={isDisabled}>
          Edit
        </Button>
      </RoleAccess>
      <RoleAccess accessRule="contributorOrAdmin">
        <DeleteButtonWithConfirmation
          modalHeaderText="Delete Concept"
          modalBodyText="Confirm deleting this concept ?"
          isDisabled={isDisabled}
          onConfirmation={() => deleteConcept({ variables: { _id: concept._id } }).then(() => Router.back())}
        />
      </RoleAccess>
    </Stack>
  );
};

export const getConceptConceptPage = gql`
  query getConceptConceptPage($domainKey: String!, $conceptKey: String!) {
    getDomainConceptByKey(domainKey: $domainKey, conceptKey: $conceptKey) {
      ...ConceptData
      referencingConcepts {
        concept {
          ...ConceptData
        }
      }
      # subConcepts {
      #   concept {
      #     ...ConceptData
      #   }
      # }
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
      concept {
        _id
        referencingConcepts {
          concept {
            _id
          }
        }
      }
      referencedConcept {
        _id
        referencedByConcepts {
          concept {
            _id
          }
        }
      }
    }
  }
`;

export const removeConceptReferencesConcept = gql`
  mutation removeConceptReferencesConcept($conceptId: String!, $referencedConceptId: String!) {
    removeConceptReferencesConcept(conceptId: $conceptId, referencedConceptId: $referencedConceptId) {
      concept {
        _id
        referencingConcepts {
          concept {
            _id
          }
        }
      }
      referencedConcept {
        _id
        referencedByConcepts {
          concept {
            _id
          }
        }
      }
    }
  }
`;

// export const addConceptBelongsToConcept = gql`
//   mutation addConceptBelongsToConcept($parentConceptId: String!, $subConceptId: String!) {
//     addConceptBelongsToConcept(parentConceptId: $parentConceptId, subConceptId: $subConceptId) {
//       parentConcept {
//         _id
//         subConcepts {
//           concept {
//             _id
//           }
//         }
//       }
//       subConcept {
//         _id
//         parentConcepts {
//           concept {
//             _id
//           }
//         }
//       }
//     }
//   }
// `;

// export const removeConceptBelongsToConcept = gql`
//   mutation removeConceptBelongsToConcept($parentConceptId: String!, $subConceptId: String!) {
//     removeConceptBelongsToConcept(parentConceptId: $parentConceptId, subConceptId: $subConceptId) {
//       parentConcept {
//         _id
//         subConcepts {
//           concept {
//             _id
//           }
//         }
//       }
//       subConcept {
//         _id
//         parentConcepts {
//           concept {
//             _id
//           }
//         }
//       }
//     }
//   }
// `;

const conceptPlaceholder: GetConceptConceptPageQuery['getDomainConceptByKey'] = {
  ...generateConceptData(),
  coveredByResources: { items: [0, 0].map(generateResourceData) },
  domain: generateDomainData(),
};

export const ConceptPage: React.FC<{ domainKey: string; conceptKey: string }> = ({ conceptKey, domainKey }) => {
  const { data, loading, error } = useGetConceptConceptPageQuery({
    variables: { domainKey, conceptKey },
  });
  const concept = data?.getDomainConceptByKey || conceptPlaceholder;
  const domainConcepts = concept.domain?.concepts?.items.map((item) => item.concept) || [];
  const referencingConcepts = concept.referencingConcepts?.map((item) => item.concept) || [];
  const subConcepts = concept.subConcepts?.map((item) => item.concept) || [];
  const [addConceptReferencesConceptMutation] = useAddConceptReferencesConceptMutation();
  const [removeConceptReferencesConcept] = useRemoveConceptReferencesConceptMutation();
  const [addConceptBelongsToConceptMutation] = useAddConceptBelongsToConceptMutation();
  const [removeConceptBelongsToConceptMutation] = useRemoveConceptBelongsToConceptMutation();
  const { currentUser } = useCurrentUser();
  const [setConceptKnown] = useSetConceptsKnownMutation();
  const [setConceptUnknown] = useSetConceptsUnknownMutation();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const toggleConceptKnown = async (concept: ConceptDataFragment) => {
    if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
    if (!concept.known) {
      await setConceptKnown({
        variables: {
          payload: {
            concepts: [
              {
                conceptId: concept._id,
              },
            ],
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          setConceptsKnown: [
            {
              ...concept,
              known: {
                __typename: 'KnownConcept',
                level: 100,
              },
            },
          ],
        },
      });
    } else {
      await setConceptUnknown({
        variables: { conceptIds: [concept._id] },
        optimisticResponse: {
          __typename: 'Mutation',
          setConceptsUnknown: [
            {
              ...concept,
              known: null,
            },
          ],
        },
      });
    }
  };
  if (error) return <NotFoundPage />;
  if (!concept.domain) throw new Error('Concept has no domain');
  return (
    <PageLayout
      breadCrumbsLinks={[DomainPageInfo(concept.domain), ConceptPageInfo(concept.domain, concept)]}
      title={concept.domain.name + ' - ' + concept.name}
      renderTopRight={<ConceptPageRightIcons concept={concept} isDisabled={loading} />}
      isLoading={loading}
    >
      <Box>
        <Center>
          <CompletedCheckbox
            ml={2}
            size="lg"
            uncheckedColor="gray.400"
            tooltipLabel={!!concept.known ? 'Mark this concept as unknown' : 'Mark this concept as known'}
            tooltipDelay={500}
            onChange={() => {
              toggleConceptKnown(concept);
            }}
            isChecked={!!concept.known}
          />
        </Center>
        <Text pb={5}>{concept.description}</Text>
        <Heading fontWeight="light" fontSize="2xl" mb={2}>
          Covered by
        </Heading>
        <ResourcePreviewCardList
          domainKey={concept.domain.key}
          resourcePreviews={concept.coveredByResources?.items || []}
          isLoading={loading}
        />

        <RoleAccess accessRule="contributorOrAdmin">
          <Box mt={5}>
            <DomainConceptsPicker
              domain={concept.domain}
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
          <Box mt={5}>
            <DomainConceptsPicker
              title="Sub Concepts"
              domain={concept.domain}
              pickableConceptList={differenceBy(domainConcepts, subConcepts, [concept], (concept) => {
                return concept._id;
              })}
              pickedConceptList={subConcepts}
              onSelect={(conceptToAdd) =>
                addConceptBelongsToConceptMutation({
                  variables: { parentConceptId: concept._id, subConceptId: conceptToAdd._id },
                })
              }
              onRemove={(conceptToRemove) =>
                removeConceptBelongsToConceptMutation({
                  variables: { parentConceptId: concept._id, subConceptId: conceptToRemove._id },
                })
              }
            />
          </Box>
        </RoleAccess>
      </Box>
    </PageLayout>
  );
};
