import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';

import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceMediaType, ResourceType } from '../../graphql/types';
import { useAddResourceToDomainMutation, useCreateResourceMutation } from './NewResource.generated';
import { DomainDataFragment, DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { values, upperFirst } from 'lodash';
import { DomainConceptSelector } from '../concepts/DomainConceptSelector';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';

export const createResource = gql`
  mutation createResource($payload: CreateResourcePayload!) {
    createResource(payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

export const addResourceToDomain = gql`
  mutation addResourceToDomain($domainId: String!, $payload: CreateResourcePayload!) {
    addResourceToDomain(domainId: $domainId, payload: $payload) {
      ...ResourceData
    }
  }
  ${ResourceData}
`;

interface NewResourceProps {
  domain?: DomainWithConceptsDataFragment;
}
export const NewResource: React.FC<NewResourceProps> = ({ domain }) => {
  const [name, setName] = useState('');
  const [mediaType, setMediaType] = useState<ResourceMediaType>(ResourceMediaType.Text);
  const [type, setType] = useState<ResourceType>(ResourceType.Article);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [durationMn, setDurationMn] = useState<number>();
  const [selectedCoveredConcepts, setSelectedCoveredConcepts] = useState<ConceptDataFragment[]>([]);
  const [createResource] = useCreateResourceMutation();

  const [addResourceToDomain] = useAddResourceToDomainMutation();
  return (
    <Stack spacing={4} py={5} px="10rem">
      <Text fontSize="2xl" textAlign="center">
        Add resource{domain && ` to ${domain.name}`}
      </Text>
      <Input
        placeholder="Title"
        size="md"
        // variant="flushed"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      ></Input>
      <Input placeholder="Url" size="md" value={url} onChange={(e: any) => setUrl(e.target.value)}></Input>
      <Flex flexDirection="row" justifyContent="space-between">
        {/* <FormControl>
          <FormLabel htmlFor="resourceMediaType">Media Type</FormLabel>
          <Select placeholder="Select Media Type">
            {values(ResourceMediaType).map(mediaType => (
              <option key={mediaType} value={mediaType}>
                {upperFirst(mediaType)}
              </option>
            ))}
          </Select>
        </FormControl> */}
        <Stack direction="row" alignItems="center">
          <Box fontWeight={600} whiteSpace="nowrap">
            Media Type
          </Box>
          <Select placeholder="Select Media Type" onChange={e => setMediaType(e.target.value as ResourceMediaType)}>
            {values(ResourceMediaType).map(mediaType => (
              <option key={mediaType} value={mediaType}>
                {upperFirst(mediaType)}
              </option>
            ))}
          </Select>
        </Stack>
        {/* <RadioGroup isInline onChange={e => setMediaType(e.target.value as ResourceMediaType)} value={mediaType}>
          <Radio value={ResourceMediaType.Text}>Text</Radio>
          <Radio value={ResourceMediaType.Video}>Video</Radio>
        </RadioGroup> */}
        {/* <Box flexGrow={1}></Box> */}
        <Stack direction="row" alignItems="center">
          <Text fontWeight={600}>Type</Text>
          <Select placeholder="Select Type" onChange={e => setType(e.target.value as ResourceType)}>
            {values(ResourceType).map(type => (
              <option key={type} value={type}>
                {upperFirst(type)}
              </option>
            ))}
          </Select>
        </Stack>
        {/* <Text fontWeight={600}>Type:</Text>
        <RadioGroup isInline onChange={e => setType(e.target.value as ResourceType)} value={type}>
          <Radio value={ResourceType.Article}>Article</Radio>
          <Radio value={ResourceType.Introduction}>Introduction</Radio>
          <Radio value={ResourceType.Tutorial}>Tutorial</Radio>
        </RadioGroup> */}
      </Flex>
      <Flex direction="row" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Text fontWeight={600}>Estimated Duration</Text>
          <NumberInput step={5} min={0} max={600} value={durationMn} onChange={(value: any) => setDurationMn(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </Flex>
      <FormControl isInvalid={description.length > 200}>
        <Textarea
          id="description"
          placeholder="Description (optional)"
          size="md"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        ></Textarea>
        <FormHelperText textAlign="right" id="description-helper-text">
          {description.length}/200
        </FormHelperText>
      </FormControl>
      {domain && domain.concepts && (
        <>
          <DomainConceptSelector
            conceptList={domain.concepts.items.filter(c => !selectedCoveredConcepts.find(s => s._id === c._id))}
            onChange={c => setSelectedCoveredConcepts(selectedCoveredConcepts.concat([c]))}
          />
          <Stack>
            {selectedCoveredConcepts.map(concept => (
              <Stack direction="row" alignItems="center" key={concept._id}>
                <Button
                  size="sm"
                  onClick={() => setSelectedCoveredConcepts(selectedCoveredConcepts.filter(s => s._id !== concept._id))}
                >
                  Remove
                </Button>
                <Text fontWeight={400}>{concept.name}</Text>
              </Stack>
            ))}
          </Stack>
        </>
      )}
      <Box>
        <Button
          size="lg"
          variant="solid"
          onClick={async () => {
            const payload = {
              name,
              description,
              type,
              mediaType,
              url,
            };
            if (domain) {
              addResourceToDomain({
                variables: {
                  domainId: domain._id,
                  payload,
                },
              }).then(({ data }) => {
                data && Router.push(`/resources/${data.addResourceToDomain._id}`);
              });
            } else {
              createResource({ variables: { payload } }).then(({ data }) => {
                data && Router.push(`/resources/${data.createResource._id}`);
              });
            }
          }}
        >
          Create
        </Button>
      </Box>
    </Stack>
  );
};
