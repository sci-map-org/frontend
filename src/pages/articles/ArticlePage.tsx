import { ArticleReaderContainer } from '../../components/articles/ArticleReader';
import { ArticleReaderMode } from '../../components/articles/ArticleReaderMode';

export const ArticlePage: React.FC<{ articleKey: string }> = ({ articleKey }) => {
  return (
    <ArticleReaderContainer articleKey={articleKey} defaultMode={ArticleReaderMode.Viewer}></ArticleReaderContainer>
  );
};
