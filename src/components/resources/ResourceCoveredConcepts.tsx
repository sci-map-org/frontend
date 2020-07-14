import { Box, Skeleton, Stack, Text } from '@chakra-ui/core';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainWithConceptsDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';

interface ResourceCoveredConceptsProps {
  domains: DomainWithConceptsDataFragment[];
  coveredConcepts: ConceptDataFragment[];
  isLoading?: boolean;
}

export const ResourceCoveredConcepts: React.FC<ResourceCoveredConceptsProps> = ({
  domains,
  coveredConcepts,
  isLoading,
}) => {
  return (
    <Box>
      <Text fontSize="2xl">Domains</Text>
      <Stack spacing={2} pl={4}>
        {domains.map((domain) => (
          <Box key={domain._id}>
            <Skeleton isLoaded={!isLoading}>
              <InternalLink fontSize="xl" routePath="/domains/[key]" asHref={`/domains/${domain.key}`}>
                {domain.name}
              </InternalLink>
            </Skeleton>
            <Stack spacing={1} pl={4}>
              {!!coveredConcepts && domain.concepts && (
                <>
                  <Text fontWeight={700}>Covered Concepts</Text>
                  {domain.concepts.items
                    .map((item) => item.concept)
                    .filter((concept) => coveredConcepts && coveredConcepts.find((c) => c._id === concept._id))
                    .map((concept) => (
                      <Box key={concept._id} ml={2}>
                        <Skeleton isLoaded={!isLoading}>
                          <InternalLink
                            routePath="/domains/[key]/concepts/[conceptKey]"
                            asHref={`/domains/${domain.key}/concepts/${concept.key}`}
                            fontSize="md"
                          >
                            {concept.name}
                          </InternalLink>
                        </Skeleton>
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
