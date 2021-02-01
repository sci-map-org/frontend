import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { omit, pick } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import {
  CreateResourcePayload,
  CreateSubResourcePayload,
  LearningMaterialTag,
  ResourceMediaType,
  ResourceType,
} from '../../graphql/types';
import { validateUrl } from '../../services/url.service';
import { ConceptBadge } from '../concepts/ConceptBadge';
import { DomainAndConceptsSelector, DomainAndSelectedConcepts } from '../concepts/DomainAndConceptsSelector';
import { LearningGoalBadgeDataFragment } from '../learning_goals/LearningGoalBadge.generated';
import { StatelessEditableLearningMaterialOutcomes } from '../learning_materials/EditableLearningMaterialOutcomes';
import { StatelessEditableLearningMaterialPrerequisites } from '../learning_materials/EditableLearningMaterialPrerequisites';
import { LearningMaterialTagsStatelessEditor } from '../learning_materials/LearningMaterialTagsEditor';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { FormButtons } from '../lib/buttons/FormButtons';
import { DurationFormField, DurationViewer } from './elements/Duration';
import { ResourceDescriptionInput } from './elements/ResourceDescription';
import { ResourceMediaTypeSelector } from './elements/ResourceMediaType';
import { ResourceTypeBadge, ResourceTypeSelector } from './elements/ResourceType';
import { ResourceUrlInput } from './elements/ResourceUrl';
import { useCreateResourceMutation } from './NewResource.generated';
import { ResourceListBasicLayout } from './ResourceList';

const typeToMediaTypeMapping: { [key in ResourceType]: ResourceMediaType | null } = {
  [ResourceType.Article]: ResourceMediaType.Text,
  [ResourceType.ArticleSeries]: ResourceMediaType.Text,
  [ResourceType.Course]: ResourceMediaType.Video,
  [ResourceType.Podcast]: ResourceMediaType.Audio,
  [ResourceType.PodcastEpisode]: ResourceMediaType.Audio,
  [ResourceType.Other]: null,
  [ResourceType.OnlineBook]: ResourceMediaType.Text,
  [ResourceType.Book]: ResourceMediaType.Text,
  [ResourceType.ResearchPaper]: ResourceMediaType.Text,
  [ResourceType.Documentary]: ResourceMediaType.Video,
  [ResourceType.Tweet]: ResourceMediaType.Text,
  [ResourceType.Talk]: ResourceMediaType.Video,
  [ResourceType.Infographic]: ResourceMediaType.Image,
  [ResourceType.Website]: null,
  [ResourceType.YoutubeVideo]: ResourceMediaType.Video,
  [ResourceType.YoutubePlaylist]: ResourceMediaType.Video,
  [ResourceType.VideoGame]: ResourceMediaType.InteractiveContent,
};

type SubResourceCreationData = Omit<
  CreateResourcePayload,
  | 'domainsAndCoveredConcepts'
  | 'tags'
  | 'subResourceSeries'
  | 'description'
  | 'outcomesLearningGoalsIds'
  | 'prerequisitesLearningGoalsIds'
> & {
  description?: string;
  tags: LearningMaterialTag[];
  domainsAndCoveredConcepts: DomainAndSelectedConcepts[];
  prerequisites: LearningGoalBadgeDataFragment[];
  outcomes: LearningGoalBadgeDataFragment[];
};

type ResourceCreationData = SubResourceCreationData & {
  subResourceSeries?: SubResourceCreationData[];
};

const resourceCreationDataToPayload = (resourceCreationData: ResourceCreationData): CreateResourcePayload => {
  const subResourceSeries: CreateSubResourcePayload[] | undefined = resourceCreationData.subResourceSeries?.map(
    (subResource) => ({
      ...omit(subResource, ['domainsAndCoveredConcepts', 'prerequisites', 'outcomes']),
      tags: resourceCreationData.tags.map((t) => t.name),
      domainsAndCoveredConcepts: subResource.domainsAndCoveredConcepts.map(({ domain, selectedConcepts }) => ({
        domainId: domain._id,
        conceptsIds: selectedConcepts.map((s) => s._id),
      })),
      prerequisitesLearningGoalsIds: subResource.prerequisites.map(({ _id }) => _id),
      outcomesLearningGoalsIds: subResource.outcomes.map(({ _id }) => _id),
    })
  );
  return {
    ...omit(resourceCreationData, ['prerequisites', 'outcomes']),
    tags: resourceCreationData.tags.map((t) => t.name),
    subResourceSeries,
    domainsAndCoveredConcepts: resourceCreationData.domainsAndCoveredConcepts.map(({ domain, selectedConcepts }) => ({
      domainId: domain._id,
      conceptsIds: selectedConcepts.map((s) => s._id),
    })),
    prerequisitesLearningGoalsIds: resourceCreationData.prerequisites.map(({ _id }) => _id),
    outcomesLearningGoalsIds: resourceCreationData.outcomes.map(({ _id }) => _id),
  };
};
interface StatelessNewResourceFormProps {
  resourceCreationData: SubResourceCreationData;
  updateResourceCreationData: (data: Partial<ResourceCreationData>) => void;
}

const StatelessNewResourceForm: React.FC<StatelessNewResourceFormProps> = ({
  resourceCreationData,
  updateResourceCreationData,
}) => {
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          placeholder="Title"
          size="md"
          id="title"
          value={resourceCreationData.name}
          onChange={(e) => updateResourceCreationData({ name: e.target.value })}
        ></Input>
      </FormControl>
      <ResourceUrlInput
        value={resourceCreationData.url}
        onChange={(url) => updateResourceCreationData({ url })}
        analyze
        onAnalyzed={({ resourceData: analyzedResourceData }) => {
          if (analyzedResourceData) {
            updateResourceCreationData({
              ...(!!analyzedResourceData.name && !resourceCreationData.name && { name: analyzedResourceData.name }),
              ...(!!analyzedResourceData.type && { type: analyzedResourceData.type }),
              ...(!!analyzedResourceData.mediaType && { mediaType: analyzedResourceData.mediaType }),
              ...(!!analyzedResourceData.description &&
                !resourceCreationData.description && { description: analyzedResourceData.description }),
              ...(!!analyzedResourceData.durationSeconds && { durationSeconds: analyzedResourceData.durationSeconds }),
              ...(!!analyzedResourceData.subResourceSeries && {
                subResourceSeries: analyzedResourceData.subResourceSeries.map((sub) => ({
                  ...pick(sub, ['name', 'url', 'type', 'mediaType', 'durationSeconds']),
                  tags: [],
                  domainsAndCoveredConcepts: resourceCreationData.domainsAndCoveredConcepts.map((s) => ({
                    domain: s.domain,
                    selectedConcepts: [],
                  })),
                  description: sub.description || undefined,
                  prerequisites: [],
                  outcomes: [],
                })),
              }),
            });
          }
        }}
      />
      <Flex flexDirection="row" justifyContent="space-between">
        <ResourceTypeSelector
          value={resourceCreationData.type}
          onSelect={(t) => {
            const inferredMediaType = typeToMediaTypeMapping[t];
            updateResourceCreationData({
              type: t,
              ...(!!inferredMediaType && { mediaType: inferredMediaType }),
            });
          }}
        />
      </Flex>
      <LearningMaterialTagsStatelessEditor
        selectedTags={resourceCreationData.tags}
        setSelectedTags={(tags) => !!tags && updateResourceCreationData({ tags })}
      />
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <ResourceMediaTypeSelector
          value={resourceCreationData.mediaType}
          onSelect={(t) => updateResourceCreationData({ mediaType: t })}
        />
        <DurationFormField
          value={resourceCreationData.durationSeconds}
          onChange={(durationSeconds) => updateResourceCreationData({ durationSeconds })}
        />
      </Flex>
      <ResourceDescriptionInput
        value={resourceCreationData.description}
        onChange={(d) => updateResourceCreationData({ description: d })}
      />
      <Flex direction="row">
        <Flex w="50%">
          <DomainAndConceptsSelector
            selectedDomainsAndConcepts={resourceCreationData.domainsAndCoveredConcepts}
            onChange={(domainsAndCoveredConcepts) => updateResourceCreationData({ domainsAndCoveredConcepts })}
            allowConceptCreation
          />
        </Flex>
        <Stack spacing={4} w="50%">
          <StatelessEditableLearningMaterialPrerequisites
            editable={true}
            learningGoalsPrerequisites={resourceCreationData.prerequisites}
            onAdded={(learningGoal) =>
              updateResourceCreationData({
                prerequisites: [...resourceCreationData.prerequisites, learningGoal],
              })
            }
            onRemove={(learningGoalId) => {
              updateResourceCreationData({
                prerequisites: resourceCreationData.prerequisites.filter(
                  (prerequisite) => prerequisite._id !== learningGoalId
                ),
              });
            }}
          />
          <StatelessEditableLearningMaterialOutcomes
            editable={true}
            learningGoalsOutcomes={resourceCreationData.outcomes}
            onAdded={(learningGoal) =>
              updateResourceCreationData({
                outcomes: [...resourceCreationData.outcomes, learningGoal],
              })
            }
            onRemove={(learningGoalId) => {
              updateResourceCreationData({
                outcomes: resourceCreationData.outcomes.filter((outcome) => outcome._id !== learningGoalId),
              });
            }}
          />
        </Stack>
      </Flex>
    </Stack>
  );
};

interface NewResourceFormProps {
  createResource: (payload: CreateResourcePayload) => Promise<ResourceDataFragment>;
  onResourceCreated?: (createdResource: ResourceDataFragment) => void;
  onCancel?: () => void;
  defaultResourceCreationData?: Partial<ResourceCreationData>;
}

const defaultResourceData: ResourceCreationData = {
  name: '',
  mediaType: ResourceMediaType.Text,
  type: ResourceType.Article,
  url: '',
  durationSeconds: null,
  tags: [],
  domainsAndCoveredConcepts: [],
  prerequisites: [],
  outcomes: [],
};

export const NewResourceForm: React.FC<NewResourceFormProps> = ({
  defaultResourceCreationData,
  createResource,
  onResourceCreated,
  onCancel,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [resourceCreationData, setResourceCreationData] = useState<ResourceCreationData>({
    ...defaultResourceData,
    ...defaultResourceCreationData,
  });
  const [selectedSubResourceIndex, selectSubResourceIndex] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setIsValid(!!resourceCreationData.name && !!resourceCreationData.url && validateUrl(resourceCreationData.url));
  }, [resourceCreationData.name, resourceCreationData.url]);
  return (
    <Stack spacing={4}>
      <StatelessNewResourceForm
        resourceCreationData={resourceCreationData}
        updateResourceCreationData={(newData) =>
          setResourceCreationData({
            ...resourceCreationData,
            ...newData,
          })
        }
      />
      {resourceCreationData.subResourceSeries && (
        <>
          <ResourceListBasicLayout
            resources={resourceCreationData.subResourceSeries}
            renderTop={(subResource, index) => (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Text fontWeight={500}>{subResource.name}</Text>
                <ResourceTypeBadge type={subResource.type} />
                <DurationViewer value={subResource.durationSeconds} />
              </Stack>
            )}
            renderBottom={(subResource) => (
              <Wrap spacing={2}>
                {subResource.domainsAndCoveredConcepts.map(({ selectedConcepts, domain }) =>
                  selectedConcepts.map((concept) => (
                    <WrapItem key={concept._id}>
                      <ConceptBadge concept={concept} domainKey={domain.key} />
                    </WrapItem>
                  ))
                )}
              </Wrap>
            )}
            renderRight={(subResource, index) => (
              <Stack direction="row" alignItems="center" spacing={2}>
                <BoxBlockDefaultClickPropagation display="flex" justifyContent="center" alignItems="center">
                  <IconButton
                    size="xs"
                    aria-label="remove resource"
                    icon={<EditIcon />}
                    onClick={() => {
                      selectSubResourceIndex(index);
                      onOpen();
                    }}
                  />
                </BoxBlockDefaultClickPropagation>
                <BoxBlockDefaultClickPropagation display="flex" justifyContent="center" alignItems="center">
                  <IconButton
                    size="xs"
                    aria-label="remove resource"
                    icon={<CloseIcon />}
                    onClick={() => {
                      const newSubResourceSeries = [
                        ...(resourceCreationData.subResourceSeries as SubResourceCreationData[]),
                      ];
                      newSubResourceSeries.splice(index, 1);
                      setResourceCreationData({ ...resourceCreationData, subResourceSeries: newSubResourceSeries });
                    }}
                  />
                </BoxBlockDefaultClickPropagation>
              </Stack>
            )}
          />
          {typeof selectedSubResourceIndex !== 'undefined' && (
            <Modal onClose={onClose} size="xl" isOpen={isOpen}>
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>New SubResource</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={5}>
                    <StatelessNewResourceForm
                      resourceCreationData={resourceCreationData.subResourceSeries[selectedSubResourceIndex]}
                      updateResourceCreationData={(newData) => {
                        const newSubResourceSeries = [
                          ...(resourceCreationData.subResourceSeries as SubResourceCreationData[]),
                        ];
                        newSubResourceSeries[selectedSubResourceIndex] = {
                          ...newSubResourceSeries[selectedSubResourceIndex],
                          ...newData,
                        };
                        setResourceCreationData({ ...resourceCreationData, subResourceSeries: newSubResourceSeries });
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="solid" colorScheme="blue" size="lg" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          )}
        </>
      )}
      <FormButtons
        isPrimaryDisabled={!isValid}
        isPrimaryLoading={isCreating}
        onCancel={onCancel}
        size="lg"
        onPrimaryClick={async () => {
          setIsCreating(true);
          const createdResource = await createResource(resourceCreationDataToPayload(resourceCreationData));
          setIsCreating(false);
          onResourceCreated && onResourceCreated(createdResource);
        }}
      />
    </Stack>
  );
};

export const createResource = gql`
  mutation createResource($payload: CreateResourcePayload!) {
    createResource(payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

interface NewResourceProps {
  onResourceCreated?: (createdResource: ResourceDataFragment) => void;
  onCancel?: () => void;
  defaultResourceCreationData?: Partial<ResourceCreationData>;
}

export const NewResource: React.FC<NewResourceProps> = ({
  onResourceCreated,
  onCancel,
  defaultResourceCreationData,
}) => {
  const [createResource] = useCreateResourceMutation();

  return (
    <NewResourceForm
      createResource={async (payload) => {
        const { data } = await createResource({ variables: { payload } });
        if (!data) throw new Error('failed to create resource');
        return data.createResource;
      }}
      onResourceCreated={onResourceCreated}
      onCancel={onCancel}
      defaultResourceCreationData={defaultResourceCreationData}
    />
  );
};

export const NewResourceModal: React.FC<{ renderButton: (onClick: () => void) => ReactElement } & NewResourceProps> = ({
  defaultResourceCreationData,
  onResourceCreated,
  renderButton,
  onCancel,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderButton(onOpen)}
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Create new Resource</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <NewResource
                defaultResourceCreationData={defaultResourceCreationData}
                onResourceCreated={(resourceCreated) => {
                  onClose();
                  onResourceCreated && onResourceCreated(resourceCreated);
                }}
                onCancel={() => {
                  onClose();
                  onCancel && onCancel();
                }}
              />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
