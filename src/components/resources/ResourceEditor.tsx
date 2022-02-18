import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDeleteResourceMutation } from '../../graphql/resources/resources.operations.generated';
import { UpdateResourcePayload, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { GetResourceEditResourcePageQuery } from '../../pages/resources/EditResourcePage.generated';
import { validateUrl } from '../../services/url.service';
import { Access } from '../auth/Access';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { DurationInput } from './elements/Duration';
import { LearningMaterialDescriptionInput } from '../learning_materials/LearningMaterialDescription';
import { ResourceTypeSelector } from './elements/ResourceType';

interface ResourceEditorProps {
  resource: GetResourceEditResourcePageQuery['getResourceByKey'];
  onSave: (editedResource: UpdateResourcePayload) => void;
}

export const ResourceEditor: React.FC<ResourceEditorProps> = ({ resource, onSave }) => {
  const [name, setName] = useState(resource.name);

  const [types, setTypes] = useState(resource.types);
  const [url, setUrl] = useState(resource.url);
  const [durationSeconds, setDurationSeconds] = useState(resource.durationSeconds);
  const [description, setDescription] = useState(resource.description || undefined);
  const { currentUser } = useCurrentUser();
  const [deleteResource] = useDeleteResourceMutation();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(!!name && !!url && validateUrl(url));
  }, [name, url]);

  return (
    <Stack spacing={4}>
      <Text mb={5} fontSize="3xl" textAlign="center">
        Edit - {resource.name}
      </Text>
      <FormControl isRequired isInvalid={!name}>
        <FormLabel htmlFor="name">Title</FormLabel>
        <Input id="name" placeholder="name" size="md" value={name} onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
      {/* TODO */}
      {/* <ResourceUrlInput value={url} onChange={setUrl} /> */}

      {/* TODO  */}
      <Flex direction="row">
        <ResourceTypeSelector value={types[0]} onSelect={(t) => setTypes([t])} />
      </Flex>
      <Flex flexDirection="row">
        <Box flexGrow={1}></Box>
        <DurationInput value={durationSeconds} onChange={setDurationSeconds} />
      </Flex>
      <LearningMaterialDescriptionInput value={description} onChange={(d) => setDescription(d)} />
      <Stack direction="row" justifyContent="space-between">
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
          <Button variant="outline" width="16rem" onClick={() => Router.back()}>
            Cancel
          </Button>
          <Button
            variant="solid"
            width="20rem"
            colorScheme="brand"
            isDisabled={!isValid}
            onClick={() =>
              onSave({
                name,
                types,
                url,
                description,
                durationSeconds,
              })
            }
          >
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};
