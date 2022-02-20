import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormErrorMessage,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { differenceBy, isEqual, pick, uniqBy } from 'lodash';
import Router from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import {
  useHideLearningMaterialFromTopicMutation,
  useShowLearningMaterialInTopicMutation,
} from '../../graphql/learning_materials/learning_materials.operations.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { UpdateResourcePayload, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { GetResourceEditResourcePageQuery } from '../../pages/resources/EditResourcePage.generated';
import { Access } from '../auth/Access';
import {
  useAttachLearningMaterialCoversTopicsMutation,
  useDetachLearningMaterialCoversTopicsMutation,
} from '../learning_materials/EditableLearningMaterialCoveredTopics.generated';
import {
  useAddLearningMaterialHasPrerequisiteTopicMutation,
  useRemoveLearningMaterialHasPrerequisiteTopicMutation,
} from '../learning_materials/EditableLearningMaterialPrerequisites.generated';
import {
  LearningMaterialDescriptionInput,
  RESOURCE_DESCRIPTION_MAX_LENGTH,
} from '../learning_materials/LearningMaterialDescription';
import { LearningMaterialShowedInField } from '../learning_materials/LearningMaterialShowedInField';
import {
  useAddTagsToLearningMaterialMutation,
  useRemoveTagsFromLearningMaterialMutation,
} from '../learning_materials/LearningMaterialTagsEditor.generated';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { CollapsedField } from '../lib/fields/CollapsedField';
import { Field } from '../lib/fields/Field';
import { FormTitle } from '../lib/Typography';
import { ResourceUrlInput, useAnalyzeResourceUrl } from './elements/ResourceUrl';
import { LearningMaterialDurationField } from './fields/LearningMaterialDurationField';
import { LearningMaterialTagsField } from './fields/LearningMaterialTagsField';
import { ResourceCoveredSubTopicsField } from './fields/ResourceCoveredSubTopicsField';
import { ResourcePrerequisitesField } from './fields/ResourcePrerequisitesField';
import { ResourceTypeField, ResourceTypeSuggestions } from './fields/ResourceTypeField';
import { useUpdateResourceMutation } from './ResourceEditor.generated';

export const updateResource = gql`
  mutation updateResource($id: String!, $payload: UpdateResourcePayload!) {
    updateResource(resourceId: $id, payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

type FormErrors = {
  [key in 'name' | 'url' | 'description' | 'types' | 'showInTopics' | 'prerequisites' | 'coveredSubTopics']?: string;
};
interface ResourceEditorProps {
  resource: GetResourceEditResourcePageQuery['getResourceByKey'];
  onCancel: () => void;
  onResourceSaved: (savedResource: ResourceDataFragment) => void;
}

export const ResourceEditor: React.FC<ResourceEditorProps> = ({ resource, onResourceSaved, onCancel }) => {
  const [resourceUpdateData, setResourceUpdateData] = useState<
    Pick<
      GetResourceEditResourcePageQuery['getResourceByKey'],
      'url' | 'name' | 'description' | 'types' | 'durationSeconds' | 'tags' | 'showedIn'
    > & { prerequisites: TopicLinkDataFragment[]; coveredSubTopics: TopicLinkDataFragment[] }
  >({
    ...pick(resource, ['url', 'name', 'description', 'types', 'durationSeconds', 'tags', 'showedIn']),
    prerequisites: resource.prerequisites?.map(({ topic }) => topic) || [],
    coveredSubTopics: resource.coveredSubTopics?.items || [],
  });

  const { isOpen: prerequisitesFieldIsOpen, onToggle: prerequisitesFieldOnToggle } = useDisclosure();
  const { isOpen: coveredSubTopicsFieldIsOpen, onToggle: coveredSubTopicsFieldOnToggle } = useDisclosure();

  const [updateResourceMutation] = useUpdateResourceMutation();
  const [addTagsToLearningMaterial] = useAddTagsToLearningMaterialMutation();
  const [removeTagsFromLearningMaterial] = useRemoveTagsFromLearningMaterialMutation();
  const [showLearningMaterialInTopicMutation] = useShowLearningMaterialInTopicMutation();
  const [hideLearningMaterialFromTopicMutation] = useHideLearningMaterialFromTopicMutation();
  const [addLearningMaterialHasPrerequisiteTopicMutation] = useAddLearningMaterialHasPrerequisiteTopicMutation();
  const [removeLearningMaterialHasPrerequisiteTopicMutation] = useRemoveLearningMaterialHasPrerequisiteTopicMutation();
  const [attachLearningMaterialCoversTopicsMutation] = useAttachLearningMaterialCoversTopicsMutation();
  const [detachLearningMaterialCoversTopicsMutation] = useDetachLearningMaterialCoversTopicsMutation();

  const { currentUser } = useCurrentUser();
  const [deleteResource] = useDeleteResourceMutation();
  const {
    existingResource,
    isAnalysing,
    isValidUrl,
    reset: resetExistingResource,
  } = useAnalyzeResourceUrl({
    value: resourceUpdateData.url,
    enabled: resourceUpdateData.url !== resource.url,
  });
  const formErrors = useMemo(() => {
    let errors: FormErrors = {};
    if (!resourceUpdateData.name) errors.name = 'Resource Title is required';
    if (!resourceUpdateData.url) errors.url = 'The Url of the resource is required';
    if (resourceUpdateData.description && resourceUpdateData.description.length > RESOURCE_DESCRIPTION_MAX_LENGTH)
      errors.description = `Resource Description is too long (max ${RESOURCE_DESCRIPTION_MAX_LENGTH} characters)`;
    if (resourceUpdateData.types.length < 1) errors.types = 'At least one Resource Type must be selected';
    if (resourceUpdateData.types.length > 3) errors.types = 'Maximum 3 Resource Types can be selected';

    return errors;
  }, [resourceUpdateData]);

  const isValid = useMemo(() => {
    return Object.keys(resourceUpdateData).length > 0;
  }, [resourceUpdateData]);

  const saveChanges = useCallback(async () => {
    if (!isValid) return;

    const updateResourcePayload: UpdateResourcePayload = {};
    if (resourceUpdateData.url !== resource.url) updateResourcePayload.url = resourceUpdateData.url;
    if (resourceUpdateData.name !== resource.name) updateResourcePayload.name = resourceUpdateData.name;
    if (resourceUpdateData.description !== resource.description)
      updateResourcePayload.description = resourceUpdateData.description;
    if (!isEqual(resourceUpdateData.types, resource.types)) updateResourcePayload.types = resourceUpdateData.types;
    if (resourceUpdateData.durationSeconds !== resource.durationSeconds)
      updateResourcePayload.durationSeconds = resourceUpdateData.durationSeconds;

    const promises: Promise<any>[] = [];
    if (Object.keys(updateResourcePayload).length > 0) {
      promises.push(
        updateResourceMutation({
          variables: { id: resource._id, payload: updateResourcePayload },
        })
      );
    }

    const tagsToAdd = differenceBy(resourceUpdateData.tags || [], resource.tags || [], 'name');
    if (tagsToAdd.length)
      promises.push(
        addTagsToLearningMaterial({
          variables: { learningMaterialId: resource._id, tags: tagsToAdd.map(({ name }) => name) },
        })
      );
    const tagsToRemove = differenceBy(resource.tags || [], resourceUpdateData.tags || [], 'name');
    if (tagsToRemove.length)
      promises.push(
        removeTagsFromLearningMaterial({
          variables: { learningMaterialId: resource._id, tags: tagsToRemove.map(({ name }) => name) },
        })
      );

    const showInTopics = differenceBy(resourceUpdateData.showedIn || [], resource.showedIn || [], '_id');
    promises.push(
      ...showInTopics.map((showInTopic) =>
        showLearningMaterialInTopicMutation({
          variables: { learningMaterialId: resource._id, topicId: showInTopic._id },
        })
      )
    );
    const hideFromTopics = differenceBy(resource.showedIn || [], resourceUpdateData.showedIn || [], '_id');
    promises.push(
      ...hideFromTopics.map((hideFromTopic) =>
        hideLearningMaterialFromTopicMutation({
          variables: { learningMaterialId: resource._id, topicId: hideFromTopic._id },
        })
      )
    );

    const prereqsToAdd = differenceBy(
      resourceUpdateData.prerequisites,
      (resource.prerequisites || []).map(({ topic }) => topic),
      '_id'
    );
    promises.push(
      ...prereqsToAdd.map((prereqToAdd) =>
        addLearningMaterialHasPrerequisiteTopicMutation({
          variables: { learningMaterialId: resource._id, prerequisiteTopicId: prereqToAdd._id },
        })
      )
    );
    const prereqsToRemove = differenceBy(
      (resource.prerequisites || []).map(({ topic }) => topic),
      resourceUpdateData.prerequisites,
      '_id'
    );
    promises.push(
      ...prereqsToRemove.map((prereqToRemove) =>
        removeLearningMaterialHasPrerequisiteTopicMutation({
          variables: { learningMaterialId: resource._id, prerequisiteTopicId: prereqToRemove._id },
        })
      )
    );

    const coveredSubTopicsToAdd = differenceBy(
      resourceUpdateData.coveredSubTopics,
      resource.coveredSubTopics?.items || [],
      '_id'
    );
    if (!!coveredSubTopicsToAdd.length)
      promises.push(
        attachLearningMaterialCoversTopicsMutation({
          variables: {
            learningMaterialId: resource._id,
            topicsIds: coveredSubTopicsToAdd.map(({ _id }) => _id),
          },
        })
      );
    const coveredSubTopicsToRemove = differenceBy(
      resource.coveredSubTopics?.items,
      resourceUpdateData.coveredSubTopics,
      '_id'
    );

    if (!!coveredSubTopicsToRemove.length)
      promises.push(
        detachLearningMaterialCoversTopicsMutation({
          variables: {
            learningMaterialId: resource._id,
            topicsIds: coveredSubTopicsToRemove.map(({ _id }) => _id),
          },
        })
      );

    const responses = await Promise.all(promises);
    // quite fragile, should be refactored
    if (Object.keys(updateResourcePayload).length > 0) {
      return onResourceSaved(responses[0].data.updateResource);
    }
    onResourceSaved(resource);
  }, [resourceUpdateData]);
  return (
    <Stack spacing={10}>
      <Center mt={4}>
        <FormTitle>Edit - {resource.name}</FormTitle>
      </Center>
      <Field label="Resource Url" isInvalid={!!formErrors.url}>
        <ResourceUrlInput
          value={resourceUpdateData.url}
          onChange={(url) => setResourceUpdateData({ ...resourceUpdateData, url })}
          isInvalid={!!formErrors.url}
          existingResource={existingResource}
          isAnalysing={isAnalysing}
          isValidUrl={!!isValidUrl}
          resetExistingResource={resetExistingResource}
        />
        <FormErrorMessage>The resource's Url is required</FormErrorMessage>
      </Field>
      <Field label="Title" isInvalid={!!formErrors.name}>
        <Input
          placeholder="Title"
          size="md"
          value={resourceUpdateData.name}
          onChange={(e) => setResourceUpdateData({ ...resourceUpdateData, name: e.target.value })}
        />
        <FormErrorMessage>You must give a title to the resource</FormErrorMessage>
      </Field>
      <ResourceTypeField
        value={resourceUpdateData.types}
        onChange={(types) => setResourceUpdateData({ ...resourceUpdateData, types })}
        selectableResourceTypes={ResourceTypeSuggestions}
        isInvalid={!!formErrors.types}
        errorMessage={formErrors.types}
      />
      <Field label="Description" isInvalid={!!formErrors.description}>
        <LearningMaterialDescriptionInput
          value={resourceUpdateData.description || undefined}
          onChange={(description) => setResourceUpdateData({ ...resourceUpdateData, description })}
          isInvalid={!!formErrors.description}
        />
        <FormErrorMessage>
          Resource Description is too long (max {RESOURCE_DESCRIPTION_MAX_LENGTH} characters)
        </FormErrorMessage>
      </Field>
      {resourceUpdateData.tags && (
        <LearningMaterialTagsField
          value={resourceUpdateData.tags}
          onChange={(tags) => setResourceUpdateData({ ...resourceUpdateData, tags })}
        />
      )}
      <Flex justifyContent="space-between">
        {resourceUpdateData.showedIn && (
          <Box w="45%">
            <LearningMaterialShowedInField
              value={resourceUpdateData.showedIn}
              onChange={(showedIn) => setResourceUpdateData({ ...resourceUpdateData, showedIn })}
              isInvalid={!!formErrors.showInTopics}
              errorMessage={formErrors.showInTopics}
            />
          </Box>
        )}
        <Box w="45%">
          <LearningMaterialDurationField
            value={resourceUpdateData.durationSeconds}
            onChange={(durationSeconds) => setResourceUpdateData({ ...resourceUpdateData, durationSeconds })}
          />
        </Box>
      </Flex>
      <Flex justifyContent="space-between" direction="row" pt={4}>
        <Box w="45%">
          <CollapsedField
            label="Select Prerequisites"
            alignLabel="left"
            isOpen={prerequisitesFieldIsOpen}
            onToggle={prerequisitesFieldOnToggle}
          >
            <ResourcePrerequisitesField
              prerequisites={resourceUpdateData.prerequisites}
              onAdded={(prereq) =>
                setResourceUpdateData({
                  ...resourceUpdateData,
                  prerequisites: uniqBy([...resourceUpdateData.prerequisites, prereq], '_id'),
                })
              }
              onRemove={(prereqIdToRemove) =>
                setResourceUpdateData({
                  ...resourceUpdateData,
                  prerequisites: resourceUpdateData.prerequisites.filter((prereq) => prereq._id !== prereqIdToRemove),
                })
              }
            />
          </CollapsedField>
        </Box>
        <Box w="45%">
          <CollapsedField
            label="Covered SubTopics"
            isOpen={coveredSubTopicsFieldIsOpen}
            onToggle={coveredSubTopicsFieldOnToggle}
          >
            <ResourceCoveredSubTopicsField
              showedInTopics={resourceUpdateData.showedIn || []}
              coveredSubTopics={resourceUpdateData.coveredSubTopics}
              onAdded={(topic) =>
                setResourceUpdateData({
                  ...resourceUpdateData,
                  coveredSubTopics: uniqBy([...resourceUpdateData.coveredSubTopics, topic], '_id'),
                })
              }
              onRemove={(topicId) =>
                setResourceUpdateData({
                  ...resourceUpdateData,
                  coveredSubTopics: resourceUpdateData.coveredSubTopics.filter(
                    (coveredTopic) => coveredTopic._id !== topicId
                  ),
                })
              }
            />
          </CollapsedField>
        </Box>
      </Flex>
      <Stack direction="row" justifyContent="space-between" pt={12}>
        <Access
          condition={
            currentUser &&
            (currentUser.role === UserRole.Admin ||
              currentUser.role === UserRole.Contributor ||
              currentUser._id === resource.createdBy?._id)
          }
          renderAccessDenied={() => <Box />}
        >
          <DeleteButtonWithConfirmation
            modalBodyText="Confirm deleting resource ?"
            modalHeaderText="Delete Resource"
            justifySelf="start"
            onConfirmation={() => deleteResource({ variables: { _id: resource._id } }).then(() => Router.back())}
            size="lg"
            variant="outline"
            width="20rem"
            colorScheme="red"
            mode="button"
          >
            Delete Resource
          </DeleteButtonWithConfirmation>
        </Access>
        <ButtonGroup size="lg" spacing={8}>
          <Button variant="outline" width="16rem" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button variant="solid" width="20rem" colorScheme="brand" isDisabled={!isValid} onClick={() => saveChanges()}>
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};
