import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

export const DomainCard: React.FC<{ domain: DomainLinkDataFragment }> = ({ domain }) => {
  return (
    <PageLink
      minW="140px"
      w="180px"
      minH="70px"
      h="90px"
      bgColor="teal.500"
      color="white"
      borderRadius={5}
      px={3}
      py={2}
      pageInfo={DomainPageInfo(domain)}
      _hover={{}}
      _active={{}}
    >
      {domain.name}
    </PageLink>
  );
};
