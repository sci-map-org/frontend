import { Box, Button, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';

const getConceptSuggestions = (entities: ConceptDataFragment[], value: string): ConceptDataFragment[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? entities
    : entities.filter((entity) => entity.name.toLowerCase().indexOf(inputValue) >= 0).slice(0, 10);
};

interface ConceptsPickerProps {
  title: string;
  pickableConceptList: ConceptDataFragment[];
  pickedConceptList: ConceptDataFragment[];
  onSelect: (concept: ConceptDataFragment) => void;
  onRemove: (concept: ConceptDataFragment) => void;
}

export const ConceptsPicker: React.FC<ConceptsPickerProps> = ({
  title,
  pickableConceptList,
  pickedConceptList,
  onSelect,
  onRemove,
}) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<ConceptDataFragment[]>([]);
  return (
    <Stack direction="row" width="26rem" borderWidth="1px" borderRadius={5} p={3} spacing={5}>
      <EntitySelector
        placeholder="Search Concepts"
        entitySuggestions={conceptSuggestions}
        fetchEntitySuggestions={(v: string) => setConceptSuggestions(getConceptSuggestions(pickableConceptList, v))}
        onSelect={onSelect}
      />
      <Stack>
        <Text fontWeight={700}>{title}</Text>
        <Box>
          {pickedConceptList.map((pickedConcept) => {
            return (
              <Box key={pickedConcept._id} my={2}>
                <Button onClick={() => onRemove(pickedConcept)} size="xs">
                  Remove
                </Button>
                {pickedConcept.name}
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Stack>
  );
};
