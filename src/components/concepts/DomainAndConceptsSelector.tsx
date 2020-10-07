import { Box, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/core';
import { MinusIcon } from '@chakra-ui/icons';
import { differenceBy } from 'lodash';
import { useEffect, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { DomainConceptsSelector } from './DomainConceptsSelector';

export type DomainAndSelectedConcepts = {
  domain: DomainDataFragment;
  selectedConcepts: ConceptDataFragment[];
};

export const DomainAndConceptsSelector: React.FC<{
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
          <Box pl={5}>
            <DomainConceptsSelector
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
