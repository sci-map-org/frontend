import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormHelperText,
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
import { ResourcePreviewCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { CreateLearningPathPayload } from '../../graphql/types';
import { routerPushToPage } from '../../pages/PageInfo';
import { LearningPathPageInfo } from '../../pages/RoutesPageInfos';
import { RoleAccess } from '../auth/RoleAccess';
import { FormButtons } from '../lib/buttons/FormButtons';
import { StatelessLearningPathResourceItemsManager } from './LearningPathResourceItems';
import { useCreateLearningPathMutation } from './NewLearningPath.generated';

interface NewLearningPathProps {
  createLearningPath: (payload: CreateLearningPathPayload) => Promise<LearningPathDataFragment>;
  onLearningPathCreated?: (lp: LearningPathDataFragment) => void;
  onCancel?: () => void;
}

export const NewLearningPathForm: React.FC<NewLearningPathProps> = ({
  createLearningPath,
  onLearningPathCreated,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState<string>();

  return (
    <Flex direction="column" justifyContent="stretch">
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
            <FormHelperText>(admin only field, optional)</FormHelperText>
          </FormControl>
        </RoleAccess>
      </Stack>

      <Flex justifyContent="flex-end" mt={8}>
        <FormButtons
          isPrimaryDisabled={!name}
          onPrimaryClick={() => {
            createLearningPath({
              name,
              key,
              resourceItems: [],
            }).then((lp) => onLearningPathCreated && onLearningPathCreated(lp));
          }}
          onCancel={onCancel}
        />
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

interface NewLearningPathSecondStepProps {
  resourceItems: { resource: ResourcePreviewCardDataFragment; description?: string }[];
  setResourceItems: (newResourceItems: { resource: ResourcePreviewCardDataFragment; description?: string }[]) => void;
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
        reorderResourceItems={(originIndex: number, destinationIndex: number) => {
          const newResourceItems = [...resourceItems];
          const t = newResourceItems[destinationIndex];
          newResourceItems[destinationIndex] = newResourceItems[originIndex];
          newResourceItems[originIndex] = t;
          setResourceItems(newResourceItems);
        }}
        resourceItems={resourceItems}
        editMode
        resourceSelectorButtonColorScheme="blue"
        hideProgressArrow
      />
    </Stack>
  );
};
