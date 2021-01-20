import { Box, Flex, IconButton, Skeleton, Stack, Text } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { differenceBy } from 'lodash';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { LearningMaterialWithCoveredConceptsByDomainDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import {
  useAttachLearningMaterialToDomainMutation,
  useDetachLearningMaterialFromDomainMutation,
} from '../../graphql/learning_materials/learning_materials.operations.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { InternalLink } from '../navigation/InternalLink';
import { LearningMaterialDomainCoveredConceptsSelector } from './CoveredConceptsSelector';

export const LearningMaterialDomainAndCoveredConceptsSelector: React.FC<{
  learningMaterial: LearningMaterialWithCoveredConceptsByDomainDataFragment;
  isLoading?: boolean;
}> = ({ learningMaterial, isLoading }) => {
  const [searchDomains, { data }] = useSearchDomainsLazyQuery();
  const [attachLearningMaterialToDomain] = useAttachLearningMaterialToDomainMutation();
  const [detachLearningMaterialFromDomain] = useDetachLearningMaterialFromDomainMutation();

  if (!learningMaterial.coveredConceptsByDomain) return null;

  return (
    <Stack direction="column">
      {learningMaterial.coveredConceptsByDomain.map(({ domain, coveredConcepts }, index) => (
        <Flex direction="column" alignItems="stretch" key={domain.key}>
          <Stack direction="row">
            <IconButton
              aria-label="remove domain"
              size="xs"
              icon={<MinusIcon />}
              onClick={() =>
                detachLearningMaterialFromDomain({
                  variables: { learningMaterialId: learningMaterial._id, domainId: domain._id },
                })
              }
              isDisabled={isLoading}
            />
            <Text>
              <Skeleton isLoaded={!isLoading} as="span">
                <InternalLink asHref={`/domains/${domain.key}`} routePath="/domains/[key]">
                  {domain.name}
                </InternalLink>
              </Skeleton>
            </Text>
          </Stack>
          <Box pl={5}>
            <LearningMaterialDomainCoveredConceptsSelector
              domain={domain}
              learningMaterialId={learningMaterial._id}
              isLoading={isLoading}
              coveredConcepts={coveredConcepts}
            />
          </Box>
        </Flex>
      ))}
      <EntitySelector
        inputSize="sm"
        placeholder="Add new domain"
        entitySuggestions={differenceBy(
          data?.searchDomains.items || [],
          learningMaterial.coveredConceptsByDomain.map((s) => s.domain),
          (d) => d._id
        )}
        fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
        onSelect={(domain) =>
          attachLearningMaterialToDomain({
            variables: { learningMaterialId: learningMaterial._id, domainId: domain._id },
          })
        }
        isDisabled={isLoading}
      />
      ;
    </Stack>
  );
};
