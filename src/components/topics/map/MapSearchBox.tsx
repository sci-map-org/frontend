import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { TopicSelector } from '../TopicSelector';

export const MapSearchBox: React.FC<{ onSelectTopic: (topic: TopicLinkDataFragment) => void }> = ({
  onSelectTopic,
}) => {
  return (
    <TopicSelector
      onSelect={onSelectTopic}
      placeholder="Search"
      inputProps={{
        fontWeight: 500,
        _placeholder: { color: 'gray.400' },
        _focus: { _placeholder: { color: 'gray.200' } },
        color: 'white',
      }}
      highlightFirstSuggestion={false}
    />
  );
};
