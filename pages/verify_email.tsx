import { VerifyEmailPage } from '../src/pages/VerifyEmailPage';
import dynamic from 'next/dynamic';

// The process must happen on the client side
// not doing anything ?
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
