// import { Box, Flex, FlexProps, Stack, Text } from '@chakra-ui/react';
// import gql from 'graphql-tag';
// import { DomainLearningMaterialsSortingType } from '../../graphql/types';
// import { LearningPathMiniCard, LearningPathMiniCardData } from '../learning_paths/LearningPathMiniCard';
// import { ResourceMiniCard, ResourceMiniCardData } from '../resources/ResourceMiniCard';
// import { useGetDomainCompletedLearningMaterialsHistoryQuery } from './DomainUserHistory.generated';

// // Reuse when adding last "opened" + show completed filter
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

// export const getDomainCompletedLearningMaterialsHistoryQueryVariables = (domainKey: string) => ({
//   key: domainKey,
//   learningMaterialsOptions: {
//     sortingType: DomainLearningMaterialsSortingType.Newest,
//     filter: { completedByUser: true },
//   },
// });

// interface DomainUserHistoryProps {
//   domainKey: string;
//   isLoading?: boolean;
//   maxH?: FlexProps['maxH'];
// }

// export const DomainUserHistory: React.FC<DomainUserHistoryProps> = ({ domainKey, maxH }) => {
//   const { data } = useGetDomainCompletedLearningMaterialsHistoryQuery({
//     variables: getDomainCompletedLearningMaterialsHistoryQueryVariables(domainKey),
//   });
//   const learningMaterials = data?.getDomainByKey.learningMaterials?.items || [];
//   if (!learningMaterials || !learningMaterials.length) return null;
//   return (
//     <Flex direction="column" backgroundColor="gray.100" borderRadius={5} pt={1} maxH={maxH}>
//       <Box>
//         <Text fontSize="xl" textAlign="center" fontWeight={600} color="gray.600" pb={1}>
//           Recently Completed
//         </Text>
//       </Box>
//       <Stack spacing={0} alignItems="stretch" direction="column" overflow="hidden" overflowY="scroll">
//         {learningMaterials.map((learningMaterial, idx) => {
//           if (learningMaterial.__typename === 'LearningPath')
//             return (
//               <LearningPathMiniCard
//                 key={learningMaterial._id}
//                 learningPath={learningMaterial}
//                 inCompactList
//                 firstItemInCompactList={idx === 0}
//               />
//             );
//           if (learningMaterial.__typename === 'Resource')
//             return (
//               <ResourceMiniCard
//                 key={learningMaterial._id}
//                 resource={learningMaterial}
//                 inCompactList
//                 firstItemInCompactList={idx === 0}
//               />
//             );
//           return null;
//         })}
//       </Stack>
//     </Flex>
//   );
// };
