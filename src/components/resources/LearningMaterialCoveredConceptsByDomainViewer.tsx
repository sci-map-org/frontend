import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { LearningMaterialWithCoveredConceptsByDomainDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { InternalLink } from '../navigation/InternalLink';

interface LearningMaterialCoveredConceptsByDomainViewerProps {
  learningMaterial: LearningMaterialWithCoveredConceptsByDomainDataFragment;
  isLoading?: boolean;
}

export const LearningMaterialCoveredConceptsByDomainViewer: React.FC<LearningMaterialCoveredConceptsByDomainViewerProps> = ({
  learningMaterial,
  isLoading,
}) => {
  if (!learningMaterial.coveredConceptsByDomain) return null;
  return (
    <Stack spacing={2}>
      {learningMaterial.coveredConceptsByDomain.map(({ domain, coveredConcepts }) => (
        <Box key={domain._id}>
          <Skeleton isLoaded={!isLoading}>
            <InternalLink routePath="/domains/[key]" asHref={`/domains/${domain.key}`}>
              {domain.name}
            </InternalLink>
          </Skeleton>
          {!!coveredConcepts.length && (
            <Stack spacing={1} pl={5}>
              {coveredConcepts.map((concept) => (
                <Box key={concept._id}>
                  <Skeleton isLoaded={!isLoading}>
                    <InternalLink
                      routePath="/domains/[key]/concepts/[conceptKey]"
                      asHref={`/domains/${domain.key}/concepts/${concept.key}`}
                      fontSize="sm"
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
  );
};
