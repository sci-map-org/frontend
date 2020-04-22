import { PageLayout } from '../components/layout/PageLayout';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <PageLayout mode="form">
      <RegisterForm />
    </PageLayout>
  );
};
