import { Stack, Text } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { LearningGoalDataFragment } from '../../graphql/learning_goals/learning_goals.fragments.generated';
import { EditableLearningGoals } from '../learning_goals/EditableLearningGoals';
import { LearningGoalBadgeData } from '../learning_goals/LearningGoalBadge';
import { LearningGoalBadgeDataFragment } from '../learning_goals/LearningGoalBadge.generated';
import {
  EditableLearningMaterialOutcomesDataFragment,
  useAddLearningMaterialOutcomeMutation,
  useRemoveLearningMaterialOutcomeMutation,
} from './EditableLearningMaterialOutcomes.generated';

// export const EditableLearningMaterialOutcomesData = gql`
//   fragment EditableLearningMaterialOutcomesData on LearningMaterial {
//     _id
//     outcomes {
//       learningGoal {
//         ...LearningGoalBadgeData
//       }
//     }
//   }
//   ${LearningGoalBadgeData}
// `;

interface StatelessEditableLearningMaterialOutcomesProps {
  learningGoalsOutcomes?: LearningGoalBadgeDataFragment[];
  isLoading?: boolean;
  editable?: boolean;
  onRemove: (learningGoalId: string) => void;
  onAdded: (learningGoal: LearningGoalDataFragment) => void;
}
export const StatelessEditableLearningMaterialOutcomes: React.FC<StatelessEditableLearningMaterialOutcomesProps> = ({
  learningGoalsOutcomes,
  onRemove,
  onAdded,
  isLoading,
  editable,
}) => {
  if (!editable && !learningGoalsOutcomes?.length) return null;
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Text fontWeight={600} color="gray.700">
        What you'll get out of it
      </Text>
      {learningGoalsOutcomes && (
        <EditableLearningGoals
          editable={editable}
          isLoading={isLoading}
          role="outcome"
          learningGoals={learningGoalsOutcomes}
          onAdded={onAdded}
          onRemove={onRemove}
        />
      )}
    </Stack>
  );
};

// export const addLearningMaterialOutcome = gql`
//   mutation addLearningMaterialOutcome($learningMaterialId: String!, $outcomeLearningGoalId: String!) {
//     addLearningMaterialOutcome(learningMaterialId: $learningMaterialId, outcomeLearningGoalId: $outcomeLearningGoalId) {
//       _id
//       outcomes {
//         learningGoal {
//           ...LearningGoalBadgeData
//         }
//       }
//     }
//   }
//   ${LearningGoalBadgeData}
// `;

// export const removeLearningMaterialOutcome = gql`
//   mutation removeLearningMaterialOutcome($learningMaterialId: String!, $outcomeLearningGoalId: String!) {
//     removeLearningMaterialOutcome(
//       learningMaterialId: $learningMaterialId
//       outcomeLearningGoalId: $outcomeLearningGoalId
//     ) {
//       _id
//       outcomes {
//         learningGoal {
//           ...LearningGoalBadgeData
//         }
//       }
//     }
//   }
//   ${LearningGoalBadgeData}
// `;

interface EditableLearningMaterialOutcomesProps
  extends Omit<StatelessEditableLearningMaterialOutcomesProps, 'onAdded' | 'onRemove'> {
  learningMaterial: EditableLearningMaterialOutcomesDataFragment;
}
export const EditableLearningMaterialOutcomes: React.FC<EditableLearningMaterialOutcomesProps> = ({
  learningMaterial,
  ...props
}) => {
  const [addLearningMaterialOutcomeMutation] = useAddLearningMaterialOutcomeMutation();
  const [removeLearningMaterialOutcomeMutation] = useRemoveLearningMaterialOutcomeMutation();

  return (
    <StatelessEditableLearningMaterialOutcomes
      learningGoalsOutcomes={learningMaterial.outcomes?.map((outcome) => outcome.learningGoal)}
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
      {...props}
    />
  );
};
