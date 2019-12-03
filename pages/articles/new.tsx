import React from 'react';
import { NextPage } from 'next';
import { withApollo } from '../../src/graphql/apollo';
// import '../../static/easymde.min.css';
import { Box, Text, Stack, Input, Button } from '@chakra-ui/core';
import NoSSR from 'react-no-ssr';
// import SimpleMDE from 'react-simplemde-editor';
import dynamic from 'next/dynamic';
import { useCreateArticle } from '../../src/graphql/articles/articles.hooks';
import { ArticleContentType } from '../../src/graphql/types';
import Router from 'next/router';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

const NewArticlePage: NextPage = () => {
  // return <div>New </div>;
  const [title, setTitle] = React.useState('');
  const { createArticle, error, loading, createdArticle } = useCreateArticle();
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
          {/* <NoSSR> */}
          <SimpleMDE key="new_article_mde" id="1fdfre" onChange={e => setContent(e)} value={content} />
          {/* </NoSSR> */}
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

export default withApollo(NewArticlePage);
