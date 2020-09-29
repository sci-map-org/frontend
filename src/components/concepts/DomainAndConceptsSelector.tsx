import { Box, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/core';
import { MinusIcon } from '@chakra-ui/icons';
import { differenceBy } from 'lodash';
import { useEffect, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { ResourceWithCoveredConceptsByDomainDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { InternalLink } from '../navigation/InternalLink';
import {
  ResourceDomainCoveredConceptsSelector,
  StatelessDomainConceptsSelector,
} from '../resources/CoveredConceptsSelector';

export type DomainAndSelectedConcepts = {
  domain: DomainDataFragment;
  selectedConcepts: ConceptDataFragment[];
};

export const StatelessDomainAndConceptsSelector: React.FC<{
  defaultDomains: DomainDataFragment[];
  onChange: (domainsAndSelectedConcepts: DomainAndSelectedConcepts[]) => void;
}> = ({ defaultDomains, onChange }) => {
  const [selectedDomainsAndConcepts, setSelectedDomainsAndConcepts] = useState<DomainAndSelectedConcepts[]>(
    defaultDomains.map((domain) => ({ domain, selectedConcepts: [] }))
  );

  const [searchDomains, { data }] = useSearchDomainsLazyQuery();

  useEffect(() => {
    onChange(selectedDomainsAndConcepts);
  }, [selectedDomainsAndConcepts]);

  const updateSelectedConcepts = (index: number, newSelectedConcepts: ConceptDataFragment[]) => {
    const newSelectedDomainsAndConcepts = [...selectedDomainsAndConcepts];
    newSelectedDomainsAndConcepts[index] = {
      ...newSelectedDomainsAndConcepts[index],
      selectedConcepts: newSelectedConcepts,
    };
    setSelectedDomainsAndConcepts(newSelectedDomainsAndConcepts);
  };

  return (
    <Stack direction="column">
      <Heading size="md">Covered Topics</Heading>
      {selectedDomainsAndConcepts.map(({ domain, selectedConcepts }, index) => (
        <Flex direction="column" alignItems="stretch" key={domain.key}>
          <Stack direction="row">
            <IconButton
              aria-label="remove domain"
              size="xs"
              icon={<MinusIcon />}
              onClick={() =>
                setSelectedDomainsAndConcepts(selectedDomainsAndConcepts.filter((s) => s.domain._id !== domain._id))
              }
            />
            <Text>{domain.name}</Text>
          </Stack>
          {/* add remove icon + link to domain (external) */}
          <Box pl={5}>
            <StatelessDomainConceptsSelector
              domainKey={domain.key}
              onSelect={(c) => updateSelectedConcepts(index, [...selectedConcepts, c])}
              onRemove={(c) =>
                updateSelectedConcepts(
                  index,
                  selectedConcepts.filter((sc) => {
                    return sc._id !== c._id;
                  })
                )
              }
              selectedConcepts={selectedConcepts}
            />
          </Box>
        </Flex>
      ))}
      <EntitySelector
        placeholder="Search domains..."
        entitySuggestions={differenceBy(
          data?.searchDomains.items || [],
          selectedDomainsAndConcepts.map((s) => s.domain),
          (d) => d._id
        )}
        fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
        onSelect={(domain) =>
          setSelectedDomainsAndConcepts([...selectedDomainsAndConcepts, { domain, selectedConcepts: [] }])
        }
      />
      ;
    </Stack>
  );
};

export const ResourceDomainAndConceptsSelector: React.FC<{
  resource: ResourceWithCoveredConceptsByDomainDataFragment;
}> = ({ resource }) => {
  const [searchDomains, { data }] = useSearchDomainsLazyQuery();

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
              onClick={() => console.log('detach domain ' + domain)}
            />
            <Text>
              <InternalLink asHref={`/domains/${domain.key}`} routePath="/domains/[key]">
                {domain.name}
              </InternalLink>
            </Text>
          </Stack>
          <Box pl={5}>
            <ResourceDomainCoveredConceptsSelector
              domainKey={domain.key}
              resourceId={resource._id}
              coveredConcepts={coveredConcepts}
            />
          </Box>
        </Flex>
      ))}
      <EntitySelector
        placeholder="Search domains..."
        entitySuggestions={differenceBy(
          data?.searchDomains.items || [],
          resource.coveredConceptsByDomain.map((s) => s.domain),
          (d) => d._id
        )}
        fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
        onSelect={(domain) => console.log('add domain ' + domain)}
      />
      ;
    </Stack>
  );
};
