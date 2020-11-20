import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, BoxProps, ButtonProps, Flex, FlexProps, IconButton } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
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
  editMode?: boolean;
  isLoading?: boolean;
  currentUserStartedPath?: boolean;
  resourceSelectorButtonColorScheme?: ButtonProps['colorScheme'];
  hideProgressArrow?: boolean;
}

const completedCheckboxHeight = 24;
const checkboxMargin = 8;
const borderWidth = 1;

// top = - ([idx -1] - 24) / 2 + margin
const getArrowTopPosition = (resourceItemIndex: number, previewCardsHeight: number[]): string => {
  return resourceItemIndex === 0
    ? '0px'
    : `${-(previewCardsHeight[resourceItemIndex - 1] + borderWidth - completedCheckboxHeight) / 2 + checkboxMargin}px`;
};

// h = 100 % + ([idx -1] - 24) / 2 + ([idx] - 24) / 2 - 2 * margin
const getArrowHeight = (resourceItemIndex: number, previewCardsHeight: number[]): string => {
  const arrowHeightInPreviousResourceCard =
    resourceItemIndex === 0
      ? 0
      : (previewCardsHeight[resourceItemIndex - 1] - completedCheckboxHeight) / 2 - checkboxMargin + borderWidth;
  const arrowHeightInNextResourceCard =
    (previewCardsHeight[resourceItemIndex] - completedCheckboxHeight) / 2 - checkboxMargin + borderWidth;
  return `calc(100% + ${arrowHeightInPreviousResourceCard + arrowHeightInNextResourceCard}px)`;
};

export const StatelessLearningPathResourceItemsManager: React.FC<StatelessLearningPathResourceItemsProps> = ({
  resourceItems,
  updateDescription,
  addResourceItem,
  removeResourceItem,
  confirmDeletion,
  editMode,
  isLoading,
  currentUserStartedPath,
  resourceSelectorButtonColorScheme,
  hideProgressArrow,
}) => {
  const previewCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [previewCardsHeight, setPreviewCardsHeight] = useState<number[]>([]);

  useEffect(() => {
    previewCardsRefs.current && setPreviewCardsHeight(previewCardsRefs.current.map((c) => c?.offsetHeight as number));
    // need to watch resourceItems as ref don't change when going from 1 lp to another
  }, [resourceItems]);

  return (
    <Flex direction="column" alignItems="stretch">
      <Flex direction="column">
        <Flex direction="column" alignItems="stretch" backgroundColor="backgroundColor.0">
          {resourceItems.map(({ resource, description }, index) => (
            <Flex key={resource._id} direction="column" justifyContent="stretch">
              <Flex direction="row" py={0} position="relative">
                <Flex w="100px" borderLeft="1px solid transparent" flexShrink={0} justifyContent="center">
                  {!hideProgressArrow && (
                    <ProgressArrow
                      pxWidth={8}
                      position="absolute"
                      top={getArrowTopPosition(index, previewCardsHeight)}
                      color={
                        !isLoading &&
                        !!currentUserStartedPath &&
                        (index === 0 || resourceItems[index - 1].resource.consumed?.consumedAt)
                          ? 'teal.400'
                          : 'gray.300'
                      }
                      h={getArrowHeight(index, previewCardsHeight)}
                    />
                  )}
                </Flex>
                <Flex pt={2} pb={1} flexGrow={1}>
                  <EditableTextarea
                    flexGrow={1}
                    backgroundColor="white"
                    fontSize="lg"
                    fontWeight={300}
                    color="gray.700"
                    defaultValue={description || ''}
                    placeholder="Write something..."
                    onSubmit={(newDescription: any) => updateDescription(resource._id, newDescription as string)}
                    isDisabled={!editMode}
                    isLoading={isLoading}
                  />
                </Flex>
                <Box flexBasis="60px" flexGrow={0} flexShrink={0} />
              </Flex>
              <Flex direction="row">
                <Box flexGrow={1}>
                  <ResourcePreviewCard
                    isLoading={isLoading}
                    ref={(el) => (previewCardsRefs.current[index] = el)}
                    resource={resource}
                  />
                </Box>
                {editMode && (
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
                        isDisabled={isLoading}
                      />
                    ) : (
                      <IconButton
                        aria-label="remove resource from learning path"
                        size="xs"
                        icon={<DeleteIcon />}
                        onClick={() => removeResourceItem(resource)}
                        isDisabled={isLoading}
                      />
                    )}
                  </Flex>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
        {editMode && (
          <Flex direction="row" justifyContent="center" mt={2}>
            <ResourceSelectorModal
              onSelect={(selectedResource) => addResourceItem(selectedResource)}
              renderTrigger={({ openModal }) => (
                <IconButton
                  m={2}
                  size="lg"
                  variant="outline"
                  colorScheme={resourceSelectorButtonColorScheme}
                  isRound
                  icon={<AddIcon />}
                  aria-label="Add resource to learning path"
                  onClick={() => openModal()}
                  isDisabled={isLoading}
                />
              )}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
interface LearningPathResourceItemsProps {
  learningPath: LearningPathWithResourceItemsPreviewDataFragment;
  editMode?: boolean;
  isLoading?: boolean;
  currentUserStartedPath?: boolean;
}

export const LearningPathResourceItemsManager: React.FC<LearningPathResourceItemsProps> = ({
  learningPath,
  editMode,
  isLoading,
  currentUserStartedPath,
}) => {
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
      editMode={editMode}
      isLoading={isLoading}
      currentUserStartedPath={currentUserStartedPath}
    />
  );
};

const ProgressArrow: React.FC<{ color: BoxProps['bgColor']; h: string; pxWidth: number } & FlexProps> = ({
  color,
  h,
  pxWidth,
  ...props
}) => {
  return (
    <Flex direction="column" alignItems="center" h={h} {...props} w={`${pxWidth * 2}px`}>
      <Box w={`${pxWidth}px`} h="100%" backgroundColor={color} />
      <Box
        w={`${pxWidth * 2}px`}
        bgColor="transparent"
        borderColor={color}
        borderTopWidth={`${pxWidth * 2 - 4}px`}
        borderLeftColor="transparent"
        borderRightColor="transparent"
        borderLeftWidth={`${pxWidth * 2 - 4}px`}
        borderRightWidth={`${pxWidth * 2 - 4}px`}
      />
    </Flex>
  );
};
