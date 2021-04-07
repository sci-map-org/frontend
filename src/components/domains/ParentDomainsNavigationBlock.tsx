import { Flex, Stack, Text } from '@chakra-ui/react';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { DomainIcon } from '../lib/icons/DomainIcon';
import { PageLink } from '../navigation/InternalLink';

interface ParentDomainsNavigationBlockProps {
  domains: DomainLinkDataFragment[];
  maxLinkItems?: number;
  size?: 'sm' | 'md';
}

export const ParentDomainsNavigationBlock: React.FC<ParentDomainsNavigationBlockProps> = ({
  domains,
  maxLinkItems = 3,
  size = 'sm',
}) => {
  if (!domains.length) return null;
  return (
    <Flex direction="row">
      <Text fontWeight={700} color="gray.700" fontSize={size}>
        In:
      </Text>

      <Stack direction="column" spacing={1} pl={1} ml={1} maxH="86px" overflowY="scroll" bgColor="gray.50">
        {domains.slice(0, maxLinkItems).map((domain) => (
          <PageLink key={domain._id} fontSize={size} pageInfo={DomainPageInfo(domain)}>
            {domain.name}
          </PageLink>
        ))}
      </Stack>
    </Flex>
  );
};
