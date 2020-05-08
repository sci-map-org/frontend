import { Flex } from '@chakra-ui/core';
import { useState } from 'react';
import { ArticleViewerDataFragment } from '../../graphql/articles/articles.fragments.generated';
import { useGetArticleByKey } from '../../graphql/articles/articles.hooks';
import { ArticleEditor } from './ArticleEditor';
import { ArticleViewer } from './ArticleViewer';

export enum ArticleReaderMode {
  Viewer = 'viewer',
  Editor = 'edit',
}

export interface ArticleReaderProps {
  defaultMode?: ArticleReaderMode;
  article: ArticleViewerDataFragment | false;
  loading: boolean;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ defaultMode, article }) => {
  const [mode, s] = useState(defaultMode || ArticleReaderMode.Viewer);
  const setMode = (newMode: ArticleReaderMode) => {
    s(newMode);
  };
  return (
    <Flex width="100%">
      {article && (
        <>
          {mode === ArticleReaderMode.Viewer && (
            <ArticleViewer article={article} setReaderMode={(mode) => setMode(mode)}></ArticleViewer>
          )}
          {mode === ArticleReaderMode.Editor && <ArticleEditor setMode={setMode} article={article}></ArticleEditor>}
        </>
      )}
    </Flex>
  );
};

export const ArticleReaderContainer: React.FC<
  { articleKey: string } & Omit<ArticleReaderProps, 'article' | 'loading'>
> = ({ articleKey, ...readerProps }) => {
  const { article, loading } = useGetArticleByKey(articleKey);
  return <ArticleReader article={article} loading={loading} {...readerProps} />;
};
