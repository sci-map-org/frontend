import { EditIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMemo, useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  ConceptGroupLearningGoal,
  ConceptGroupLearningGoalData,
} from '../../components/learning_goals/ConceptGroupLearningGoal';
import { RoadmapLearningGoal, RoadmapLearningGoalData } from '../../components/learning_goals/RoadmapLearningGoal';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { generateLearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { useDeleteLearningGoalMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { NotFoundPage } from '../NotFoundPage';
import { GetLearningGoalPageDataQuery, useGetLearningGoalPageDataQuery } from './LearningGoalPage.generated';

export const getLearningGoalPageData = gql`
  query getLearningGoalPageData($learningGoalKey: String!) {
    getLearningGoalByKey(key: $learningGoalKey) {
      ...RoadmapLearningGoalData
      ...ConceptGroupLearningGoalData
    }
  }
  ${RoadmapLearningGoalData}
  ${ConceptGroupLearningGoalData}
`;

const learningGoalPlaceholderData: GetLearningGoalPageDataQuery['getLearningGoalByKey'] = {
  ...generateLearningGoalData(),
};

export const LearningGoalPage: React.FC<{ learningGoalKey: string }> = ({ learningGoalKey }) => {
  const { data, loading } = useGetLearningGoalPageDataQuery({ variables: { learningGoalKey } });
  const learningGoal = data?.getLearningGoalByKey || learningGoalPlaceholderData;
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);
  if (!loading && !data) return <NotFoundPage />;
  return (
    <PageLayout
      marginSize="md"
      centerChildren
      isLoading={loading}
      renderTopRight={
        <LearningGoalPageRightIcons
          learningGoal={learningGoal}
          currentUserIsOwner={currentUserIsOwner}
          isDisabled={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      }
    >
      {learningGoal.type === LearningGoalType.Roadmap && (
        <RoadmapLearningGoal learningGoal={learningGoal} isLoading={loading} editMode={editMode} />
      )}
      {learningGoal.type === LearningGoalType.SubGoal && (
        <ConceptGroupLearningGoal learningGoal={learningGoal} isLoading={loading} editMode={editMode} />
      )}
      {/* <Stack w="100%">
        <Stack direction="row" spacing={3} alignItems="center">
          <EditableTextInput
            value={learningGoal.name}
            centered
            editMode={editMode}
            isLoading={loading}
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
          isLoading={loading}
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

        <SubGoalsWrapper
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
      </Stack> */}
    </PageLayout>
  );
};

export const LearningGoalPageRightIcons: React.FC<{
  learningGoal: LearningGoalDataFragment;
  isDisabled?: boolean;
  currentUserIsOwner: boolean;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
}> = ({ learningGoal, isDisabled, editMode, setEditMode, currentUserIsOwner }) => {
  const [deleteLearningGoal] = useDeleteLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  return currentUser && (currentUser.role === UserRole.Admin || currentUserIsOwner) ? (
    <Stack direction="row" spacing={3}>
      <Stack direction="row" spacing={0}>
        <Tooltip label="Preview Mode" aria-label="preview learning goal">
          <IconButton
            aria-label="view mode"
            size="md"
            variant="ghost"
            onClick={() => setEditMode(false)}
            isActive={!editMode}
            icon={<AiOutlineEye />}
            _focus={{}}
          />
        </Tooltip>

        <Tooltip label="Edit Mode" aria-label="edit learning goal">
          <IconButton
            aria-label="edit mode"
            size="md"
            onClick={() => setEditMode(true)}
            variant="ghost"
            isActive={editMode}
            icon={<EditIcon />}
            _focus={{}}
          />
        </Tooltip>
      </Stack>

      <DeleteButtonWithConfirmation
        variant="outline"
        size="md"
        modalHeaderText="Delete Learning Goal"
        modalBodyText={`Confirm deleting the learning goal "${learningGoal.name}" ?`}
        isDisabled={isDisabled}
        onConfirmation={() => deleteLearningGoal({ variables: { _id: learningGoal._id } }).then(() => Router.push('/'))}
      />
    </Stack>
  ) : null;
};
