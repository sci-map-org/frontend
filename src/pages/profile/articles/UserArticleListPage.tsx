import { Box, Button, Stack, Text, Flex } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

import { useListUserArticlePreviews } from '../../../graphql/articles/articles.hooks';
import { ArticlePreview } from '../../../components/articles/ArticlePreview';
import { PageLayout } from '../../../components/layout/PageLayout';

export const UserArticleListPage: React.FC<{ userKey: string }> = ({ userKey }) => {
  const { articlePreviews } = useListUserArticlePreviews(userKey);

  return (
    <PageLayout>
      <Flex direction="row" justifyContent="center">
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
      </Flex>
    </PageLayout>
  );
};
