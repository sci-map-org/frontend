import { Box } from '@chakra-ui/react';
import { LearningGoalSubGoalCard } from '../SubGoalCard';
import { SubGoalCardDataFragment } from '../SubGoalCard.generated';
import { RoadmapDag } from './RoadmapDag';

interface RoadmapDagViewerProps {
  subGoalsItems: SubGoalCardDataFragment[];
}

export const RoadmapDagViewer: React.FC<RoadmapDagViewerProps> = ({ subGoalsItems }) => {
  return (
    <RoadmapDag
      subGoalsItems={subGoalsItems}
      renderNode={({ meta }, { nodePxHeight, nodePxWidth }, size) => {
        if (meta.data.subGoal.__typename === 'LearningGoal') {
          return (
            <Box w={`${nodePxWidth}px`} h={`${nodePxHeight}px`} key={meta.data.subGoal._id}>
              <LearningGoalSubGoalCard size={size} learningGoal={meta.data.subGoal} status={meta.status} />
            </Box>
          );
        } else {
          return <Box />;
        }
      }}
    />
  );
};
