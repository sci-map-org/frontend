import { Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { ReactNode, useMemo } from 'react';
import { useDetachLearningGoalRequiresSubGoalMutation } from '../../graphql/learning_goals/learning_goals.operations.generated';
import { SubGoalCard, SubGoalCardData } from './SubGoalCard';
import { SubGoalsWrapperDataFragment } from './SubGoalsWrapper.generated';

export const RoadmapSubGoalsWrapperData = gql`
  fragment RoadmapSubGoalsWrapperData on LearningGoal {
    _id
    requiredSubGoals {
      ...SubGoalCardData
    }
  }
  ${SubGoalCardData}
`;

interface RoadmapSubGoalsWrapperProps {
  learningGoal: SubGoalsWrapperDataFragment;
  editMode?: boolean;
  renderLastItem?: ReactNode;
}
export const RoadmapSubGoalsWrapper: React.FC<RoadmapSubGoalsWrapperProps> = ({
  learningGoal,
  editMode,
  renderLastItem,
}) => {
  const [detachLearningGoalRequiresSubGoal] = useDetachLearningGoalRequiresSubGoalMutation();
  const subGoalItems = useMemo(
    () => (learningGoal.requiredSubGoals || []).filter((item) => item.subGoal.__typename === 'LearningGoal'),
    [learningGoal.requiredSubGoals]
  );
  if (!learningGoal.requiredSubGoals) return null;
  return (
    <Wrap spacing="30px" justify="center">
      {subGoalItems.map((requiredSubGoalItem, idx) =>
        requiredSubGoalItem.subGoal.__typename === 'LearningGoal' ? (
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
        ) : null
      )}
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
