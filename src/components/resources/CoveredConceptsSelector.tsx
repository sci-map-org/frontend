import { Box, Button, Input, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { differenceBy } from 'lodash';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

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

const getConceptSuggestions = (concepts: { _id: string; name: string }[], value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : concepts.filter(concept => concept.name.toLowerCase().indexOf(inputValue) >= 0);
};

export const CoveredConceptsSelector: React.FC<{
  resourceId: string;
  coveredConcepts: { _id: string; name: string }[];
  conceptList: { _id: string; name: string }[];
}> = ({ coveredConcepts, conceptList, resourceId }) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<{ _id: string; name: string }[]>([]);
  const [value, setValue] = useState('');

  const possibleConceptSuggestions = differenceBy(conceptList, coveredConcepts, c => c._id);

  const inputProps = {
    placeholder: 'Search concepts',
    value,
    onChange: (event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };
  const [attachResourceCoversConcepts] = useAttachResourceCoversConceptsMutation();
  const [detachResourceCoversConcepts] = useDetachResourceCoversConceptsMutation();
  const selectConcept = async (conceptId: string): Promise<void> => {
    await attachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
    setValue('');
  };
  const removeConcept = async (conceptId: string) => {
    await detachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  return (
    <Box>
      <Text fontSize="xl">Covered concepts</Text>
      <Box>
        {coveredConcepts.map(concept => {
          return (
            <Box key={concept._id} my={2}>
              <Button onClick={() => removeConcept(concept._id)}>Remove</Button>
              {concept.name}
            </Box>
          );
        })}

        <Autosuggest
          suggestions={conceptSuggestions}
          inputProps={inputProps}
          onSuggestionsFetchRequested={({ value }) =>
            setConceptSuggestions(getConceptSuggestions(possibleConceptSuggestions, value))
          }
          onSuggestionsClearRequested={() => setConceptSuggestions([])}
          onSuggestionSelected={(e, { suggestion }) => selectConcept(suggestion._id)}
          renderSuggestion={suggestion => <Box>{suggestion.name}</Box>}
          getSuggestionValue={suggestion => suggestion.name}
          renderInputComponent={(inputProps: any) => <Input {...inputProps} size="sm" width="18rem" />}
        />
      </Box>
    </Box>
  );
};
