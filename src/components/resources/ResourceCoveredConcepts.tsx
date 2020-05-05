import { Box, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';

interface ResourceCoveredConceptsProps {
  domains: DomainWithConceptsDataFragment[];
  coveredConcepts: ConceptDataFragment[];
}

export const ResourceCoveredConcepts: React.FC<ResourceCoveredConceptsProps> = ({ domains, coveredConcepts }) => {
  return (
    <Box>
      <Text fontSize="2xl">Domains</Text>
      <Stack spacing={2} pl={4}>
        {domains.map((domain) => (
          <Box key={domain._id}>
            <InternalLink fontSize="xl" routePath="/domains/[key]" asHref={`/domains/${domain.key}`}>
              {domain.name}
            </InternalLink>
            <Stack spacing={1} pl={4}>
              {!!coveredConcepts && domain.concepts && (
                <>
                  <Text fontWeight={700}>Covered Concepts</Text>
                  {domain.concepts.items
                    .map((item) => item.concept)
                    .filter((concept) => coveredConcepts && coveredConcepts.find((c) => c._id === concept._id))
                    .map((concept) => (
                      <Box key={concept._id} ml={2}>
                        <InternalLink
                          routePath="/domains/[key]/concepts/[conceptKey]"
                          asHref={`/domains/${domain.key}/concepts/${concept.key}`}
                          fontSize="md"
                        >
                          {concept.name}
                        </InternalLink>
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
