// import { IconButton } from '@chakra-ui/button';
// import { useOutsideClick } from '@chakra-ui/hooks';
// import { EditIcon } from '@chakra-ui/icons';
// import { Flex, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
// import { values } from 'lodash';
// import { useRef, useState } from 'react';
// import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
// import { useUpdateConceptMutation } from '../../graphql/concepts/concepts.operations.generated';
// import { ConceptType } from '../../graphql/types';
// import { ConceptTypeBadge, ConceptTypesViewer } from './ConceptType';

// interface EditableConceptTypesProps {
//   concept: ConceptDataFragment;
//   editable?: boolean;
// }
// export const EditableConceptTypes: React.FC<EditableConceptTypesProps> = ({ concept, editable }) => {
//   const [selectedTypes, setSelectedTypes] = useState(concept.types);
//   const [editMode, setEditMode] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const [updateConceptMutation] = useUpdateConceptMutation();
//   useOutsideClick({
//     ref: ref,
//     handler: async () => {
//       if (!editMode) return;
//       await updateConceptMutation({ variables: { _id: concept._id, payload: { types: selectedTypes } } });
//       setEditMode(false);
//     },
//   });

//   return (
//     <Flex ref={ref}>
//       {editMode ? (
//         <StatelessConceptTypesEditor
//           selectedTypes={selectedTypes}
//           onAdded={(t) => setSelectedTypes([...selectedTypes, t])}
//           onRemove={(t) => setSelectedTypes(selectedTypes.filter((type) => type !== t))}
//         />
//       ) : (
//         <>
//           <ConceptTypesViewer types={concept.types} />
//           {editable && (
//             <IconButton
//               aria-label="edit"
//               icon={<EditIcon />}
//               onClick={() => setEditMode(true)}
//               size="xs"
//               color="gray.700"
//               variant="ghost"
//               float="right"
//               ml={2}
//             />
//           )}
//         </>
//       )}
//     </Flex>
//   );
// };
// interface StatelessConceptTypesEditorProps {
//   selectedTypes: ConceptType[];
//   onAdded: (type: ConceptType) => void;
//   onRemove: (type: ConceptType) => void;
// }

// export const StatelessConceptTypesEditor: React.FC<StatelessConceptTypesEditorProps> = ({
//   selectedTypes,
//   onAdded,
//   onRemove,
// }) => {
//   return (
//     <Stack>
//       {selectedTypes.length && (
//         <Wrap mb={2}>
//           <WrapItem>
//             <Text fontWeight={600} mr={2}>
//               Selected:
//             </Text>
//           </WrapItem>
//           {selectedTypes.map((type) => (
//             <WrapItem key={type}>
//               <ConceptTypeBadge colorScheme="blue" editable type={type} onRemove={onRemove} />
//             </WrapItem>
//           ))}
//         </Wrap>
//       )}
//       <Wrap>
//         {values(ConceptType)
//           .filter((t) => selectedTypes.indexOf(t) === -1)
//           .map((type) => (
//             <WrapItem key={type}>
//               <ConceptTypeBadge editable type={type} onAdded={onAdded} />
//             </WrapItem>
//           ))}
//       </Wrap>
//     </Stack>
//   );
// };

export default {};
