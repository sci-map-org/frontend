import { Text, Box, Stack, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/core';
import { useState } from 'react';
import { useRegister } from '../src/hooks/auth.hooks';
import { withApollo } from '../src/graphql/apollo';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const [displayName, setDisplayName] = useState('');
  const [key, setKey] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useRegister();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width="40rem">
        <Stack spacing={6} textAlign="center">
          <Text fontSize="6xl">Register</Text>
          <Input placeholder="Email" size="md" variant="flushed" />
          <Input placeholder="Display Name" size="md" variant="flushed" />
          <Input placeholder="Unique alias" size="sm" variant="flushed" />

          <InputRightElement size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputRightElement>
          <Button>Register</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default withApollo(RegisterPage);
