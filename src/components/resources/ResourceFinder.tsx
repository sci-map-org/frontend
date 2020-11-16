import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { ResourceDataFragment } from '../../graphql/resources/resources.fragments.generated';
import { useSearchResourcesLazyQuery } from '../../graphql/resources/resources.operations.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';

interface ResourceFinderProps {
  onSelect: (resource: ResourceDataFragment) => void;
}

// N.B: for no-op memory leak warning, checkout https://github.com/apollographql/apollo-client/issues/4150#issuecomment-500127694
// and https://github.com/apollographql/apollo-feature-requests/issues/40

export const ResourceFinder: React.FC<ResourceFinderProps> = ({ onSelect }) => {
  const [searchResourcesLazyQuery, { data }] = useSearchResourcesLazyQuery();

  const [searchResults, setSearchResults] = useState<ResourceDataFragment[]>([]);

  const [debouncedSearchResourcesLazyQuery] = useDebouncedCallback(
    (query: string) => searchResourcesLazyQuery({ variables: { query, options: { pagination: { limit: 10 } } } }),
    300
  );

  useEffect(() => {
    if (!!data?.searchResources.items) setSearchResults(data.searchResources.items);
  }, [data]);

  return (
    <Flex>
      <EntitySelector
        width="25rem"
        placeholder="Search resources..."
        entitySuggestions={searchResults}
        fetchEntitySuggestions={(query) =>
          query.length >= 3 ? debouncedSearchResourcesLazyQuery(query) : setSearchResults([])
        }
        onSelect={onSelect}
      />
    </Flex>
  );
};
