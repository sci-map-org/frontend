import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { UpdateResourcePayload } from '../../graphql/types';
import { GetResourceEditResourcePageQuery } from '../../pages/resources/EditResourcePage.generated';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceDescriptionInput } from './ResourceDescription';
import { ResourceDurationSelector } from './ResourceDuration';
import { ResourceMediaTypeSelector } from './ResourceMediaType';
import { ResourceTypeSelector } from './ResourceType';
import { ResourceUrlInput } from './ResourceUrl';

interface ResourceEditorProps {
  resource: GetResourceEditResourcePageQuery['getResourceById'];
  onSave: (editedResource: UpdateResourcePayload) => void;
}

export const ResourceEditor: React.FC<ResourceEditorProps> = ({ resource, onSave }) => {
  const [name, setName] = useState(resource.name);
  const [mediaType, setMediaType] = useState(resource.mediaType);
  const [type, setType] = useState(resource.type);

  const [url, setUrl] = useState(resource.url);
  const [durationMs, setDurationMs] = useState(resource.durationMs);
  const [description, setDescription] = useState(resource.description || undefined);

  if (!resource.domains) return null;

  return (
    <Stack spacing={4}>
      <Text mb={5} fontSize="3xl" textAlign="center">
        Edit - {resource.name}
      </Text>
      <FormControl isRequired isInvalid={!name}>
        <FormLabel htmlFor="name">Title</FormLabel>
        <Input id="name" placeholder="name" size="md" value={name} onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
      <ResourceUrlInput value={url} onChange={setUrl} />
      <Flex direction="row">
        <ResourceTypeSelector value={type} onSelect={(t) => setType(t)} />
      </Flex>
      <Flex flexDirection="row">
        <ResourceMediaTypeSelector value={mediaType} onSelect={(t) => setMediaType(t)} />
        <Box flexGrow={1}></Box>
        <ResourceDurationSelector value={durationMs} onChange={setDurationMs} />
      </Flex>
      <ResourceDescriptionInput value={description} onChange={(d) => setDescription(d)} />
      {resource.domains && (
        <Box>
          <Text fontSize="xl">Domains</Text>
          {resource.domains.items.map((domain) => (
            <InternalLink key={domain._id} asHref={`/domains/${domain.key}`} routePath="/domains/[key]">
              {domain.name}
            </InternalLink>
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
            durationMs,
          })
        }
      >
        Save
      </Button>
    </Stack>
  );
};
