import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { useLogin, useLoginGoogle } from '../../graphql/users/users.hooks';
import { PasswordInput } from '../input/PasswordInput';

export const LoginForm: React.FC<{
  onSuccessfulLogin?: () => void;
}> = ({ onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  const { loginGoogle, error: errorGoogle } = useLoginGoogle();
  return (
    <Flex direction="row" justifyContent="center">
      <Stack spacing={6} textAlign="center" width="36rem">
        <Stack spacing={2} textAlign="center" onClick={(e) => e.stopPropagation()}>
          <Text fontSize="xl">Using Third Parties</Text>
          <GoogleLogin
            clientId="390325140829-njk2aup9efs7tprmpmqmke93886q602i.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={async (googleUser) => {
              googleUser = googleUser as GoogleLoginResponse;
              await loginGoogle({
                variables: { idToken: googleUser.getAuthResponse().id_token },
              });
              if (onSuccessfulLogin) onSuccessfulLogin();
            }}
            onFailure={() => console.error('failure google log in')}
            cookiePolicy={'single_host_origin'}
            type="button"
            accessType="online"
          />
        </Stack>
        <Stack spacing={2}>
          <Text fontSize="xl">With Email and Password</Text>
          <Input
            placeholder="Email"
            size="md"
            variant="flushed"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)} // TODO Why event type not inferred ?
          />
          <PasswordInput value={password} onChange={(e: any) => setPassword(e.target.value)} />
        </Stack>
        <Button
          size="lg"
          variant="solid"
          onClick={async () => {
            await login({ variables: { email, password } });
            if (onSuccessfulLogin) onSuccessfulLogin();
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
  );
};
