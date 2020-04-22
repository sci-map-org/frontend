import { Box, Button, Input, Stack, Flex } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';

import { useLogin, useLoginGoogle } from '../graphql/users/users.hooks';
import { PasswordInput } from '../components/input/PasswordInput';
import { PageLayout } from '../components/layout/PageLayout';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  const { loginGoogle, error: errorGoogle } = useLoginGoogle();
  return (
    <PageLayout>
      <Flex direction="row" justifyContent="center">
        <Stack spacing={6} textAlign="center" width="36rem">
          <Box>
            <GoogleLogin
              clientId="390325140829-njk2aup9efs7tprmpmqmke93886q602i.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={async (googleUser) => {
                googleUser = googleUser as GoogleLoginResponse;
                await loginGoogle({
                  variables: { idToken: googleUser.getAuthResponse().id_token },
                });
                Router.push('/');
              }}
              onFailure={() => console.log('failure')}
              cookiePolicy={'single_host_origin'}
              accessType="online"
            />
          </Box>
          <Input
            placeholder="Email"
            size="md"
            variant="flushed"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)} // TODO Why event type not inferred ?
          />
          <PasswordInput value={password} onChange={(e: any) => setPassword(e.target.value)} />

          <Button
            size="lg"
            variant="solid"
            onClick={async () => {
              await login({ variables: { email, password } });
              Router.push('/');
            }}
          >
            Login
          </Button>
          {!!error ||
            (!!errorGoogle && (
              <Box color="red.500" fontSize="xl">
                Invalid credentials
              </Box>
            ))}
        </Stack>
      </Flex>
    </PageLayout>
  );
};
