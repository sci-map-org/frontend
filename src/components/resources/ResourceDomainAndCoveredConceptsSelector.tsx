import { Box, Flex, Heading, IconButton, Skeleton, Stack, Text } from '@chakra-ui/core';
import { MinusIcon } from '@chakra-ui/icons';
import { differenceBy } from 'lodash';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { ResourceWithCoveredConceptsByDomainDataFragment } from '../../graphql/resources/resources.fragments.generated';
import {
  useAttachResourceToDomainMutation,
  useDetachResourceFromDomainMutation,
} from '../../graphql/resources/resources.operations.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { InternalLink } from '../navigation/InternalLink';
import { ResourceDomainCoveredConceptsSelector } from './CoveredConceptsSelector';

export const ResourceDomainAndCoveredConceptsSelector: React.FC<{
  resource: ResourceWithCoveredConceptsByDomainDataFragment;
  isLoading?: boolean;
}> = ({ resource, isLoading }) => {
  const [searchDomains, { data }] = useSearchDomainsLazyQuery();
  const [attachResourceToDomain] = useAttachResourceToDomainMutation();
  const [detachResourceFromDomain] = useDetachResourceFromDomainMutation();

  if (!resource.coveredConceptsByDomain) return null;

  return (
    <Stack direction="column">
      <Heading size="sm">Covered Topics</Heading>
      {resource.coveredConceptsByDomain.map(({ domain, coveredConcepts }, index) => (
        <Flex direction="column" alignItems="stretch" key={domain.key}>
          <Stack direction="row">
            <IconButton
              aria-label="remove domain"
              size="xs"
              icon={<MinusIcon />}
              onClick={() =>
                detachResourceFromDomain({ variables: { resourceId: resource._id, domainId: domain._id } })
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
            <ResourceDomainCoveredConceptsSelector
              domainKey={domain.key}
              resourceId={resource._id}
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
          resource.coveredConceptsByDomain.map((s) => s.domain),
          (d) => d._id
        )}
        fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
        onSelect={(domain) => attachResourceToDomain({ variables: { resourceId: resource._id, domainId: domain._id } })}
        isDisabled={isLoading}
      />
      ;
    </Stack>
  );
};
