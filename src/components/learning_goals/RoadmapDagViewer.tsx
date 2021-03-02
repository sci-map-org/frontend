import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { DagreViewer } from '../lib/DagreViewer';
import { LearningGoalSubGoalCard } from './SubGoalCard';
import { SubGoalCardDataFragment } from './SubGoalCard.generated';

interface RoadmapDagViewerProps {
  subGoalsItems: SubGoalCardDataFragment[];
}

// Works for both editor and viewer
export const RoadmapDagViewer: React.FC<RoadmapDagViewerProps> = ({ subGoalsItems }) => {
  const edges = useMemo(() => {
    return subGoalsItems.reduce((edges, subGoalItem) => {
      if (subGoalItem.subGoal.__typename === 'LearningGoal') {
        const e = (subGoalItem.subGoal.dependsOnLearningGoals || []).map((d) => ({
          from: d.learningGoal._id,
          to: subGoalItem.subGoal._id,
          meta: {},
        }));
        return edges.concat(e);
      }
      return edges;
    }, [] as { from: string; to: string; meta: any }[]);
  }, [subGoalsItems]);

  return (
    <DagreViewer
      nodes={subGoalsItems.map((item) => ({
        id: item.subGoal._id,
        label: item.subGoal.name,
        meta: { data: item },
      }))}
      edges={edges}
      renderNode={({ meta }) => {
        if (meta.data.subGoal.__typename === 'LearningGoal') {
          return (
            <Box
              // maxW={{
              //   sm: `calc(50% - ${spacing})`,
              //   md: `calc(33% - ${spacing})`,
              //   lg: `calc(25% - ${spacing})`,
              //   xl: `calc(25% - ${spacing})`,
              // }}
              // minW={{
              //   sm: `calc(50% - ${spacing})`,
              //   md: `calc(33% - ${spacing})`,
              //   lg: `calc(25% - ${spacing})`,
              //   xl: `calc(25% - ${spacing})`,
              // }}
              w="300px"
              h="160px"
              key={meta.data.subGoal._id}
            >
              <LearningGoalSubGoalCard learningGoal={meta.data.subGoal} />
            </Box>
          );
        } else {
          return <Box />;
        }
      }}
    />
  );
};
