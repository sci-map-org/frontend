import { ApolloProvider, useApolloClient } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { LoginForm } from '../components/auth/LoginForm';
import { DurationViewer } from '../components/resources/elements/Duration';
import { useCurrentUser } from '../graphql/users/users.hooks';
import { theme } from '../theme/theme';
import { client } from './apolloClient';
import getConfig from 'next/config';
import { environment } from '../services/Environment';

export const WebExtension: React.FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  );
};

// const { publicRuntimeConfig } = getConfig();

const App: React.FC<{}> = () => {
  const client = useApolloClient();
  const { currentUser } = useCurrentUser();
  console.log(environment);
  //   console.log(getConfig());
  return (
    <div>
      TGest
      <DurationViewer value={3600} />
    </div>
  );
};
