// import { useEffect } from 'react';
// import { atomFamily, selector, selectorFamily, useRecoilState } from 'recoil';
// import { useGetDomainRecommendedResourcesLazyQuery } from '../../components/resources/DomainRecommendedResources.generated';
// import { generateConceptData } from '../../graphql/concepts/concepts.fragments';
// import { generateDomainData } from '../../graphql/domains/domains.fragments';
// import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
// import { generateResourcePreviewData } from '../../graphql/resources/resources.fragments';
// import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
// import { DomainResourcesOptions, DomainResourcesSortingType } from '../../graphql/types';
// import { GetDomainByKeyDomainPageQuery, useGetDomainByKeyDomainPageLazyQuery } from './DomainPage.generated';

// const placeholderDomainData: GetDomainByKeyDomainPageQuery['getDomainByKey'] = {
//   ...generateDomainData(),
//   concepts: {
//     items: [
//       {
//         concept: generateConceptData(),
//         relationship: {
//           index: 0,
//         },
//       },
//       {
//         concept: generateConceptData(),
//         relationship: {
//           index: 0,
//         },
//       },
//     ],
//   },
//   resources: {
//     items: [generateResourcePreviewData(), generateResourcePreviewData(), generateResourcePreviewData()],
//   },
// };
// const DomainPageDomainDataState = atomFamily<DomainDataFragment, string>({
//   key: 'DomainPageDomainData',
//   default: () => generateDomainData(),
// });

// const DomainPageRecommendedResourcesState = atomFamily<
//   GetDomainByKeyDomainPageQuery['getDomainByKey']['resources'],
//   string
// >({
//   key: 'DomainPageRecommendedResources',
//   default: (domainKey) => {
//     return { items: [generateResourcePreviewData(), generateResourcePreviewData(), generateResourcePreviewData()] };
//   },
// });

// const DomainPageConceptsState = atomFamily<GetDomainByKeyDomainPageQuery['getDomainByKey']['concepts'], string>({
//   key: 'DomainPageConcepts',
//   default: (domainKey) => {
//     return {
//       items: [
//         {
//           concept: generateConceptData(),
//           relationship: {
//             index: 0,
//           },
//         },
//         {
//           concept: generateConceptData(),
//           relationship: {
//             index: 0,
//           },
//         },
//       ],
//     };
//   },
// });

// export const useDomainPageState = (domainKey: string) => {
//   const [domain, setDomain] = useRecoilState(DomainPageDomainDataState(domainKey));
//   const [resources, setResources] = useRecoilState(DomainPageRecommendedResourcesState(domainKey));
//   const [concepts, setConcepts] = useRecoilState(DomainPageConceptsState(domainKey));
//   const [resourcesOptions, setResourcesOptions] = useRecoilState(DomainPageResourcesOptionsState(domainKey));
//   //   console.log(domain, resources, concepts, resourcesOptions);
//   const [
//     getDomainRecommendedResourcesLazyQuery,
//     { loading: resourcesReloading },
//   ] = useGetDomainRecommendedResourcesLazyQuery({
//     onCompleted(data) {
//       setResources(data.getDomainByKey.resources);
//     },
//   });

//   const [getDomainByKeyDomainPageLazyQuery] = useGetDomainByKeyDomainPageLazyQuery({
//     onCompleted(data) {
//       console.log('completed');
//       setDomain(data.getDomainByKey);
//       setResources(data.getDomainByKey.resources);
//       setConcepts(data.getDomainByKey.concepts);
//     },
//   });

//   useEffect(() => {
//     if (domain.key !== domainKey) {
//       console.log('lazy init load');
//       getDomainByKeyDomainPageLazyQuery({ variables: { key: domainKey, resourcesOptions: resourcesOptions } });
//       // meaning contains placeholder data, so not fetched yet
//     }
//   }, []);

//   const refetchResources = (options?: DomainResourcesOptions) => {
//     !!options && setResourcesOptions(options);
//     getDomainRecommendedResourcesLazyQuery(
//       options && {
//         variables: {
//           resourcesOptions: options,
//           key: domainKey,
//         },
//       }
//     );
//   };
//   return {
//     loading: domain.key !== domainKey,
//     domain,
//     resourcesOptions,
//     setResourcesOptions,
//     resources,
//     resourcesReloading,
//     concepts,
//     refetchResources,
//   };
// };
