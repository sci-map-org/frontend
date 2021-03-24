import { AddIcon, DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Box, BoxProps, ButtonProps, Center, Flex, FlexProps, IconButton, Stack } from '@chakra-ui/react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { LearningPathWithResourceItemsPreviewDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { useUpdateLearningPathMutation } from '../../graphql/learning_paths/learning_paths.operations.generated';
import {
  ResourceDataFragment,
  ResourcePreviewDataFragment,
} from '../../graphql/resources/resources.fragments.generated';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { ResourcePreviewCard } from '../resources/ResourcePreviewCard';
import { PreviewResourceSelectorModal } from '../resources/ResourceSelector';

const completedCheckboxHeight = 38;
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

interface StatelessLearningPathResourceItemsProps {
  resourceItems: { description?: string | null; resource: ResourcePreviewDataFragment }[];
  updateDescription: (resourceId: string, description: string) => void;
  addResourceItem: (resource: ResourcePreviewDataFragment) => void;
  removeResourceItem: (resource: ResourcePreviewDataFragment) => void;
  reorderResourceItems: (originIndex: number, destinationIndex: number) => void;
  confirmDeletion?: boolean;
  editMode?: boolean;
  isLoading?: boolean;
  currentUserStartedPath?: boolean;
  resourceSelectorButtonColorScheme?: ButtonProps['colorScheme'];
  hideProgressArrow?: boolean;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
}

export const StatelessLearningPathResourceItemsManager: React.FC<StatelessLearningPathResourceItemsProps> = ({
  resourceItems,
  updateDescription,
  addResourceItem,
  removeResourceItem,
  reorderResourceItems,
  confirmDeletion,
  editMode,
  isLoading,
  currentUserStartedPath,
  resourceSelectorButtonColorScheme,
  hideProgressArrow,
  onResourceConsumed,
}) => {
  const previewCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [previewCardsHeight, setPreviewCardsHeight] = useState<number[]>([]);
  const allConsumedBeforeIndex = useMemo(() => {
    let i = 0;

    while (i < resourceItems.length && resourceItems[i].resource.consumed?.consumedAt) {
      i++;
    }
    return i;
  }, [resourceItems]);

  useEffect(() => {
    previewCardsRefs.current && setPreviewCardsHeight(previewCardsRefs.current.map((c) => c?.offsetHeight as number));
    // need to watch resourceItems as ref don't change when going from 1 lp to another
  }, [resourceItems]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) {
          return;
        }

        reorderResourceItems(result.source.index, result.destination.index);
      }}
    >
      <Flex direction="column" alignItems="stretch">
        <Flex direction="column">
          <Droppable droppableId="droppable">
            {(dropProvided, dropSnapshot) => (
              <Flex
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
                direction="column"
                alignItems="stretch"
                backgroundColor="backgroundColor.0"
              >
                {resourceItems.map((resourceItem, index) => (
                  <Draggable
                    key={resourceItem.resource._id}
                    draggableId={resourceItem.resource._id}
                    index={index}
                    isDragDisabled={!editMode}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        opacity={snapshot.isDragging ? 0.5 : 1}
                      >
                        <LearningPathResourceItem
                          resourceItem={resourceItem}
                          updateDescription={(description) => updateDescription(resourceItem.resource._id, description)}
                          onResourceConsumed={onResourceConsumed}
                          editMode={editMode}
                          isLoading={isLoading}
                          index={index}
                          confirmRemove={confirmDeletion}
                          onRemove={() => removeResourceItem(resourceItem.resource)}
                          setPreviewCardRef={(el) => (previewCardsRefs.current[index] = el)}
                          renderProgressArrow={
                            !hideProgressArrow &&
                            !dropSnapshot.isDraggingOver && (
                              <ProgressArrow
                                pxWidth={8}
                                position="absolute"
                                top={getArrowTopPosition(index, previewCardsHeight)}
                                color={
                                  !isLoading && !!currentUserStartedPath && index <= allConsumedBeforeIndex
                                    ? 'teal.400'
                                    : 'gray.300'
                                }
                                h={getArrowHeight(index, previewCardsHeight)}
                              />
                            )
                          }
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </Flex>
            )}
          </Droppable>
          {editMode && (
            <Flex direction="row" justifyContent="center" mt={2}>
              <PreviewResourceSelectorModal
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
    </DragDropContext>
  );
};

interface LearningPathResourceItemProps {
  resourceItem: { description?: string | null; resource: ResourcePreviewDataFragment };
  updateDescription: (description: string) => void;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  isLoading?: boolean;
  index: number;
  editMode?: boolean;
  confirmRemove?: boolean;
  onRemove: () => void;
  setPreviewCardRef: (el: HTMLDivElement | null) => void;
  renderProgressArrow: ReactNode;
}
const LearningPathResourceItem: React.FC<LearningPathResourceItemProps> = ({
  resourceItem: { resource, description },
  updateDescription,
  onResourceConsumed,
  isLoading,
  editMode,
  index,
  confirmRemove,
  onRemove,
  setPreviewCardRef,
  renderProgressArrow,
}) => {
  return (
    <Flex key={resource._id} direction="column" justifyContent="stretch">
      <Flex direction="row" py={0} position="relative">
        <Flex w="100px" borderLeft="1px solid transparent" flexShrink={0} justifyContent="center">
          {renderProgressArrow}
        </Flex>
        <Center pt={index === 0 ? 0 : 10} pb={8} flexGrow={1}>
          <Box w={{ base: '95%', md: '90%', lg: '85%' }}>
            <EditableTextarea
              flexGrow={1}
              flexShrink={1}
              backgroundColor="white"
              fontSize="lg"
              fontWeight={400}
              defaultValue={description || ''}
              placeholder="Write something..."
              onSubmit={(newDescription: any) => updateDescription(newDescription as string)}
              isDisabled={!editMode}
              isLoading={isLoading}
            />
          </Box>
        </Center>
        <Box flexBasis="60px" flexGrow={0} flexShrink={0} />
      </Flex>
      <Flex direction="row">
        <Box flexGrow={1}>
          <ResourcePreviewCard
            isLoading={isLoading}
            ref={setPreviewCardRef}
            resource={resource}
            onResourceConsumed={onResourceConsumed}
            expandByDefault
          />
        </Box>
        {editMode && (
          <Flex
            flexBasis="60px"
            flexShrink={0}
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Box>
              <DragHandleIcon size="lg" _hover={{ cursor: 'move' }} />
            </Box>
            {confirmRemove ? (
              <DeleteButtonWithConfirmation
                variant="ghost"
                modalBodyText={`Remove the resource "${resource.name}" from the learning path?`}
                modalHeaderText="Remove Resource"
                onConfirmation={onRemove}
                isDisabled={isLoading}
              />
            ) : (
              <IconButton
                aria-label="remove resource from learning path"
                variant="ghost"
                icon={<DeleteIcon />}
                onClick={onRemove}
                isDisabled={isLoading}
              />
            )}
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
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
}

export const LearningPathResourceItemsManager: React.FC<LearningPathResourceItemsProps> = ({
  learningPath,
  editMode,
  isLoading,
  currentUserStartedPath,
  onResourceConsumed,
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

  const reorderResourceItems = (originIndex: number, destinationIndex: number) => {
    if (!learningPath.resourceItems) return;
    const updatedResourceItems = Array.from(learningPath.resourceItems);
    const [removed] = updatedResourceItems.splice(originIndex, 1);
    updatedResourceItems.splice(destinationIndex, 0, removed);

    updateLearningPath({
      variables: {
        _id: learningPath._id,
        payload: {
          resourceItems: updatedResourceItems.map(({ description, resource }) => ({
            resourceId: resource._id,
            description,
          })),
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateLearningPath: {
          ...learningPath,
          resourceItems: updatedResourceItems,
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
      reorderResourceItems={reorderResourceItems}
      resourceItems={learningPath.resourceItems}
      confirmDeletion
      editMode={editMode}
      isLoading={isLoading}
      currentUserStartedPath={currentUserStartedPath}
      onResourceConsumed={onResourceConsumed}
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
