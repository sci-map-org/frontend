import { ArticleViewer } from './ArticleViewer';
import { useGetArticleByKey } from '../../graphql/articles/articles.hooks';

export const ArticleReader: React.FC<{ key: string }> = ({ key }) => {
  const { article, loading, error } = useGetArticleByKey(key);
  if (article) {
    return <ArticleViewer article={article}></ArticleViewer>;
  }
  return null;
};
