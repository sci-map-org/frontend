import { Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { ArticleViewerDataFragment } from '../../graphql/articles/articles.fragments.generated';
import { ArticleContentType } from '../../graphql/types';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { fonts } from '../../theme/theme';
import { ArticleLayout } from './ArticleLayout';
import { ArticleMarkdownViewer } from './ArticleMarkdownViewer';
import { ArticleReaderMode } from './ArticleReader';

interface ArticleViewerProps {
  article: ArticleViewerDataFragment;
  setReaderMode: (mode: ArticleReaderMode) => void;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, setReaderMode }) => {
  const { currentUser } = useCurrentUser();
  const showEditLink = article && currentUser && article.author && currentUser.key === article.author.key;

  return (
    <ArticleLayout
      renderLeft={null}
      renderRight={
        <Stack alignItems="stretch" spacing={3} pt={5} px={4}>
          {showEditLink && (
            <Button leftIcon={<EditIcon />} variant="outline" onClick={() => setReaderMode(ArticleReaderMode.Editor)}>
              Edit
            </Button>
          )}
        </Stack>
      }
    >
      <Flex direction="column" pt={5} px={3}>
        <Heading fontFamily={fonts.article} size="2xl" pb={2} fontWeight={200}>
          {article.title}
        </Heading>
        <Divider borderColor="grayDivider.600" mb={5} />
        {article.contentType === ArticleContentType.Markdown && <ArticleMarkdownViewer content={article.content} />}
      </Flex>
    </ArticleLayout>
  );
};
