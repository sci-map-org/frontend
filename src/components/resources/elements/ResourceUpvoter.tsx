// import { Flex, IconButton, Skeleton, Text } from '@chakra-ui/react';
// import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
// import gql from 'graphql-tag';
// import React from 'react';
// // import { useVoteResourceMutation } from '../../../graphql/resources/resources.operations.generated';
// // import { ResourceVoteValue } from '../../../graphql/types';
// import { useCurrentUser } from '../../../graphql/users/users.hooks';
// import { useUnauthentificatedModal } from '../../auth/UnauthentificatedModal';
// import { ResourceUpvoterDataFragment } from './ResourceUpvoter.generated';

// export const ResourceUpvoterData = gql`
//   fragment ResourceUpvoterData on Resource {
//     _id
//   }
// `;

// export const ResourceUpvoter: React.FC<{ resource: ResourceUpvoterDataFragment; isLoading?: boolean }> = ({
//   resource,
//   isLoading,
// }) => {
//   // const [voteResource] = useVoteResourceMutation();
//   const unauthentificatedModalDisclosure = useUnauthentificatedModal();
//   const { currentUser } = useCurrentUser();
//   return (
//     <Flex direction="column" justifyContent="center" alignItems="center">
//       <IconButton
//         size="xs"
//         aria-label="upvote"
//         icon={<ArrowUpIcon />}
//         variant="ghost"
//         my={0}
//         isDisabled={isLoading}
//         onClick={() => {
//           // if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
//           // voteResource({ variables: { resourceId: resource._id, value: ResourceVoteValue.Up } });
//         }}
//       />
//       <Skeleton isLoaded={!isLoading}>
//         <Text>{resource.upvotes}</Text>
//       </Skeleton>
//       <IconButton
//         size="xs"
//         aria-label="downvote"
//         icon={<ArrowDownIcon />}
//         variant="ghost"
//         my={0}
//         isDisabled={isLoading}
//         onClick={() => {
//           // if (!currentUser) return unauthentificatedModalDisclosure.onOpen();
//           // voteResource({ variables: { resourceId: resource._id, value: ResourceVoteValue.Down } });
//         }}
//       />
//     </Flex>
//   );
// };

export {};
