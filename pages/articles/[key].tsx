import { Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import { ArticleReader } from '../../src/components/articles/ArticleReader';

const ArticlePage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string') return null;

  return (
    <Box px="200px" py="50px">
      <ArticleReader articleKey={key} />
    </Box>
  );
};

export default ArticlePage;
