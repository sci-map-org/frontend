import { Center, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { ConceptData } from '../../graphql/concepts/concepts.fragments';
import { DomainData } from '../../graphql/domains/domains.fragments';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useDetachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { TopicType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { ConceptBadge, ConceptBadgeData } from '../concepts/ConceptBadge';
import { SubTopicSelector } from '../domains/SubTopicSelector';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { EditableTextInput } from '../lib/inputs/EditableTextInput';
import { OtherLearnersViewer, OtherLearnersViewerUserData } from '../lib/OtherLearnersViewer';
import { ConceptGroupLearningGoalDataFragment } from './ConceptGroupLearningGoal.generated';
import { LearningGoalBadge, LearningGoalBadgeData } from './LearningGoalBadge';
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
          ...ConceptBadgeData
        }
        ... on LearningGoal {
          ...LearningGoalBadgeData
        }
      }
    }
    ...StartLearningGoalButtonData
  }
  ${LearningGoalData}
  ${StartLearningGoalButtonData}
  ${OtherLearnersViewerUserData}
  ${ConceptBadgeData}
  ${LearningGoalBadgeData}
  ${DomainData}
`;

interface ConceptGroupLearningGoalProps {
  learningGoal: ConceptGroupLearningGoalDataFragment;
  domain: DomainDataFragment;
  editMode?: boolean;
  isLoading?: boolean;
}
export const ConceptGroupLearningGoal: React.FC<ConceptGroupLearningGoalProps> = ({
  learningGoal,
  domain,
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
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();

  return (
    <Stack spacing={3} w="100%">
      <Center>
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
      </Center>
      <Center>
        <StartLearningGoalButton learningGoal={learningGoal} />
      </Center>
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
      {/* {learningGoal.startedBy && (
        <Center>
          <OtherLearnersViewer
            title={() => `Learning now`}
            users={learningGoal.startedBy.items.map(({ user }) => user)}
            totalCount={learningGoal.startedBy.count}
            currentUserIsLearner={currentUserStartedGoal}
            minUsers={currentUserIsOwner ? 1 : 4}
          />
        </Center>
      )} */}
      <Stack bgColor="gray.100" pb={5}>
        <Center fontSize="lg" fontWeight={700} color="gray.700">
          <Text my={2}>Topics Covered</Text>
        </Center>
        <Stack spacing={0}>
          <Wrap justify="center" align="center" px={4}>
            {(learningGoal.requiredSubGoals || []).map(({ subGoal }) => (
              <WrapItem key={subGoal._id}>
                {subGoal.__typename === 'Concept' && subGoal.domain && (
                  <ConceptBadge
                    concept={subGoal}
                    removable={editMode}
                    onRemove={() =>
                      detachLearningGoalRequiresSubGoal({
                        variables: { learningGoalId: learningGoal._id, subGoalId: subGoal._id },
                      })
                    }
                  />
                )}
                {subGoal.__typename === 'LearningGoal' && subGoal.domain && (
                  <LearningGoalBadge
                    learningGoal={subGoal}
                    removable={editMode}
                    onRemove={() =>
                      detachLearningGoalRequiresSubGoal({
                        variables: { learningGoalId: learningGoal._id, subGoalId: subGoal._id },
                      })
                    }
                  />
                )}
              </WrapItem>
            ))}
          </Wrap>
          {editMode && (
            <Center>
              <SubTopicSelector
                domain={domain}
                onSelect={(selected) =>
                  attachLearningGoalRequiresSubGoal({
                    variables: {
                      learningGoalId: learningGoal._id,
                      subGoalId: selected._id,
                      payload: { strength: 100 },
                    },
                  })
                }
                placeholder="Add new Topic"
                popoverTitle="Add new Topic"
                allowedSubTopicTypes={[TopicType.Concept, TopicType.LearningGoal]}
              />
            </Center>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
