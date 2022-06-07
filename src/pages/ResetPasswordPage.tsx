import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { CloseButton } from '@chakra-ui/close-button';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { PasswordInput } from '../components/lib/inputs/PasswordInput';
import { routerPushToPage } from './PageInfo';
import { useResetPasswordMutation, useTriggerResetPasswordMutation } from './ResetPasswordPage.generated';
import { LoginPageInfo } from './RoutesPageInfos';

export const ResetPasswordPage: React.FC<{}> = () => {
  const router = useRouter();

  const token = router.query.token;
  if (token && typeof token !== 'string')
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Invalid Token!</AlertTitle>
        <AlertDescription>Your password reset token is invalid.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );

  return (
    <PageLayout marginSize="xl" title="Reset Password" centerChildren>
      <Flex w="36rem" maxW="90vw">
        {token ? <SetNewPasswordForm resetPwdToken={token} /> : <TriggerResetPasswordForm />}
      </Flex>
    </PageLayout>
  );
};

export const resetPassword = gql`
  mutation resetPassword($payload: ResetPasswordPayload!) {
    resetPassword(payload: $payload) {
      currentUser {
        _id
      }
    }
  }
`;

const SetNewPasswordForm: React.FC<{ resetPwdToken: string }> = ({ resetPwdToken }) => {
  const [password, setPassword] = useState('');

  const toast = useToast();
  const [resetPasswordMutation] = useResetPasswordMutation({
    onCompleted() {
      toast({
        title: 'Password successfully reset!',
        description: 'You can now login with your new password',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      routerPushToPage(LoginPageInfo);
    },
  });
  const isPasswordValid = password.length >= 6;
  const resetPassword = () =>
    isPasswordValid &&
    resetPasswordMutation({
      variables: {
        payload: {
          token: resetPwdToken,
          password: password,
        },
      },
    });
  return (
    <Flex w="100%">
      <Stack w="100%" spacing={6}>
        <FormControl isRequired isInvalid={!!password && !isPasswordValid}>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') resetPassword();
            }}
          />
          <FormErrorMessage>The password must be at least 6 characters long</FormErrorMessage>
        </FormControl>
        <Button
          size="lg"
          variant="solid"
          isDisabled={!isPasswordValid}
          colorScheme="blue"
          onClick={() => resetPassword()}
        >
          Update password
        </Button>
      </Stack>
    </Flex>
  );
};

export const triggerResetPassword = gql`
  mutation triggerResetPassword($email: String!) {
    triggerResetPassword(email: $email) {
      success
      errorMessage
    }
  }
`;
const TriggerResetPasswordForm: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [triggerResetPasswordMutation, { data }] = useTriggerResetPasswordMutation();
  return (
    <Flex w="100%">
      {!data?.triggerResetPassword.success ? (
        <Stack w="100%" spacing={4}>
          <Text py={2} fontWeight={500} color="gray.600">
            Please enter your email address
          </Text>
          <Input
            placeholder="my@email.com"
            size="md"
            variant="outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            size="lg"
            variant="solid"
            colorScheme="blue"
            isDisabled={!email}
            onClick={() => {
              !!email && triggerResetPasswordMutation({ variables: { email } });
            }}
          >
            Reset Password
          </Button>
          {data && !data.triggerResetPassword.success && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Unable to reset password!</AlertTitle>
              <AlertDescription>{data.triggerResetPassword.errorMessage}</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          )}
        </Stack>
      ) : (
        <Stack>
          <Heading size="lg">
            We've sent an email to <i>{email}</i>
          </Heading>
          <Text>
            Click on the link we sent you in order to reset your password. Check your spam if necessary. The link
            expires in one hour.
          </Text>
        </Stack>
      )}
    </Flex>
  );
};
