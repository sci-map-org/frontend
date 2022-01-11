import { Flex, Stack, Text } from '@chakra-ui/react';
import { DirectionSignIcon } from '../lib/icons/DirectionSignIcon';
import { EditablePartOfTopicsDataFragment } from './EditablePartOfTopics.generated';
import { TopicBadge } from './TopicBadge';

interface AlsoPartOfTopicsViewerProps {
  topic: EditablePartOfTopicsDataFragment;
}
export const AlsoPartOfTopicsViewer: React.FC<AlsoPartOfTopicsViewerProps> = ({ topic }) => {
  return (
    <Flex direction="column" alignItems="flex-end">
      <Stack direction="row">
        <DirectionSignIcon boxSize="24px" />
        <Text fontWeight={600} color="gray.700" alignItems="baseline">
          Also Part Of
        </Text>
      </Stack>
      <Stack direction="row">
        {topic.partOfTopics?.map(({ partOfTopic }) => (
          <TopicBadge key={partOfTopic._id} size="sm" topic={partOfTopic} colorScheme="teal" />
        ))}
      </Stack>
    </Flex>
  );
};
