import { Box, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';

interface ResourceCoveredConceptsProps {
  domains: DomainWithConceptsDataFragment[];
  coveredConcepts: ConceptDataFragment[];
}

export const ResourceCoveredConcepts: React.FC<ResourceCoveredConceptsProps> = ({ domains, coveredConcepts }) => {
  return (
    <Box>
      <Text fontSize="2xl">Domains</Text>
      <Stack spacing={2} pl={4}>
        {domains.map(domain => (
          <Box key={domain._id}>
            <NextLink href={`/domains/${domain.key}`}>
              <Link fontSize="xl">{domain.name}</Link>
            </NextLink>
            <Stack spacing={1} pl={4}>
              {!!coveredConcepts && domain.concepts && (
                <>
                  <Text fontWeight={700}>Covered Concepts</Text>
                  {domain.concepts.items
                    .map(item => item.concept)
                    .filter(concept => coveredConcepts && coveredConcepts.find(c => c._id === concept._id))
                    .map(concept => (
                      <Box key={concept._id} ml={2}>
                        <NextLink href={`/domains/${domain.key}/concepts/${concept.key}`}>
                          <Link fontSize="md">{concept.name}</Link>
                        </NextLink>
                      </Box>
                    ))}
                </>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
