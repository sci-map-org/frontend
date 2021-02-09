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

const spacing = '30px';
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
    <Wrap spacing={spacing} justify="start">
      {subGoalItems.map((requiredSubGoalItem, idx) =>
        requiredSubGoalItem.subGoal.__typename === 'LearningGoal' ? (
          <WrapItem
            maxW={{
              sm: `calc(50% - ${spacing})`,
              md: `calc(33% - ${spacing})`,
              lg: `calc(25% - ${spacing})`,
              xl: `calc(25% - ${spacing})`,
            }}
            minW={{
              sm: `calc(50% - ${spacing})`,
              md: `calc(33% - ${spacing})`,
              lg: `calc(25% - ${spacing})`,
              xl: `calc(25% - ${spacing})`,
            }}
            h="160px"
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
          maxW={{
            sm: `calc(50% - ${spacing})`,
            md: `calc(33% - ${spacing})`,
            lg: `calc(25% - ${spacing})`,
            xl: `calc(25% - ${spacing})`,
          }}
          minW={{
            sm: `calc(50% - ${spacing})`,
            md: `calc(33% - ${spacing})`,
            lg: `calc(25% - ${spacing})`,
            xl: `calc(25% - ${spacing})`,
          }}
          h="160px"
        >
          {renderLastItem}
        </WrapItem>
      )}
    </Wrap>
  );
};
