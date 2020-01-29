import { Box, Button, Flex, Input, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/core';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';

import { DomainDataFragment } from '../../graphql/domains/domains.generated';
import { ResourceData } from '../../graphql/resources/resources.fragments';
import { ResourceMediaType, ResourceType } from '../../graphql/types';
import { useAddResourceToDomainMutation, useCreateResourceMutation } from './NewResource.generated';

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
  domain?: DomainDataFragment;
}
export const NewResource: React.FC<NewResourceProps> = ({ domain }) => {
  const [name, setName] = useState('');
  const [mediaType, setMediaType] = useState<ResourceMediaType>(ResourceMediaType.Text);
  const [type, setType] = useState<ResourceType>(ResourceType.Article);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const [createResource] = useCreateResourceMutation();

  const [addResourceToDomain] = useAddResourceToDomainMutation();
  return (
    <Stack spacing={4} m={5}>
      <Text fontSize="2xl" textAlign="center">
        Add resource{domain && ` to ${domain.name}`}
      </Text>
      <Input
        placeholder="Name"
        size="md"
        variant="flushed"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      ></Input>
      <Flex flexDirection="row">
        <Text fontWeight={600}>Media Type:</Text>
        <RadioGroup isInline onChange={e => setMediaType(e.target.value as ResourceMediaType)} value={mediaType}>
          <Radio value={ResourceMediaType.Text}>Text</Radio>
          <Radio value={ResourceMediaType.Video}>Video</Radio>
        </RadioGroup>
        <Box flexGrow={1}></Box>
        <Text fontWeight={600}>Type:</Text>
        <RadioGroup isInline onChange={e => setType(e.target.value as ResourceType)} value={type}>
          <Radio value={ResourceType.Article}>Article</Radio>
          <Radio value={ResourceType.Introduction}>Introduction</Radio>
          <Radio value={ResourceType.Tutorial}>Tutorial</Radio>
        </RadioGroup>
      </Flex>
      <Input
        placeholder="Url"
        size="md"
        variant="flushed"
        value={url}
        onChange={(e: any) => setUrl(e.target.value)}
      ></Input>
      <Textarea
        placeholder="Description"
        size="md"
        variant="flushed"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
      ></Textarea>

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
