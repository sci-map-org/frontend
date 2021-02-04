import { Center, Flex, Stack, Wrap } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { ConceptBadge } from '../concepts/ConceptBadge';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { EditableTextInput } from '../lib/inputs/EditableTextInput';
import { OtherLearnersViewer, OtherLearnersViewerUserData } from '../lib/OtherLearnersViewer';
import { ConceptGroupLearningGoalDataFragment } from './ConceptGroupLearningGoal.generated';
import { LearningGoalSelector } from './LearningGoalSelector';
import { RoadmapLearningGoalDataFragment } from './RoadmapLearningGoal.generated';
import { RoadmapSubGoalsWrapper, RoadmapSubGoalsWrapperData } from './RoadmapSubGoalsWrapper';
import { StartLearningGoalButton, StartLearningGoalButtonData } from './StartLearningGoalButton';

export const ConceptGroupLearningGoalData = gql`
  fragment ConceptGroupLearningGoalData on LearningGoal {
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
    requiredSubGoals {
      subGoal {
        ... on Concept {
          ...ConceptData
          domain {
            key
          }
        }
      }
    }
    ...StartLearningGoalButtonData
  }
  ${LearningGoalData}
  ${StartLearningGoalButtonData}
  ${OtherLearnersViewerUserData}
  ${ConceptData}
`;

interface ConceptGroupLearningGoalProps {
  learningGoal: ConceptGroupLearningGoalDataFragment;
  editMode?: boolean;
  isLoading?: boolean;
}
export const ConceptGroupLearningGoal: React.FC<ConceptGroupLearningGoalProps> = ({
  learningGoal,
  editMode,
  isLoading,
}) => {
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
          centered
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
        textAlign="center"
        isLoading={isLoading}
        justifyContent="center"
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
      <Wrap>
        {(learningGoal.requiredSubGoals || []).map(({ subGoal }) =>
          subGoal.__typename === 'Concept' && subGoal.domain ? (
            <ConceptBadge concept={subGoal} domainKey={subGoal.domain.key} />
          ) : null
        )}
      </Wrap>
    </Stack>
  );
};
