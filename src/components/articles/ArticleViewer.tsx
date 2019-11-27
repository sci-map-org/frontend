import { Box } from '@chakra-ui/core';
import { ArticleViewerFragment } from '../../graphql/articles/articles.generated';

interface ArticleViewerProps {
  article: ArticleViewerFragment;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article }) => {
  return <Box>{article.title}</Box>;
};
