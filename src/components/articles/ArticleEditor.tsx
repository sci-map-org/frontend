import { Box, Button, Input } from '@chakra-ui/core';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React from 'react';

import { ArticleViewerDataFragment } from '../../graphql/articles/articles.fragments.generated';
import { useUpdateArticle } from '../../graphql/articles/articles.hooks';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

export const ArticleEditor: React.FC<{ article: ArticleViewerDataFragment }> = ({ article }) => {
  const [title, setTitle] = React.useState(article.title);
  const [content, setContent] = React.useState(article.content);
  const { updateArticle, loading, error } = useUpdateArticle();
  return (
    <Box>
      Editor
      <Input
        placeholder="Title"
        size="md"
        variant="flushed"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
      ></Input>
      <Box py={8} width="100%">
        {/* <NoSSR> */}
        <SimpleMDE key="new_article_mde" id="1fdfre" onChange={e => setContent(e)} value={content} />
        {/* </NoSSR> */}
      </Box>
      <Button
        size="lg"
        variant="solid"
        onClick={async () => {
          updateArticle({ variables: { id: article._id, payload: { content, title } } }).then(() => {
            Router.push(`/articles/${article.key}`);
          });
        }}
      >
        Edit
      </Button>
    </Box>
  );
};
