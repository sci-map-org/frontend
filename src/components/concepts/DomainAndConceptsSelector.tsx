import { MinusIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react';
import { differenceBy } from 'lodash';
import { ConceptDataFragment, ConceptLinkDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { PageLink } from '../navigation/InternalLink';
import { DomainConceptsSelector } from './DomainConceptsSelector';

export type DomainAndSelectedConcepts = {
  domain: DomainDataFragment;
  selectedConcepts: ConceptLinkDataFragment[];
};

interface DomainAndConceptsSelectorProps {
  selectedDomainsAndConcepts: DomainAndSelectedConcepts[];
  onChange: (domainsAndSelectedConcepts: DomainAndSelectedConcepts[]) => void;
  allowConceptCreation?: boolean;
}

export const DomainAndConceptsSelector: React.FC<DomainAndConceptsSelectorProps> = ({
  selectedDomainsAndConcepts,
  onChange,
  allowConceptCreation,
}) => {
  const [searchDomains, { data }] = useSearchDomainsLazyQuery();

  const updateSelectedConcepts = (index: number, newSelectedConcepts: ConceptLinkDataFragment[]) => {
    const newSelectedDomainsAndConcepts = [...selectedDomainsAndConcepts];
    newSelectedDomainsAndConcepts[index] = {
      ...newSelectedDomainsAndConcepts[index],
      selectedConcepts: newSelectedConcepts,
    };
    onChange(newSelectedDomainsAndConcepts);
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
              onClick={() => onChange(selectedDomainsAndConcepts.filter((s) => s.domain._id !== domain._id))}
            />
            <PageLink pageInfo={DomainPageInfo(domain)}>{domain.name}</PageLink>
          </Stack>
          <Box pl={5}>
            <DomainConceptsSelector
              domain={domain}
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
              allowCreation={allowConceptCreation}
            />
          </Box>
        </Flex>
      ))}
      <EntitySelector
        placeholder="Search areas..."
        entitySuggestions={differenceBy(
          data?.searchDomains.items || [],
          selectedDomainsAndConcepts.map((s) => s.domain),
          (d) => d._id
        )}
        fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
        onSelect={(domain) => onChange([...selectedDomainsAndConcepts, { domain, selectedConcepts: [] }])}
      />
      ;
    </Stack>
  );
};
