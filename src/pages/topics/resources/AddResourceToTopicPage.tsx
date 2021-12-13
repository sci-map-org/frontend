// import Router from 'next/router';
// import { PageLayout } from '../../../components/layout/PageLayout';
// import { NewResource } from '../../../components/resources/NewResource';
// import { generateDomainData } from '../../../graphql/domains/domains.fragments';
// import { useGetDomainByKey } from '../../../graphql/domains/domains.hooks';
// import { routerPushToPage } from '../../PageInfo';
// import { DomainPageInfo, DomainResourceListPageInfo, ResourcePageInfo } from '../../RoutesPageInfos';

// const domainPlaceholderData = generateDomainData();

// export const AddResourceToDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
//   const { domain: domainData, loading } = useGetDomainByKey(domainKey);
//   const domain = domainData || domainPlaceholderData;

//   return (
//     <PageLayout
//       marginSize="xl"
//       breadCrumbsLinks={[DomainPageInfo(domain), DomainResourceListPageInfo(domain)]}
//       title={`Add resource  to ${domain.name}`}
//       isLoading={loading}
//     >
//       {!loading && (
//         <NewResource
//           onCancel={() => Router.back()}
//           defaultResourceCreationData={{ domainsAndCoveredConcepts: [{ domain, selectedConcepts: [] }] }}
//           onResourceCreated={(resource) => routerPushToPage(ResourcePageInfo(resource))}
//         />
//       )}
//     </PageLayout>
//   );
// };
