import { Box, Heading, HeadingProps } from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown';

import { ArticleViewerDataFragment } from '../../graphql/articles/articles.generated';
import { ArticleContentType } from '../../graphql/types';

interface ArticleViewerProps {
  article: ArticleViewerDataFragment;
}
const sizeHeadingMap: { [key in number]: HeadingProps['size'] } = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'xs',
};

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article }) => {
  return (
    <Box>
      <Heading pb={2}>{article.title}</Heading>
      {article.contentType === ArticleContentType.Markdown && (
        <ReactMarkdown
          source={article.content}
          renderers={{
            heading: ({ level, children }) => {
              return <Heading size={sizeHeadingMap[level]}>{children}</Heading>;
            },
          }}
        />
      )}
    </Box>
  );
};
