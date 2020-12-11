import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { EditableLearningGoals } from '../learning_goals/EditableLearningGoals';
import { LearningGoalBadgeData } from '../learning_goals/LearningGoalBadge';
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
        _id
        name
        key
      }
    }
  }
`;

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

export const EditableLearningMaterialPrerequisites: React.FC<{
  learningMaterial: EditableLearningMaterialPrerequisitesDataFragment;
  editable?: boolean;
}> = ({ learningMaterial, editable }) => {
  const [addLearningMaterialPrerequisiteMutation] = useAddLearningMaterialPrerequisiteMutation();
  const [removeLearningMaterialPrerequisiteMutation] = useRemoveLearningMaterialPrerequisiteMutation();

  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Text fontWeight={600} color="gray.500">
        Prerequisites
      </Text>
      {learningMaterial.prerequisites && (
        <EditableLearningGoals
          editable={editable}
          role="prerequisite"
          learningGoals={learningMaterial.prerequisites.map((prerequisite) => prerequisite.learningGoal)}
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
        />
      )}
    </Stack>
  );
};
