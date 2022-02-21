import { Box, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { FormFieldLabel } from '../../lib/Typography';
import { TopicBadge } from '../../topics/TopicBadge';
import { TopicSelector } from '../../topics/TopicSelector';

interface ResourceCoveredSubTopicsFieldProps {
  showedInTopics: TopicLinkDataFragment[];
  coveredSubTopics: TopicLinkDataFragment[];
  onRemove: (topiclId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
}
export const ResourceCoveredSubTopicsField: React.FC<ResourceCoveredSubTopicsFieldProps> = ({
  showedInTopics,
  coveredSubTopics,
  onAdded,
  onRemove,
}) => {
  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <FormFieldLabel>{showedInTopics.length ? 'Covered SubTopics' : 'Covered Topics'}</FormFieldLabel>
      {coveredSubTopics.length && (
        <Wrap justify="center" spacing={2}>
          {coveredSubTopics.map((topic) => (
            <WrapItem key={topic._id}>
              <TopicBadge key={topic._id} topic={topic} removable={true} onRemove={() => onRemove(topic._id)} />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Box w="200px">
        <TopicSelector
          {...(showedInTopics.length && {
            onlySubTopicsOf: showedInTopics.map(({ _id }) => _id),
          })}
          placeholder="Add Covered SubTopic..."
          onSelect={(topic) => onAdded(topic)}
        />
      </Box>
    </Stack>
  );
};
