import { Flex, Stack, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/core';
import { uniqBy } from 'lodash';
import React from 'react';
import { ResourceTag } from '../../graphql/types';
import { ResourceTagSelector } from '../input/ResourceTagSelector';

export const SelectedTagsViewer: React.FC<{ selectedTags?: ResourceTag[] | null }> = ({ selectedTags }) => {
  if (!selectedTags || !selectedTags.length) return null;
  return (
    <Text fontWeight={250} pb={2} as="span">
      {selectedTags.map((tag, idx) => (
        <Tag size="sm" variantColor="gray" key={idx} mr={2} as="span">
          <TagLabel>{tag.name}</TagLabel>
        </Tag>
      ))}
    </Text>
  );
};

export const SelectedTagsEditor: React.FC<{
  selectedTags: ResourceTag[];
  setSelectedTags?: (tags: ResourceTag[]) => void;
  onSelect?: (tag: ResourceTag) => void;
  onRemove?: (tag: ResourceTag) => void;
  isDisabled?: boolean;
}> = ({ selectedTags, setSelectedTags, onSelect, onRemove, isDisabled }) => {
  return (
    <Flex direction="row" alignItems="baseline">
      <ResourceTagSelector
        isDisabled={isDisabled}
        onSelect={(r) => {
          setSelectedTags && setSelectedTags(uniqBy(selectedTags.concat({ name: r.name }), 'name'));
          onSelect && onSelect({ name: r.name });
        }}
      />
      <Stack spacing={2} direction="row" flexGrow={1} alignItems="flex-start">
        {selectedTags.map((selectedTag) => (
          <Tag size="md" variantColor="gray" key={selectedTag.name}>
            <TagLabel>{selectedTag.name}</TagLabel>
            <TagCloseButton
              isDisabled={isDisabled}
              onClick={() => {
                setSelectedTags && setSelectedTags(selectedTags.filter((s) => s.name !== selectedTag.name));
                onRemove && onRemove(selectedTag);
              }}
            />
          </Tag>
        ))}
      </Stack>
    </Flex>
  );
};
