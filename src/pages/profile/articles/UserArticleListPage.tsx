import { Box, Button, Stack, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { useListUserArticlePreviews } from '../../../graphql/articles/articles.hooks';
import { ArticlePreview } from '../../../components/articles/ArticlePreview';
import { PageLayout } from '../../../components/layout/PageLayout';
import { InternalButtonLink } from '../../../components/navigation/InternalLink';

export const UserArticleListPage: React.FC<{ userKey: string }> = ({ userKey }) => {
  const { articlePreviews } = useListUserArticlePreviews(userKey);
  return (
    <PageLayout title="Articles" centerChildren>
      <Stack spacing={8} textAlign="center" width="36rem">
        <Flex direction="column" borderBottomWidth="1px">
          {!!articlePreviews &&
            articlePreviews.map((articlePreview) => {
              return <ArticlePreview key={articlePreview._id} articlePreview={articlePreview} />;
            })}
        </Flex>
        <InternalButtonLink routePath="/articles/new" asHref="/articles/new" variant="outline" loggedInOnly>
          New Article
        </InternalButtonLink>
      </Stack>
    </PageLayout>
  );
};
