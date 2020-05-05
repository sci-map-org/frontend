import { Box, Button, Stack, Text, Flex } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

import { useListUserArticlePreviews } from '../../../graphql/articles/articles.hooks';
import { ArticlePreview } from '../../../components/articles/ArticlePreview';
import { PageLayout } from '../../../components/layout/PageLayout';
import { InternalButtonLink } from '../../../components/navigation/InternalLink';

export const UserArticleListPage: React.FC<{ userKey: string }> = ({ userKey }) => {
  const { articlePreviews } = useListUserArticlePreviews(userKey);

  return (
    <PageLayout>
      <Flex direction="row" justifyContent="center">
        <Stack spacing={8} textAlign="center" width="36rem">
          <Text fontSize="4xl">Articles</Text>
          <Stack>
            {!!articlePreviews &&
              articlePreviews.map((articlePreview) => {
                return <ArticlePreview key={articlePreview._id} articlePreview={articlePreview} />;
              })}
            <Box>
              <InternalButtonLink routePath="/articles/new" asHref="/articles/new" variant="solid" m={2} loggedInOnly>
                New Article
              </InternalButtonLink>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </PageLayout>
  );
};
