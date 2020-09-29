import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useAttachResourceCoversConceptsMutation,
  useDetachResourceCoversConceptsMutation,
} from '../../graphql/resources/resources.operations.generated';
import { DomainConceptsSelector } from '../concepts/DomainConceptsSelector';

export const ResourceDomainCoveredConceptsSelector: React.FC<{
  resourceId: string;
  domainKey: string;
  coveredConcepts: ConceptDataFragment[];
  title?: string;
}> = ({ resourceId, domainKey, coveredConcepts, title }) => {
  const [attachResourceCoversConcepts] = useAttachResourceCoversConceptsMutation();
  const [detachResourceCoversConcepts] = useDetachResourceCoversConceptsMutation();
  const selectConcept = async (conceptId: string): Promise<void> => {
    await attachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  const removeConcept = async (conceptId: string) => {
    await detachResourceCoversConcepts({ variables: { resourceId, conceptIds: [conceptId] } });
  };
  return (
    <DomainConceptsSelector
      domainKey={domainKey}
      selectedConcepts={coveredConcepts}
      onSelect={(c) => selectConcept(c._id)}
      onRemove={(c) => removeConcept(c._id)}
      title={title}
    />
  );
};
