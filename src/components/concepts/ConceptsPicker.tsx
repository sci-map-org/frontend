import { Box, Stack, Text, Button } from '@chakra-ui/core';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainConceptSelector } from './DomainConceptSelector';

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
  return (
    <Stack direction="row" width="26rem" borderWidth="1px" borderRadius={5} p={3} spacing={5}>
      <DomainConceptSelector conceptList={pickableConceptList} onSelect={onSelect} />
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
