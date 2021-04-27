import dynamic from 'next/dynamic';

const ResetPasswordPage = dynamic(
  async () => {
    const { ResetPasswordPage } = await import('../src/pages/ResetPasswordPage');
    return ResetPasswordPage;
  },
  {
    ssr: false,
  }
);

const Page: React.FC = () => {
  return <ResetPasswordPage />;
};

export default Page;
