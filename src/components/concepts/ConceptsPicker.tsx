import { Box, Button, IconButton, Stack, Text } from '@chakra-ui/core';
import { MinusIcon } from '@chakra-ui/icons';
import { take } from 'lodash';
import { useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { InternalLink } from '../navigation/InternalLink';

const getConceptSuggestions = (entities: ConceptDataFragment[], value: string): ConceptDataFragment[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? entities
    : entities.filter((entity) => entity.name.toLowerCase().indexOf(inputValue) >= 0).slice(0, 10);
};

interface ConceptsPickerProps {
  title?: string;
  placeholder?: string;
  pickableConceptList: ConceptDataFragment[];
  pickedConceptList: ConceptDataFragment[];
  onSelect: (concept: ConceptDataFragment) => void;
  onRemove: (concept: ConceptDataFragment) => void;
  maxNbConceptsShown?: number;
}

export const ConceptsPicker: React.FC<ConceptsPickerProps> = ({
  title,
  placeholder,
  pickableConceptList,
  pickedConceptList,
  maxNbConceptsShown = 5,
  onSelect,
  onRemove,
}) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<ConceptDataFragment[]>([]);
  const [showAll, setShowAll] = useState(false);
  return (
    <Stack direction="row" spacing={5}>
      <Stack direction="column" alignItems="start">
        {title && <Text fontWeight={700}>{title}</Text>}
        <Box>
          {(showAll ? pickedConceptList : take(pickedConceptList, maxNbConceptsShown)).map((pickedConcept) => {
            return (
              <Stack spacing={2} direction="row" alignItems="center" key={pickedConcept._id} my={1}>
                <IconButton
                  aria-label="remove concept"
                  onClick={() => onRemove(pickedConcept)}
                  size="xs"
                  icon={<MinusIcon />}
                />
                <Text fontSize="sm">{pickedConcept.name}</Text>
              </Stack>
            );
          })}
        </Box>
        {pickedConceptList.length > maxNbConceptsShown && !showAll && (
          <Button onClick={() => setShowAll(true)} size="xs">
            Show all (+{pickedConceptList.length - maxNbConceptsShown})
          </Button>
        )}
        {showAll && (
          <Button onClick={() => setShowAll(false)} size="xs">
            Show less
          </Button>
        )}
        <EntitySelector
          inputSize="sm"
          placeholder={placeholder || 'Search Concepts'}
          entitySuggestions={conceptSuggestions}
          fetchEntitySuggestions={(v: string) => setConceptSuggestions(getConceptSuggestions(pickableConceptList, v))}
          onSelect={onSelect}
        />
      </Stack>
    </Stack>
  );
};
