import { Box, Link } from '@chakra-ui/core';
import Router, { useRouter } from 'next/router';

import { useGetArticleByKey } from '../../graphql/articles/articles.hooks';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { ArticleEditor } from './ArticleEditor';
import { ArticleViewer } from './ArticleViewer';

enum ArticleReaderMode {
  Viewer = 'viewer',
  Editor = 'edit',
}

export const ArticleReader: React.FC<{ articleKey: string }> = ({ articleKey }) => {
  const { article, loading, error } = useGetArticleByKey(articleKey);
  const router = useRouter();

  const mode = router.query.mode || ArticleReaderMode.Viewer;

  const { currentUser } = useCurrentUser();

  const showEditLink =
    article &&
    currentUser &&
    article.author &&
    currentUser.key === article.author.key &&
    mode !== ArticleReaderMode.Editor;
  return (
    <Box
      borderWidth={1}
      borderColor="black.100"
      borderRadius={4}
      px={4}
      pt={4}
      pb={16}
      display="flex"
      justifyContent="space-between"
    >
      {loading && <div>Loading...</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {article && (
        <>
          {mode === ArticleReaderMode.Viewer && <ArticleViewer article={article}></ArticleViewer>}
          {mode === ArticleReaderMode.Editor && <ArticleEditor article={article}></ArticleEditor>}
          {showEditLink && (
            <Link
              onClick={() => {
                const path = `${router.asPath}?mode=${ArticleReaderMode.Editor}`;
                Router.push(path, path, {
                  shallow: true,
                });
              }}
            >
              Edit
            </Link>
          )}
        </>
      )}
    </Box>
  );
};
