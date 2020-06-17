import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/core';
import React, { useState } from 'react';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { CreateResourcePayload, ResourceMediaType, ResourceTag, ResourceType } from '../../graphql/types';
import { DomainConceptSelector } from '../concepts/DomainConceptSelector';
import { ResourceDescriptionInput } from './ResourceDescription';
import { ResourceDurationMnSelector } from './ResourceDuration';
import { ResourceMediaTypeSelector } from './ResourceMediaType';
import { SelectedTagsEditor } from './ResourceTagsEditor';
import { ResourceTypeSelector } from './ResourceType';

interface NewResourceProps {
  domain?: DomainWithConceptsDataFragment;
  onCreate: (payload: CreateResourcePayload, selectedCoveredConceptIds: string[]) => any;
}

export const NewResource: React.FC<NewResourceProps> = ({ domain, onCreate }) => {
  const [name, setName] = useState('');
  const [mediaType, setMediaType] = useState<ResourceMediaType>(ResourceMediaType.Text);
  const [type, setType] = useState<ResourceType>(ResourceType.Article);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [durationMn, setDurationMn] = useState<number | null>();
  const [selectedCoveredConcepts, setSelectedCoveredConcepts] = useState<ConceptDataFragment[]>([]);

  const [selectedTags, setSelectedTags] = useState<ResourceTag[]>([]);

  return (
    <Stack spacing={4}>
      <Input placeholder="Title" size="md" value={name} onChange={(e: any) => setName(e.target.value)}></Input>
      <Input placeholder="Url" size="md" value={url} onChange={(e: any) => setUrl(e.target.value)}></Input>
      <Flex flexDirection="row" justifyContent="space-between">
        <ResourceTypeSelector value={type} onSelect={(t) => setType(t)} />
      </Flex>
      <SelectedTagsEditor selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <ResourceMediaTypeSelector value={mediaType} onSelect={(t) => setMediaType(t)} />
        <ResourceDurationMnSelector
          value={durationMn}
          onChange={(duration?: number | null) => setDurationMn(duration)}
        />
      </Flex>
      <ResourceDescriptionInput value={description} onChange={(d) => setDescription(d)} />
      {domain && domain.concepts && (
        <Stack spacing={10} direction="row">
          <Box>
            <Text fontSize="xl">Covered concepts</Text>
            <Box width="300px">
              <DomainConceptSelector
                conceptList={domain.concepts.items
                  .map((item) => item.concept)
                  .filter((c) => !selectedCoveredConcepts.find((s) => s._id === c._id))}
                onSelect={(c) => setSelectedCoveredConcepts(selectedCoveredConcepts.concat([c]))}
              />
            </Box>
          </Box>
          <Stack>
            {selectedCoveredConcepts.map((concept) => (
              <Stack direction="row" alignItems="center" key={concept._id}>
                <Button
                  size="sm"
                  onClick={() =>
                    setSelectedCoveredConcepts(selectedCoveredConcepts.filter((s) => s._id !== concept._id))
                  }
                >
                  Remove
                </Button>
                <Text fontWeight={400}>{concept.name}</Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
      <Box>
        <Button
          size="lg"
          variant="solid"
          onClick={() =>
            onCreate(
              {
                name,
                description,
                type,
                mediaType,
                url,
                durationMn,
                tags: selectedTags.map((t) => t.name),
              },
              selectedCoveredConcepts.map((c) => c._id)
            )
          }
        >
          Create
        </Button>
      </Box>
    </Stack>
  );
};
