import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from '@chakra-ui/core';
import { uniqBy, upperFirst, values } from 'lodash';
import React, { useState } from 'react';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { CreateResourcePayload, ResourceMediaType, ResourceTag, ResourceType } from '../../graphql/types';
import { DomainConceptSelector } from '../concepts/DomainConceptSelector';
import { ResourceTagSelector } from '../input/ResourceTagSelector';

export const SelectedTagsEditor: React.FC<{
  selectedTags: ResourceTag[];
  setSelectedTags: (tags: ResourceTag[]) => any;
}> = ({ selectedTags, setSelectedTags }) => {
  return (
    <Flex direction="row">
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Text fontWeight={600}>Tags</Text>
        <ResourceTagSelector onSelect={r => setSelectedTags(uniqBy(selectedTags.concat({ name: r.name }), 'name'))} />
      </Stack>
      <Stack spacing={2} direction="row" flexGrow={1} alignItems="flex-start">
        {selectedTags.map(selectedTag => (
          <Tag size="md" variantColor="gray" key={selectedTag.name}>
            <TagLabel>{selectedTag.name}</TagLabel>
            <TagCloseButton onClick={() => setSelectedTags(selectedTags.filter(s => s.name !== selectedTag.name))} />
          </Tag>
        ))}
      </Stack>
    </Flex>
  );
};

export const ResourceTypeSelector: React.FC<{ value: ResourceType; onSelect: (type: ResourceType) => void }> = ({
  onSelect,
  value,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <Text fontWeight={600}>Type</Text>
      <Select placeholder="Select Type" value={value} onChange={e => onSelect(e.target.value as ResourceType)}>
        {values(ResourceType).map(type => (
          <option key={type} value={type}>
            {upperFirst(type)}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export const ResourceMediaTypeSelector: React.FC<{
  value: ResourceMediaType;
  onSelect: (mediaType: ResourceMediaType) => void;
}> = ({ onSelect, value }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Box fontWeight={600} whiteSpace="nowrap">
        Media Type
      </Box>
      <Select
        placeholder="Select Media Type"
        value={value}
        onChange={e => onSelect(e.target.value as ResourceMediaType)}
      >
        {values(ResourceMediaType).map(mediaType => (
          <option key={mediaType} value={mediaType}>
            {upperFirst(mediaType)}
          </option>
        ))}
      </Select>
    </Stack>
  );
};
interface NewResourceProps {
  domain?: DomainWithConceptsDataFragment;
  onCreate: (payload: CreateResourcePayload) => any;
}
export const NewResource: React.FC<NewResourceProps> = ({ domain, onCreate }) => {
  const [name, setName] = useState('');
  const [mediaType, setMediaType] = useState<ResourceMediaType>(ResourceMediaType.Text);
  const [type, setType] = useState<ResourceType>(ResourceType.Article);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [durationMn, setDurationMn] = useState<number>();
  const [selectedCoveredConcepts, setSelectedCoveredConcepts] = useState<ConceptDataFragment[]>([]);

  const [selectedTags, setSelectedTags] = useState<ResourceTag[]>([]);

  return (
    <Stack spacing={4}>
      <Text fontSize="3xl" textAlign="center">
        {domain ? 'Add' : 'Create'} resource{domain && ` to ${domain.name}`}
      </Text>
      <Input placeholder="Title" size="md" value={name} onChange={(e: any) => setName(e.target.value)}></Input>
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

        {/* <RadioGroup isInline onChange={e => setMediaType(e.target.value as ResourceMediaType)} value={mediaType}>
          <Radio value={ResourceMediaType.Text}>Text</Radio>
          <Radio value={ResourceMediaType.Video}>Video</Radio>
        </RadioGroup> */}
        {/* <Box flexGrow={1}></Box> */}

        <ResourceTypeSelector value={type} onSelect={t => setType(t)} />

        {/* <Text fontWeight={600}>Type:</Text>
        <RadioGroup isInline onChange={e => setType(e.target.value as ResourceType)} value={type}>
          <Radio value={ResourceType.Article}>Article</Radio>
          <Radio value={ResourceType.Introduction}>Introduction</Radio>
          <Radio value={ResourceType.Tutorial}>Tutorial</Radio>
        </RadioGroup> */}
      </Flex>
      <SelectedTagsEditor selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <ResourceMediaTypeSelector value={mediaType} onSelect={t => setMediaType(t)} />
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
        <Stack spacing={10} direction="row">
          <Box>
            <Text fontSize="xl">Covered concepts</Text>
            <Box width="300px">
              <DomainConceptSelector
                conceptList={domain.concepts.items.filter(c => !selectedCoveredConcepts.find(s => s._id === c._id))}
                onSelect={c => setSelectedCoveredConcepts(selectedCoveredConcepts.concat([c]))}
              />
            </Box>
          </Box>
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
        </Stack>
      )}
      <Box>
        <Button
          size="lg"
          variant="solid"
          onClick={() =>
            onCreate({
              name,
              description,
              type,
              mediaType,
              url,
              tags: selectedTags.map(t => t.name),
            })
          }
        >
          Create
        </Button>
      </Box>
    </Stack>
  );
};
