// import { BreadcrumbLinkProps, Link } from '@chakra-ui/react';
// import { LinkProps } from 'next/link';
// import { ConceptLinkDataFragment } from '../../../graphql/concepts/concepts.fragments.generated';
// import { DomainLinkDataFragment } from '../../../graphql/domains/domains.fragments.generated';
// import { ConceptPageInfo } from '../../../pages/RoutesPageInfos';
// import { PageLink, PageLinkProps } from '../../navigation/InternalLink';

// export const conceptLinkStyleProps: Pick<LinkProps & BreadcrumbLinkProps, 'fontWeight' | 'color'> = {
//   fontWeight: 500,
//   color: 'gray.600',
// };

// interface ConceptLinkProps extends Omit<PageLinkProps, 'pageInfo'> {
//   concept: ConceptLinkDataFragment;
//   domain: DomainLinkDataFragment;
// }
// export const ConceptLink: React.FC<ConceptLinkProps> = ({ concept, domain, children, ...props }) => {
//   return props.onClick ? (
//     <Link onClick={props.onClick} {...conceptLinkStyleProps} {...props}>
//       {children || concept.name}
//     </Link>
//   ) : (
//     <PageLink pageInfo={ConceptPageInfo(domain, concept)} {...conceptLinkStyleProps} {...props}>
//       {children || concept.name}
//     </PageLink>
//   );
// };
