import {
  Button,
  ButtonGroup,
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
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import {
  useAttachResourceCoversConceptsMutation,
  useAttachResourceToDomainMutation,
} from '../../graphql/resources/resources.operations.generated';
import { CreateResourcePayload, ResourceMediaType, LearningMaterialTag, ResourceType } from '../../graphql/types';
import { validateUrl } from '../../services/url.service';
import { DomainAndConceptsSelector, DomainAndSelectedConcepts } from '../concepts/DomainAndConceptsSelector';
import { useCreateResourceMutation } from './NewResource.generated';
import { ResourceDescriptionInput } from './elements/ResourceDescription';
import { ResourceDurationSelector } from './elements/ResourceDuration';
import { ResourceMediaTypeSelector } from './elements/ResourceMediaType';
import { LearningMaterialTagsStatelessEditor } from '../learning_materials/LearningMaterialTagsEditor';
import { ResourceTypeSelector } from './elements/ResourceType';
import { ResourceUrlInput } from './elements/ResourceUrl';

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
  const [durationMs, setDurationMs] = useState<number | null>();
  const [selectedDomainsAndCoveredConcepts, setSelectedDomainsAndCoveredConcepts] = useState<
    DomainAndSelectedConcepts[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<LearningMaterialTag[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setIsValid(!!name && !!url && validateUrl(url));
  }, [name, url]);
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input placeholder="Title" size="md" id="title" value={name} onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
      <ResourceUrlInput value={url} onChange={setUrl} />
      <Flex flexDirection="row" justifyContent="space-between">
        <ResourceTypeSelector value={type} onSelect={(t) => setType(t)} />
      </Flex>
      <LearningMaterialTagsStatelessEditor selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <ResourceMediaTypeSelector value={mediaType} onSelect={(t) => setMediaType(t)} />
        <ResourceDurationSelector value={durationMs} onChange={setDurationMs} />
      </Flex>
      <ResourceDescriptionInput value={description} onChange={(d) => setDescription(d)} />
      <DomainAndConceptsSelector
        defaultDomains={defaultAttachedDomains || []}
        onChange={(domainsAndCoveredConceptsSelected) =>
          setSelectedDomainsAndCoveredConcepts(domainsAndCoveredConceptsSelected)
        }
      />
      <Flex justifyContent="flex-end">
        <ButtonGroup spacing={8} w="40%" minWidth="25rem">
          <Button size="lg" variant="outline" w="50%" onClick={() => (onCancel ? onCancel() : Router.back())}>
            Cancel
          </Button>
          <Button
            isLoading={isCreating}
            w="50%"
            size="lg"
            colorScheme="brand"
            variant="solid"
            isDisabled={!isValid}
            onClick={async () => {
              setIsCreating(true);
              const createdResource = await createResource(
                {
                  name,
                  description,
                  type,
                  mediaType,
                  url,
                  durationMs,
                  tags: selectedTags.map((t) => t.name),
                },
                selectedDomainsAndCoveredConcepts
              );
              setIsCreating(false);
              onResourceCreated && onResourceCreated(createdResource);
            }}
          >
            Create
          </Button>
        </ButtonGroup>
      </Flex>
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
  const [attachResourceCoveredConcepts] = useAttachResourceCoversConceptsMutation();
  const [attachResourceToDomain] = useAttachResourceToDomainMutation();
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
        await attachResourceToDomain({ variables: { domainId: domain._id, resourceId: createdResource._id } });
        if (selectedConcepts.length) {
          await attachResourceCoveredConcepts({
            variables: { resourceId: createdResource._id, conceptIds: selectedConcepts.map((c) => c._id) },
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
