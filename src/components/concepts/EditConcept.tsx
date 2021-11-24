// import { FormControl, FormLabel } from '@chakra-ui/form-control';
// import { Input } from '@chakra-ui/input';
// import { Stack } from '@chakra-ui/layout';
// import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
// import { Textarea } from '@chakra-ui/textarea';
// import gql from 'graphql-tag';
// import { useEffect, useMemo, useState } from 'react';
// import { useDebounce } from 'use-debounce';
// import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
// import { useUpdateConcept } from '../../graphql/concepts/concepts.hooks';
// import { DomainData } from '../../graphql/domains/domains.fragments';
// import { useCheckTopicKeyAvailabilityLazyQuery } from '../../graphql/topics/topics.operations.generated';
// import { TopicType } from '../../graphql/types';
// import { routerPushToPage } from '../../pages/PageInfo';
// import { ConceptPageInfo, ConceptPagePath } from '../../pages/RoutesPageInfos';
// import { StandardChakraSize } from '../../util/chakra.util';
// import { FormButtons } from '../lib/buttons/FormButtons';
// import { UrlKeyAvailability, UrlKeyInput } from '../lib/inputs/UrlKeyInput';
// import { StatelessConceptTypesEditor } from './ConceptTypesEditor';
// import { EditConceptDataFragment } from './EditConcept.generated';

// export const EditConceptData = gql`
//   fragment EditConceptData on Concept {
//     _id
//     key
//     name
//     types
//     description
//     domain {
//       ...DomainData
//     }
//   }
//   ${DomainData}
// `;

// interface EditConceptProps {
//   size: StandardChakraSize;
//   concept: EditConceptDataFragment;
//   onCancel: () => void;
//   onUpdated?: (udpatedConcept: ConceptDataFragment) => void;
// }

// export const EditConcept: React.FC<EditConceptProps> = ({ size, concept, onCancel, onUpdated }) => {
//   const [name, setName] = useState(concept.name);
//   const [key, setKey] = useState(concept.key);
//   const [types, setTypes] = useState(concept.types);
//   const [description, setDescription] = useState(concept.description || undefined);

//   const [checkTopicKeyAvailability, { loading, data }] = useCheckTopicKeyAvailabilityLazyQuery({
//     errorPolicy: 'ignore',
//     fetchPolicy: 'no-cache',
//   });
//   const [keyValueToCheck] = useDebounce(key, 300);

//   const keyAvailability: UrlKeyAvailability = useMemo(() => {
//     if (concept.key === keyValueToCheck) return UrlKeyAvailability.Available;
//     if (loading) return UrlKeyAvailability.Loading;
//     return data?.checkTopicKeyAvailability.available ? UrlKeyAvailability.Available : UrlKeyAvailability.Unavailable;
//   }, [data, loading, key]);

//   useEffect(() => {
//     if (concept.domain) {
//       checkTopicKeyAvailability({
//         variables: { topicType: TopicType.Concept, domainKey: concept.domain.key, key: keyValueToCheck },
//       });
//     }
//   }, [keyValueToCheck]);
//   const { updateConcept, loading: updatingConcept } = useUpdateConcept();
//   return (
//     <Stack spacing={6} direction="column" alignItems="stretch">
//       <FormControl id="concept_name">
//         <FormLabel>Topic Name</FormLabel>
//         <Input
//           placeholder="Topic Name"
//           size={size}
//           variant="outline"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         />
//       </FormControl>
//       <FormControl id="concept_key">
//         <FormLabel>Url key</FormLabel>
//         <UrlKeyInput
//           placeholder="Url key"
//           size={size}
//           variant="outline"
//           onChange={(k) => setKey(k)}
//           availability={keyAvailability}
//           getUrlPreview={(key) => (concept.domain ? ConceptPagePath(concept.domain.key, key) : null)}
//           value={key}
//         />
//       </FormControl>
//       <FormControl id="concept_description">
//         <FormLabel>Description</FormLabel>
//         <Textarea
//           placeholder="Description"
//           size={size}
//           variant="flushed"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></Textarea>
//       </FormControl>
//       <FormControl id="concept_types">
//         <FormLabel>Types</FormLabel>
//         <StatelessConceptTypesEditor
//           selectedTypes={types}
//           onAdded={(t) => setTypes([...types, t])}
//           onRemove={(typeToRemove) => setTypes(types.filter((t) => t !== typeToRemove))}
//         />
//       </FormControl>
//       <FormButtons
//         size={size}
//         onCancel={onCancel}
//         onPrimaryClick={async () => {
//           const payload = {
//             ...(key !== concept.key && { key }),
//             ...(name !== concept.name && { name }),
//             ...(description !== concept.description && { description }),
//             ...(JSON.stringify(types) !== JSON.stringify(concept.types) && { types }),
//           };
//           const { data } = await updateConcept({ variables: { _id: concept._id, payload } });
//           if (data && payload.key && concept.domain)
//             //redirects to new url in case it's udpated
//             routerPushToPage(ConceptPageInfo(concept.domain, data.updateConcept));
//           data && onUpdated && onUpdated(data.updateConcept);
//         }}
//         isPrimaryLoading={updatingConcept}
//         isPrimaryDisabled={!name || !key || keyAvailability !== UrlKeyAvailability.Available}
//         primaryText="Save"
//       />
//     </Stack>
//   );
// };

// interface EditConceptModalProps extends EditConceptProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const EditConceptModal: React.FC<EditConceptModalProps> = ({
//   onClose,
//   concept,
//   isOpen,
//   onCancel,
//   onUpdated,
//   ...props
// }) => {
//   return (
//     <Modal onClose={onClose} size="xl" isOpen={isOpen}>
//       <ModalOverlay>
//         <ModalContent>
//           <ModalHeader>Edit Topic - {concept.name}</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={5}>
//             <EditConcept
//               onUpdated={(createdConcept) => {
//                 onClose();
//                 onUpdated && onUpdated(createdConcept);
//               }}
//               onCancel={() => {
//                 onClose();
//                 onCancel && onCancel();
//               }}
//               concept={concept}
//               {...props}
//             />
//           </ModalBody>
//         </ModalContent>
//       </ModalOverlay>
//     </Modal>
//   );
// };
