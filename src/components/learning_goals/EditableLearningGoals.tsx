import { Flex, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { LearningGoalBadgeDataFragment } from './LearningGoalBadge.generated';
import { LearningGoalBadge } from './LearningGoalBadge';
import { EditIcon } from '@chakra-ui/icons';
import { LearningGoalSelector } from './LearningGoalSelector';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';

interface EditableLearningGoalsProps {
  learningGoals: LearningGoalBadgeDataFragment[];
  onRemove: (learningGoalId: string) => void;
  onAdded: (learningGoal: LearningGoalDataFragment) => void;
  editable?: boolean;
  role?: 'outcome' | 'prerequisite';
}
export const EditableLearningGoals: React.FC<EditableLearningGoalsProps> = ({
  learningGoals,
  onRemove,
  onAdded,
  editable,
  role,
}) => {
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);
  const useOutsideAlerter = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEditMode(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  return (
    <Flex ref={wrapperRef} direction="column" alignItems="center">
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
        <LearningGoalSelector placeholder="Add prerequisites  " onSelect={(learningGoal) => onAdded(learningGoal)} />
      )}
      {editable && !editMode && (
        <Tooltip hasArrow label={learningGoals.length ? 'Add or prerequisites' : 'Add prerequisites'}>
          <IconButton
            alignSelf="center"
            // isDisabled={isLoading}
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
