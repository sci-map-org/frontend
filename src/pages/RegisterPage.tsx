import { Box } from '@chakra-ui/core';
import Router from 'next/router';
import { RegisterForm } from '../components/auth/RegisterForm';
import { RoleAccess } from '../components/auth/RoleAccess';
import { PageLayout } from '../components/layout/PageLayout';

export const RegisterPage: React.FC = () => {
  return (
    <RoleAccess accessRule="notLoggedInUser" goBack>
      <PageLayout mode="form" title="Register" centerChildren>
        <Box width="36rem">
          <RegisterForm onSuccess={() => Router.push(`/`)} />
        </Box>
      </PageLayout>
    </RoleAccess>
  );
};
