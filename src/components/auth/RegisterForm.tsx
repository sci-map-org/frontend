import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLoginGoogle } from '../../graphql/users/users.hooks';
import { useRegisterGoogleMutation, useRegisterMutation } from '../../graphql/users/users.operations.generated';
import { generateUrlKey } from '../../services/url.service';
import { RegisterAuthInfo, RegisterFormAuthInfo } from './RegisterFormAuthInfo';
import { RegisterFormProfileInfo, RegisterProfileInfo } from './RegisterFormProfileInfo';

export const RegisterForm: React.FC<{
  onSuccess: () => void;
}> = ({ onSuccess }) => {
  const [authInfo, setAuthInfo] = useState<RegisterAuthInfo>();
  const [register, { error, loading, data: registerResult }] = useRegisterMutation();
  const [registerGoogle, { error: googleError, loading: googleLoading, data: registerGoogleResult }] =
    useRegisterGoogleMutation();
  const { loginGoogle } = useLoginGoogle();

  const onRegister = async (profileData: RegisterProfileInfo) => {
    if (loading || googleLoading) return;
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
      onSuccess();
    }
  };
  return (
    <Stack spacing={2}>
      {!authInfo && <RegisterFormAuthInfo onNext={setAuthInfo} onSuccessfulLogin={onSuccess} />}
      {authInfo && !registerResult && !registerGoogleResult && (
        <RegisterFormProfileInfo
          defaultProfileInfo={
            authInfo.type === 'google' ? { displayName: authInfo.name, key: generateUrlKey(authInfo.name) } : {}
          }
          onRegister={onRegister}
          isRegistering={!!loading || !!googleLoading}
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
      {!!registerResult && (
        <Stack spacing={2}>
          <Heading size="xl" textAlign="center">
            Registration successful !
          </Heading>
          <Heading size="lg">Only one last step: verify your email address</Heading>
          <Text fontStyle="italic">
            We've just sent a mail to {registerResult.register.email}, simply click on the link to activate your
            account.
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
