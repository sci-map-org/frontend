import App from 'next/app';
import React from 'react';
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
