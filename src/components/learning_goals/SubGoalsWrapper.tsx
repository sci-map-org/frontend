import { Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactNode } from 'react';
import { useDetachLearningGoalRequiresSubGoalMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { SubGoalCard, SubGoalCardData } from './SubGoalCard';
import { SubGoalsWrapperDataFragment } from './SubGoalsWrapper.generated';

export const SubGoalsWrapperData = gql`
  fragment SubGoalsWrapperData on LearningGoal {
    _id
    requiredSubGoals {
      ...SubGoalCardData
    }
  }
  ${SubGoalCardData}
`;

interface SubGoalsWrapperProps {
  learningGoal: SubGoalsWrapperDataFragment;
  editMode?: boolean;
  renderLastItem?: ReactNode;
}
export const SubGoalsWrapper: React.FC<SubGoalsWrapperProps> = ({ learningGoal, editMode, renderLastItem }) => {
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();
  if (!learningGoal.requiredSubGoals) return null;
  return (
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
      {renderLastItem && (
        <WrapItem
          borderWidth="1px"
          borderColor="gray.500"
          boxShadow="md"
          w="45%"
          borderRadius={5}
          display="flex"
          flexDirection="column"
          justifyContent="stretch"
          alignItems="stretch"
        >
          {renderLastItem}
        </WrapItem>
      )}
    </Wrap>
  );
};
