import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { LearningMaterialWithCoveredConceptsByDomainDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { ConceptPageInfo, DomainPageInfo } from '../../pages/RoutesPageInfos';
import { InternalLink, PageLink } from '../navigation/InternalLink';

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
            <PageLink pageInfo={DomainPageInfo(domain)}>{domain.name}</PageLink>
          </Skeleton>
          {!!coveredConcepts.length && (
            <Stack spacing={1} pl={5}>
              {coveredConcepts.map((concept) => (
                <Box key={concept._id}>
                  <Skeleton isLoaded={!isLoading}>
                    <PageLink pageInfo={ConceptPageInfo(domain, concept)} fontSize="sm">
                      {concept.name}
                    </PageLink>
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
