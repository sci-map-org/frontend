import NextApp, { AppProps } from 'next/app';
import React from 'react';

import '../static/empty.css';
import 'easymde/dist/easymde.min.css';
import '../static/multi-select.css';
import { Wrapper } from '../src/components/Wrapper';
import { withApollo } from '../src/hoc/withApollo';
import { ApolloClient } from '@apollo/client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ReactGA from 'react-ga';
import getConfig from 'next/config';
import Router from 'next/router';
import { route } from 'next/dist/next-server/server/router';

interface CustomAppProps extends AppProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const { publicRuntimeConfig } = getConfig();

const routeChangeHandler = () => {
  ReactGA.set({ page: Router.pathname });
  ReactGA.pageview(Router.asPath);
};

class App extends NextApp<CustomAppProps> {
  // private unlisten: () => void
  componentDidMount() {
    console.log(publicRuntimeConfig.googleAnalyticsMeasurementId);
    ReactGA.initialize(publicRuntimeConfig.googleAnalyticsMeasurementId, { debug: false });
    // ReactGA.set({ page: this.props.router.pathname });
    // ReactGA.pageview(this.props.router.asPath);
    routeChangeHandler();

    this.props.router.events.on('routeChangeComplete', routeChangeHandler);
  }
  componentWillUnmount() {
    this.props.router.events.off('routeChangeComplete', routeChangeHandler);
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
