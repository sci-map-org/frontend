import { EditIcon } from '@chakra-ui/icons';
import { Center, IconButton, Skeleton, Stack, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMemo, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { PageLayout } from '../../components/layout/PageLayout';
import { LearningGoalSelector } from '../../components/learning_goals/LearningGoalSelector';
import { SubGoalCard, SubGoalCardData } from '../../components/learning_goals/SubGoalCard';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { generateLearningGoalData, LearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import {
  useAttachLearningGoalRequiresSubGoalMutation,
  useDeleteLearningGoalMutation,
  useDetachLearningGoalRequiresSubGoalMutation,
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
      createdBy {
        _id
      }
      requiredSubGoals {
        ...SubGoalCardData
      }
    }
  }
  ${LearningGoalData}
  ${SubGoalCardData}
`;

const learningGoalPlaceholderData: GetLearningGoalPageDataQuery['getLearningGoalByKey'] = {
  ...generateLearningGoalData(),
};

export const LearningGoalPage: React.FC<{ learningGoalKey: string }> = ({ learningGoalKey }) => {
  const { data, loading } = useGetLearningGoalPageDataQuery({ variables: { learningGoalKey } });
  const learningGoal = data?.getLearningGoalByKey || learningGoalPlaceholderData;
  const [updateLearningGoal] = useUpdateLearningGoalMutation();
  const { currentUser } = useCurrentUser();
  const currentUserIsOwner = useMemo(
    () => !!learningGoal.createdBy && !!currentUser && learningGoal.createdBy._id === currentUser._id,
    [learningGoal, currentUser]
  );
  const [editMode, setEditMode] = useState(!!currentUser && currentUser.role === UserRole.Admin);
  const [attachLearningGoalRequiresSubGoal] = useAttachLearningGoalRequiresSubGoalMutation();
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();
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
      <Stack w="100%">
        <Center>
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
        </Center>
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

        {learningGoal.requiredSubGoals && (
          <Wrap spacing="30px" justify="center">
            {learningGoal.requiredSubGoals.map((requiredSubGoalItem, idx) => (
              <WrapItem
                borderWidth="1px"
                borderColor="gray.500"
                boxShadow="md"
                w="45%"
                borderRadius={5}
                key={requiredSubGoalItem.subGoal._id}
              >
                <SubGoalCard
                  editMode={editMode}
                  subGoalItem={requiredSubGoalItem}
                  onRemove={(subGoalId) =>
                    detachLearningGoalRequiresSubGoal({
                      variables: { learningGoalId: learningGoal._id, subGoalId: subGoalId },
                    })
                  }
                />
              </WrapItem>
            ))}
            {editMode && (
              <WrapItem
                w="45%"
                borderWidth="1px"
                borderColor="gray.500"
                justifyContent="center"
                alignItems="center"
                py={3}
                borderRadius={5}
              >
                <LearningGoalSelector
                  placeholder="Add a SubGoal..."
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
              </WrapItem>
            )}
          </Wrap>
        )}
      </Stack>
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
