import { Box } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';
import { LoginForm } from '../components/auth/LoginForm';
import { RoleAccess } from '../components/auth/RoleAccess';
import { PageLayout } from '../components/layout/PageLayout';
import { DiscourseSso } from '../graphql/types';
import { useEffect } from 'react';
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
    if (currentUser) router.push('/');
  }, []);
  if (currentUser) return null;

  return (
    <PageLayout mode="form" title="Login" centerChildren>
      <Box width="36rem">
        <LoginForm
          onSuccessfulLogin={({ redirectUrl }) => {
            if (redirectUrl) {
              window.location.href = redirectUrl;
              return;
            }
            if (redirectTo && typeof redirectTo === 'string') {
              return router.push(redirectTo);
            }
          }}
          discourseSSO={discourseSSO}
        />
      </Box>
    </PageLayout>
  );
};
