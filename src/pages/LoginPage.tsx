import { LoginForm } from '../components/auth/LoginForm';
import { PageLayout } from '../components/layout/PageLayout';
import Router from 'next/router';
import { Box } from '@chakra-ui/core';

export const LoginPage: React.FC = () => {
  return (
    <PageLayout mode="form" title="Login" centerChildren>
      <Box width="36rem">
        <LoginForm onSuccessfulLogin={() => Router.back()} />
      </Box>
    </PageLayout>
  );
};
