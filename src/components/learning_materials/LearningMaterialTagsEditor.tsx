import { EditIcon } from '@chakra-ui/icons';
import { IconButton, Skeleton, Stack, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { AiTwotoneTags } from '@react-icons/all-files/ai/AiTwotoneTags';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import { ReactNode, useRef, useState } from 'react';
import { LearningMaterial, LearningMaterialTag } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useHandleClickOutside } from '../../hooks/useHandleClickOutside';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningMaterialTagSelector } from '../lib/inputs/LearningMaterialTagSelector';
import {
  useAddTagsToLearningMaterialMutation,
  useRemoveTagsFromLearningMaterialMutation,
} from './LearningMaterialTagsEditor.generated';
import { LearningMaterialTagBase, LearningMaterialTagViewer } from './LearningMaterialTagViewer';

export const SelectedTagsViewer: React.FC<{
  selectedTags?: LearningMaterialTag[] | null;
  pb?: number | string;
  renderEnd?: () => ReactNode;
  justify?: string;
  size?: 'sm' | 'md';
}> = ({ selectedTags, renderEnd, size, justify, pb = 2 }) => {
  if (!selectedTags || (!selectedTags.length && !renderEnd)) return null;
  return (
    <Wrap fontWeight={250} pb={pb} as="span" justify={justify}>
      {selectedTags.map((tag, idx) => (
        <WrapItem key={idx}>
          <LearningMaterialTagViewer tagName={tag.name} size={size} />
        </WrapItem>
      ))}
      {renderEnd && renderEnd()}
    </Wrap>
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
  justify?: string;
}> = ({
  selectedTags,
  justify,
  setSelectedTags,
  onSelect,
  onRemove,
  isDisabled,
  size = 'md',
  inputWidth,
  placeholder,
}) => {
  return (
    <Wrap spacing={2} justify={justify} align="center">
      <WrapItem width={inputWidth}>
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
      </WrapItem>
      {selectedTags.map((selectedTag) => (
        <WrapItem key={selectedTag.name}>
          <LearningMaterialTagBase
            onClose={() => {
              setSelectedTags && setSelectedTags(selectedTags.filter((s) => s.name !== selectedTag.name));
              onRemove && onRemove(selectedTag);
            }}
            size={size}
          >
            {selectedTag.name}
          </LearningMaterialTagBase>
        </WrapItem>
      ))}
    </Wrap>
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
  justify?: string;
}> = ({ learningMaterial, justify, isDisabled, size = 'md', inputWidth, placeholder }) => {
  const [addTagsToLearningMaterial] = useAddTagsToLearningMaterialMutation();
  const [removeTagsFromLearningMaterial] = useRemoveTagsFromLearningMaterialMutation();
  const selectedTags = learningMaterial.tags || [];
  return (
    <LearningMaterialTagsStatelessEditor
      placeholder={placeholder}
      size={size}
      justify={justify}
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

export const EditableLearningMaterialTags: React.FC<{
  isLoading?: boolean;
  learningMaterial: Pick<LearningMaterial, '_id' | 'tags'>;
  isDisabled?: boolean;
  justify?: 'center';
  placeholder?: string;
  size?: 'sm' | 'md';
}> = ({ learningMaterial, isLoading, justify, size = 'md', isDisabled, placeholder }) => {
  const wrapperRef = useRef(null);
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const [tagEditorMode, setTagEditorMode] = useState(false);
  useHandleClickOutside(wrapperRef, () => setTagEditorMode(false));
  return tagEditorMode ? (
    <Skeleton ref={wrapperRef} isLoaded={!isLoading}>
      <LearningMaterialTagsEditor
        size={size}
        justify={justify}
        learningMaterial={learningMaterial}
        inputWidth={size === 'md' ? '140px' : '100px'}
      />
    </Skeleton>
  ) : (
    <Stack direction="row" alignItems="center">
      {learningMaterial.tags && (
        <>
          {!learningMaterial.tags.length && !isDisabled && placeholder && (
            <Skeleton isLoaded={!isLoading}>
              <Text fontSize="sm" color="gray.400">
                {placeholder}
              </Text>
            </Skeleton>
          )}
          <Skeleton isLoaded={!isLoading}>
            <SelectedTagsViewer
              pb={0}
              size={size}
              selectedTags={learningMaterial.tags}
              justify={justify}
              renderEnd={() =>
                !isDisabled && (
                  <Tooltip hasArrow label={learningMaterial.tags?.length ? 'Add or remove tags' : 'Add tags'}>
                    <IconButton
                      alignSelf="center"
                      isDisabled={isLoading}
                      size="xs"
                      variant="ghost"
                      aria-label="add tag"
                      onClick={(e) => {
                        if (!currentUser) {
                          unauthentificatedModalDisclosure.onOpen();
                          e.preventDefault();
                          return;
                        }
                        setTagEditorMode(true);
                      }}
                      icon={learningMaterial.tags?.length ? <EditIcon /> : <AiTwotoneTags />}
                    />
                  </Tooltip>
                )
              }
            />
          </Skeleton>
        </>
      )}
      )
    </Stack>
  );
};
