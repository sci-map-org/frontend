import NextApp from 'next/app';
import React from 'react';

import '../static/empty.css';
import 'easymde/dist/easymde.min.css';
import '../static/multi-select.css';
import { Wrapper } from '../src/components/Wrapper';
import { withApollo } from '../src/hoc/withApollo';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface AppProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class App extends NextApp<AppProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Wrapper apolloClient={apolloClient}>
        <Component {...pageProps} />
      </Wrapper>
    );
  }
}

export default withApollo(App);
