import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Stack, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { useHandleClickOutside } from '../../hooks/useHandleClickOutside';
import { TopicBadge } from './TopicBadge';

import { TopicSelector } from './TopicSelector';

interface EditableTopicsWrapperProps {
  topics: TopicLinkDataFragment[];
  onRemove: (topicId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
  editable?: boolean;
  displayMode?: 'column' | 'row' | 'wrap';
  inputPlaceholder?: string;
  isLoading?: boolean;
}
export const EditableTopicsWrapper: React.FC<EditableTopicsWrapperProps> = ({
  topics,
  onRemove,
  onAdded,
  editable,
  displayMode = 'wrap',
  inputPlaceholder,
  isLoading,
}) => {
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);
  useHandleClickOutside(wrapperRef, () => setEditMode(false));
  return (
    <Flex ref={wrapperRef} direction="column" alignItems="center" maxW="300px">
      {!!topics.length && (
        <>
          {displayMode !== 'wrap' && (
            <Stack direction={displayMode} alignItems="center" spacing={1} mb={1}>
              {topics.map((topic) => (
                <TopicBadge key={topic._id} topic={topic} removable={editMode} onRemove={() => onRemove(topic._id)} />
              ))}
            </Stack>
          )}
          {displayMode === 'wrap' && (
            <Wrap spacing={1} justify="center" mb={1}>
              {topics.map((topic) => (
                <WrapItem key={topic._id}>
                  <TopicBadge topic={topic} removable={editMode} onRemove={() => onRemove(topic._id)} />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </>
      )}
      {editMode && (
        <TopicSelector placeholder={inputPlaceholder || `Add Topic...`} onSelect={(topic) => onAdded(topic)} />
      )}
      {editable && !editMode && (
        <Tooltip hasArrow label={topics.length ? `Add or remove topics` : `Add topics`}>
          <IconButton
            alignSelf="center"
            isDisabled={isLoading}
            size="xs"
            variant="ghost"
            aria-label="add topic"
            onClick={(e) => {
              setEditMode(true);
            }}
            icon={<EditIcon />}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
