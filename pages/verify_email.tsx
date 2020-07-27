import { VerifyEmailPage } from '../src/pages/VerifyEmailPage';
import dynamic from 'next/dynamic';

dynamic(
  async () => {
    const { VerifyEmailPage } = await import('../src/pages/VerifyEmailPage');
    return VerifyEmailPage;
  },
  {
    ssr: false,
  }
);

const Page: React.FC = () => {
  return <VerifyEmailPage />;
};

export default Page;
