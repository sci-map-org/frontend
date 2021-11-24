// import { Input, Stack, Textarea } from '@chakra-ui/react';
// import gql from 'graphql-tag';
// import Router from 'next/router';
// import { useState } from 'react';
// import { PageLayout } from '../../components/layout/PageLayout';
// import { FormButtons } from '../../components/lib/buttons/FormButtons';
// import { DomainData, generateDomainData } from '../../graphql/domains/domains.fragments';
// import { useUpdateDomainMutation } from '../../graphql/domains/domains.operations.generated';
// import { DomainPageInfo, EditDomainPageInfo, ManageDomainPageInfo } from '../RoutesPageInfos';
// import { GetDomainByKeyEditDomainPageQuery, useGetDomainByKeyEditDomainPageQuery } from './EditDomainPage.generated';

// export const getDomainByKeyEditDomainPage = gql`
//   query getDomainByKeyEditDomainPage($key: String!) {
//     getDomainByKey(key: $key) {
//       ...DomainData
//     }
//   }
//   ${DomainData}
// `;

// const placeholderDomainData: GetDomainByKeyEditDomainPageQuery['getDomainByKey'] = generateDomainData();

// export const EditDomainPage: React.FC<{ domainKey: string }> = ({ domainKey }) => {
//   const { data, loading } = useGetDomainByKeyEditDomainPageQuery({ variables: { key: domainKey } });
//   const [updateDomainMutation] = useUpdateDomainMutation();
//   const domain = data?.getDomainByKey || placeholderDomainData;
//   const [name, setName] = useState(domain.name);
//   const [key, setKey] = useState(domain.key);
//   const [description, setDescription] = useState(domain.description || '');

//   return (
//     <PageLayout
//       title={`Edit ${domain.name}`}
//       marginSize="xl"
//       isLoading={loading}
//       breadCrumbsLinks={[DomainPageInfo(domain), ManageDomainPageInfo(domain), EditDomainPageInfo(domain)]}
//       accessRule="contributorOrAdmin"
//     >
//       <Stack direction="column" spacing={6} alignItems="stretch">
//         <Input
//           placeholder="Area Name"
//           size="md"
//           variant="flushed"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         ></Input>
//         <Input
//           placeholder="Concept Key"
//           size="md"
//           variant="flushed"
//           value={key}
//           onChange={(e) => setKey(e.target.value)}
//         ></Input>
//         <Textarea
//           placeholder="Description"
//           size="md"
//           variant="flushed"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></Textarea>
//         <FormButtons
//           isPrimaryDisabled={!name}
//           onCancel={() => Router.back()}
//           size="lg"
//           onPrimaryClick={() =>
//             updateDomainMutation({ variables: { id: domain._id, payload: { name, description } } }).then(() =>
//               Router.back()
//             )
//           }
//         />
//       </Stack>
//     </PageLayout>
//   );
// };
