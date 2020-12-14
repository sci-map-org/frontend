import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { EditableLearningGoals } from '../learning_goals/EditableLearningGoals';
import { LearningGoalBadgeData } from '../learning_goals/LearningGoalBadge';
import {
  EditableLearningMaterialOutcomesDataFragment,
  useAddLearningMaterialOutcomeMutation,
  useRemoveLearningMaterialOutcomeMutation,
} from './EditableLearningMaterialOutcomes.generated';

export const EditableLearningMaterialOutcomesData = gql`
  fragment EditableLearningMaterialOutcomesData on LearningMaterial {
    _id
    outcomes {
      learningGoal {
        _id
        name
        key
      }
    }
  }
`;

export const addLearningMaterialOutcome = gql`
  mutation addLearningMaterialOutcome($learningMaterialId: String!, $outcomeLearningGoalId: String!) {
    addLearningMaterialOutcome(learningMaterialId: $learningMaterialId, outcomeLearningGoalId: $outcomeLearningGoalId) {
      _id
      outcomes {
        learningGoal {
          ...LearningGoalBadgeData
        }
      }
    }
  }
  ${LearningGoalBadgeData}
`;

export const removeLearningMaterialOutcome = gql`
  mutation removeLearningMaterialOutcome($learningMaterialId: String!, $outcomeLearningGoalId: String!) {
    removeLearningMaterialOutcome(
      learningMaterialId: $learningMaterialId
      outcomeLearningGoalId: $outcomeLearningGoalId
    ) {
      _id
      outcomes {
        learningGoal {
          ...LearningGoalBadgeData
        }
      }
    }
  }
  ${LearningGoalBadgeData}
`;

export const EditableLearningMaterialOutcomes: React.FC<{
  learningMaterial: EditableLearningMaterialOutcomesDataFragment;
  editable?: boolean;
  isLoading?: boolean;
}> = ({ learningMaterial, editable, isLoading }) => {
  const [addLearningMaterialOutcomeMutation] = useAddLearningMaterialOutcomeMutation();
  const [removeLearningMaterialOutcomeMutation] = useRemoveLearningMaterialOutcomeMutation();

  if (!editable && !learningMaterial.outcomes?.length) return null;
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Text fontWeight={600} color="gray.700">
        What you'll get out of it
      </Text>
      {learningMaterial.outcomes && (
        <EditableLearningGoals
          editable={editable}
          isLoading={isLoading}
          role="outcome"
          learningGoals={learningMaterial.outcomes.map((outcome) => outcome.learningGoal)}
          onAdded={(learningGoal) =>
            addLearningMaterialOutcomeMutation({
              variables: { learningMaterialId: learningMaterial._id, outcomeLearningGoalId: learningGoal._id },
            })
          }
          onRemove={(learningGoalId) =>
            removeLearningMaterialOutcomeMutation({
              variables: {
                learningMaterialId: learningMaterial._id,
                outcomeLearningGoalId: learningGoalId,
              },
            })
          }
        />
      )}
    </Stack>
  );
};
