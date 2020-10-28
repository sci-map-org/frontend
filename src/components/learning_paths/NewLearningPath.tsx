import { Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { CreateLearningPathPayload, CreateLearningPathResourceItem } from '../../graphql/types';
import { LearningPathPageInfo } from '../../pages/learning_paths/LearningPathPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { RoleAccess } from '../auth/RoleAccess';
import { useCreateLearningPathMutation } from './NewLearningPath.generated';

interface NewLearningPathProps {
  createLearningPath: (payload: CreateLearningPathPayload) => Promise<LearningPathDataFragment>;
  onLearningPathCreated?: (lp: LearningPathDataFragment) => void;
}

export const NewLearningPathForm: React.FC<NewLearningPathProps> = ({ createLearningPath, onLearningPathCreated }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState<string>();
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [resourceItems, setResourceItems] = useState<CreateLearningPathResourceItem[]>([]);
  return (
    <Stack>
      <FormControl isRequired>
        <FormLabel htmlFor="Name">Title</FormLabel>
        <Input
          placeholder="My Learning Path"
          size="md"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <RoleAccess accessRule="admin">
        <FormControl>
          <FormLabel htmlFor="Name">Url key</FormLabel>
          <Input
            placeholder="my_learning_path"
            size="md"
            id="title"
            value={key}
            onChange={(e) => setKey(e.target.value || undefined)}
          ></Input>
        </FormControl>
      </RoleAccess>
      <FormControl>
        <FormLabel htmlFor="Name">Description</FormLabel>
        <Textarea
          id="description"
          placeholder="Description"
          size="md"
          value={description}
          onChange={(e) => setDescription(e.target.value || undefined)}
        ></Textarea>
      </FormControl>
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
              createLearningPath({ name, description, resourceItems: [], ...(key && { key }) }).then(
                (lp) => onLearningPathCreated && onLearningPathCreated(lp)
              )
            }
          >
            Add
          </Button>
        </ButtonGroup>
      </Flex>
      {/* <Box>
          <LearningPathResourceItemsManager resourceItems={resourceItems} addResourceItem={r => setResourceItems([...resourceItems, {resourceId: r.resource._id}])}/>
      </Box> */}
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
