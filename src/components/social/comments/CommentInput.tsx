import { Button, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { MarkdownInput } from '../../lib/inputs/MarkdownInput';

interface CommentInputProps {
  post: (content: string) => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({ post }) => {
  const [draft, setDraft] = useState('');
  return (
    <Flex direction="column">
      <Heading fontSize="24px" color="gray.700" mb={2}>
        Your Message
      </Heading>
      <MarkdownInput content={draft} setContent={setDraft} />
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" isDisabled={!draft.length} onClick={() => post(draft)} minW="160px" size="sm">
          Post
        </Button>
      </Flex>
    </Flex>
  );
};
