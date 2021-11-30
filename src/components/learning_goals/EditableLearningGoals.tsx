import { Flex, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';
import { LearningGoalBadge } from './LearningGoalBadge';
import { EditIcon } from '@chakra-ui/icons';
import { LearningGoalSelector } from './LearningGoalSelector';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { LearningGoalType } from '../../graphql/types';
import { useHandleClickOutside } from '../../hooks/useHanldeClickOutside';

interface EditableLearningGoalsProps {
  learningGoals: LearningGoalBadgeDataFragment[];
  onRemove: (learningGoalId: string) => void;
  onAdded: (learningGoal: LearningGoalDataFragment) => void;
  editable?: boolean;
  role: 'outcome' | 'prerequisite';
  inputPlaceholder?: string;
  isLoading?: boolean;
}
export const EditableLearningGoals: React.FC<EditableLearningGoalsProps> = ({
  learningGoals,
  onRemove,
  onAdded,
  editable,
  role,
  inputPlaceholder,
  isLoading,
}) => {
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);

  useHandleClickOutside(wrapperRef, () => setEditMode(false));
  return (
    <Flex ref={wrapperRef} direction="column" alignItems="center" maxW="300px">
      <Stack direction="column" alignItems="center" spacing={1}>
        {learningGoals.map((learningGoal) => (
          <LearningGoalBadge
            role={role}
            key={learningGoal._id}
            learningGoal={learningGoal}
            removable={editMode}
            onRemove={() => onRemove(learningGoal._id)}
          />
        ))}
      </Stack>
      {editMode && (
        <LearningGoalSelector
          createLGDefaultData={{ type: LearningGoalType.SubGoal, public: true }}
          placeholder={inputPlaceholder || `Add ${role}...`}
          onSelect={(learningGoal) => onAdded(learningGoal)}
        />
      )}
      {editable && !editMode && (
        <Tooltip hasArrow label={learningGoals.length ? `Add or remove ${role}s` : `Add ${role}s`}>
          <IconButton
            alignSelf="center"
            isDisabled={isLoading}
            size="xs"
            variant="ghost"
            aria-label="add prerequisites"
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
