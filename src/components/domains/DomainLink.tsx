import { BreadcrumbLinkProps } from '@chakra-ui/react';
import { LinkProps } from 'next/link';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink } from '../navigation/InternalLink';

export const domainLinkStyleProps: Omit<LinkProps & BreadcrumbLinkProps, 'href'> = {
  fontWeight: 700,
  color: 'gray.600',
};

interface DomainLinkProps {
  domain: DomainLinkDataFragment;
}
export const DomainLink: React.FC<DomainLinkProps> = ({ domain }) => {
  return (
    <PageLink pageInfo={DomainPageInfo(domain)} {...domainLinkStyleProps}>
      {domain.name}
    </PageLink>
  );
};
