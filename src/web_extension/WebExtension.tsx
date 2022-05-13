import { ApolloProvider } from '@apollo/client';
import { Center, ChakraProvider, Flex, Heading, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import { env } from '../env';
import { useCurrentUser } from '../graphql/users/users.hooks';
import { theme } from '../theme/theme';
import { AddCurrentResource } from './AddCurrentResource';
import { client } from './apolloClient';

export const WebExtension: React.FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  );
};

const App: React.FC<{}> = () => {
  const { currentUser, loading } = useCurrentUser();

  return (
    <Stack w="600px" minH="500px" p={5}>
      <Stack direction="row" alignItems="baseline">
        <Link href={env.FRONTEND_URL} isExternal>
          <Heading color="mainDarker" size="lg">
            Mapdedia{env.NODE_ENV === 'development' && ' Dev'}
          </Heading>
        </Link>
        {!!currentUser && (
          <Text fontSize="md" fontWeight={500} color="gray.600">
            Welcome {currentUser.displayName}
          </Text>
        )}
      </Stack>
      {loading ? (
        <Center py="200px">
          <Spinner size="xl" />
        </Center>
      ) : !!currentUser ? (
        <AddCurrentResource />
      ) : (
        <Flex py={10}>
          <Heading size="md">
            Please{' '}
            <Link href={env.FRONTEND_URL + '/login'} isExternal color="blue">
              login to Mapedia
            </Link>{' '}
            to use the extension
          </Heading>
        </Flex>
      )}
    </Stack>
  );
};
