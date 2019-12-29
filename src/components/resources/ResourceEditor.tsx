import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/core';
import { differenceBy } from 'lodash';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import { GetResourceWithCoveredConceptsQueryResult } from '../../graphql/resources/resources.generated';
import {
  useAttachResourceCoversConcepts,
  useDetachResourceCoversConcepts,
} from '../../graphql/resources/resources.hooks';
import { ResourceMediaType, ResourceType, UpdateResourcePayload } from '../../graphql/types';

const getConceptSuggestions = (concepts: { _id: string; name: string }[], value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : concepts.filter(concept => concept.name.toLowerCase().indexOf(inputValue) >= 0);
};

const CoveredConceptsSelector: React.FC<{
  resourceId: string;
  coveredConcepts: { _id: string; name: string }[];
  conceptList: { _id: string; name: string }[];
}> = ({ coveredConcepts, conceptList, resourceId }) => {
  const [conceptSuggestions, setConceptSuggestions] = useState<{ _id: string; name: string }[]>([]);
  const [value, setValue] = useState('');

  const possibleConceptSuggestions = differenceBy(conceptList, coveredConcepts, c => c._id);

  const inputProps = {
    placeholder: 'Type a programming language',
    value,
    onChange: (event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };
  const { attachResourceCoversConcepts } = useAttachResourceCoversConcepts();
  const { detachResourceCoversConcepts } = useDetachResourceCoversConcepts();
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
        />
      </Box>
      <Text fontSize="xl">Domains</Text>
    </Box>
  );
};
interface ResourceEditorProps {
  resource: GetResourceWithCoveredConceptsQueryResult['getResourceById'];
  onSave: (editedResource: UpdateResourcePayload) => void;
}

export const ResourceEditor: React.FC<ResourceEditorProps> = ({ resource, onSave }) => {
  const [name, setName] = useState(resource.name);
  const [mediaType, setMediaType] = useState(resource.mediaType);
  const [type, setType] = useState(resource.type);
  const [url, setUrl] = useState(resource.url);
  const [description, setDescription] = useState(resource.description);
  if (!resource.domains) return null;
  const conceptList: { _id: string; name: string }[] = resource.domains.items
    .map(domain => {
      return !!domain.concepts ? domain.concepts.items : [];
    })
    .reduce((acc, c) => acc.concat(c), []);
  return (
    <Stack spacing={5}>
      <FormControl isRequired isInvalid={!name}>
        <FormLabel htmlFor="name">Resource Name</FormLabel>
        <Input
          id="name"
          placeholder="name"
          size="md"
          variant="flushed"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <Flex flexDirection="row">
        <FormControl isRequired>
          <FormLabel htmlFor="mediaType">Media Type</FormLabel>
          <RadioGroup
            id="mediaType"
            isInline
            onChange={e => setMediaType(e.target.value as ResourceMediaType)}
            value={mediaType}
          >
            <Radio value={ResourceMediaType.Text}>Text</Radio>
            <Radio value={ResourceMediaType.Video}>Video</Radio>
          </RadioGroup>
        </FormControl>
        <Box flexGrow={1}></Box>

        <FormControl isRequired>
          <FormLabel htmlFor="mediaType">Type</FormLabel>
          <RadioGroup id="type" isInline onChange={e => setType(e.target.value as ResourceType)} value={type}>
            <Radio value={ResourceType.Article}>Article</Radio>
            <Radio value={ResourceType.Introduction}>Introduction</Radio>
            <Radio value={ResourceType.Tutorial}>Tutorial</Radio>
          </RadioGroup>
        </FormControl>
      </Flex>
      <FormControl isRequired>
        <FormLabel htmlFor="url">Url</FormLabel>
        <Input
          id="url"
          placeholder="https://example.com"
          size="md"
          variant="flushed"
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          placeholder="description..."
          size="md"
          variant="flushed"
          value={description || ''}
          onChange={(e: any) => setDescription(e.target.value || undefined)}
        ></Textarea>
      </FormControl>
      {resource.domains && resource.coveredConcepts && (
        <CoveredConceptsSelector
          resourceId={resource._id}
          coveredConcepts={resource.coveredConcepts.items}
          conceptList={conceptList}
        />
      )}
      <Button
        size="lg"
        variant="solid"
        width="20rem"
        alignSelf="flex-end"
        onClick={() =>
          onSave({
            name,
            mediaType,
            type,
            url,
            description,
          })
        }
      >
        Save
      </Button>
    </Stack>
  );
};
