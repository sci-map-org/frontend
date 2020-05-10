import { Box, PseudoBox } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { ArticleReaderContainer } from '../../src/components/articles/ArticleReader';
import { InternalLink } from '../../src/components/navigation/InternalLink';
import { globalStyleVariables } from '../../src/theme/theme';

interface ArticleMenuItem {
  menuTitle: string;
  key: string;
}

const articlesMenuItems: ArticleMenuItem[] = [
  {
    menuTitle: 'About',
    key: 'intro',
  },
  {
    menuTitle: 'Hello',
    key: 'hello',
  },
  {
    menuTitle: 'World',
    key: 'world',
  },
];

const About: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') return null;

  return (
    <Box display="flex" flexDirection="row" alignItems="stretch" justifyContent="stretch" height="100%">
      <Box
        borderRightWidth={1}
        borderRightColor="gray.300"
        // pr={3}
        flexBasis="180px"
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
              <PseudoBox
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
              </PseudoBox>
            </InternalLink>
          );
        })}
      </Box>
      <Box flexGrow={5}>{key && <ArticleReaderContainer articleKey={key} />}</Box>
    </Box>
  );
};

export default About;
