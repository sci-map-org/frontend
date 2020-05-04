import { LoginForm } from '../components/auth/LoginForm';
import { PageLayout } from '../components/layout/PageLayout';
import Router from 'next/router';

export const LoginPage: React.FC = () => {
  return (
    <PageLayout mode="form" title="Login">
      <LoginForm onSuccessfulLogin={() => Router.back()} />
    </PageLayout>
  );
};
