import { Box, FormErrorMessage, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { uniq } from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ResourceType } from '../../../graphql/types';
import { Field } from '../../lib/fields/Field';
import { ResourceTypeBadge } from '../elements/ResourceType';

export const ResourceTypeSuggestions: ResourceType[] = [
  ResourceType.Article,
  ResourceType.ArticleSeries,
  ResourceType.ResearchPaper,
  ResourceType.Book,
  ResourceType.OnlineBook,
  ResourceType.Course,
  ResourceType.Documentary,
  ResourceType.Talk,
  ResourceType.Podcast,
  ResourceType.PodcastEpisode,
  ResourceType.Website,
  ResourceType.Exercise,
  ResourceType.Project,
  ResourceType.VideoGame,
  ResourceType.Other,
];

export const ResourceTypeField: React.FC<{
  value?: ResourceType[];
  onChange: (types: ResourceType[]) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  selectableResourceTypes: ResourceType[];
}> = ({ value, onChange, isInvalid, selectableResourceTypes, errorMessage }) => {
  return (
    <Field
      label="Resource Types"
      isInvalid={isInvalid}
      renderRightOfLabel={
        value && (
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) {
                return;
              }
              console.log('ondragend');
              const updatedResourceTypes = Array.from(value);
              const [removed] = updatedResourceTypes.splice(result.source.index, 1);
              updatedResourceTypes.splice(result.destination.index, 0, removed);
              onChange(updatedResourceTypes);
            }}
          >
            <Droppable droppableId="droppable" direction="horizontal">
              {(dropProvided, dropSnapshot) => (
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                >
                  {value.map((selectedResourceType, index) => (
                    <Draggable key={selectedResourceType} draggableId={selectedResourceType} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          opacity={snapshot.isDragging ? 0.5 : 1}
                        >
                          <ResourceTypeBadge
                            type={selectedResourceType}
                            onClick={() => onChange(value.filter((v) => v !== selectedResourceType))}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {dropProvided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        )
      }
      helperText="Select all that applies. Pick at least one."
    >
      <Wrap spacing={4} align="center">
        {selectableResourceTypes
          .filter((suggestion) => !value?.find((v) => v === suggestion))
          .map((resourceType) => (
            <WrapItem key={resourceType}>
              <ResourceTypeBadge
                type={resourceType}
                onClick={() => onChange(uniq([...(value || []), resourceType]))}
                opacity={0.8}
              />
            </WrapItem>
          ))}
      </Wrap>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </Field>
  );
};
