import { Flex, Link, Stack, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { useHandleClickOutside } from '../../hooks/useHandleClickOutside';
import { EditLinkStyleProps } from '../lib/Typography';
import { TopicBadge } from './TopicBadge';
import { TopicSelector } from './TopicSelector';

interface EditableTopicsWrapperProps {
  topics: TopicLinkDataFragment[];
  onRemove: (topicId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
  editable?: boolean;
  displayMode?: 'column' | 'row' | 'wrap';
  inputPlaceholder?: string;
  isLoading?: boolean;
  searchOnlySubTopicsOf?: TopicLinkDataFragment[];
}
export const EditableTopicsWrapper: React.FC<EditableTopicsWrapperProps> = ({
  topics,
  onRemove,
  onAdded,
  editable,
  displayMode = 'wrap',
  inputPlaceholder,
  isLoading,
  searchOnlySubTopicsOf,
}) => {
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);
  useHandleClickOutside(wrapperRef, () => setEditMode(false));
  return (
    <Flex ref={wrapperRef} direction="column" alignItems="center" maxW="300px">
      {!!topics.length && (
        <>
          {displayMode !== 'wrap' && (
            <Stack direction={displayMode} alignItems="center" spacing={1} mb={1}>
              {topics.map((topic) => (
                <TopicBadge key={topic._id} topic={topic} removable={editMode} onRemove={() => onRemove(topic._id)} />
              ))}
            </Stack>
          )}
          {displayMode === 'wrap' && (
            <Wrap spacing={1} justify="center" mb={1}>
              {topics.map((topic) => (
                <WrapItem key={topic._id}>
                  <TopicBadge topic={topic} removable={editMode} onRemove={() => onRemove(topic._id)} />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </>
      )}
      {editMode && (
        <TopicSelector
          placeholder={inputPlaceholder || `Add Topic...`}
          onSelect={(topic) => onAdded(topic)}
          onlySubTopicsOf={searchOnlySubTopicsOf?.map(({ _id }) => _id)}
        />
      )}
      {editable && !editMode && !isLoading && (
        <Link
          alignSelf="center"
          onClick={(e) => {
            setEditMode(true);
          }}
          {...EditLinkStyleProps}
        >
          edit
        </Link>
      )}
    </Flex>
  );
};
