import { PageLayout } from '../../components/layout/PageLayout';
import { NewLearningPath } from '../../components/learning_paths/NewLearningPath';

export const NewLearningPathPage: React.FC<{}> = () => {
  return (
    <PageLayout title="Create Learning Path" mode="form">
      <NewLearningPath />
    </PageLayout>
  );
};
