import { Box, Text, Link } from '@chakra-ui/core';
import { useListDomainConcepts } from '../../graphql/concepts/concepts.hooks';
import NextLink from 'next/link';

interface ConceptListProps {
  domainKey: string;
}

export const ConceptList: React.FC<ConceptListProps> = ({ domainKey }) => {
  const { concepts } = useListDomainConcepts(domainKey);

  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius={4} p={4} width="100%">
      {concepts && concepts.length ? (
        concepts.map(concept => (
          <Box key={concept._id} p={2}>
            <NextLink href={`/domains/${domainKey}/concepts/${concept._id}`}>
              <Link fontSize="l" fontWeight={500}>
                {concept.name}
              </Link>
            </NextLink>
            {concept.description && <Text>{concept.description}</Text>}
          </Box>
        ))
      ) : (
        <Box>No concepts</Box>
      )}
    </Box>
  );
};
