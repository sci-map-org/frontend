import { Button, Flex, Text } from '@chakra-ui/react';
import EasyMDE from 'easymde';
import { useMemo, useState } from 'react';
import { useCurrentUser } from '../../../graphql/users/users.hooks';
import { LoginPageInfo, RegisterPageInfo } from '../../../pages/RoutesPageInfos';
import { MarkdownInput } from '../../lib/inputs/MarkdownInput';
import { PageLink } from '../../navigation/InternalLink';

interface CommentInputProps {
  post: (content: string) => Promise<void>;
  postButtonText?: string;
  initialValue?: string;
  placeholder?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  post,
  initialValue,
  postButtonText = 'Post',
  placeholder = 'Write something...',
}) => {
  const [draft, setDraft] = useState(initialValue || '');
  const { currentUser } = useCurrentUser();

  const options: EasyMDE.Options = useMemo(() => {
    return { spellChecker: false, minHeight: '120px', status: false, placeholder };
  }, [placeholder]);
  return (
    <Flex direction="column">
      <MarkdownInput content={draft} setContent={setDraft} options={options} />
      <Flex justifyContent="flex-end" pt={2}>
        {!!currentUser ? (
          <Button
            colorScheme="blue"
            isDisabled={!draft.length}
            onClick={async () => {
              await post(draft);
              setDraft('');
            }}
            minW="160px"
            size="sm"
          >
            {postButtonText}
          </Button>
        ) : (
          <Text fontSize="lg" fontWeight={500}>
            <PageLink color="blue.500" pageInfo={RegisterPageInfo} isExternal>
              Sign Up
            </PageLink>{' '}
            or{' '}
            <PageLink color="blue.500" pageInfo={LoginPageInfo} isExternal>
              Log In
            </PageLink>{' '}
            to post a comment
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
