import { Box } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';
import { LoginForm } from '../components/auth/LoginForm';
import { PageLayout } from '../components/layout/PageLayout';
import { DiscourseSso } from '../graphql/types';

export const LoginPage: React.FC = () => {
  const router = useRouter();
  let discourseSSO: DiscourseSso | undefined = undefined;

  if (
    router.query.sso &&
    typeof router.query.sso === 'string' &&
    router.query.sig &&
    typeof router.query.sig === 'string'
  ) {
    discourseSSO = { sso: router.query.sso, sig: router.query.sig };
  }

  return (
    <PageLayout mode="form" title="Login" centerChildren>
      <Box width="36rem">
        <LoginForm
          onSuccessfulLogin={({ redirectUrl }) => (redirectUrl ? (window.location.href = redirectUrl) : Router.back())}
          discourseSSO={discourseSSO}
        />
      </Box>
    </PageLayout>
  );
};
