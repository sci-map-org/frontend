import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';

import { Layout } from './layout/Layout';
import Routes from './Routes';
import client from '../graphql/client';

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Layout>
          <Routes />
        </Layout>
      </ApolloProvider>
    </div>
  );
};

export default App;
