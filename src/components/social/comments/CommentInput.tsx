import { Button, Flex } from '@chakra-ui/react';
import EasyMDE from 'easymde';
import { useMemo, useState } from 'react';
import { MarkdownInput } from '../../lib/inputs/MarkdownInput';

interface CommentInputProps {
  post: (content: string) => void;
  placeholder?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({ post, placeholder = 'Write something...' }) => {
  const [draft, setDraft] = useState('');
  const options: EasyMDE.Options = useMemo(() => {
    return { spellChecker: false, minHeight: '120px', status: false, placeholder };
  }, [placeholder]);
  return (
    <Flex direction="column">
      <MarkdownInput content={draft} setContent={setDraft} options={options} />
      <Flex justifyContent="flex-end" pt={2}>
        <Button colorScheme="blue" isDisabled={!draft.length} onClick={() => post(draft)} minW="160px" size="sm">
          Post
        </Button>
      </Flex>
    </Flex>
  );
};
