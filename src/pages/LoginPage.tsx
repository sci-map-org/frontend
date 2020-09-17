import { Box, Divider, Link, Stack, Text } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { PageLayout } from '../components/layout/PageLayout';
import { DiscourseSso } from '../graphql/types';
import { useCurrentUser } from '../graphql/users/users.hooks';

export const LoginPagePath = '/login';

export const LoginPage: React.FC = () => {
  const router = useRouter();
  const { redirectTo } = router.query;
  const { currentUser } = useCurrentUser();
  let discourseSSO: DiscourseSso | undefined = undefined;
  if (
    router.query.sso &&
    typeof router.query.sso === 'string' &&
    router.query.sig &&
    typeof router.query.sig === 'string'
  ) {
    discourseSSO = { sso: router.query.sso, sig: router.query.sig };
  }

  useEffect(() => {
    if (currentUser && !discourseSSO) router.push('/');
  }, []);
  if (currentUser && !discourseSSO) return null;

  return (
    <PageLayout mode="form" title="Login" centerChildren>
      <Stack width="36rem">
        <LoginForm
          onSuccessfulLogin={({ redirectUrl }) => {
            if (redirectUrl) {
              window.location.href = redirectUrl;
              return;
            }
            if (redirectTo && typeof redirectTo === 'string') {
              return router.push(redirectTo);
            }
            router.push('/');
          }}
          discourseSSO={discourseSSO}
        />
        <Divider my={4}></Divider>
        <Box textAlign="center">
          <Text fontSize="l">
            No account yet ?{' '}
            <Link color="blue.400" onClick={() => Router.push('/register')}>
              Register
            </Link>
          </Text>
        </Box>
      </Stack>
    </PageLayout>
  );
};
