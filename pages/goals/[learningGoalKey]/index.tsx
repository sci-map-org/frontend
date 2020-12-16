import { useRouter } from 'next/router';
import { LearningGoalPage } from '../../../src/pages/learning_goals/LearningGoalPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { learningGoalKey } = router.query;

  if (typeof learningGoalKey !== 'string') return null;

  return <LearningGoalPage learningGoalKey={learningGoalKey} />;
};

export default Page;
