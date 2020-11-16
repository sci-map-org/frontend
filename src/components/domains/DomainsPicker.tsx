import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
import { EntitySelector } from '../lib/selectors/EntitySelector';
import { InternalLink } from '../navigation/InternalLink';

interface DomainsPickerProps {
  title: string;
  pickedDomainList: DomainDataFragment[];
  onSelect: (domain: DomainDataFragment) => void;
  onRemove: (domain: DomainDataFragment) => void;
}

export const DomainsPicker: React.FC<DomainsPickerProps> = ({ title, pickedDomainList, onSelect, onRemove }) => {
  const [searchDomains, { data, loading }] = useSearchDomainsLazyQuery();

  return (
    <Stack direction="row" width="26rem" borderWidth="1px" borderRadius={5} p={3} spacing={5}>
      <EntitySelector
        placeholder="Search domains..."
        entitySuggestions={data?.searchDomains.items || []}
        fetchEntitySuggestions={(v) => searchDomains({ variables: { options: { pagination: {}, query: v } } })}
        onSelect={onSelect}
      />
      <Stack>
        <Text fontWeight={700}>{title}</Text>
        <Box>
          {pickedDomainList.map((pickedDomain) => {
            return (
              <Stack direction="row" spacing={2} key={pickedDomain._id} my={2}>
                <IconButton
                  aria-label="remove domain"
                  icon={<DeleteIcon />}
                  variant="outline"
                  onClick={() => onRemove(pickedDomain)}
                  size="xs"
                />
                <InternalLink routePath="/domains/[key]" asHref={`/domains/${pickedDomain.key}`}>
                  {pickedDomain.name}
                </InternalLink>
              </Stack>
            );
          })}
        </Box>
      </Stack>
    </Stack>
  );
};
