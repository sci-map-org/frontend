import App from 'next/app';
import React from 'react';

import '../static/easymde.min.css';
// I tried to import directly from node_module in the appropriate page, it blocks the links to that page.abs
// See https://github.com/zeit/next-plugins/issues/282
import { Wrapper } from '../src/components/Wrapper';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    );
  }
}

export default MyApp;
