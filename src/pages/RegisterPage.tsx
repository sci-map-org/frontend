import { Box, Divider, Link, Text } from '@chakra-ui/core';
import Router from 'next/router';
import { RegisterForm } from '../components/auth/RegisterForm';
import { RoleAccess } from '../components/auth/RoleAccess';
import { PageLayout } from '../components/layout/PageLayout';

export const RegisterPage: React.FC = () => {
  return (
    <RoleAccess accessRule="notLoggedInUser" redirectTo="/">
      <PageLayout mode="form" title="Register" centerChildren>
        <Box width="36rem">
          <RegisterForm onSuccess={() => Router.push(`/`)} />
          <Divider my={4}></Divider>
          <Box textAlign="center">
            <Text fontSize="l">
              Already have an account ?{' '}
              <Link color="blue.400" onClick={() => Router.push('/login')}>
                Login
              </Link>
            </Text>
          </Box>
        </Box>
      </PageLayout>
    </RoleAccess>
  );
};
