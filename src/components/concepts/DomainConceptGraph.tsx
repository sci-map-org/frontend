// import { GetDomainByKeyDomainPageQuery } from '../../pages/domains/DomainPage.generated';
// import { Flex, Text } from '@chakra-ui/react';
// import { HorizontalConceptMappingVisualisation } from './ConceptMappingVisualisation';

// interface DomainConceptGraphProps {
//   isLoading?: boolean;
//   minNbRelationships?: number;
//   domain: any;
// }
// /**
//  * Deprecated
//  */
// export const DomainConceptGraph: React.FC<DomainConceptGraphProps> = ({ domain, isLoading, minNbRelationships }) => {
//   const nbRelationships = domain.concepts
//     ? domain.concepts.items.reduce((sum: any, item: any) => {
//         return sum + (item.concept.referencedByConcepts || []).length;
//       }, 0)
//     : 0;

//   if (!domain.concepts || (minNbRelationships && nbRelationships < minNbRelationships)) return null;

//   return (
//     <Flex justifyContent="center" direction="column" alignItems="center" mt={2}>
//       <Text fontSize="3xl" mb={3}>
//         Concept Map
//       </Text>
//       <HorizontalConceptMappingVisualisation
//         domainKey={domain.key}
//         concepts={domain.concepts?.items.map((i: any) => i.concept) || []}
//         isLoading={isLoading}
//       />
//     </Flex>
//   );
// };

export default {};
