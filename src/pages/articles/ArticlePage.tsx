import { useRouter } from 'next/router';
import { ArticleReaderContainer, ArticleReaderMode } from '../../components/articles/ArticleReader';

export const ArticlePage: React.FC<{ articleKey: string }> = ({ articleKey }) => {
  const router = useRouter();
  return (
    <ArticleReaderContainer articleKey={articleKey} defaultMode={ArticleReaderMode.Viewer}></ArticleReaderContainer>
  );
};
