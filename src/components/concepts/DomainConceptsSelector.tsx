import { differenceBy } from 'lodash';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { useGetDomainConceptListQuery } from '../../graphql/concepts/concepts.operations.generated';
import { ConceptsPicker } from './ConceptsPicker';

// Base one: get domain covered concepts list
export const DomainConceptsSelector: React.FC<{
  domainKey: string;
  onSelect: (concept: ConceptDataFragment) => void;
  onRemove: (concept: ConceptDataFragment) => void;
  selectedConcepts: ConceptDataFragment[];
  title?: string;
  placeholder?: string;
}> = ({ domainKey, selectedConcepts, title, placeholder, onSelect, onRemove }) => {
  const { data } = useGetDomainConceptListQuery({ variables: { domainKey: domainKey } });
  const domainConceptList = (data?.getDomainByKey.concepts?.items || []).map((item) => item.concept);
  const possibleConceptSuggestions = differenceBy(domainConceptList, selectedConcepts, (c) => c._id);
  return (
    <ConceptsPicker
      domainKey={domainKey}
      pickableConceptList={possibleConceptSuggestions}
      pickedConceptList={selectedConcepts}
      onSelect={onSelect}
      onRemove={onRemove}
      title={title}
      placeholder={placeholder}
    />
  );
};
