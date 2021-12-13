// import { AddIcon } from '@chakra-ui/icons';
// import { Badge, BadgeProps, Wrap, WrapItem } from '@chakra-ui/layout';
// import { Tag, TagCloseButton, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/tag';
// import { upperFirst } from 'lodash';
// import { ConceptType } from '../../graphql/types';

// export const conceptTypeToLabel = (type: ConceptType) => type.split('_').map(upperFirst).join(' ');

// export const ConceptTypeBadge: React.FC<
//   {
//     type: ConceptType;
//     editable?: boolean;
//     onRemove?: (type: ConceptType) => void;
//     onAdded?: (type: ConceptType) => void;
//   } & TagProps
// > = ({ type, editable, onRemove, onAdded, ...tagProps }) => {
//   return (
//     <Tag
//       size="md"
//       variant="subtle"
//       {...(editable && onAdded && { onClick: () => onAdded(type), _hover: { cursor: 'pointer' } })}
//       {...tagProps}
//     >
//       {editable && onAdded && <TagLeftIcon as={AddIcon} boxSize="12px" />}
//       <TagLabel>{conceptTypeToLabel(type)}</TagLabel>
//       {editable && onRemove && (
//         <TagCloseButton
//           onClick={(e) => {
//             e.preventDefault();
//             onRemove(type);
//           }}
//         />
//       )}
//     </Tag>
//   );
// };

// interface ConceptTypesViewerProps {
//   types: ConceptType[];
// }
// export const ConceptTypesViewer: React.FC<ConceptTypesViewerProps> = ({ types }) => {
//   return (
//     <Wrap>
//       {types.map((type) => (
//         <WrapItem key={type}>
//           <ConceptTypeBadge colorScheme="blue" type={type} />
//         </WrapItem>
//       ))}
//     </Wrap>
//   );
// };

export default {};
