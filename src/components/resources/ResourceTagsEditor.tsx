import { Flex, Stack, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/core';
import { uniqBy } from 'lodash';
import React from 'react';

import { ResourceTag } from '../../graphql/types';
import { ResourceTagSelector } from '../input/ResourceTagSelector';

export const SelectedTagsEditor: React.FC<{
  selectedTags: ResourceTag[];
  setSelectedTags?: (tags: ResourceTag[]) => void;
  onSelect?: (tag: ResourceTag) => void;
  onRemove?: (tag: ResourceTag) => void;
}> = ({ selectedTags, setSelectedTags, onSelect, onRemove }) => {
  return (
    <Flex direction="row" alignItems="baseline">
      <ResourceTagSelector
        onSelect={r => {
          setSelectedTags && setSelectedTags(uniqBy(selectedTags.concat({ name: r.name }), 'name'));
          onSelect && onSelect({ name: r.name });
        }}
      />
      <Stack spacing={2} direction="row" flexGrow={1} alignItems="flex-start">
        {selectedTags.map(selectedTag => (
          <Tag size="md" variantColor="gray" key={selectedTag.name}>
            <TagLabel>{selectedTag.name}</TagLabel>
            <TagCloseButton
              onClick={() => {
                setSelectedTags && setSelectedTags(selectedTags.filter(s => s.name !== selectedTag.name));
                onRemove && onRemove(selectedTag);
              }}
            />
          </Tag>
        ))}
      </Stack>
    </Flex>
  );
};
