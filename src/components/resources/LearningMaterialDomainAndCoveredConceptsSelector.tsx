// import { Box, Flex, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
// import { MinusIcon } from '@chakra-ui/icons';
// import { differenceBy } from 'lodash';
// import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
// import { LearningMaterialWithCoveredTopicsDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
// import {
//   useAttachLearningMaterialToDomainMutation,
//   useDetachLearningMaterialFromDomainMutation,
// } from '../../graphql/learning_materials/learning_materials.operations.generated';
// import { EntitySelector } from '../lib/selectors/EntitySelector';
// import { InternalLink, PageLink } from '../navigation/InternalLink';

// export const LearningMaterialDomainAndCoveredConceptsSelector: React.FC<{
//   learningMaterial: LearningMaterialWithCoveredConceptsByDomainDataFragment;
//   isLoading?: boolean;
//   allowConceptCreation?: boolean;
// }> = ({ learningMaterial, isLoading, allowConceptCreation }) => {
//   const [searchDomains, { data }] = useSearchDomainsLazyQuery();
//   const [attachLearningMaterialToDomain] = useAttachLearningMaterialToDomainMutation();
//   const [detachLearningMaterialFromDomain] = useDetachLearningMaterialFromDomainMutation();

//   if (!learningMaterial.coveredConceptsByDomain) return null;

//   return (
//     <Stack direction="column">
//       {learningMaterial.coveredConceptsByDomain.map(({ domain, coveredConcepts }, index) => (
//         <Flex direction="column" alignItems="stretch" key={domain.key}>
//           <Stack direction="row">
//             <IconButton
//               aria-label="remove domain"
//               size="xs"
//               icon={<MinusIcon />}
//               onClick={() =>
//                 detachLearningMaterialFromDomain({
//                   variables: { learningMaterialId: learningMaterial._id, domainId: domain._id },
//                 })
//               }
//               isDisabled={isLoading}
//             />
//             <Text>
//               <Skeleton isLoaded={!isLoading} as="span">
//                 <PageLink pageInfo={DomainPageInfo(domain)}>{domain.name}</PageLink>
//               </Skeleton>
//             </Text>
//           </Stack>
//           <Box pl={5}>
//             {/* <LearningMaterialDomainCoveredConceptsSelector
//               domain={domain}
//               learningMaterialId={learningMaterial._id}
//               isLoading={isLoading}
//               coveredConcepts={coveredConcepts}
//               allowCreation={allowConceptCreation}
//             /> */}
//           </Box>
//         </Flex>
//       ))}
//       <EntitySelector
//         inputSize="sm"
//         placeholder="Add new area"
//         entitySuggestions={differenceBy(
//           data?.searchDomains.items || [],
//           learningMaterial.coveredConceptsByDomain.map((s) => s.domain),
//           (d) => d._id
//         )}
//         fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
//         onSelect={(domain) =>
//           attachLearningMaterialToDomain({
//             variables: { learningMaterialId: learningMaterial._id, domainId: domain._id },
//           })
//         }
//         isDisabled={isLoading}
//       />
//       ;
//     </Stack>
//   );
// };
