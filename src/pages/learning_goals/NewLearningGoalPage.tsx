import { PageLayout } from '../../components/layout/PageLayout';
import { NewLearningGoal } from '../../components/learning_goals/NewLearningGoal';

export const NewLearningGoalPage: React.FC<{}> = () => {
  return (
    <PageLayout mode="form" title="Create Learning Goal">
      <NewLearningGoal onCreated={() => null} />
    </PageLayout>
  );
};
