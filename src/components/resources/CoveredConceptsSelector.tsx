import { differenceBy } from 'lodash';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useAttachResourceCoversConceptsMutation,
  useDetachResourceCoversConceptsMutation,
} from '../../graphql/resources/resources.operations.generated';
import { ConceptsPicker } from '../concepts/ConceptsPicker';

export const CoveredConceptsSelector: React.FC<{
  resourceId: string;
  coveredConcepts: ConceptDataFragment[];
  conceptList: ConceptDataFragment[];
}> = ({ coveredConcepts, conceptList, resourceId }) => {
  const possibleConceptSuggestions = differenceBy(conceptList, coveredConcepts, (c) => c._id);

  const [attachResourceCoversConcepts] = useAttachResourceCoversConceptsMutation();
  const [detachResourceCoversConcepts] = useDetachResourceCoversConceptsMutation();
  const selectConcept = async (conceptId: string): Promise<void> => {
    await attachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  const removeConcept = async (conceptId: string) => {
    await detachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  return (
    <ConceptsPicker
      pickableConceptList={possibleConceptSuggestions}
      pickedConceptList={coveredConcepts}
      onSelect={(c) => selectConcept(c._id)}
      onRemove={(c) => removeConcept(c._id)}
      title="Covered Concepts"
    />
  );
};
