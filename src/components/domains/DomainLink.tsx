import { BreadcrumbLinkProps } from '@chakra-ui/react';
import { LinkProps } from 'next/link';
import { DomainLinkDataFragment } from '../../graphql/domains/domains.fragments.generated';
import { DomainPageInfo } from '../../pages/RoutesPageInfos';
import { PageLink, PageLinkProps } from '../navigation/InternalLink';

export const domainLinkStyleProps: Pick<LinkProps & BreadcrumbLinkProps, 'fontWeight' | 'color'> = {
  fontWeight: 700,
  color: 'gray.600',
};

interface DomainLinkProps extends Omit<PageLinkProps, 'pageInfo'> {
  domain: DomainLinkDataFragment;
}
export const DomainLink: React.FC<DomainLinkProps> = ({ domain, children, ...props }) => {
  return (
    <PageLink pageInfo={DomainPageInfo(domain)} {...domainLinkStyleProps} {...props}>
      {children || domain.name}
    </PageLink>
  );
};
