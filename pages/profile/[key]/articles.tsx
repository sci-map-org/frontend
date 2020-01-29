import { Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

import { UserArticleListPage } from '../../../src/pages/profile/articles/UserArticleListPage';

const ListArticlePage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string' || key === 'undefined') return <Box>User not found</Box>;

  return <UserArticleListPage userKey={key} />;
};

export default ListArticlePage;
