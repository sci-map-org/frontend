import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Stack } from '@chakra-ui/core';
import Router from 'next/router';
import { useState } from 'react';
import { useLogin, useLoginGoogle, useRegister, useRegisterGoogle } from '../../graphql/users/users.hooks';
import { generateUrlKey } from '../../services/url.service';
import { RegisterAuthInfo, RegisterFormAuthInfo } from './RegisterFormAuthInfo';
import { RegisterFormProfileInfo, RegisterProfileInfo } from './RegisterFormProfileInfo';

export const RegisterForm: React.FC<{}> = () => {
  const [authInfo, setAuthInfo] = useState<RegisterAuthInfo>();
  const [profileInfo, setProfileInfo] = useState<RegisterProfileInfo>();
  const { register, error } = useRegister();
  const { registerGoogle, error: googleError } = useRegisterGoogle();
  const { login } = useLogin();
  const { loginGoogle } = useLoginGoogle();

  const onRegister = async (profileData: RegisterProfileInfo) => {
    setProfileInfo(profileInfo);
    if (!authInfo) {
      throw new Error('Unreachable code reached');
    }
    if (authInfo.type === 'basic') {
      const { email, password } = authInfo;
      await register({
        variables: {
          payload: { email, password, ...profileData },
        },
      });
      await login({
        variables: {
          email,
          password,
        },
      });
    } else if (authInfo.type === 'google') {
      await registerGoogle({
        variables: {
          payload: { idToken: authInfo.id_token, ...profileData },
        },
      });
      await loginGoogle({
        variables: {
          idToken: authInfo.id_token,
        },
      });
    }

    Router.push(`/`);
  };
  return (
    <Stack spacing={2}>
      {!authInfo && <RegisterFormAuthInfo onNext={setAuthInfo} />}
      {authInfo && (
        <RegisterFormProfileInfo
          defaultProfileInfo={
            authInfo.type === 'google' ? { displayName: authInfo.name, key: generateUrlKey(authInfo.name) } : {}
          }
          onRegister={onRegister}
        />
      )}
      {!!error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Failed to register</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
      {!!googleError && (
        <Box>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Failed to register</AlertTitle>
            <AlertDescription>{googleError.message}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        </Box>
      )}
    </Stack>
  );
};
