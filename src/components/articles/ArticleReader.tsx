import { ArticleViewer } from './ArticleViewer';
import { useGetArticleByKey } from '../../graphql/articles/articles.hooks';

export const ArticleReader: React.FC<{ articleKey: string }> = ({ articleKey }) => {
  const { article, loading, error } = useGetArticleByKey(articleKey);
  if (article) {
    return <ArticleViewer article={article}></ArticleViewer>;
  }
  return null;
};
