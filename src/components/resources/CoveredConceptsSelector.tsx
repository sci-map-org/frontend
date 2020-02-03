import { Box, Button, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { differenceBy } from 'lodash';
import { useState } from 'react';

import { DomainConceptSelector } from '../concepts/DomainConceptSelector';
import {
  useAttachResourceCoversConceptsMutation,
  useDetachResourceCoversConceptsMutation,
} from './CoveredConceptsSelector.generated';

export const attachResourceCoversConcepts = gql`
  mutation attachResourceCoversConcepts($resourceId: String!, $conceptIds: [String!]!) {
    attachResourceCoversConcepts(resourceId: $resourceId, conceptIds: $conceptIds) {
      _id
      coveredConcepts(options: {}) {
        items {
          _id
          name
        }
      }
    }
  }
`;
export const detachResourceCoversConcepts = gql`
  mutation detachResourceCoversConcepts($resourceId: String!, $conceptIds: [String!]!) {
    detachResourceCoversConcepts(resourceId: $resourceId, conceptIds: $conceptIds) {
      _id
      coveredConcepts(options: {}) {
        items {
          _id
          name
        }
      }
    }
  }
`;

export const CoveredConceptsSelector: React.FC<{
  resourceId: string;
  coveredConcepts: { _id: string; name: string }[];
  conceptList: { _id: string; name: string }[];
}> = ({ coveredConcepts, conceptList, resourceId }) => {
  const possibleConceptSuggestions = differenceBy(conceptList, coveredConcepts, c => c._id);

  const [attachResourceCoversConcepts] = useAttachResourceCoversConceptsMutation();
  const [detachResourceCoversConcepts] = useDetachResourceCoversConceptsMutation();
  const selectConcept = async (conceptId: string): Promise<void> => {
    await attachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  const removeConcept = async (conceptId: string) => {
    await detachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  console.log(possibleConceptSuggestions);
  return (
    <Box>
      <Text fontSize="xl">Covered concepts</Text>
      <Stack spacing={10} direction="row">
        <DomainConceptSelector conceptList={possibleConceptSuggestions} onSelect={c => selectConcept(c._id)} />
        <Box>
          {coveredConcepts.map(concept => {
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
