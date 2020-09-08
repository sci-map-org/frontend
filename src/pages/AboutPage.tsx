import { Box } from '@chakra-ui/core';
import React from 'react';
import { ArticleReaderContainer } from '../components/articles/ArticleReader';
import { InternalLink } from '../components/navigation/InternalLink';
import { globalStyleVariables } from '../theme/theme';

interface ArticleMenuItem {
  menuTitle: string;
  key: string;
}

export const articlesMenuItems: ArticleMenuItem[] = [
  {
    menuTitle: 'Introduction',
    key: 'introduction',
  },
  {
    menuTitle: 'Why',
    key: 'why',
  },
  {
    menuTitle: 'Vision',
    key: 'vision',
  },
  {
    menuTitle: 'Approach',
    key: 'approach',
  },
  {
    menuTitle: 'Team',
    key: 'team',
  },
  {
    menuTitle: 'How to contribute',
    key: 'contributing',
  },
];

export const AboutPage: React.FC<{ pageKey: string }> = ({ pageKey: key }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="stretch" justifyContent="stretch">
      <Box
        borderRightWidth={1}
        borderRightColor="gray.300"
        flexBasis="230px"
        flexShrink={0}
        backgroundColor="backgroundColor.1"
        pl={5}
        pt={5}
      >
        {articlesMenuItems.map((menu) => {
          return (
            <InternalLink
              routePath="/about/[key]"
              asHref={`/about/${menu.key}`}
              key={menu.key}
              _hover={{ textDecoration: 'none' }}
              _focus={{}}
            >
              <Box
                pt="2px"
                pb="3px"
                pl={globalStyleVariables.leftPadding}
                fontWeight="normal"
                color="grayFont.600"
                fontSize="md"
                _hover={{
                  backgroundColor: 'gray.100',
                  color: 'grayFont.800',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                {...(key === menu.key && { backgroundColor: 'gray.100', color: 'grayFont.800' })}
              >
                {menu.menuTitle}
              </Box>
            </InternalLink>
          );
        })}
      </Box>
      <Box flexGrow={5}>{key && <ArticleReaderContainer articleKey={key} />}</Box>
    </Box>
  );
};
