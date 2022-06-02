import NextApp from 'next/app';
import React from 'react';
import { hotjar } from 'react-hotjar';

import '../public/empty.css';
import '../public/map.css';
import '../public/easymde.css'; // c.f. https://www.npmjs.com/package/react-simplemde-editor -> customized
import '../public/multi-select.css';
import { Wrapper } from '../src/components/Wrapper';
import { withApollo } from '../src/hoc/withApollo';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface AppProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class App extends NextApp<AppProps> {
  componentDidMount() {
    hotjar.initialize(3001220, 6);
  }

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
