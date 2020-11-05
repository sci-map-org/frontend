import { Box, Flex, Heading, IconButton, Stack } from '@chakra-ui/core';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { LearningPathWithResourceItemsPreviewDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import {
  ResourceDataFragment,
  ResourcePreviewDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { ResourcePreviewCard } from '../resources/ResourcePreviewCard';
import { ResourceSelectorModal } from '../resources/ResourceSelector';

interface StatelessLearningPathResourceItemsProps {
  resourceItems: { description?: string | null; resource: ResourcePreviewDataFragment }[];
  updateDescription: (resourceId: string, description: string) => void;
  addResourceItem: (resource: ResourcePreviewDataFragment) => void;
  removeResourceItem: (resource: ResourcePreviewDataFragment) => void;
  confirmDeletion?: boolean;
}

export const StatelessLearningPathResourceItemsManager: React.FC<StatelessLearningPathResourceItemsProps> = ({
  resourceItems,
  updateDescription,
  addResourceItem,
  removeResourceItem,
  confirmDeletion,
}) => {
  return (
    <Flex direction="column" alignItems="stretch">
      <Stack direction="column" spacing={3}>
        <Heading size="sm" textAlign="center">
          Resources
        </Heading>

        <Flex
          borderTop="1px solid"
          borderTopColor="gray.200"
          direction="column"
          alignItems="stretch"
          backgroundColor="backgroundColor.0"
        >
          {resourceItems.map(({ resource, description }) => (
            <Flex key={resource._id} direction="column" justifyContent="stretch">
              <Flex direction="row" pt={3}>
                <EditableTextarea
                  flexGrow={1}
                  backgroundColor="white"
                  fontSize="lg"
                  fontWeight={300}
                  color="gray.700"
                  defaultValue={description || ''}
                  placeholder="Add a description..."
                  onSubmit={(newDescription: any) => updateDescription(resource._id, newDescription as string)}
                />
                <Box flexBasis="60px" />
              </Flex>
              <Flex direction="row">
                <Box flexGrow={1}>
                  <ResourcePreviewCard
                    borderTopColor="gray.200"
                    resource={resource}
                    onResourceConsumed={(r) => console.log('consumed r')}
                  />
                </Box>
                <Flex
                  flexBasis="60px"
                  flexShrink={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  {confirmDeletion ? (
                    <DeleteButtonWithConfirmation
                      variant="ghost"
                      modalBodyText={`Remove the resource ${resource.name} from the learning path ?`}
                      modalHeaderText="Remove Resource"
                      onConfirmation={() => removeResourceItem(resource)}
                    />
                  ) : (
                    <IconButton
                      aria-label="remove resource from learning path"
                      size="xs"
                      icon={<DeleteIcon />}
                      onClick={() => removeResourceItem(resource)}
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
        <Flex direction="row" justifyContent="center">
          <ResourceSelectorModal
            onSelect={(selectedResource) => addResourceItem(selectedResource)}
            renderButton={({ openModal }) => (
              <IconButton
                m={2}
                size="md"
                isRound
                icon={<AddIcon />}
                aria-label="Add resource to learning path"
                onClick={() => openModal()}
              />
            )}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
interface LearningPathResourceItemsProps {
  learningPath: LearningPathWithResourceItemsPreviewDataFragment;
}

export const LearningPathResourceItemsManager: React.FC<LearningPathResourceItemsProps> = ({ learningPath }) => {
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const addResourceItem = (resource: ResourceDataFragment) => {
    // TODO throw if resource already in the path (or on the API ?)
    updateLearningPath({
      variables: {
        _id: learningPath._id,
        payload: {
          resourceItems: [
            ...(learningPath.resourceItems || []).map((item) => ({
              resourceId: item.resource._id,
              description: item.description,
            })),
            { resourceId: resource._id },
          ],
        },
      },
    });
  };

  const removeResourceItem = (resource: ResourceDataFragment) => {
    updateLearningPath({
      variables: {
        _id: learningPath._id,
        payload: {
          resourceItems: (learningPath.resourceItems || [])
            .filter((item) => resource._id !== item.resource._id)
            .map((item) => ({
              resourceId: item.resource._id,
              description: item.description,
            })),
        },
      },
    });
  };

  const updateDescription = (resourceId: string, newDescription: string) => {
    updateLearningPath({
      variables: {
        _id: learningPath._id,
        payload: {
          resourceItems: (learningPath.resourceItems || []).map((item) => ({
            resourceId: item.resource._id,
            description: item.resource._id === resourceId ? newDescription || null : item.description,
          })),
        },
      },
    });
  };
  if (!learningPath.resourceItems) return null;
  return (
    <StatelessLearningPathResourceItemsManager
      updateDescription={updateDescription}
      addResourceItem={addResourceItem}
      removeResourceItem={removeResourceItem}
      resourceItems={learningPath.resourceItems}
      confirmDeletion
    />
  );
};
