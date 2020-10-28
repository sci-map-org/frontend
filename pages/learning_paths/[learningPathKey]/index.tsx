import { useRouter } from 'next/router';
import { LearningPathPage } from '../../../src/pages/learning_paths/LearningPathPage';


const Page: React.FC = () => {
  const router = useRouter();

  const { learningPathKey } = router.query;

  if (typeof learningPathKey !== 'string') return null;

  return <LearningPathPage learningPathKey={learningPathKey} />;
};

export default Page;
