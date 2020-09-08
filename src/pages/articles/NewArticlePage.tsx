import { Box, Button, Input, Text } from '@chakra-ui/core';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React from 'react';

import { useCreateArticle } from '../../graphql/articles/articles.hooks';
import { ArticleContentType } from '../../graphql/types';
import NoSSR from 'react-no-ssr';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

export const NewArticlePage: NextPage = () => {
  const [title, setTitle] = React.useState('');

  const { createArticle } = useCreateArticle();

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
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <Box py={8} width="100%">
          <NoSSR>
            <SimpleMDE key="new_article_mde" id="1fdfre" onChange={(e) => setContent(e)} value={content} />
          </NoSSR>
        </Box>
        <Box>
          <Button
            size="lg"
            variant="solid"
            onClick={async () => {
              createArticle({
                variables: { payload: { content, title, contentType: ArticleContentType.Markdown } },
              }).then(({ data }) => {
                data && Router.push(`/articles/${data.createArticle.key}`);
              });
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
