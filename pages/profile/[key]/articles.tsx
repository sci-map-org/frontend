import { Box, Button, Stack, Text } from '@chakra-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ArticlePreview } from '../../../src/components/articles/ArticlePreview';
import { useListUserArticlePreviews } from '../../../src/graphql/articles/articles.hooks';

const ListArticlePage: React.FC = () => {
  const router = useRouter();

  const { key } = router.query;
  if (typeof key !== 'string' || key === 'undefined') return null;
  const { articlePreviews } = useListUserArticlePreviews(key);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="1rem">
      <Stack spacing={8} textAlign="center" width="36rem">
        <Text fontSize="4xl">Articles</Text>
        <Stack>
          {!!articlePreviews &&
            articlePreviews.map(articlePreview => {
              return <ArticlePreview key={articlePreview._id} articlePreview={articlePreview} />;
            })}
          <Box>
            <Link href="/articles/new">
              <Button variant="solid" m={2}>
                New Article
              </Button>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ListArticlePage;
