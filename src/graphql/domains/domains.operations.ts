// import gql from 'graphql-tag';
// import { DomainData } from './domains.fragments';

// export const getDomainByKey = gql`
//   query getDomainByKey($key: String!) {
//     getDomainByKey(key: $key) {
//       ...DomainData
//     }
//   }
//   ${DomainData}
// `;

// export const searchDomains = gql`
//   query searchDomains($options: SearchDomainsOptions!) {
//     searchDomains(options: $options) {
//       items {
//         ...DomainData
//       }
//     }
//   }
//   ${DomainData}
// `;
// export const createDomain = gql`
//   mutation createDomain($payload: CreateDomainPayload!) {
//     createDomain(payload: $payload) {
//       ...DomainData
//     }
//   }
//   ${DomainData}
// `;

// export const updateDomain = gql`
//   mutation updateDomain($id: String!, $payload: UpdateDomainPayload!) {
//     updateDomain(id: $id, payload: $payload) {
//       ...DomainData
//     }
//   }
//   ${DomainData}
// `;

// export const deleteDomain = gql`
//   mutation deleteDomain($id: String!) {
//     deleteDomain(id: $id) {
//       _id
//       success
//     }
//   }
// `;
