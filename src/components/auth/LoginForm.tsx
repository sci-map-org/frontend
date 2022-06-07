import { Box, Button, Divider, Input, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { DiscourseSso } from '../../graphql/types';
import { LoginResponseDataFragment } from '../../graphql/users/users.fragments.generated';
import { useLogin } from '../../graphql/users/users.hooks';
import { routerPushToPage } from '../../pages/PageInfo';
import { RegisterPageInfo, ResetPasswordPageInfo } from '../../pages/RoutesPageInfos';
import { PasswordInput } from '../lib/inputs/PasswordInput';
import { useErrorToast } from '../lib/Toasts/ErrorToast';
import { GoogleAuthButton } from './GoogleAuthButton';

export const LoginForm: React.FC<{
  onSuccessfulLogin?: (loginResponse: LoginResponseDataFragment) => void;
  discourseSSO?: DiscourseSso;
}> = ({ onSuccessfulLogin, discourseSSO }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useLogin({
    onCompleted(data) {
      onSuccessfulLogin && onSuccessfulLogin(data.login);
    },
  });
  const errorToast = useErrorToast();
  return (
    <Stack spacing={6} textAlign="center">
      <Text fontSize="xl">Using your Google account</Text>
      <Stack spacing={2} alignItems="center" textAlign="center" onClick={(e: any) => e.stopPropagation()}>
        <GoogleAuthButton
          // buttonText="Login with Google"
          discourseSSO={discourseSSO}
          onSuccessfulLogin={(loginResponse) => {
            if (onSuccessfulLogin) onSuccessfulLogin(loginResponse);
          }}
          onFailedLogin={() => {
            errorToast({ title: 'Failed to login - Please register an account first' });
            routerPushToPage(RegisterPageInfo);
          }}
          onFailure={() => {}}
        />
      </Stack>
      <Divider />
      <Stack spacing={4}>
        <Stack spacing={0}>
          <Text fontSize="xl">Or with your email address</Text>
          <NextLink
            href={{
              pathname: ResetPasswordPageInfo.routePath,
              // query
            }}
            as={ResetPasswordPageInfo.path}
            passHref
          >
            {/* Used rather than PageLink to avoid a circular dependency */}
            <Link color="blue.500" fontSize="xs" fontWeight={400} _active={{}} _focus={{}}>
              Forgot password?
            </Link>
          </NextLink>
        </Stack>
        <Input
          placeholder="Email"
          size="md"
          variant="outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          value={password}
          variant="outline"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') login({ variables: { email, password, discourseSSO } });
          }}
        />
      </Stack>
      <Button
        size="lg"
        isDisabled={!email || password.length < 6}
        colorScheme="teal"
        variant="solid"
        onClick={async () => {
          login({ variables: { email, password, discourseSSO } });
        }}
      >
        Login
      </Button>
      {!!error && (
        <Box color="red.500" fontSize="xl">
          Invalid credentials
        </Box>
      )}
    </Stack>
  );
};
