// export const getResourcesDomainResourceListPage = gql`
//   query getResourcesDomainResourceListPage($domainKey: String!, $options: DomainResourcesOptions!) {
//     getDomainByKey(key: $domainKey) {
//       ...DomainData
//       resources(options: $options) {
//         items {
//           ...ResourceData
//         }
//       }
//     }
//   }
//   ${DomainData}
//   ${ResourceData}
// `;

export const TopicResourceListPage: React.FC<{ topicKey: string }> = ({ topicKey }) => {
  return null;
};
