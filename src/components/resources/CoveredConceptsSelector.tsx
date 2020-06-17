import { Box, Button, Stack, Text } from '@chakra-ui/core';
import { differenceBy } from 'lodash';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainConceptSelector } from '../concepts/DomainConceptSelector';
import {
  useAttachResourceCoversConceptsMutation,
  useDetachResourceCoversConceptsMutation,
} from '../../graphql/resources/resources.operations.generated';

export const CoveredConceptsSelector: React.FC<{
  resourceId: string;
  coveredConcepts: ConceptDataFragment[];
  conceptList: ConceptDataFragment[];
}> = ({ coveredConcepts, conceptList, resourceId }) => {
  const possibleConceptSuggestions = differenceBy(conceptList, coveredConcepts, (c) => c._id);

  const [attachResourceCoversConcepts] = useAttachResourceCoversConceptsMutation();
  const [detachResourceCoversConcepts] = useDetachResourceCoversConceptsMutation();
  const selectConcept = async (conceptId: string): Promise<void> => {
    await attachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  const removeConcept = async (conceptId: string) => {
    await detachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  return (
    <Box>
      <Text fontSize="xl">Covered concepts</Text>
      <Stack spacing={10} direction="row">
        <DomainConceptSelector conceptList={possibleConceptSuggestions} onSelect={(c) => selectConcept(c._id)} />
        <Box>
          {coveredConcepts.map((concept) => {
            return (
              <Box key={concept._id} my={2}>
                <Button onClick={() => removeConcept(concept._id)}>Remove</Button>
                {concept.name}
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};
