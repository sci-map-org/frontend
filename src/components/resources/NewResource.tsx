import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import {
  useAttachLearningMaterialCoversConceptsMutation,
  useAttachLearningMaterialToDomainMutation,
} from '../../graphql/learning_materials/learning_materials.operations.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { CreateResourcePayload, LearningMaterialTag, ResourceMediaType, ResourceType } from '../../graphql/types';
import { validateUrl } from '../../services/url.service';
import { DomainAndConceptsSelector, DomainAndSelectedConcepts } from '../concepts/DomainAndConceptsSelector';
import { LearningMaterialTagsStatelessEditor } from '../learning_materials/LearningMaterialTagsEditor';
import { FormButtons } from '../lib/buttons/FormButtons';
import { DurationFormField } from './elements/Duration';
import { ResourceDescriptionInput } from './elements/ResourceDescription';
import { ResourceMediaTypeSelector } from './elements/ResourceMediaType';
import { ResourceTypeSelector } from './elements/ResourceType';
import { ResourceUrlInput } from './elements/ResourceUrl';
import { useCreateResourceMutation } from './NewResource.generated';

const typeToMediaTypeMapping: { [key in ResourceType]: ResourceMediaType | null } = {
  [ResourceType.Article]: ResourceMediaType.Text,
  [ResourceType.ArticleSeries]: ResourceMediaType.Text,
  [ResourceType.Course]: ResourceMediaType.Video,
  [ResourceType.Podcast]: ResourceMediaType.Audio,
  [ResourceType.PodcastSeries]: ResourceMediaType.Audio,
  [ResourceType.Other]: null,
  [ResourceType.Book]: ResourceMediaType.Text,
  [ResourceType.Documentary]: ResourceMediaType.Video,
  [ResourceType.Tweet]: ResourceMediaType.Text,
  [ResourceType.Talk]: ResourceMediaType.Video,
  [ResourceType.Infographic]: null,
  [ResourceType.Website]: null,
  [ResourceType.YoutubeVideo]: ResourceMediaType.Video,
  [ResourceType.YoutubeVideoSeries]: ResourceMediaType.Video,
  [ResourceType.VideoGame]: ResourceMediaType.InteractiveContent,
};
interface NewResourceFormProps {
  createResource: (
    payload: CreateResourcePayload,
    selectedDomainsAndCoveredConcepts: DomainAndSelectedConcepts[]
  ) => Promise<ResourceDataFragment>;
  onResourceCreated?: (createdResource: ResourceDataFragment) => void;
  onCancel?: () => void;
  defaultAttachedDomains?: DomainDataFragment[];
}

export const NewResourceForm: React.FC<NewResourceFormProps> = ({
  defaultAttachedDomains,
  createResource,
  onResourceCreated,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [mediaType, setMediaType] = useState<ResourceMediaType>(ResourceMediaType.Text);
  const [type, setType] = useState<ResourceType>(ResourceType.Article);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [durationSeconds, setDurationSeconds] = useState<number | null>();
  const [selectedDomainsAndCoveredConcepts, setSelectedDomainsAndCoveredConcepts] = useState<
    DomainAndSelectedConcepts[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<LearningMaterialTag[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!name && !!url && validateUrl(url));
  }, [name, url]);
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input placeholder="Title" size="md" id="title" value={name} onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
      <ResourceUrlInput
        value={url}
        onChange={setUrl}
        analyze
        onAnalyzed={({ resourceData }) => {
          if (resourceData) {
            resourceData.name && !name && setName(resourceData.name);
            resourceData.type && setType(resourceData.type);
            resourceData.mediaType && setMediaType(resourceData.mediaType);
            resourceData.description && !description && setDescription(resourceData.description);
          }
        }}
      />
      <Flex flexDirection="row" justifyContent="space-between">
        <ResourceTypeSelector
          value={type}
          onSelect={(t) => {
            setType(t);
            const inferredMediaType = typeToMediaTypeMapping[t];
            !!inferredMediaType && setMediaType(inferredMediaType);
          }}
        />
      </Flex>
      <LearningMaterialTagsStatelessEditor selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <ResourceMediaTypeSelector value={mediaType} onSelect={(t) => setMediaType(t)} />
        <DurationFormField value={durationSeconds} onChange={setDurationSeconds} />
      </Flex>
      <ResourceDescriptionInput value={description} onChange={(d) => setDescription(d)} />
      <DomainAndConceptsSelector
        defaultDomains={defaultAttachedDomains || []}
        onChange={(domainsAndCoveredConceptsSelected) =>
          setSelectedDomainsAndCoveredConcepts(domainsAndCoveredConceptsSelected)
        }
      />
      <FormButtons
        isPrimaryDisabled={!isValid}
        onCancel={() => (onCancel ? onCancel() : Router.back())}
        size="lg"
        onPrimaryClick={async () => {
          const createdResource = await createResource(
            {
              name,
              description,
              type,
              mediaType,
              url,
              durationSeconds,
              tags: selectedTags.map((t) => t.name),
            },
            selectedDomainsAndCoveredConcepts
          );
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

const useAddResourceToDomainsAndAddCoveredConcepts = () => {
  const [attachLearningMaterialCoveredConcepts] = useAttachLearningMaterialCoversConceptsMutation();
  const [attachLearningMaterialToDomain] = useAttachLearningMaterialToDomainMutation();
  const [createResource] = useCreateResourceMutation();

  const addResourceToDomainsAndAddCoveredConcepts = async (
    resourcePayload: CreateResourcePayload,
    domainsAndCoveredConcepts: DomainAndSelectedConcepts[]
  ): Promise<ResourceDataFragment> => {
    const resourceResults = await createResource({ variables: { payload: resourcePayload } });
    if (!resourceResults.data) throw new Error('Resource Creation failed');
    const createdResource = resourceResults.data.createResource;
    await Promise.all(
      domainsAndCoveredConcepts.map(async ({ domain, selectedConcepts }) => {
        await attachLearningMaterialToDomain({
          variables: { domainId: domain._id, learningMaterialId: createdResource._id },
        });
        if (selectedConcepts.length) {
          await attachLearningMaterialCoveredConcepts({
            variables: { learningMaterialId: createdResource._id, conceptIds: selectedConcepts.map((c) => c._id) },
          });
        }
      })
    );
    return createdResource;
  };
  return [addResourceToDomainsAndAddCoveredConcepts];
};

interface NewResourceProps {
  onResourceCreated?: (createdResource: ResourceDataFragment) => void;
  onCancel?: () => void;
  defaultAttachedDomains?: DomainDataFragment[];
}

export const NewResource: React.FC<NewResourceProps> = ({ onResourceCreated, onCancel, defaultAttachedDomains }) => {
  const [addResourceToDomainsAndAddCoveredConcepts] = useAddResourceToDomainsAndAddCoveredConcepts();

  return (
    <NewResourceForm
      createResource={addResourceToDomainsAndAddCoveredConcepts}
      onResourceCreated={onResourceCreated}
      onCancel={onCancel}
      defaultAttachedDomains={defaultAttachedDomains}
    />
  );
};

export const NewResourceModal: React.FC<{ renderButton: (onClick: () => void) => ReactElement } & NewResourceProps> = ({
  defaultAttachedDomains,
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
                defaultAttachedDomains={defaultAttachedDomains}
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
