import { GetDomainByKeyDomainPageQuery } from '../../pages/domains/DomainPage.generated';
import { Flex, Text } from '@chakra-ui/core';
import { HorizontalConceptMappingVisualisation } from './ConceptMappingVisualisation';

interface DomainConceptGraphProps {
  isLoading?: boolean;
  minNbRelationships?: number;
  domain: GetDomainByKeyDomainPageQuery['getDomainByKey'];
}
export const DomainConceptGraph: React.FC<DomainConceptGraphProps> = ({ domain, isLoading, minNbRelationships }) => {
  const nbRelationships = domain.concepts
    ? domain.concepts.items.reduce((sum, item) => {
        return sum + (item.concept.referencedByConcepts || []).length;
      }, 0)
    : 0;

  if (!domain.concepts || (minNbRelationships && nbRelationships < minNbRelationships)) return null;

  return (
    <Flex justifyContent="center" direction="column" alignItems="center" mt={2}>
      <Text fontSize="3xl" mb={3}>
        Concept Dependencies
      </Text>
      <HorizontalConceptMappingVisualisation
        domainKey={domain.key}
        concepts={domain.concepts?.items.map((i) => i.concept) || []}
        isLoading={isLoading}
      />
    </Flex>
  );
};
