import { Box, Button, Input, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { useLogin } from '../../graphql/users/users.hooks';
import { PasswordInput } from '../input/PasswordInput';
import { GoogleAuthButton } from './GoogleAuthButton';
import { DiscourseSso, LoginResponse } from '../../graphql/types';

export const LoginForm: React.FC<{
  onSuccessfulLogin?: (loginResponse: LoginResponse) => void;
  discourseSSO?: DiscourseSso;
}> = ({ onSuccessfulLogin, discourseSSO }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useLogin({
    onCompleted(data) {
      onSuccessfulLogin && onSuccessfulLogin(data.login);
    },
  });
  return (
    <Stack spacing={6} textAlign="center">
      <Text fontSize="xl">Using Third Parties</Text>
      <Stack spacing={2} textAlign="center" onClick={(e) => e.stopPropagation()}>
        <GoogleAuthButton
          buttonText="Login with Google"
          discourseSSO={discourseSSO}
          onSuccessfulLogin={(loginResponse) => {
            if (onSuccessfulLogin) onSuccessfulLogin(loginResponse);
          }}
          onFailedLogin={() => console.error('')}
          onFailure={() => {}}
        />
      </Stack>
      <Stack spacing={2}>
        <Text fontSize="xl">With Email and Password</Text>
        <Input
          placeholder="Email"
          size="md"
          variant="flushed"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      </Stack>
      <Button
        size="lg"
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
