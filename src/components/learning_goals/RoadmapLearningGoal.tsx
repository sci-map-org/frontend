import { Box, Center, Stack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { EditableTextInput } from '../lib/inputs/EditableTextInput';
import { OtherLearnersViewer, OtherLearnersViewerUserData } from '../lib/OtherLearnersViewer';
import { LearningGoalLinearProgress, LearningGoalLinearProgressData } from './LearningGoalLinearProgress';
import { LearningGoalSelector } from './LearningGoalSelector';
import { RoadmapLearningGoalDataFragment } from './RoadmapLearningGoal.generated';
import { RoadmapSubGoalsWrapper, RoadmapSubGoalsWrapperData } from './RoadmapSubGoalsWrapper';
import { StartLearningGoalButton, StartLearningGoalButtonData } from './StartLearningGoalButton';

export const RoadmapLearningGoalData = gql`
  fragment RoadmapLearningGoalData on LearningGoal {
    _id
    ...LearningGoalData
    createdBy {
      _id
    }
    startedBy(options: {}) {
      items {
        user {
          ...OtherLearnersViewerUserData
        }
      }
      count
    }
    ...RoadmapSubGoalsWrapperData
    ...StartLearningGoalButtonData
    ...LearningGoalLinearProgressData
  }
  ${LearningGoalData}
  ${RoadmapSubGoalsWrapperData}
  ${StartLearningGoalButtonData}
  ${OtherLearnersViewerUserData}
  ${LearningGoalLinearProgressData}
`;

interface RoadmapLearningGoalProps {
  learningGoal: RoadmapLearningGoalDataFragment;
  editMode?: boolean;
  isLoading?: boolean;
}
export const RoadmapLearningGoal: React.FC<RoadmapLearningGoalProps> = ({ learningGoal, editMode, isLoading }) => {
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  const currentUserStartedGoal = useMemo(() => !!learningGoal.started, [learningGoal]);
  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();

  return (
    <Stack w="100%">
      <Stack direction="row" spacing={3} alignItems="center">
        <EditableTextInput
          value={learningGoal.name}
          editMode={editMode}
          isLoading={isLoading}
          onChange={(newName) =>
            updateLearningGoal({
              variables: {
                _id: learningGoal._id,
                payload: { name: (newName as string) || null },
              },
            })
          }
        />
        <StartLearningGoalButton learningGoal={learningGoal} />
      </Stack>
      <EditableTextarea
        isLoading={isLoading}
        backgroundColor="backgroundColor.0"
        fontSize="lg"
        fontWeight={300}
        color="gray.700"
        defaultValue={learningGoal.description || ''}
        placeholder="Add a description..."
        onSubmit={(newDescription: any) =>
          updateLearningGoal({
            variables: {
              _id: learningGoal._id,
              payload: { description: (newDescription as string) || null },
            },
          })
        }
        isDisabled={!editMode}
      />
      {learningGoal.startedBy && (
        <Center>
          <OtherLearnersViewer
            title={() => `Learning now`}
            users={learningGoal.startedBy.items.map(({ user }) => user)}
            totalCount={learningGoal.startedBy.count}
            currentUserIsLearner={currentUserStartedGoal}
            minUsers={currentUserIsOwner ? 1 : 4}
          />
        </Center>
      )}
      {currentUserStartedGoal && (
        <Box w="60%" pt={3} pb={5}>
          <LearningGoalLinearProgress learningGoal={learningGoal} size="lg" />
        </Box>
      )}
      <RoadmapSubGoalsWrapper
        learningGoal={learningGoal}
        editMode={editMode}
        renderLastItem={
          editMode && (
            <Center py={2}>
              <LearningGoalSelector
                placeholder="Add a SubGoal..."
                createLGDefaultPayload={{ type: LearningGoalType.SubGoal }}
                onSelect={(selected) =>
                  attachLearningGoalRequiresSubGoal({
                    variables: {
                      learningGoalId: learningGoal._id,
                      subGoalId: selected._id,
                      payload: {},
                    },
                  })
                }
              />
            </Center>
          )
        }
      />
    </Stack>
  );
};
