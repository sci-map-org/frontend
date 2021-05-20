import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Spinner, useToast } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useVerifyEmailAddressMutation } from './VerifyEmailPage.generated';

export const verifyEmailAddress = gql`
  mutation verifyEmailAddress($token: String!) {
    verifyEmailAddress(token: $token) {
      email
    }
  }
`;

export const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const token = router.query.token;

  const [verifyEmailAddressMutation, { loading, error, data }] = useVerifyEmailAddressMutation({
    onCompleted() {
      toast({
        title: 'Email address verified!',
        description: "Your account is now active, you'll be redirected to the login page.",
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      router.push({ pathname: '/login', query: { redirectTo: encodeURI('/') } });
    },
  });

  useEffect(() => {
    if (token && typeof token === 'string') verifyEmailAddressMutation({ variables: { token } });
  }, []);

  return (
    <PageLayout marginSize="xl" title="Register" centerChildren>
      <Box>
        {!token && <Box>No token !</Box>}
        {loading && <Spinner size="lg" />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Unable to verify your email address !</AlertTitle>
            <AlertDescription>Error message; {error.message}</AlertDescription>
            <CloseButton ml="5px" />
          </Alert>
        )}
        {data && <Box>Email Address verified</Box>}
      </Box>
    </PageLayout>
  );
};
