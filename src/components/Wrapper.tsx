import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { Layout } from './layout/Layout';

const LeanWrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <ColorModeProvider>{children}</ColorModeProvider>
      <style global jsx>
        {`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}
      </style>
    </ThemeProvider>
  );
};

export const Wrapper = LeanWrapper;
