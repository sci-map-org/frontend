import { Flex, Stack, Text } from '@chakra-ui/react';
import { DirectionSignIcon } from '../lib/icons/DirectionSignIcon';
import { EditablePartOfTopicsDataFragment } from './EditablePartOfTopics.generated';
import { TopicBadge } from './TopicBadge';

interface AlsoPartOfTopicsViewerProps {
  topic: EditablePartOfTopicsDataFragment;
}
export const AlsoPartOfTopicsViewer: React.FC<AlsoPartOfTopicsViewerProps> = ({ topic }) => {
  if (!topic.partOfTopics?.length) return null;
  return (
    <Flex direction="row" alignItems="flex-end">
      <Stack direction="row">
        <DirectionSignIcon boxSize="24px" />
        <Text fontWeight={600} fontSize="16px" color="gray.700" alignItems="baseline" pt="2px">
          Also Part Of
        </Text>
      </Stack>
      <Stack direction="row" ml={2}>
        {topic.partOfTopics?.map(({ partOfTopic }) => (
          <TopicBadge key={partOfTopic._id} size="sm" topic={partOfTopic} colorScheme="teal" />
        ))}
      </Stack>
    </Flex>
  );
};
