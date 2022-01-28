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
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import {
  CreateResourcePayload,
  CreateSubResourcePayload,
  LearningMaterialTag,
  ResourceMediaType,
  ResourceType,
} from '../../graphql/types';
import { validateUrl } from '../../services/url.service';
import { StatelessEditableLearningMaterialCoveredTopics } from '../learning_materials/EditableLearningMaterialCoveredTopics';
import { StatelessEditableLearningMaterialPrerequisites } from '../learning_materials/EditableLearningMaterialPrerequisites';
import { LearningMaterialTagsStatelessEditor } from '../learning_materials/LearningMaterialTagsEditor';
import { BoxBlockDefaultClickPropagation } from '../lib/BoxBlockDefaultClickPropagation';
import { FormButtons } from '../lib/buttons/FormButtons';
import { TopicLink } from '../lib/links/TopicLink';
import { FormFieldLabel } from '../lib/Typography';
import { TopicBadge } from '../topics/TopicBadge';
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
  [ResourceType.Exercise]: null,
  [ResourceType.Project]: ResourceMediaType.Text,
  // [ResourceType.Quizz]: ResourceMediaType.InteractiveContent,
};

type SubResourceCreationData = Omit<
  CreateResourcePayload,
  'tags' | 'subResourceSeries' | 'description' | 'showInTopicsIds' | 'coveredSubTopicsIds' | 'prerequisitesTopicsIds'
> & {
  description?: string;
  tags: LearningMaterialTag[];
  showInTopics: TopicLinkDataFragment[];
  coveredSubTopics: TopicLinkDataFragment[];
  prerequisites: TopicLinkDataFragment[];
};

type ResourceCreationData = SubResourceCreationData & {
  subResourceSeries?: SubResourceCreationData[];
};

const resourceCreationDataToPayload = (resourceCreationData: ResourceCreationData): CreateResourcePayload => {
  const subResourceSeries: CreateSubResourcePayload[] | undefined = resourceCreationData.subResourceSeries?.map(
    (subResource) => ({
      ...omit(subResource, ['showInTopics', 'prerequisites', 'coveredSubTopics']),
      tags: resourceCreationData.tags.map((t) => t.name),
      showInTopicsIds: subResource.showInTopics.map(({ _id }) => _id),
      prerequisitesTopicsIds: subResource.prerequisites.map(({ _id }) => _id),
      coveredSubTopicsIds: subResource.coveredSubTopics.map(({ _id }) => _id),
    })
  );
  return {
    ...omit(resourceCreationData, ['showInTopics', 'prerequisites', 'coveredSubTopics']),
    tags: resourceCreationData.tags.map((t) => t.name),
    subResourceSeries,
    showInTopicsIds: resourceCreationData.showInTopics.map(({ _id }) => _id),
    prerequisitesTopicsIds: resourceCreationData.prerequisites.map(({ _id }) => _id),
    coveredSubTopicsIds: resourceCreationData.coveredSubTopics.map(({ _id }) => _id),
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
              ...(!!analyzedResourceData.types && { types: analyzedResourceData.types }),
              ...(!!analyzedResourceData.mediaType && { mediaType: analyzedResourceData.mediaType }),
              ...(!!analyzedResourceData.description &&
                !resourceCreationData.description && { description: analyzedResourceData.description }),
              ...(!!analyzedResourceData.durationSeconds && { durationSeconds: analyzedResourceData.durationSeconds }),
              showInTopics: [],
              prerequisites: [],
              coveredSubTopics: [],
              ...(!!analyzedResourceData.subResourceSeries && {
                subResourceSeries: analyzedResourceData.subResourceSeries.map((sub) => ({
                  ...pick(sub, ['name', 'url', 'types', 'mediaType', 'durationSeconds']),
                  tags: [],
                  description: sub.description || undefined,
                  prerequisites: [],
                  coveredSubTopics: [],
                  showInTopics: [],
                })),
              }),
            });
          }
        }}
      />
      <Flex flexDirection="row" justifyContent="space-between">
        {/* 
        TODO
        <ResourceTypeSelector
          value={resourceCreationData.type}
          onSelect={(t) => {
            const inferredMediaType = typeToMediaTypeMapping[t];
            updateResourceCreationData({
              type: t,
              ...(!!inferredMediaType && { mediaType: inferredMediaType }),
            });
          }}
        /> */}
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
      <Stack direction="column" spacing={0} py={3}>
        <FormFieldLabel>Show In:</FormFieldLabel>
        <Stack pl={3}>
          {resourceCreationData.showInTopics.map((showedInTopic) => (
            <TopicLink key={showedInTopic._id} topic={showedInTopic} />
          ))}
        </Stack>
      </Stack>
      <Flex direction="row">
        <Flex w="50%">
          <StatelessEditableLearningMaterialCoveredTopics
            editable={true}
            coveredTopics={resourceCreationData.coveredSubTopics}
            onAdded={(topic) =>
              updateResourceCreationData({ coveredSubTopics: [...resourceCreationData.coveredSubTopics, topic] })
            }
            onRemove={(topicId) =>
              updateResourceCreationData({
                coveredSubTopics: resourceCreationData.coveredSubTopics.filter(
                  (coveredTopic) => coveredTopic._id !== topicId
                ),
              })
            }
          />
        </Flex>
        <Flex w="50%">
          <StatelessEditableLearningMaterialPrerequisites
            editable={true}
            prerequisites={resourceCreationData.prerequisites}
            onAdded={(topic) =>
              updateResourceCreationData({
                prerequisites: [...resourceCreationData.prerequisites, topic],
              })
            }
            onRemove={(topicId) => {
              updateResourceCreationData({
                prerequisites: resourceCreationData.prerequisites.filter(
                  (prerequisite) => prerequisite._id !== topicId
                ),
              });
            }}
          />
          {/* <StatelessEditableLearningMaterialOutcomes
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
          /> */}
        </Flex>
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
  types: [ResourceType.Article],
  url: '',
  durationSeconds: null,
  tags: [],
  showInTopics: [],
  prerequisites: [],
  coveredSubTopics: [],
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
                {subResource.types.map((type) => (
                  <ResourceTypeBadge key={type} type={type} />
                ))}
                <DurationViewer value={subResource.durationSeconds} />
              </Stack>
            )}
            renderBottom={(subResource) => (
              <Wrap spacing={2}>
                {subResource.coveredSubTopics.map((topic) => (
                  <WrapItem key={topic._id}>
                    <TopicBadge topic={topic} />
                  </WrapItem>
                ))}
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
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
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
