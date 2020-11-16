import { Box } from '@chakra-ui/react';
import { ArticlePreviewDataFragment } from '../../graphql/articles/articles.fragments.generated';
import { useDeleteArticle } from '../../graphql/articles/articles.hooks';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { DeleteButtonWithConfirmation } from '../lib/buttons/DeleteButtonWithConfirmation';
import { InternalLink } from '../navigation/InternalLink';

interface ArticlePreviewProps {
  articlePreview: ArticlePreviewDataFragment;
}
export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ articlePreview }) => {
  const { currentUser } = useCurrentUser();
  const { deleteArticle } = useDeleteArticle();
  return (
    <Box
      borderWidth="1px"
      py={2}
      px={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth={0}
    >
      <InternalLink fontWeight={500} routePath="/articles/[key]" asHref={`/articles/${articlePreview.key}`}>
        {articlePreview.title}
      </InternalLink>
      {!!currentUser && articlePreview.author && currentUser.key === articlePreview.author.key && (
        <DeleteButtonWithConfirmation
          modalHeaderText="Delete Article"
          modalBodyText="Confirm deleting this article ?"
          onConfirmation={() => deleteArticle({ variables: { id: articlePreview._id } })}
        />
      )}
    </Box>
  );
};
