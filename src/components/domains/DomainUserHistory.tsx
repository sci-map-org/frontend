import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { LearningPathMiniCard } from '../learning_paths/LearningPathMiniCard';
import { LearningPathMiniCardDataFragment } from '../learning_paths/LearningPathMiniCard.generated';
import { ResourceMiniCard } from '../resources/ResourceMiniCard';
import { ResourceMiniCardDataFragment } from '../resources/ResourceMiniCard.generated';

// Reuse when adding last "opened" + show completed filter
// export const getDomainCompletedLearningMaterialsHistory = gql`
//   query getDomainCompletedLearningMaterialsHistory(
//     $key: String!
//     $learningMaterialsOptions: DomainLearningMaterialsOptions!
//   ) {
//     getDomainByKey(key: $key) {
//       _id
//       learningMaterials(options: $learningMaterialsOptions) {
//         items {
//           ...ResourceMiniCardData
//           ...LearningPathMiniCardData
//         }
//       }
//     }
//   }
//   ${ResourceMiniCardData}
//   ${LearningPathMiniCardData}
// `;

interface DomainUserHistoryProps {
  domainKey: string;
  isLoading?: boolean;
  learningMaterials: (ResourceMiniCardDataFragment | LearningPathMiniCardDataFragment)[];
}

export const DomainUserHistory: React.FC<DomainUserHistoryProps> = ({ domainKey, isLoading, learningMaterials }) => {
  // const { data, loading, error } = useGetDomainCompletedLearningMaterialsHistoryQuery({
  //   variables: {
  //     key: domainKey,
  //     learningMaterialsOptions: {
  //       sortingType: DomainLearningMaterialsSortingType.Newest,
  //       filter: { completedByUser: true },
  //     },
  //   },
  // });
  // const learningMaterials = data?.getDomainByKey.learningMaterials?.items || [];
  if (!learningMaterials || !learningMaterials.length) return null;
  return (
    <Flex direction="column" backgroundColor="gray.100" borderRadius={5} pt={1}>
      <Box>
        <Text fontSize="xl" textAlign="center" fontWeight={600} color="gray.600" pb={1}>
          Recently Completed
        </Text>
      </Box>
      <Stack spacing={0} alignItems="stretch" direction="column" maxH="180px" overflow="hidden" overflowY="scroll">
        {learningMaterials.map((learningMaterial, idx) => {
          if (learningMaterial.__typename === 'LearningPath')
            return (
              <LearningPathMiniCard
                key={learningMaterial._id}
                learningPath={learningMaterial}
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
          if (learningMaterial.__typename === 'Resource')
            return (
              <ResourceMiniCard
                key={learningMaterial._id}
                resource={learningMaterial}
                inCompactList
                firstItemInCompactList={idx === 0}
              />
            );
          return null;
        })}
      </Stack>
    </Flex>
  );
};
