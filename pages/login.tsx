import { Box, Button, Input, Stack } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';

import { PasswordInput } from '../src/components/input/PasswordInput';
import { withApollo } from '../src/graphql/apollo';
import { useLogin } from '../src/graphql/users/users.hooks';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="10rem">
      <Stack spacing={6} textAlign="center" width="36rem">
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
        {!!error && (
          <Box color="red.500" fontSize="xl">
            Invalid credentials
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default withApollo(Login);
