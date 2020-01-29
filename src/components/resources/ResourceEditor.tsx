import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { useState } from 'react';

import { ResourceMediaType, ResourceType, UpdateResourcePayload } from '../../graphql/types';
import { GetResourceEditResourcePageQuery } from '../../pages/resources/EditResourcePage.generated';
import { CoveredConceptsSelector } from './CoveredConceptsSelector';

interface ResourceEditorProps {
  resource: GetResourceEditResourcePageQuery['getResourceById'];
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
      {resource.domains && (
        <Box>
          <Text fontSize="xl">Domains</Text>
          {resource.domains.items.map(domain => (
            <NextLink key={domain._id} href={`/domains/${domain.key}`}>
              <Link>{domain.name}</Link>
            </NextLink>
          ))}
        </Box>
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
