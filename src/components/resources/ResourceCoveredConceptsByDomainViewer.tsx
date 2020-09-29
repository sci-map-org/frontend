import { Box, Skeleton, Stack, Text } from '@chakra-ui/core';
import { ResourceWithCoveredConceptsByDomainDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';

interface ResourceCoveredConceptsByDomainViewerProps {
  resource: ResourceWithCoveredConceptsByDomainDataFragment;
  isLoading?: boolean;
}

export const ResourceCoveredConceptsByDomainViewer: React.FC<ResourceCoveredConceptsByDomainViewerProps> = ({
  resource,
  isLoading,
}) => {
  if (!resource.coveredConceptsByDomain) return null;
  return (
    <Box>
      <Text fontSize="2xl">Domains</Text>
      <Stack spacing={2} pl={4}>
        {resource.coveredConceptsByDomain.map(({ domain, coveredConcepts }) => (
          <Box key={domain._id}>
            <Skeleton isLoaded={!isLoading}>
              <InternalLink fontSize="xl" routePath="/domains/[key]" asHref={`/domains/${domain.key}`}>
                {domain.name}
              </InternalLink>
            </Skeleton>
            {coveredConcepts.length && (
              <Stack spacing={1} pl={4}>
                <Text fontWeight={700}>Covered Concepts</Text>
                {coveredConcepts.map((concept) => (
                  <Box key={concept._id} pl={2}>
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
                )
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
