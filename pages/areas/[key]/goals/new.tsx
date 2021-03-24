import { useRouter } from 'next/router';
import { AddLearningGoalToDomainPage } from '../../../../src/pages/learning_goals/AddLearningGoalToDomainPage';

const Page: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') return null;
  return <AddLearningGoalToDomainPage domainKey={key} />;
};

export default Page;
