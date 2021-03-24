import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';

interface DomainSelectorProps {
  onSelect: (domain: DomainDataFragment) => void;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({ onSelect }) => {
  const [searchDomains, { data }] = useSearchDomainsLazyQuery();
  return (
    <EntitySelector
      placeholder="Search areas..."
      entitySuggestions={data?.searchDomains.items || []}
      fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
      onSelect={onSelect}
    />
  );
};
