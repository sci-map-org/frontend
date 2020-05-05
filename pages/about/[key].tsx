import { Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import { ArticleReader } from '../../src/components/articles/ArticleReader';
import { InternalLink } from '../../src/components/navigation/InternalLink';

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
    <Box display="flex" flexDirection="row">
      <Box borderRightWidth={1} borderRightColor="gray.500" w="56" h="100%" pl={1}>
        {articlesMenuItems.map((menu) => {
          return (
            <Box key={menu.key}>
              <InternalLink routePath="/about/[key]" asHref={`/about/${menu.key}`}>
                {menu.key}
              </InternalLink>
            </Box>
          );
        })}
      </Box>
      <Box p="2" width="100%">
        {key && <ArticleReader articleKey={key} />}
      </Box>
    </Box>
  );
};

export default About;
