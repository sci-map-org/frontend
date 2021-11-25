// import {
//   Box,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
// } from '@chakra-ui/react';
// import gql from 'graphql-tag';
// import { useEffect, useState } from 'react';
// import { useDebouncedCallback } from 'use-debounce';
// import { generateUrlKey } from '../../services/url.service';
// import { EntitySelector } from '../lib/selectors/EntitySelector';
// import { NewTopic } from '../topics/NewTopic';
// import { SearchSubTopicsQuery, useSearchSubTopicsLazyQuery } from './SubTopicSelector.generated';

// export const searchSubTopics = gql`
//   query searchSubTopics($domainId: String!, $options: SearchTopicsOptions!) {
//     searchSubTopics(topicId: $domainId, options: $options) {
//       items {
//         _id
//         # ... on Concept {
//         #   ...ConceptSubGoalCardData
//         # }
//         # ... on LearningGoal {
//         #   ...LearningGoalSubGoalCardData
//         # }
//         # ... on Domain {
//         #   _id
//         #   key
//         #   name
//         #   description
//         # }
//       }
//     }
//   }
// `;

// type SubTopicResultItem = SearchSubTopicsQuery['searchSubTopics']['items'][0];

// interface SubTopicSelectorProps {
//   domain: DomainDataFragment;
//   onSelect: (topic: SubTopicResultItem) => void;
//   placeholder?: string;
//   popoverTitle?: string;
//   allowedSubTopicTypes?: TopicType[];
// }
// export const SubTopicSelector: React.FC<SubTopicSelectorProps> = ({
//   domain,
//   onSelect,
//   placeholder,
//   popoverTitle,
//   allowedSubTopicTypes,
// }) => {
//   const [searchResults, setSearchResults] = useState<SubTopicResultItem[]>([]);

//   const [searchSubTopicsLazyQuery, { data }] = useSearchSubTopicsLazyQuery();

//   const debouncedSearchResourcesLazyQuery = useDebouncedCallback(
//     (query: string) =>
//       searchSubTopicsLazyQuery({ variables: { domainId: domain._id, options: { query, pagination: { limit: 10 } } } }),
//     300
//   );

//   useEffect(() => {
//     if (!!data?.searchSubTopics.items) setSearchResults(data.searchSubTopics.items);
//   }, [data]);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [createSubTopicDefaultPayload, setCreateSubTopicDefaultPayload] = useState<{ name?: string; key?: string }>({});

//   return (
//     <>
//       <Box>
//         <EntitySelector
//           width="100%"
//           allowCreation
//           onCreate={(newLg) => {
//             setCreateSubTopicDefaultPayload({ name: newLg.name, key: generateUrlKey(newLg.name) }); //TODO: proper validation
//             onOpen();
//           }}
//           suggestionContainerWidth="300px"
//           placeholder={placeholder || 'Search learning goal...'}
//           entitySuggestions={searchResults}
//           fetchEntitySuggestions={(query) =>
//             query.length >= 1 ? debouncedSearchResourcesLazyQuery.callback(query) : setSearchResults([])
//           }
//           onSelect={onSelect}
//         />
//       </Box>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <NewTopic
//               defaultPayload={createSubTopicDefaultPayload}
//               onCreated={(createdTopic) => {
//                 onSelect(createdTopic);
//                 onClose();
//               }}
//               size="sm"
//               parentDomain={domain}
//               onCancel={() => onClose()}
//               allowedTopicTypes={allowedSubTopicTypes}
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//       {/* // <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement="bottom" closeOnBlur={false} isLazy> */}
//       {/* <PopoverTrigger> */}

//       {/* </PopoverTrigger> */}

//       {/* <PopoverContent>
//         <PopoverHeader fontWeight="semibold">{popoverTitle || 'Create Learning Goal'}</PopoverHeader>
//         <PopoverArrow />
//         <PopoverCloseButton />
//         <PopoverBody>
//           <NewTopic
//             defaultPayload={createSubTopicDefaultPayload}
//             onCreated={(createdTopic) => {
//               onSelect(createdTopic);
//               onClose();
//             }}
//             size="sm"
//             parentDomain={domain}
//             onCancel={() => onClose()}
//             allowedTopicTypes={allowedSubTopicTypes}
//           />
//         </PopoverBody>
//       </PopoverContent> */}
//       {/* </Popover> */}
//     </>
//   );
// };
