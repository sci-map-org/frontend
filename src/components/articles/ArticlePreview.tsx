import {
  Box,
  Link,
  IconButton,
  Modal,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
} from '@chakra-ui/core';
import NextLink from 'next/link';

import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useDeleteArticle } from '../../graphql/articles/articles.hooks';
import { ArticlePreviewDataFragment } from '../../graphql/articles/articles.fragments.generated';

interface ArticlePreviewProps {
  articlePreview: ArticlePreviewDataFragment;
}
export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ articlePreview }) => {
  const { currentUser } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteArticle, loading, error } = useDeleteArticle();
  return (
    <Box shadow="md" borderWidth="1px" rounded={1} p={4} display="flex" justifyContent="space-between">
      <NextLink href={`/articles/${articlePreview.key}`}>
        <Link fontWeight={500}>{articlePreview.title}</Link>
      </NextLink>
      {!!currentUser && articlePreview.author && currentUser.key === articlePreview.author.key && (
        <IconButton aria-label="Delete article" icon="delete" size="sm" onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Delete Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Confirm deleting this article ?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={() => deleteArticle({ variables: { id: articlePreview._id } })}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
