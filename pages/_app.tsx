import NextApp from 'next/app';
import React from 'react';

import '../static/empty.css';
import 'easymde/dist/easymde.min.css';
import { Wrapper } from '../src/components/Wrapper';
import { withApollo } from '../src/hoc/withApollo';
import { ApolloClient } from '@apollo/client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ColorModeScript } from '@chakra-ui/core';

interface AppProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class App extends NextApp<AppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Wrapper apolloClient={apolloClient}>
        <ColorModeScript />
        <Component {...pageProps} />
      </Wrapper>
    );
  }
}

export default withApollo(App);
