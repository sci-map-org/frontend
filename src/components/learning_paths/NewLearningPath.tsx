import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useState } from 'react';
import { LearningPathData } from '../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { CreateLearningPathPayload } from '../../graphql/types';
import { LearningPathPageInfo } from '../../pages/learning_paths/LearningPathPage';
import { routerPushToPage } from '../../pages/PageInfo';
import { RoleAccess } from '../auth/RoleAccess';
import { StatelessLearningPathResourceItemsManager } from './LearningPathResourceItems';
import { useCreateLearningPathMutation } from './NewLearningPath.generated';

interface NewLearningPathProps {
  createLearningPath: (payload: CreateLearningPathPayload) => Promise<LearningPathDataFragment>;
  onLearningPathCreated?: (lp: LearningPathDataFragment) => void;
}

export const NewLearningPathForm: React.FC<NewLearningPathProps> = ({ createLearningPath, onLearningPathCreated }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [resourceItems, setResourceItems] = useState<{ resource: ResourcePreviewDataFragment; description?: string }[]>(
    []
  );

  const [step, setStep] = useState<1 | 2>(1);

  return (
    <Flex direction="column" justifyContent="stretch">
      {step === 1 && (
        <NewLearningPathFirstStep
          name={name}
          setName={setName}
          key={key}
          setKey={setKey}
          description={description}
          setDescription={setDescription}
        />
      )}
      {step === 2 && <NewLearningPathSecondStep resourceItems={resourceItems} setResourceItems={setResourceItems} />}
      <Flex justifyContent="flex-end" mt={8}>
        <ButtonGroup spacing={8}>
          {step === 2 && (
            <Button size="lg" w="18rem" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <Button
            size="lg"
            w="18rem"
            variant="solid"
            isDisabled={(step === 2 && !resourceItems.length) || (step === 1 && !name)}
            colorScheme="brand"
            onClick={() => {
              if (step === 1) return setStep(2);
              createLearningPath({
                name,
                description,
                resourceItems: resourceItems.map((i) => ({ resourceId: i.resource._id, description: i.description })),
                ...(key && { key }),
              }).then((lp) => onLearningPathCreated && onLearningPathCreated(lp));
            }}
          >
            {step === 1 ? 'Next' : 'Create Learning Path'}
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
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

interface NewLearningPathFirstStepProps {
  name: string;
  setName: (newName: string) => void;
  key?: string;
  setKey: (newKey?: string) => void;
  description?: string;
  setDescription: (newDescription?: string) => void;
}

const NewLearningPathFirstStep: React.FC<NewLearningPathFirstStepProps> = ({
  name,
  setName,
  key,
  setKey,
  description,
  setDescription,
}) => {
  return (
    <Stack>
      <FormControl isRequired>
        <FormLabel htmlFor="Name">Name</FormLabel>
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
    </Stack>
  );
};

interface NewLearningPathSecondStepProps {
  resourceItems: { resource: ResourcePreviewDataFragment; description?: string }[];
  setResourceItems: (newResourceItems: { resource: ResourcePreviewDataFragment; description?: string }[]) => void;
}
const NewLearningPathSecondStep: React.FC<NewLearningPathSecondStepProps> = ({ resourceItems, setResourceItems }) => {
  const updateResourceItemDescription = (resourceId: string, description: string) => {
    setResourceItems(
      resourceItems.map((resourceItem) => {
        if (resourceItem.resource._id === resourceId) return { ...resourceItem, description: description || undefined };
        return resourceItem;
      })
    );
  };
  return (
    <Stack pt={5} pb={4}>
      <Center>
        <Heading size="md" textAlign="center">
          Start adding new resources to your learning path
        </Heading>
      </Center>
      <StatelessLearningPathResourceItemsManager
        updateDescription={updateResourceItemDescription}
        addResourceItem={(resource) => setResourceItems([...resourceItems, { resource }])}
        removeResourceItem={(resource) =>
          setResourceItems(resourceItems.filter((i) => i.resource._id !== resource._id))
        }
        resourceItems={resourceItems}
        editMode
        resourceSelectorButtonColorScheme="blue"
        hideProgressArrow
      />
    </Stack>
  );
};
