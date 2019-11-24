import React from 'react';
import 'easymde/dist/easymde.min.css';
import { NextPage } from 'next';
import { withApollo } from '../../src/graphql/apollo';
import { Box, Text, Stack, Input, Button } from '@chakra-ui/core';

import { useCreateArticle } from '../../src/hooks/articles.hooks';
import { ArticleContentType } from '../../src/graphql/generated/types';
// import SimpleMDE from 'react-simplemde-editor';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const NewArticlePage: NextPage = () => {
  const [title, setTitle] = React.useState('');
  const { createArticle, error, loading } = useCreateArticle();
  const [content, setContent] = React.useState('');
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" pt="2rem">
      <Box width="46rem">
        <Text fontSize="4xl" textAlign="center">
          New Article
        </Text>
        <Input
          placeholder="Title"
          size="md"
          variant="flushed"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        ></Input>
        <Box py={8} width="100%">
          <SimpleMDE key="new_article_mde" onChange={e => setContent(e)} value={content} />
        </Box>
        <Button
          size="lg"
          variant="solid"
          onClick={async () => {
            createArticle({ variables: { payload: { content, title, contentType: ArticleContentType.Markdown } } });
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default withApollo(NewArticlePage);
