import { Flex, Spinner, Text } from '@chakra-ui/react';
import { LearningPathDataFragment } from '../../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { LearningPathPreviewCard } from '../learning_paths/LearningPathPreviewCard';
import { ResourcePreviewCard } from './ResourcePreviewCard';

export const LearningMaterialPreviewCardList: React.FC<{
  domainKey?: string;
  learningMaterialsPreviews: (ResourcePreviewDataFragment | LearningPathDataFragment)[];
  isLoading?: boolean;
  onResourceConsumed?: (resourceId: string, consumed: boolean) => void;
  showCompletedNotificationToast?: boolean;
}> = ({ learningMaterialsPreviews, domainKey, isLoading, onResourceConsumed, showCompletedNotificationToast }) => {
  if (!isLoading && !learningMaterialsPreviews.length)
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
        learningMaterialsPreviews.map((preview, idx) => {
          if (preview.__typename === 'Resource')
            return (
              <ResourcePreviewCard
                key={preview._id}
                domainKey={domainKey}
                resource={preview}
                onResourceConsumed={onResourceConsumed}
                showCompletedNotificationToast={showCompletedNotificationToast}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
          if (preview.__typename === 'LearningPath')
            return (
              <LearningPathPreviewCard
                learningPath={preview}
                key={preview._id}
                leftBlockWidth="120px"
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
        })
      )}
    </Flex>
  );
};
