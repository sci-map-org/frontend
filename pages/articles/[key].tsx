import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { withApollo } from '../../src/graphql/apollo';
import { ArticleReader } from '../../src/components/articles/ArticleReader';

const ArticlePage: NextPage<{}> = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  return (
    <Box px="200px" py="50px">
      <ArticleReader articleKey={key} />
    </Box>
  );
};

export default withApollo(ArticlePage);
