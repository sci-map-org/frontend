// import { Box, IconButton, Stack, Text } from '@chakra-ui/react';
// import { DeleteIcon } from '@chakra-ui/icons';
// import { DomainDataFragment } from '../../graphql/domains/domains.fragments.generated';
// import { useSearchDomainsLazyQuery } from '../../graphql/domains/domains.operations.generated';
// import { EntitySelector } from '../lib/selectors/EntitySelector';
// import { InternalLink, PageLink } from '../navigation/InternalLink';
// import { DomainSelector } from './DomainSelector';
// import { DomainPageInfo } from '../../pages/RoutesPageInfos';

// interface DomainsPickerProps {
//   title: string;
//   pickedDomainList: DomainDataFragment[];
//   onSelect: (domain: DomainDataFragment) => void;
//   onRemove: (domain: DomainDataFragment) => void;
// }

// export const DomainsPicker: React.FC<DomainsPickerProps> = ({ title, pickedDomainList, onSelect, onRemove }) => {
//   return (
//     <Stack direction="row" width="26rem" borderWidth="1px" borderRadius={5} p={3} spacing={5}>
//       <DomainSelector onSelect={onSelect} />
//       <Stack>
//         <Text fontWeight={700}>{title}</Text>
//         <Box>
//           {pickedDomainList.map((pickedDomain) => {
//             return (
//               <Stack direction="row" spacing={2} key={pickedDomain._id} my={2}>
//                 <IconButton
//                   aria-label="remove domain"
//                   icon={<DeleteIcon />}
//                   variant="outline"
//                   onClick={() => onRemove(pickedDomain)}
//                   size="xs"
//                 />
//                 <PageLink pageInfo={DomainPageInfo(pickedDomain)}>{pickedDomain.name}</PageLink>
//               </Stack>
//             );
//           })}
//         </Box>
//       </Stack>
//     </Stack>
//   );
// };
