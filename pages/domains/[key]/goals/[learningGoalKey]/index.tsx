import { useRouter } from 'next/router';
import { DomainLearningGoalPage } from '../../../../../src/pages/learning_goals/DomainLearningGoalPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { learningGoalKey, key } = router.query;

  if (typeof learningGoalKey !== 'string') return null;
  if (typeof key !== 'string') return null;

  return <DomainLearningGoalPage domainKey={key} learningGoalKey={learningGoalKey} />;
};

export default Page;
