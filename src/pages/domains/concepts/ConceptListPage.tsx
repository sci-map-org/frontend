// import { Box, Flex, Stack } from '@chakra-ui/react';
// import gql from 'graphql-tag';
// import dynamic from 'next/dynamic';
// import { PageLayout } from '../../../components/layout/PageLayout';
// import { ManageSubTopicsTreeProps } from '../../../components/topics/ManageSubTopicsTree';
// import { ConceptListPageInfo, DomainPageInfo } from '../../RoutesPageInfos';
// import { useListConceptsConceptListPageQuery } from './ConceptListPage.generated';

// const ManageSubTopicsTree = dynamic<ManageSubTopicsTreeProps>(
//   () =>
//     import('../../../components/topics/ManageSubTopicsTree').then((res) => {
//       const { ManageSubTopicsTree } = res;
//       return ManageSubTopicsTree;
//     }),
//   { ssr: false }
// );

// export const listConceptsConceptListPage = gql`
//   query listConceptsConceptListPage($domainKey: String!) {
//     getDomainByKey(key: $domainKey) {
//       _id
//       key
//       name
//       subTopics(options: { sorting: { type: index, direction: ASC } }) {
//         index
//         subTopic {
//           _id
//           key
//           topicType
//           name
//           description
//           subTopics(options: { sorting: { type: index, direction: ASC } }) {
//             index
//             subTopic {
//               topicType
//               _id
//               key
//               name
//               description
//               subTopics(options: { sorting: { type: index, direction: ASC } }) {
//                 index
//                 subTopic {
//                   topicType
//                   _id
//                   key
//                   name
//                   description
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export const ConceptListPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
//   const { data, loading, refetch } = useListConceptsConceptListPageQuery({
//     variables: {
//       domainKey,
//       // options: {
//       //   sorting: {
//       //     field: DomainConceptSortingFields.Index,
//       //     entity: DomainConceptSortingEntities.Relationship,
//       //     direction: SortingDirection.Asc,
//       //   },
//       // },
//     },
//   });

//   if (!data) return <Box>Area not found !</Box>;
//   const domain = data.getDomainByKey;
//   return (
//     <PageLayout
//       breadCrumbsLinks={[DomainPageInfo(domain), ConceptListPageInfo(domain)]}
//       title={domain.name + ' - SubTopics'}
//       centerChildren
//       isLoading={loading}
//     >
//       <Flex direction="column" mt={4}>
//         <Stack spacing={4} width="36rem">
//           {data.getDomainByKey.subTopics && (
//             <ManageSubTopicsTree
//               domain={data.getDomainByKey}
//               subTopics={data.getDomainByKey.subTopics}
//               onUpdated={() => {
//                 refetch();
//               }}
//               isLoading={loading}
//             />
//           )}
//         </Stack>
//         {/* <Box width="20px"></Box> */}
//         {/* <VerticalConceptMappingVisualisation
//           domainKey={domainKey}
//           isLoading={loading}
//           concepts={domain.concepts?.items.map((i) => i.concept) || []}
//           width="36rem"
//         /> */}
//       </Flex>
//     </PageLayout>
//   );
// };

// export default ConceptListPage;
