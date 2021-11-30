import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useHandleClickOutside } from '../../hooks/useHanldeClickOutside';
import { TopicBadge } from './TopicBadge';
import { TopicBadgeDataFragment } from './TopicBadge.generated';
import { TopicSelector } from './TopicSelector';

interface EditableTopicsWrapperProps {
  topics: TopicBadgeDataFragment[];
  onRemove: (topicId: string) => void;
  onAdded: (topic: TopicBadgeDataFragment) => void;
  editable?: boolean;
  //   role: 'outcome' | 'prerequisite';
  inputPlaceholder?: string;
  isLoading?: boolean;
}
export const EditableTopicsWrapper: React.FC<EditableTopicsWrapperProps> = ({
  topics,
  onRemove,
  onAdded,
  editable,
  //   role,
  inputPlaceholder,
  isLoading,
}) => {
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);
  useHandleClickOutside(wrapperRef, () => setEditMode(false));
  return (
    <Flex ref={wrapperRef} direction="column" alignItems="center" maxW="300px">
      <Stack direction="column" alignItems="center" spacing={1}>
        {topics.map((topic) => (
          <TopicBadge
            // role={role}
            key={topic._id}
            topic={topic}
            removable={editMode}
            onRemove={() => onRemove(topic._id)}
          />
        ))}
      </Stack>
      {editMode && (
        <TopicSelector
          // createLGDefaultData={{ type: LearningGoalType.SubGoal, public: true }}
          placeholder={inputPlaceholder || `Add Topic...`}
          onSelect={(topic) => onAdded(topic)}
        />
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
