import { Flex, Spinner, Text } from '@chakra-ui/react';
import { ResourcePreviewCardDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { ResourcePreviewCard } from './ResourcePreviewCard';

export const ResourcePreviewCardList: React.FC<{
  resourcePreviews: ResourcePreviewCardDataFragment[];
  isLoading?: boolean;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  showCompletedNotificationToast?: boolean;
}> = ({ resourcePreviews, isLoading, onResourceConsumed, showCompletedNotificationToast }) => {
  if (!isLoading && !resourcePreviews.length)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        py="50px"
        backgroundColor="backgroundColor.0"
        borderColor="gray.200"
        borderWidth="1px"
      >
        <Text fontSize="xl" fontStyle="italic">
          No results found
        </Text>
      </Flex>
    );
  return (
    <Flex direction="column" alignItems="stretch" backgroundColor="backgroundColor.0">
      {isLoading ? (
        <Flex
          backgroundColor="backgroundColor.0"
          direction="column"
          alignItems="center"
          h="1000px"
          pt="200px"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Spinner size="xl" m={4} />
          <Text fontStyle="italic">Finding the most adapted learning resources...</Text>
        </Flex>
      ) : (
        resourcePreviews.map((preview, idx) => (
          <ResourcePreviewCard
            inCompactList
            firstItemInCompactList={idx === 0}
            key={preview._id}
            resource={preview}
            onResourceConsumed={onResourceConsumed}
            showCompletedNotificationToast={showCompletedNotificationToast}
          />
        ))
      )}
    </Flex>
  );
};
