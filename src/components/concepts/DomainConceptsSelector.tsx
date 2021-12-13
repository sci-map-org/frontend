// import { differenceBy } from 'lodash';
// import { DomainConceptsPicker } from './DomainConceptsPicker';

// interface DomainConceptsSelectorProps {
//   domain: DomainLinkDataFragment;
//   onSelect: (concept: ConceptLinkDataFragment) => void;
//   onRemove: (concept: ConceptLinkDataFragment) => void;
//   selectedConcepts: ConceptLinkDataFragment[];
//   title?: string;
//   placeholder?: string;
//   isLoading?: boolean;
//   allowCreation?: boolean;
// }

// export const DomainConceptsSelector: React.FC<DomainConceptsSelectorProps> = ({
//   domain,
//   selectedConcepts,
//   title,
//   placeholder,
//   onSelect,
//   onRemove,
//   isLoading,
//   allowCreation,
// }) => {
//   const { data } = useGetDomainConceptListQuery({ variables: { domainKey: domain.key }, skip: isLoading });
//   const domainConceptList = (data?.getDomainByKey.concepts?.items || []).map((item) => item.concept);
//   const possibleConceptSuggestions = differenceBy(domainConceptList, selectedConcepts, (c) => c._id);
//   return (
//     <DomainConceptsPicker
//       domain={domain}
//       pickableConceptList={possibleConceptSuggestions}
//       pickedConceptList={selectedConcepts}
//       onSelect={onSelect}
//       onRemove={onRemove}
//       title={title}
//       placeholder={placeholder}
//       isLoading={isLoading}
//       allowCreation={allowCreation}
//     />
//   );
// };

export default {};
