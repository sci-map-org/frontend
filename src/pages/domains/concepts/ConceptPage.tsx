import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Skeleton, Stack, Text, useDisclosure } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { differenceBy } from 'lodash';
import Router from 'next/router';
import { RoleAccess } from '../../../components/auth/RoleAccess';
import { ConceptKnownCheckbox } from '../../../components/concepts/ConceptKnownCheckbox';
import { ConceptTypesViewer } from '../../../components/concepts/ConceptType';
import { EditableConceptTypes } from '../../../components/concepts/ConceptTypesEditor';
import { DomainConceptsPicker } from '../../../components/concepts/DomainConceptsPicker';
import { EditConceptModal } from '../../../components/concepts/EditConcept';
import { NavigationBreadcrumbs } from '../../../components/layout/NavigationBreadcrumbs';
import { TopicPageLayout } from '../../../components/layout/TopicPageLayout';
import { DeleteButtonWithConfirmation } from '../../../components/lib/buttons/DeleteButtonWithConfirmation';
import { ResourcePreviewCardList } from '../../../components/resources/ResourcePreviewCardList';
import { MapVisualisationTopicData } from '../../../components/topics/SubTopicsMapVisualisation';
import { SubTopicsMenu, SubTopicsMenuData } from '../../../components/topics/SubTopicsMenu';
import { SubTopicsMinimap } from '../../../components/topics/SubTopicsMinimap';
import { ConceptData, generateConceptData } from '../../../graphql/concepts/concepts.fragments';
import { ConceptDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
import { useDeleteConcept } from '../../../graphql/concepts/concepts.hooks';
import { DomainData, generateDomainData } from '../../../graphql/domains/domains.fragments';
import { generateResourceData, ResourcePreviewData } from '../../../graphql/resources/resources.fragments';
import { TopicType } from '../../../graphql/types';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { NotFoundPage } from '../../NotFoundPage';
import { ConceptPageInfo, DomainPageInfo } from '../../RoutesPageInfos';
import {
  GetConceptConceptPageQuery,
  useAddConceptReferencesConceptMutation,
  useGetConceptConceptPageQuery,
  useRemoveConceptReferencesConceptMutation,
} from './ConceptPage.generated';

const ConceptPageManagementIcons: React.FC<{ concept: ConceptDataFragment; isDisabled?: boolean }> = ({
  concept,
  isDisabled,
}) => {
  const { deleteConcept } = useDeleteConcept();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Stack spacing={2} mt={2} alignItems="center" direction="row">
        <ConceptKnownCheckbox size="xs" concept={concept} />
        <RoleAccess accessRule="contributorOrAdmin">
          <IconButton
            aria-label="delete concept"
            icon={<EditIcon />}
            size="xs"
            variant="outline"
            onClick={() => onOpen()}
            isDisabled={isDisabled}
          >
            Edit
          </IconButton>
        </RoleAccess>
        <RoleAccess accessRule="contributorOrAdmin">
          <DeleteButtonWithConfirmation
            modalHeaderText="Delete Concept"
            size="xs"
            mode="iconButton"
            variant="outline"
            modalBodyText="Confirm deleting this concept ?"
            isDisabled={isDisabled}
            onConfirmation={() => deleteConcept({ variables: { _id: concept._id } }).then(() => Router.back())}
          />
        </RoleAccess>
      </Stack>
      <EditConceptModal concept={concept} size="md" isOpen={isOpen} onClose={onClose} onCancel={onClose} />
    </>
  );
};

export const getConceptConceptPage = gql`
  query getConceptConceptPage($domainKey: String!, $conceptKey: String!) {
    getDomainConceptByKey(domainKey: $domainKey, conceptKey: $conceptKey) {
      ...ConceptData
      ...MapVisualisationTopicData
      referencingConcepts {
        concept {
          ...ConceptData
        }
      }
      subTopics(options: { sorting: { type: index, direction: ASC } }) {
        ...SubTopicsMenuData
      }
      parentTopic {
        parentTopic {
          ...MapVisualisationTopicData
          ... on Concept {
            _id
            key
            name
            parentTopic {
              index
              parentTopic {
                ... on Concept {
                  _id
                  key
                  name
                }
              }
            }
          }
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
  ${MapVisualisationTopicData}
  ${ResourcePreviewData}
  ${ConceptData}
  ${DomainData}
  ${SubTopicsMenuData}
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

const conceptPlaceholder: GetConceptConceptPageQuery['getDomainConceptByKey'] = {
  ...generateConceptData(),
  name: 'Placeholder Name',
  topicType: TopicType.Concept,
  coveredByResources: { items: [0, 0].map(generateResourceData) },
  domain: generateDomainData(),
  subTopics: [...Array(12)].map(() => ({
    subTopic: { ...generateConceptData(), topicType: TopicType.Concept },
    index: 0,
  })),
};

export const ConceptPage: React.FC<{ domainKey: string; conceptKey: string }> = ({ conceptKey, domainKey }) => {
  const { data, loading, error } = useGetConceptConceptPageQuery({
    variables: { domainKey, conceptKey },
  });
  const concept = data?.getDomainConceptByKey || conceptPlaceholder;
  const domainConcepts = concept.domain?.concepts?.items.map((item) => item.concept) || [];
  const domain = concept.domain;
  if (!domain) return null;
  const referencingConcepts = concept.referencingConcepts?.map((item) => item.concept) || [];
  const [addConceptReferencesConceptMutation] = useAddConceptReferencesConceptMutation();
  const [removeConceptReferencesConcept] = useRemoveConceptReferencesConceptMutation();

  if (error) return <NotFoundPage />;
  if (!concept.domain) throw new Error('Concept has no domain');
  return (
    <TopicPageLayout
      renderTopLeftNavigation={
        <Skeleton isLoaded={!loading}>
          <NavigationBreadcrumbs
            size="sm"
            links={[
              DomainPageInfo(concept.domain),
              ...(concept.parentTopic?.parentTopic.__typename === 'Concept' &&
              concept.parentTopic.parentTopic.parentTopic?.parentTopic.__typename === 'Concept'
                ? [ConceptPageInfo(domain, concept.parentTopic.parentTopic.parentTopic.parentTopic)]
                : []),
              ...(concept.parentTopic?.parentTopic.__typename === 'Concept'
                ? [ConceptPageInfo(domain, concept.parentTopic.parentTopic)]
                : []),
              ConceptPageInfo(domain, concept),
            ]}
          />
        </Skeleton>
      }
      renderTopRightIconButtons={null}
      renderTitle={
        <Heading
          fontSize={{ base: '4xl', md: '4xl', lg: '5xl' }}
          fontWeight={500}
          color="blackAlpha.800"
          backgroundImage="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.7), rgba(255,255,255,0.7), rgba(255,255,255,0.1))"
        >
          {concept.name}
        </Heading>
      }
      renderBlockBelowTitle={
        <Stack pt={2}>
          <ConceptTypesViewer types={concept.types} />
          {concept.description && (
            <Text fontWeight={250} pb={5}>
              {concept.description}
            </Text>
          )}
        </Stack>
      }
      renderManagementIcons={<ConceptPageManagementIcons concept={concept} isDisabled={loading} />}
      renderMinimap={(pxWidth, pxHeight) => (
        <SubTopicsMinimap
          domainKey={domain.key}
          parentTopics={!!concept.parentTopic?.parentTopic ? [concept.parentTopic.parentTopic] : undefined}
          topic={concept}
          isLoading={!!loading}
          subTopics={(concept.subTopics || []).map(({ subTopic }) => subTopic)}
          pxWidth={pxWidth}
          pxHeight={pxHeight}
        />
      )}
      topicType={TopicType.Concept}
      isLoading={loading}
    >
      <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }}>
        <Flex direction="column" borderTopRadius={2} flexGrow={1}>
          <Flex pl={3} color="white" bgColor="teal.600" borderTopRadius="inherit">
            <Heading fontWeight={500} color="white" fontSize="2xl" mt={2} mb={3}>
              Covered by
            </Heading>
          </Flex>
          <ResourcePreviewCardList
            domainKey={concept.domain.key}
            resourcePreviews={concept.coveredByResources?.items || []}
            isLoading={loading}
          />
        </Flex>

        <Flex ml={10} mt={{ base: 10, md: 0 }}>
          <SubTopicsMenu
            topicId={concept._id}
            domain={domain}
            minWidth="260px"
            subTopics={concept.subTopics || []}
            isLoading={loading}
          />
        </Flex>
      </Flex>
      <RoleAccess accessRule="contributorOrAdmin">
        <Box mt={5}>
          <DomainConceptsPicker
            domain={concept.domain}
            title="Prerequisites"
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
    </TopicPageLayout>
  );
};
