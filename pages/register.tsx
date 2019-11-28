import { Text, Box, Stack, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/core';
import { useState } from 'react';
import { withApollo } from '../src/graphql/apollo';
import { useRegister } from '../src/graphql/users/users.hooks';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const [displayName, setDisplayName] = useState('');
  const [key, setKey] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useRegister();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width="36rem" pt={6}>
        <Stack spacing={6} textAlign="center">
          <Text fontSize="5xl">Register</Text>
          <Input
            placeholder="Email"
            size="md"
            variant="flushed"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)} // TODO Why event type not inferred ?
          />
          <Input
            placeholder="Display Name"
            size="md"
            variant="flushed"
            value={displayName}
            onChange={(e: any) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="Unique alias"
            size="sm"
            variant="flushed"
            value={key}
            onChange={(e: any) => setKey(e.target.value)}
          />

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              variant="flushed"
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
          </InputGroup>
          <Button
            size="lg"
            variant="solid"
            onClick={() =>
              register({
                variables: {
                  payload: {
                    email,
                    displayName,
                    key,
                    password,
                  },
                },
              })
            }
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default withApollo(RegisterPage);
