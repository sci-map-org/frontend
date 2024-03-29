import { AddIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, IconButton, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useMemo } from 'react';
import { LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useDetachLearningGoalRequiresSubGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { RoleAccess } from '../auth/RoleAccess';
import { EditableTextarea } from '../lib/inputs/EditableTextarea';
import { EditableTextInput } from '../lib/inputs/EditableTextInput';
import { OtherLearnersViewerUserData } from '../lib/OtherLearnersViewer';
import { NewResourceModal } from '../resources/NewResource';
import { ConceptGroupLearningGoalDataFragment } from './ConceptGroupLearningGoal.generated';
import { LearningGoalBadge, LearningGoalBadgeData } from './LearningGoalBadge';
import { LearningGoalPublishButtonData } from './LearningGoalPublishButton';
import { LearningGoalPublishStatusBar } from './LearningGoalPublishStatusBar';
import {
  LearningGoalRelevantLearningMaterials,
  LearningGoalRelevantLearningMaterialsData,
} from './LearningGoalRelevantLearningMaterials';
import { LearningGoalTypeEditor } from './LearningGoalTypeEditor';
import {
  ParentLearningGoalsNavigationBlock,
  ParentLearningGoalsNavigationBlockData,
} from './ParentLearningGoalsNavigationBlock';
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
        # ... on Concept {
        #   ...ConceptBadgeData
        # }
        ... on LearningGoal {
          ...LearningGoalBadgeData
        }
      }
    }
    ...StartLearningGoalButtonData
    ...LearningGoalPublishButtonData
    ...ParentLearningGoalsNavigationBlockData
    ...LearningGoalRelevantLearningMaterialsData
  }
  ${LearningGoalData}
  ${StartLearningGoalButtonData}
  ${LearningGoalPublishButtonData}
  ${OtherLearnersViewerUserData}
  ${LearningGoalBadgeData}
  ${ParentLearningGoalsNavigationBlockData}
  ${LearningGoalRelevantLearningMaterialsData}
`;

interface ConceptGroupLearningGoalProps {
  learningGoal: ConceptGroupLearningGoalDataFragment;
  // domain: DomainDataFragment;
  editMode?: boolean;
  isLoading?: boolean;
  refetch: () => void;
}
export const ConceptGroupLearningGoal: React.FC<ConceptGroupLearningGoalProps> = ({
  learningGoal,
  // domain,
  editMode,
  isLoading,
  refetch,
}) => {
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );

  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();

  return (
    <Stack spacing={3} w="100%">
      <Flex direction="row-reverse">
        <ParentLearningGoalsNavigationBlock learningGoal={learningGoal} />
      </Flex>
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
        <Stack direction="row" alignItems="center">
          <StartLearningGoalButton learningGoal={learningGoal} />
          {currentUserIsOwner && <LearningGoalPublishStatusBar learningGoal={learningGoal} />}
        </Stack>
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
      {(!!learningGoal.requiredSubGoals?.length || editMode) && (
        <Stack bgColor="gray.100" pb={5}>
          <Center fontSize="lg" fontWeight={700} color="gray.700">
            <Text my={2}>Topics Covered</Text>
          </Center>
          <Stack spacing={0}>
            {/* <Wrap justify="center" align="center" px={4}>
              {(learningGoal.requiredSubGoals || []).map(({ subGoal }) => (
                <WrapItem key={subGoal._id}>
                  {
                    // subGoal.__typename === 'Concept' && subGoal.domain && subGoal.name
                    // <TopicBadge
                    //   concept={subGoal}
                    //   removable={editMode}
                    //   onRemove={() =>
                    //     detachLearningGoalRequiresSubGoal({
                    //       variables: { learningGoalId: learningGoal._id, subGoalId: subGoal._id },
                    //     })
                    //   }
                    // />
                  }
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
            </Wrap> */}
            {editMode && (
              <Center>
                {/* <SubTopicSelector
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
                /> */}
              </Center>
            )}
          </Stack>
        </Stack>
      )}
      <Box py={6} />

      <LearningGoalRelevantLearningMaterials learningGoal={learningGoal} isLoading={isLoading} />
      <Center pt={4}>
        {/* <NewResourceModal
          defaultResourceCreationData={{
            outcomes: [learningGoal],
          }}
          onResourceCreated={() => refetch()}
          renderButton={(onClick) => (
            <IconButton
              aria-label="add resource"
              icon={<AddIcon />}
              variant="outline"
              size="lg"
              isRound
              onClick={() => onClick()}
              isDisabled={isLoading}
            />
          )}
        /> */}
      </Center>
      {/* {editMode && domain && (
        <Box py={5}>
          <RoleAccess accessRule="contributorOrAdmin">
            <LearningGoalTypeEditor learningGoal={learningGoal} />
          </RoleAccess>
        </Box>
      )} */}
    </Stack>
  );
};
