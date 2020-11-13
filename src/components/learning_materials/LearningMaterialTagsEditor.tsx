import { Stack, Tag, TagCloseButton, TagLabel, Wrap } from '@chakra-ui/core';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import React from 'react';
import { LearningMaterial, LearningMaterialTag } from '../../graphql/types';
import { LearningMaterialTagSelector } from '../lib/inputs/LearningMaterialTagSelector';
import {
  useAddTagsToLearningMaterialMutation,
  useRemoveTagsFromLearningMaterialMutation,
} from './LearningMaterialTagsEditor.generated';

export const SelectedTagsViewer: React.FC<{ selectedTags?: LearningMaterialTag[] | null; pb?: number | string }> = ({
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

export const LearningMaterialTagsStatelessEditor: React.FC<{
  placeholder?: string;
  selectedTags: LearningMaterialTag[];
  setSelectedTags?: (tags: LearningMaterialTag[]) => void;
  onSelect?: (tag: LearningMaterialTag) => void;
  onRemove?: (tag: LearningMaterialTag) => void;
  isDisabled?: boolean;
  size?: 'sm' | 'md';
  inputWidth?: string;
}> = ({ selectedTags, setSelectedTags, onSelect, onRemove, isDisabled, size = 'md', inputWidth, placeholder }) => {
  return (
    <Stack direction="row" alignItems="baseline" spacing={2}>
      <LearningMaterialTagSelector
        placeholder={placeholder}
        isDisabled={isDisabled}
        size={size}
        width={inputWidth}
        onSelect={(r) => {
          setSelectedTags && setSelectedTags(uniqBy(selectedTags.concat({ name: r.name }), 'name'));
          onSelect && onSelect({ name: r.name });
        }}
      />
      <Wrap spacing={2} w="100%">
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
      </Wrap>
    </Stack>
  );
};

export const addTagsToLearningMaterial = gql`
  mutation addTagsToLearningMaterial($learningMaterialId: String!, $tags: [String!]!) {
    addTagsToLearningMaterial(learningMaterialId: $learningMaterialId, tags: $tags) {
      _id
      tags {
        name
      }
    }
  }
`;

export const removeTagsFromLearningMaterial = gql`
  mutation removeTagsFromLearningMaterial($learningMaterialId: String!, $tags: [String!]!) {
    removeTagsFromLearningMaterial(learningMaterialId: $learningMaterialId, tags: $tags) {
      _id
      tags {
        name
      }
    }
  }
`;

export const LearningMaterialTagsEditor: React.FC<{
  learningMaterial: Pick<LearningMaterial, '_id' | 'tags'>;
  isDisabled?: boolean;
  size?: 'sm' | 'md';
  inputWidth?: string;
  placeholder?: string;
}> = ({ learningMaterial, isDisabled, size = 'md', inputWidth, placeholder }) => {
  const [addTagsToLearningMaterial] = useAddTagsToLearningMaterialMutation();
  const [removeTagsFromLearningMaterial] = useRemoveTagsFromLearningMaterialMutation();
  const selectedTags = learningMaterial.tags || [];
  return (
    <LearningMaterialTagsStatelessEditor
      placeholder={placeholder}
      size={size}
      isDisabled={isDisabled}
      selectedTags={selectedTags}
      inputWidth={inputWidth}
      onSelect={(t) =>
        addTagsToLearningMaterial({ variables: { learningMaterialId: learningMaterial._id, tags: [t.name] } })
      }
      onRemove={(t) =>
        removeTagsFromLearningMaterial({ variables: { learningMaterialId: learningMaterial._id, tags: [t.name] } })
      }
    />
  );
};
