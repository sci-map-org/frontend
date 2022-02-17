import { Box, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { FormFieldLabel } from '../../lib/Typography';
import { TopicBadge } from '../../topics/TopicBadge';
import { TopicSelector } from '../../topics/TopicSelector';

interface ResourcePrerequisitesFieldProps {
  prerequisites: TopicLinkDataFragment[];
  onRemove: (topiclId: string) => void;
  onAdded: (topic: TopicLinkDataFragment) => void;
}
export const ResourcePrerequisitesField: React.FC<ResourcePrerequisitesFieldProps> = ({
  prerequisites,
  onAdded,
  onRemove,
}) => {
  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <FormFieldLabel color="gray.500">Prerequisites</FormFieldLabel>
      {prerequisites.length && (
        <Wrap justify="center" spacing={2}>
          {prerequisites.map((topic) => (
            <WrapItem key={topic._id}>
              <TopicBadge key={topic._id} topic={topic} removable={true} onRemove={() => onRemove(topic._id)} />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Box w="200px">
        <TopicSelector placeholder="Add Prerequisite..." onSelect={(topic) => onAdded(topic)} />
      </Box>
    </Stack>
  );
};
