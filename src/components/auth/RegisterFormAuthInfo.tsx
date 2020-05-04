import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { validateEmail } from '../../util/email.util';
import { PasswordInput } from '../input/PasswordInput';

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
}

export const RegisterFormAuthInfo: React.FC<RegisterFormAuthInfoProps> = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;

  return (
    <Stack spacing={6} textAlign="center">
      <Text fontSize="xl">Using Third Parties</Text>
      <Stack spacing={2} textAlign="center" onClick={(e) => e.stopPropagation()}>
        <GoogleLogin
          clientId="390325140829-njk2aup9efs7tprmpmqmke93886q602i.apps.googleusercontent.com"
          buttonText="Register with Google"
          onSuccess={(googleUser) => {
            googleUser = googleUser as GoogleLoginResponse;
            const profile = googleUser.getBasicProfile();
            onNext({
              type: 'google',
              id_token: googleUser.getAuthResponse().id_token,
              email: profile.getEmail(),
              name: profile.getName(),
            });
          }}
          onFailure={() => console.log('failure')}
          cookiePolicy={'single_host_origin'}
          accessType="online"
        />
      </Stack>
      <Text fontSize="xl">Or with email and password</Text>
      <Divider />
      <FormControl isRequired isInvalid={!!email && !isEmailValid}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="example@domain.com"
          size="md"
          variant="flushed"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)} // TODO Why event type not inferred ?
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!password && !isPasswordValid}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput value={password} onChange={(e: any) => setPassword(e.target.value)} />
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
