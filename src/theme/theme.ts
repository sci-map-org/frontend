import { extendTheme } from '@chakra-ui/core';

export const fonts = {
  main: 'Helvetica Neue,Helvetica,Arial,sans-serif', // menu, titles, etc.
  mono: '"europa",sans-serif',
  article: 'Georgia, Cambria, "Times New Roman", Times, serif', // article (serif, to read)
};

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    black: '#000',
    white: '#fff',
    main: '#4FD1C5', // teal 300
    mainDarker: '#38B2AC', // teal 400
    brand: {
      // (charka default teal)
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
    backgroundColor: {
      0: 'rgba(255, 255, 255)',
      1: 'rgba(253, 253, 253)',
    },
    whiteAlpha: {
      50: 'rgba(255, 255, 255, 0.04)',
      100: 'rgba(255, 255, 255, 0.06)',
      200: 'rgba(255, 255, 255, 0.08)',
      300: 'rgba(255, 255, 255, 0.16)',
      400: 'rgba(255, 255, 255, 0.24)',
      500: 'rgba(255, 255, 255, 0.36)',
      600: 'rgba(255, 255, 255, 0.48)',
      700: 'rgba(255, 255, 255, 0.64)',
      800: 'rgba(255, 255, 255, 0.80)',
      900: 'rgba(255, 255, 255, 0.92)',
    },
    blackAlpha: {
      50: 'rgba(0, 0, 0, 0.04)',
      100: 'rgba(0, 0, 0, 0.06)',
      200: 'rgba(0, 0, 0, 0.08)',
      300: 'rgba(0, 0, 0, 0.16)',
      400: 'rgba(0, 0, 0, 0.24)',
      500: 'rgba(0, 0, 0, 0.36)',
      600: 'rgba(0, 0, 0, 0.48)',
      700: 'rgba(0, 0, 0, 0.64)',
      800: 'rgba(0, 0, 0, 0.80)',
      900: 'rgba(0, 0, 0, 0.92)',
    },

    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },

    grayFont: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: 'rgba(0, 0, 0, 0.84)',
      800: '#1A202C',
      900: '#171923',
    },

    grayDivider: {
      50: 'rgb(255, 255, 255)',
      100: 'rgb(247, 247, 247)',
      200: 'rgb(239, 239, 239)',
      300: 'rgb(229, 229, 229)',
      400: 'rgb(215, 215, 215)',
      500: 'rgb(190, 190, 190)',
      600: 'rgb(150, 150, 150)',
      700: 'rgb(100, 100, 100)',
      800: 'rgb(50, 50, 50)',
      900: 'rgb(0, 0, 0)',
    },
  },
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
});

export const globalStyleVariables = {
  leftPadding: theme.sizes['3'], // left of logo/name on header, left on menu items, etc. Align according to this
  rightPadding: theme.sizes['4'],
};
