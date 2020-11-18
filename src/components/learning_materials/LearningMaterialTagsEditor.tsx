import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { LearningMaterial, LearningMaterialTag } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { LearningMaterialTagSelector } from '../lib/inputs/LearningMaterialTagSelector';
import {
  useAddTagsToLearningMaterialMutation,
  useRemoveTagsFromLearningMaterialMutation,
} from './LearningMaterialTagsEditor.generated';

export const SelectedTagsViewer: React.FC<{
  selectedTags?: LearningMaterialTag[] | null;
  pb?: number | string;
  renderEnd?: () => ReactNode;
  justify?: string;
}> = ({ selectedTags, renderEnd, justify, pb = 2 }) => {
  if (!selectedTags || (!selectedTags.length && !renderEnd)) return null;
  return (
    <Wrap fontWeight={250} pb={pb} as="span" justify={justify}>
      {selectedTags.map((tag, idx) => (
        <WrapItem key={idx}>
          <Tag size="sm" colorScheme="gray" as="span">
            <TagLabel>{tag.name}</TagLabel>
          </Tag>
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
    <Wrap spacing={2} justify={justify} align="flex-end">
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
}> = ({ learningMaterial, isLoading, justify, isDisabled, placeholder }) => {
  const wrapperRef = useRef(null);
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const [tagEditorMode, setTagEditorMode] = useState(false);
  const useOutsideAlerter = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTagEditorMode(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  return tagEditorMode ? (
    <Box ref={wrapperRef}>
      <Skeleton isLoaded={!isLoading}>
        <LearningMaterialTagsEditor
          justify={justify}
          size="sm"
          learningMaterial={learningMaterial}
          inputWidth="100px"
        />
      </Skeleton>
    </Box>
  ) : (
    <Stack direction="row" alignItems="center">
      {learningMaterial.tags && !isDisabled && (
        <>
          {!learningMaterial.tags.length && placeholder && (
            <Skeleton isLoaded={!isLoading}>
              <Text fontSize="sm" color="gray.400">
                {placeholder}
              </Text>
            </Skeleton>
          )}
          <Skeleton isLoaded={!isLoading}>
            <SelectedTagsViewer
              pb={0}
              selectedTags={learningMaterial.tags}
              justify={justify}
              renderEnd={() =>
                !isDisabled && (
                  <Tooltip hasArrow label={learningMaterial.tags?.length ? 'Add or remove tags' : 'Add tags'}>
                    <IconButton
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
                      icon={<EditIcon />}
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
