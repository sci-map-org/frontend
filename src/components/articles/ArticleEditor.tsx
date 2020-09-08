import { Box, Button, ButtonProps, Flex, Heading, Input, Stack } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { ArticleViewerDataFragment } from '../../graphql/articles/articles.fragments.generated';
import { useUpdateArticle } from '../../graphql/articles/articles.hooks';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { fonts } from '../../theme/theme';
import { MarkdownInput } from '../input/MarkdownInput';
import { ArticleLayout } from './ArticleLayout';
import { ArticleMarkdownViewer } from './ArticleMarkdownViewer';
import { ArticleReaderMode } from './ArticleReader';

export const ArticleEditor: React.FC<{
  article: ArticleViewerDataFragment;
  setMode: (mode: ArticleReaderMode) => void;
}> = ({ article, setMode }) => {
  const [articleId, setArticleId] = React.useState(article._id);
  const [title, setTitle] = React.useState(article.title);
  const [content, setContent] = React.useState(article.content);
  const { updateArticle, loading, error } = useUpdateArticle();
  const { currentUser } = useCurrentUser();
  useEffect(() => {
    if (article._id !== articleId) {
      if (currentUser && article.author && currentUser.key === article.author.key) {
        setTitle(article.title);
        setContent(article.content);
        setArticleId(article._id);
      } else {
        setMode(ArticleReaderMode.Viewer);
      }
    }
  }, [article]);

  const SaveButton: React.FC<ButtonProps> = ({ children, ...buttonProps }) => (
    <Button
      variant="outline"
      borderColor="blue.500"
      color="blue.700"
      isLoading={loading}
      onClick={async () => {
        updateArticle({ variables: { id: article._id, payload: { content, title } } }).then(() => {
          setMode(ArticleReaderMode.Viewer);
        });
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
  const CancelChangesButton: React.FC<ButtonProps> = ({ children, ...buttonProps }) => (
    <Button
      variant="outline"
      onClick={() => {
        setMode(ArticleReaderMode.Viewer);
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
  return (
    <ArticleLayout
      renderLeft={null}
      renderRight={
        <Stack alignItems="stretch" spacing={3} pt={5} px={4}>
          <SaveButton>Save</SaveButton>
          <CancelChangesButton>Cancel Changes</CancelChangesButton>
        </Stack>
      }
    >
      <Flex direction="column" pt={5} pb={20} px={3}>
        <Heading size="2xl" fontWeight="light" mb={5} textAlign="center">
          Edit Article
        </Heading>

        <Heading fontFamily={fonts.article} size="2xl" pb={2} fontWeight="thin">
          <Input
            placeholder="Title"
            fontSize="4xl"
            size="lg"
            variant="flushed"
            value={title}
            borderBottomWidth="1px"
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </Heading>
        <Box py={8} width="100%">
          <MarkdownInput
            content={content}
            setContent={setContent}
            options={{
              previewRender(text) {
                return ReactDOMServer.renderToString(<ArticleMarkdownViewer content={text} />);
              },
            }}
          />
        </Box>
        <Stack spacing={5}>
          <SaveButton size="lg">Save</SaveButton>
          <CancelChangesButton size="lg">Cancel Changes</CancelChangesButton>
        </Stack>
      </Flex>
    </ArticleLayout>
  );
};
