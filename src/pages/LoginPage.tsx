import { Box, Button, Input, Stack, Flex } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';

import { useLogin } from '../graphql/users/users.hooks';
import { PasswordInput } from '../components/input/PasswordInput';
import { PageLayout } from '../components/layout/PageLayout';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  return (
    <PageLayout>
      <Flex direction="row" justifyContent="center">
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
      </Flex>
    </PageLayout>
  );
};
