import { ITheme, theme as defaultTheme } from '@chakra-ui/core';
import { colors } from './colors';

export const fonts = {
  main: 'Helvetica Neue,Helvetica,Arial,sans-serif', // menu, titles, etc.
  mono: '"europa",sans-serif',
  article: 'Georgia, Cambria, "Times New Roman", Times, serif', // article (serif, to read)
};

export const theme: ITheme = {
  ...defaultTheme,
  colors,
  fonts: {
    heading: fonts.main,
    body: fonts.main,
    mono: fonts.mono,
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
};

export const globalStyleVariables = {
  leftPadding: theme.sizes['3'], // left of logo/name on header, left on menu items, etc. Align according to this
  rightPadding: theme.sizes['4'],
};
