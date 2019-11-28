import { Box, Link } from '@chakra-ui/core';
import { NextPage } from 'next';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { ArticleReader } from '../../src/components/articles/ArticleReader';
import { withApollo } from '../../src/graphql/apollo';

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

const About: NextPage = () => {
  const router = useRouter();

  const { key } = router.query;
  if (!key || key === 'undefined') return null; // necessary because of an issue with apollo and next

  if (typeof key !== 'string') return null;

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
      <Box p="2">{key && <ArticleReader articleKey={key} />}</Box>
    </Box>
  );
};

export default withApollo(About);
