import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { EditableLearningGoals } from '../learning_goals/EditableLearningGoals';
import { LearningGoalBadgeData } from '../learning_goals/LearningGoalBadge';
import { LearningGoalBadgeDataFragment } from '../learning_goals/LearningGoalBadge.generated';
import {
  EditableLearningMaterialPrerequisitesDataFragment,
  useAddLearningMaterialPrerequisiteMutation,
  useRemoveLearningMaterialPrerequisiteMutation,
} from './EditableLearningMaterialPrerequisites.generated';

export const EditableLearningMaterialPrerequisitesData = gql`
  fragment EditableLearningMaterialPrerequisitesData on LearningMaterial {
    _id
    prerequisites {
      learningGoal {
        ...LearningGoalBadgeData
      }
    }
  }
  ${LearningGoalBadgeData}
`;

interface StatelessEditableLearningMaterialPrerequisitesProps {
  learningGoalsPrerequisites?: LearningGoalBadgeDataFragment[];
  editable?: boolean;
  isLoading?: boolean;
  onRemove: (learningGoalId: string) => void;
  onAdded: (learningGoal: LearningGoalDataFragment) => void;
}
export const StatelessEditableLearningMaterialPrerequisites: React.FC<StatelessEditableLearningMaterialPrerequisitesProps> = ({
  learningGoalsPrerequisites,
  editable,
  isLoading,
  onRemove,
  onAdded,
}) => {
  if (!editable && !learningGoalsPrerequisites?.length) return null;
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Text fontWeight={600} color="gray.500">
        {learningGoalsPrerequisites && learningGoalsPrerequisites.length ? 'Prerequisites' : 'No Prerequisites'}
      </Text>
      {learningGoalsPrerequisites && (
        <EditableLearningGoals
          editable={editable}
          role="prerequisite"
          isLoading={isLoading}
          learningGoals={learningGoalsPrerequisites}
          onAdded={onAdded}
          onRemove={onRemove}
        />
      )}
    </Stack>
  );
};

export const addLearningMaterialPrerequisite = gql`
  mutation addLearningMaterialPrerequisite($learningMaterialId: String!, $prerequisiteLearningGoalId: String!) {
    addLearningMaterialPrerequisite(
      learningMaterialId: $learningMaterialId
      prerequisiteLearningGoalId: $prerequisiteLearningGoalId
    ) {
      _id
      prerequisites {
        learningGoal {
          ...LearningGoalBadgeData
        }
      }
    }
  }
  ${LearningGoalBadgeData}
`;

export const removeLearningMaterialPrerequisite = gql`
  mutation removeLearningMaterialPrerequisite($learningMaterialId: String!, $prerequisiteLearningGoalId: String!) {
    removeLearningMaterialPrerequisite(
      learningMaterialId: $learningMaterialId
      prerequisiteLearningGoalId: $prerequisiteLearningGoalId
    ) {
      _id
      prerequisites {
        learningGoal {
          ...LearningGoalBadgeData
        }
      }
    }
  }
  ${LearningGoalBadgeData}
`;

interface EditableLearningMaterialPrerequisitesProps
  extends Omit<StatelessEditableLearningMaterialPrerequisitesProps, 'onAdded' | 'onRemove'> {
  learningMaterial: EditableLearningMaterialPrerequisitesDataFragment;
}
export const EditableLearningMaterialPrerequisites: React.FC<EditableLearningMaterialPrerequisitesProps> = ({
  learningMaterial,
  ...props
}) => {
  const [addLearningMaterialPrerequisiteMutation] = useAddLearningMaterialPrerequisiteMutation();
  const [removeLearningMaterialPrerequisiteMutation] = useRemoveLearningMaterialPrerequisiteMutation();

  return (
    <StatelessEditableLearningMaterialPrerequisites
      learningGoalsPrerequisites={learningMaterial.prerequisites?.map((prereq) => prereq.learningGoal)}
      onAdded={(learningGoal) =>
        addLearningMaterialPrerequisiteMutation({
          variables: { learningMaterialId: learningMaterial._id, prerequisiteLearningGoalId: learningGoal._id },
        })
      }
      onRemove={(learningGoalId) =>
        removeLearningMaterialPrerequisiteMutation({
          variables: {
            learningMaterialId: learningMaterial._id,
            prerequisiteLearningGoalId: learningGoalId,
          },
        })
      }
      {...props}
    />
  );
};
