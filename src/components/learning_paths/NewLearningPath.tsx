import { Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { CreateLearningPathPayload, LearningMaterialTag } from '../../graphql/types';
import { LearningPathPageInfo } from '../../pages/learning_paths/LearningPathPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { RoleAccess } from '../auth/RoleAccess';
import { LearningMaterialTagsStatelessEditor } from '../learning_materials/LearningMaterialTagsEditor';
import { DurationFormField, DurationInput } from '../resources/elements/Duration';
import { StatelessLearningPathResourceItemsManager } from './LearningPathResourceItems';
import { useCreateLearningPathMutation } from './NewLearningPath.generated';

interface NewLearningPathProps {
  createLearningPath: (payload: CreateLearningPathPayload) => Promise<LearningPathDataFragment>;
  onLearningPathCreated?: (lp: LearningPathDataFragment) => void;
}

export const NewLearningPathForm: React.FC<NewLearningPathProps> = ({ createLearningPath, onLearningPathCreated }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [resourceItems, setResourceItems] = useState<{ resource: ResourcePreviewDataFragment; description?: string }[]>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<LearningMaterialTag[]>([]);
  const [durationMs, setDurationMs] = useState<number | null>();
  const updateResourceItemDescription = (resourceId: string, description: string) => {
    setResourceItems(
      resourceItems.map((resourceItem) => {
        if (resourceItem.resource._id === resourceId) return { ...resourceItem, description: description || undefined };
        return resourceItem;
      })
    );
  };
  return (
    <Stack>
      <FormControl isRequired>
        <FormLabel htmlFor="Name">Title</FormLabel>
        <Input
          placeholder="My Learning Path"
          size="md"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <RoleAccess accessRule="admin">
        <FormControl>
          <FormLabel htmlFor="key">Url key</FormLabel>
          <Input
            placeholder="my_learning_path"
            size="md"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></Input>
        </FormControl>
      </RoleAccess>

      <FormControl>
        <FormLabel htmlFor="Description">Description</FormLabel>
        <Textarea
          id="Description"
          placeholder="Description"
          size="md"
          value={description}
          onChange={(e) => setDescription(e.target.value || undefined)}
        ></Textarea>
      </FormControl>
      <LearningMaterialTagsStatelessEditor selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <DurationFormField value={durationMs} onChange={setDurationMs} />
      <StatelessLearningPathResourceItemsManager
        updateDescription={updateResourceItemDescription}
        addResourceItem={(resource) => setResourceItems([...resourceItems, { resource }])}
        removeResourceItem={(resource) =>
          setResourceItems(resourceItems.filter((i) => i.resource._id !== resource._id))
        }
        resourceItems={resourceItems}
      />
      <Flex justifyContent="flex-end">
        <ButtonGroup spacing={8}>
          <Button size="lg" w="18rem" variant="outline" onClick={() => Router.back()}>
            Cancel
          </Button>
          <Button
            size="lg"
            w="18rem"
            variant="solid"
            colorScheme="brand"
            onClick={() =>
              createLearningPath({
                name,
                description,
                durationMs,
                resourceItems: resourceItems.map((i) => ({ resourceId: i.resource._id, description: i.description })),
                tags: selectedTags.map((t) => t.name),
                ...(key && { key }),
              }).then((lp) => onLearningPathCreated && onLearningPathCreated(lp))
            }
          >
            Add
          </Button>
        </ButtonGroup>
      </Flex>
    </Stack>
  );
};

export const createLearningPath = gql`
  mutation createLearningPath($payload: CreateLearningPathPayload!) {
    createLearningPath(payload: $payload) {
      ...LearningPathData
    }
  }
  ${LearningPathData}
`;

export const NewLearningPath: React.FC<{}> = () => {
  const [createLearningPath] = useCreateLearningPathMutation();
  return (
    <NewLearningPathForm
      createLearningPath={(payload) =>
        createLearningPath({ variables: { payload } }).then(({ data }) => {
          if (!data) throw new Error('Learning Path creation failed');
          return data.createLearningPath;
        })
      }
      onLearningPathCreated={(lp) => routerPushToPage(LearningPathPageInfo(lp))}
    />
  );
};
