import {
  Button,
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/core';
import { useState } from 'react';
import { validateEmail } from '../../util/email.util';
import { PasswordInput } from '../lib/inputs/PasswordInput';
import { GoogleAuthButton } from './GoogleAuthButton';

type GoogleAuthInfo = {
  type: 'google';
  email: string;
  name: string;
  id_token: string;
};

type BasicAuthInfo = {
  type: 'basic';
  email: string;
  password: string;
};

export type RegisterAuthInfo = GoogleAuthInfo | BasicAuthInfo;

interface RegisterFormAuthInfoProps {
  onNext: (info: RegisterAuthInfo) => void;
  onSuccessfulLogin: () => void;
}

export const RegisterFormAuthInfo: React.FC<RegisterFormAuthInfoProps> = ({ onNext, onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;

  return (
    <Stack spacing={6} textAlign="center">
      <Box fontSize="md" mb={3} px={3} textAlign="left" textColor="mainDarker" as="div" fontWeight={500}>
        <Text>Create an account and</Text>
        <List styleType="disc" ml={10} mt={2}>
          <ListItem>Enjoy personalized recommendations</ListItem>
          <ListItem>Keep track of what you learned</ListItem>
          <ListItem>Contribute to building an open learning map</ListItem>
          <Text textAlign="right" fontStyle="italic" mt={2}>
            ...and much more!
          </Text>
        </List>
      </Box>
      <Text fontSize="xl" fontWeight={300}>
        Register using your Google account
      </Text>
      <Stack spacing={2} textAlign="center" onClick={(e) => e.stopPropagation()}>
        <GoogleAuthButton
          buttonText="Register with Google"
          onSuccessfulLogin={onSuccessfulLogin}
          onFailedLogin={(googleUser) => {
            const profile = googleUser.getBasicProfile();
            onNext({
              type: 'google',
              id_token: googleUser.getAuthResponse().id_token,
              email: profile.getEmail(),
              name: profile.getName(),
            });
          }}
          onFailure={() => {}}
        />
      </Stack>
      <Divider />
      <Text fontSize="xl" fontWeight={300}>
        Or with your email address
      </Text>
      <FormControl isRequired isInvalid={!!email && !isEmailValid}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="example@domain.com"
          size="md"
          variant="flushed"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!password && !isPasswordValid}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              onNext({
                type: 'basic',
                email,
                password,
              });
          }}
        />
        <FormErrorMessage>The password must be at least 6 characters long</FormErrorMessage>
      </FormControl>
      <Button
        isDisabled={!password || !isPasswordValid || !email || !isEmailValid}
        size="lg"
        variant="solid"
        onClick={() => {
          onNext({
            type: 'basic',
            email,
            password,
          });
        }}
      >
        Next
      </Button>
    </Stack>
  );
};
