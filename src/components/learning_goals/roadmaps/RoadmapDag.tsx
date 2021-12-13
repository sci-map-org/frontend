import { useTheme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { DagreViewerProps, NodeData, SubGoalStatus } from '../../lib/DagreViewer';
import { SubGoalCardDataFragment } from '../SubGoalCard.generated';

const DagreViewer = dynamic<DagreViewerProps<SubGoalCardDataFragment, {}>>(
  () =>
    import('../../lib/DagreViewer').then((res) => {
      const { DagreViewer } = res;
      return DagreViewer;
    }),
  { ssr: false }
);

interface RoadmapDagProps {
  subGoalsItems: SubGoalCardDataFragment[];
  renderingStage?: number;
  renderNode: (
    nodeData: NodeData<SubGoalCardDataFragment>,
    sizing: { nodePxWidth: number; nodePxHeight: number },
    cardSize: 'lg' | 'md' | 'sm'
  ) => React.ReactElement<any>;
}

export const getSubGoalStatus = (
  item: SubGoalCardDataFragment,

  subGoalsItems: SubGoalCardDataFragment[]
): SubGoalStatus => {
  if (item.subGoal.__typename !== 'LearningGoal') throw new Error('Expected Subgoal of type Learning Goal');
  // if (item.subGoal.progress?.level === 100) return SubGoalStatus.Completed;
  // const dependenciesCompleted = (item.subGoal.dependsOnLearningGoals || [])
  //   .map((dep) => dep.learningGoal._id)
  //   .map((depId) => subGoalsItems.find((subGoalItem) => subGoalItem.subGoal._id === depId))
  //   .filter((d) => !!d)
  //   .map((dep) => dep?.subGoal.__typename === 'LearningGoal' && dep.subGoal.progress?.level === 100);
  // if (dependenciesCompleted.every((c) => c)) return SubGoalStatus.Available;
  return SubGoalStatus.Locked;
};
const getCardSize = (cardWidth: number) => {
  if (cardWidth > 250) return 'lg';
  if (cardWidth < 200) return 'sm';
  return 'md';
};
export const RoadmapDag: React.FC<RoadmapDagProps> = ({ subGoalsItems, renderingStage, renderNode }) => {
  const theme = useTheme();

  // const nodes = useMemo(() => {
  //   return subGoalsItems.map((item) => ({
  //     id: item.subGoal._id,
  //     label: item.subGoal.name,
  //     meta: { data: item, status: getSubGoalStatus(item, subGoalsItems) },
  //   }));
  // }, [subGoalsItems]);
  // const edges = useMemo(() => {
  //   return subGoalsItems.reduce((edges, subGoalItem) => {
  //     if (subGoalItem.subGoal.__typename === 'LearningGoal') {
  //       const destination = nodes.find(({ id }) => id === subGoalItem.subGoal._id);

  //       const e = (subGoalItem.subGoal.dependsOnLearningGoals || []).map((d) => ({
  //         from: d.learningGoal._id,
  //         to: subGoalItem.subGoal._id,
  //         meta: {},
  //         styles: {
  //           marker: {
  //             styles: {
  //               fill:
  //                 destination?.meta.status === SubGoalStatus.Locked ? theme.colors.gray[500] : theme.colors.teal[600], //'#276749',
  //             },
  //           },
  //           edge: {
  //             styles: {
  //               fill: '#ffffffff',
  //               stroke:
  //                 destination?.meta.status === SubGoalStatus.Locked ? theme.colors.gray[500] : theme.colors.teal[600], //'#276749', //"#8a0000",
  //             },
  //           },
  //         },
  //       }));
  //       return edges.concat(e);
  //     }
  //     return edges;
  //   }, [] as { from: string; to: string; meta: any }[]);
  // }, [subGoalsItems]);

  return (
    <DagreViewer
      // nodes={nodes}
      // edges={edges}
      nodes={[]}
      edges={[]}
      minNodeWidth={150}
      maxNodeWidth={250}
      nodeHeight={(nodePxWidth) => nodePxWidth / 1.8}
      renderNode={(...props) => renderNode(...props, getCardSize(props[1].nodePxWidth))}
      renderingStage={renderingStage}
    />
  );
};
