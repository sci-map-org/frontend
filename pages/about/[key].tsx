import { Box, Link } from '@chakra-ui/core';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ArticleReader } from '../../src/components/articles/ArticleReader';
import { withApollo } from '../../src/graphql/apollo';

interface ArticleMenuItem {
  _id: string;
  menuTitle: string;
  key: string;
}

const articlesMenuItems: ArticleMenuItem[] = [
  {
    _id: '0',
    menuTitle: 'About',
    key: 'intro',
  },
  {
    _id: '1',
    menuTitle: 'Hello',
    key: 'hello',
  },
  {
    _id: '2',
    menuTitle: 'World',
    key: 'world',
  },
];

const About: NextPage = () => {
  const router = useRouter();

  const { key } = router.query;

  if (typeof key !== 'string') throw new Error('key not string');

  return (
    <Box display="flex" flexDirection="row">
      <Box borderRightWidth={1} borderRightColor="gray.500" w="56" h="100%" pl={1}>
        {articlesMenuItems.map(menu => {
          return (
            <Box key={menu.key}>
              <NextLink href={`/about/${menu.key}`}>
                <Link key={menu.key}>{menu.key}</Link>
              </NextLink>
            </Box>
          );
        })}
      </Box>
      <Box p="2">
        <ArticleReader key={key} />
      </Box>
    </Box>
  );
};

export default withApollo(About);
