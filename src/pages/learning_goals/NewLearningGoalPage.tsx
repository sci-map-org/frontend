import Router from 'next/router';
import { PageLayout } from '../../components/layout/PageLayout';
import { NewLearningGoal } from '../../components/learning_goals/NewLearningGoal';
import { routerPushToPage } from '../PageInfo';
import { LearningGoalPageInfo } from './LearningGoalPage';

export const NewLearningGoalPage: React.FC<{}> = () => {
  return (
    <PageLayout marginSize="xl" title="Create a Learning Goal">
      <NewLearningGoal
        onCancel={() => Router.back()}
        onCreated={(learningGoal) => routerPushToPage(LearningGoalPageInfo(learningGoal))}
      />
    </PageLayout>
  );
};
