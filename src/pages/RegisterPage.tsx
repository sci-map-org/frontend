import { PageLayout } from '../components/layout/PageLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
import Router from 'next/router';
import { Box } from '@chakra-ui/core';

export const RegisterPage: React.FC = () => {
  return (
    <PageLayout mode="form" title="Register" centerChildren>
      <Box width="36rem">
        <RegisterForm onSuccess={() => Router.push(`/`)} />
      </Box>
    </PageLayout>
  );
};
