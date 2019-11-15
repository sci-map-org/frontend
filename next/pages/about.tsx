import { NextPage } from 'next';
import { Box, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { withApollo } from '../src/graphql/apollo';
import { useRouter } from 'next/router';

interface Article {
  _id: string;
  content: string;
}
interface ArticleMenuItem {
  _id: string;
  menuTitle: string;
  key: string;
}

const About: NextPage<{ articlesMenuItems: ArticleMenuItem[]; article: Article }> = ({
  articlesMenuItems,
  article,
}) => {
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
      <Box p="2">{JSON.stringify(article)}</Box>
    </Box>
  );
};

About.getInitialProps = async () => {
  return {
    article: {
      _id: 'X',
      content: 'content',
    },
    articlesMenuItems: [
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
    ],
  };
};

export default withApollo(About);
