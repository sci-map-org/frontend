import { Box, Button, Flex, FormControl, FormLabel, Input, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useState } from 'react';

import { UpdateResourcePayload } from '../../graphql/types';
import { GetResourceEditResourcePageQuery } from '../../pages/resources/EditResourcePage.generated';
import { CoveredConceptsSelector } from './CoveredConceptsSelector';
import { ResourceMediaTypeSelector, ResourceTypeSelector } from './NewResource';
import { ResourceDescriptionInput } from './ResourceDescription';
import { ResourceDurationMnSelector } from './ResourceDuration';

interface ResourceEditorProps {
  resource: GetResourceEditResourcePageQuery['getResourceById'];
  onSave: (editedResource: UpdateResourcePayload) => void;
}

export const ResourceEditor: React.FC<ResourceEditorProps> = ({ resource, onSave }) => {
  const [name, setName] = useState(resource.name);
  const [mediaType, setMediaType] = useState(resource.mediaType);
  const [type, setType] = useState(resource.type);

  const [url, setUrl] = useState(resource.url);
  const [durationMn, setDurationMn] = useState(resource.durationMn || undefined);
  const [description, setDescription] = useState(resource.description || undefined);

  if (!resource.domains) return null;

  const conceptList: { _id: string; name: string }[] = resource.domains.items
    .map(domain => {
      return !!domain.concepts ? domain.concepts.items : [];
    })
    .reduce((acc, c) => acc.concat(c), []);

  return (
    <Stack spacing={4}>
      <Text mb={5} fontSize="3xl" textAlign="center">
        Edit - {resource.name}
      </Text>
      <FormControl isRequired isInvalid={!name}>
        <FormLabel htmlFor="name">Title</FormLabel>
        <Input
          id="name"
          placeholder="name"
          size="md"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="url">Url</FormLabel>
        <Input
          id="url"
          placeholder="https://example.com"
          size="md"
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
        ></Input>
      </FormControl>
      <Flex direction="row">
        <ResourceTypeSelector value={type} onSelect={t => setType(t)} />
      </Flex>
      <Flex flexDirection="row">
        <ResourceMediaTypeSelector value={mediaType} onSelect={t => setMediaType(t)} />
        <Box flexGrow={1}></Box>
        <ResourceDurationMnSelector value={durationMn} onChange={v => setDurationMn(v)} />
      </Flex>
      <ResourceDescriptionInput value={description} onChange={d => setDescription(d)} />
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
            durationMn,
          })
        }
      >
        Save
      </Button>
    </Stack>
  );
};
