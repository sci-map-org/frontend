import { EditIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { ConceptGroupLearningGoalData } from '../../components/learning_goals/ConceptGroupLearningGoal';
import { LearningGoalRoadmap, LearningGoalRoadmapData } from '../../components/learning_goals/LearningGoalRoadmap';
import { DeleteButtonWithConfirmation } from '../../components/lib/buttons/DeleteButtonWithConfirmation';
import { DomainLinkData } from '../../graphql/domains/domains.fragments';
import { generateLearningGoalData } from '../../graphql/learning_goals/learning_goals.fragments';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { useDeleteLearningGoalMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { LearningGoalType, UserRole } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { NotFoundPage } from '../NotFoundPage';
import { routerPushToPage } from '../PageInfo';
import { DomainLearningGoalPageInfo } from '../RoutesPageInfos';
import { GetLearningGoalPageDataQuery, useGetLearningGoalPageDataQuery } from './LearningGoalPage.generated';

export const getLearningGoalPageData = gql`
  query getLearningGoalPageData($learningGoalKey: String!) {
    getLearningGoalByKey(key: $learningGoalKey) {
      ...LearningGoalRoadmapData
      ...ConceptGroupLearningGoalData
      domain {
        domain {
          ...DomainLinkData
        }
      }
    }
  }
  ${DomainLinkData}
  ${LearningGoalRoadmapData}
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
  const router = useRouter();

  const [editMode, setEditMode] = useState(router.query.editMode === 'true');

  useEffect(() => {
    if (!loading && learningGoal.domain) {
      routerPushToPage(DomainLearningGoalPageInfo(learningGoal.domain.domain, learningGoal));
    } else {
      if (learningGoal.type === LearningGoalType.SubGoal) {
        throw new Error('Learning Goal ' + learningGoal._id + ' has no domain attached');
      }
    }
  }, []);

  if (!loading && !data) return <NotFoundPage />;
  return (
    <PageLayout
      marginSize="sm"
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
        <LearningGoalRoadmap learningGoal={learningGoal} isLoading={loading} editMode={editMode} />
      )}
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
