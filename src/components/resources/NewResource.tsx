import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/core';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { CreateResourcePayload, ResourceMediaType, ResourceTag, ResourceType } from '../../graphql/types';
import { validateUrl } from '../../services/url.service';
import { ConceptsPicker } from '../concepts/ConceptsPicker';
import { ResourceDescriptionInput } from './ResourceDescription';
import { ResourceDurationSelector } from './ResourceDuration';
import { ResourceMediaTypeSelector } from './ResourceMediaType';
import { ResourceTagsStatelessEditor } from './ResourceTagsEditor';
import { ResourceTypeSelector } from './ResourceType';
import { ResourceUrlInput } from './ResourceUrl';

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
  const [durationMs, setDurationMs] = useState<number | null>();
  const [selectedCoveredConcepts, setSelectedCoveredConcepts] = useState<ConceptDataFragment[]>([]);

  const [selectedTags, setSelectedTags] = useState<ResourceTag[]>([]);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(!!name && !!url && validateUrl(url));
  }, [name, url]);
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input placeholder="Title" size="md" id="title" value={name} onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
      <ResourceUrlInput value={url} onChange={setUrl} />
      <Flex flexDirection="row" justifyContent="space-between">
        <ResourceTypeSelector value={type} onSelect={(t) => setType(t)} />
      </Flex>
      <ResourceTagsStatelessEditor selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <ResourceMediaTypeSelector value={mediaType} onSelect={(t) => setMediaType(t)} />
        <ResourceDurationSelector value={durationMs} onChange={setDurationMs} />
      </Flex>
      <ResourceDescriptionInput value={description} onChange={(d) => setDescription(d)} />
      {domain && domain.concepts && (
        <Stack spacing={10} direction="row">
          <Box>
            <ConceptsPicker
              title="Covered Concepts"
              pickableConceptList={domain.concepts.items
                .map((item) => item.concept)
                .filter((c) => !selectedCoveredConcepts.find((s) => s._id === c._id))}
              pickedConceptList={selectedCoveredConcepts}
              onSelect={(c) => setSelectedCoveredConcepts(selectedCoveredConcepts.concat([c]))}
              onRemove={(c) => setSelectedCoveredConcepts(selectedCoveredConcepts.filter((s) => s._id !== c._id))}
            />
          </Box>
        </Stack>
      )}
      <Flex justifyContent="flex-end">
        <ButtonGroup spacing={8}>
          <Button size="lg" variant="outline" w="18rem" onClick={() => Router.back()}>
            Cancel
          </Button>
          <Button
            w="18rem"
            size="lg"
            colorScheme="brand"
            variant="solid"
            isDisabled={!isValid}
            onClick={() =>
              onCreate(
                {
                  name,
                  description,
                  type,
                  mediaType,
                  url,
                  durationMs,
                  tags: selectedTags.map((t) => t.name),
                },
                selectedCoveredConcepts.map((c) => c._id)
              )
            }
          >
            Create
          </Button>
        </ButtonGroup>
      </Flex>
    </Stack>
  );
};
