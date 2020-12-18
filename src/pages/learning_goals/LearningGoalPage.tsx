import { EditIcon } from '@chakra-ui/icons';
import { Center, IconButton, Skeleton, Stack, Tooltip } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { PageLayout } from '../../components/layout/PageLayout';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { generateLearningGoalData, LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import {
  useDeleteLearningGoalMutation,
  useUpdateLearningGoalMutation,
} from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoal, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { PageInfo } from '../PageInfo';
import { GetLearningGoalPageDataQuery, useGetLearningGoalPageDataQuery } from './LearningGoalPage.generated';

export const LearningGoalPageInfo = (learningGoal: Pick<LearningGoal, 'key' | 'name'>): PageInfo => {
  return {
    name: learningGoal.name,
    path: '/goals/' + learningGoal.key,
    routePath: '/goals/[learningGoalKey]',
  };
};
export const getLearningGoalPageData = gql`
  query getLearningGoalPageData($learningGoalKey: String!) {
    getLearningGoalByKey(key: $learningGoalKey) {
      ...LearningGoalData
    }
  }
  ${LearningGoalData}
`;

const learningGoalPlaceholderData: GetLearningGoalPageDataQuery['getLearningGoalByKey'] = {
  ...generateLearningGoalData(),
};

export const LearningGoalPage: React.FC<{ learningGoalKey: string }> = ({ learningGoalKey }) => {
  const { data, loading } = useGetLearningGoalPageDataQuery({ variables: { learningGoalKey } });
  const learningGoal = data?.getLearningGoalByKey || learningGoalPlaceholderData;
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);
  return (
    <PageLayout
      marginSize="md"
      centerChildren
      isLoading={loading}
      renderTopRight={
        <LearningGoalPageRightIcons
          learningGoal={learningGoal}
          // currentUserIsOwner={currentUserIsOwner}
          isDisabled={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      }
    >
      <Stack w="100%">
        <Center>
          <EditableTextInput
            value={learningGoal.name}
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
        </Center>
        <Skeleton isLoaded={!loading}>
          <EditableTextarea
            textAlign="center"
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
        </Skeleton>
      </Stack>
    </PageLayout>
  );
};

const LearningGoalPageRightIcons: React.FC<{
  learningGoal: LearningGoalDataFragment;
  isDisabled?: boolean;
  // currentUserIsOwner: boolean;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
}> = ({ learningGoal, isDisabled, editMode, setEditMode }) => {
  const [deleteLearningGoal] = useDeleteLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  return currentUser && currentUser.role === UserRole.Admin ? (
    <Stack direction="row" spacing={3}>
      <Stack direction="row" spacing={0}>
        <Tooltip label="Preview Mode" aria-label="preview learning path">
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
        <Tooltip label="Edit Mode" aria-label="edit learning path">
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
