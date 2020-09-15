import { Flex, Stack, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import React from 'react';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourceTag } from '../../graphql/types';
import { ResourceTagSelector } from '../input/ResourceTagSelector';
import {
  useAddTagsToResourceResourceEditorMutation,
  useRemoveTagsFromResourceResourceEditorMutation,
} from './ResourceTagsEditor.generated';

export const SelectedTagsViewer: React.FC<{ selectedTags?: ResourceTag[] | null; pb?: number | string }> = ({
  selectedTags,
  pb = 2,
}) => {
  if (!selectedTags || !selectedTags.length) return null;
  return (
    <Stack direction="row" fontWeight={250} pb={pb} as="span">
      {selectedTags.map((tag, idx) => (
        <Tag size="sm" colorScheme="gray" key={idx} as="span">
          <TagLabel>{tag.name}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};

export const ResourceTagsStatelessEditor: React.FC<{
  selectedTags: ResourceTag[];
  setSelectedTags?: (tags: ResourceTag[]) => void;
  onSelect?: (tag: ResourceTag) => void;
  onRemove?: (tag: ResourceTag) => void;
  isDisabled?: boolean;
  size?: 'sm' | 'md';
  inputWidth?: string;
}> = ({ selectedTags, setSelectedTags, onSelect, onRemove, isDisabled, size = 'md', inputWidth }) => {
  return (
    <Flex direction="row" alignItems="baseline">
      <ResourceTagSelector
        isDisabled={isDisabled}
        size={size}
        width={inputWidth}
        onSelect={(r) => {
          setSelectedTags && setSelectedTags(uniqBy(selectedTags.concat({ name: r.name }), 'name'));
          onSelect && onSelect({ name: r.name });
        }}
      />
      <Stack spacing={2} direction="row" flexGrow={1} alignItems="flex-start">
        {selectedTags.map((selectedTag) => (
          <Tag size={size} colorScheme="gray" key={selectedTag.name}>
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

export const addTagsToResourceResourceEditor = gql`
  mutation addTagsToResourceResourceEditor($resourceId: String!, $tags: [String!]!) {
    addTagsToResource(resourceId: $resourceId, tags: $tags) {
      _id
      tags {
        name
      }
    }
  }
`;

export const removeTagsFromResourceResourceEditor = gql`
  mutation removeTagsFromResourceResourceEditor($resourceId: String!, $tags: [String!]!) {
    removeTagsFromResource(resourceId: $resourceId, tags: $tags) {
      _id
      tags {
        name
      }
    }
  }
`;

export const ResourceTagsEditor: React.FC<{
  resource: Pick<ResourceDataFragment, '_id' | 'tags'>;
  isDisabled?: boolean;
  size?: 'sm' | 'md';
  inputWidth?: string;
}> = ({ resource, isDisabled, size = 'md', inputWidth }) => {
  const [addTagsToResource] = useAddTagsToResourceResourceEditorMutation();
  const [removeTagsFromResource] = useRemoveTagsFromResourceResourceEditorMutation();
  const selectedTags = resource.tags || [];
  return (
    <ResourceTagsStatelessEditor
      size={size}
      isDisabled={isDisabled}
      selectedTags={selectedTags}
      inputWidth={inputWidth}
      onSelect={(t) => addTagsToResource({ variables: { resourceId: resource._id, tags: [t.name] } })}
      onRemove={(t) => removeTagsFromResource({ variables: { resourceId: resource._id, tags: [t.name] } })}
    />
  );
};
