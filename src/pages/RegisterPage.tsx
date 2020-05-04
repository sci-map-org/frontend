import { PageLayout } from '../components/layout/PageLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
import Router from 'next/router';

export const RegisterPage: React.FC = () => {
  return (
    <PageLayout mode="form" title="Register">
      <RegisterForm onSuccess={() => Router.push(`/`)} />
    </PageLayout>
  );
};
