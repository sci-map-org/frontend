import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import {
  useAttachLearningMaterialCoversConceptsMutation,
  useDetachLearningMaterialCoversConceptsMutation,
} from '../../graphql/learning_materials/learning_materials.operations.generated';
import { DomainConceptsSelector } from '../concepts/DomainConceptsSelector';

export const LearningMaterialDomainCoveredConceptsSelector: React.FC<{
  learningMaterialId: string;
  domainKey: string;
  coveredConcepts: ConceptDataFragment[];
  title?: string;
  isLoading?: boolean;
}> = ({ learningMaterialId, domainKey, coveredConcepts, title, isLoading }) => {
  const [attachLearningMaterialCoversConcepts] = useAttachLearningMaterialCoversConceptsMutation();
  const [detachLearningMaterialCoversConcepts] = useDetachLearningMaterialCoversConceptsMutation();
  const selectConcept = async (conceptId: string): Promise<void> => {
    await attachLearningMaterialCoversConcepts({
      variables: { learningMaterialId, conceptIds: [conceptId] },
    });
  };
  const removeConcept = async (conceptId: string) => {
    await detachLearningMaterialCoversConcepts({
      variables: { learningMaterialId, conceptIds: [conceptId] },
    });
  };
  return (
    <DomainConceptsSelector
      domainKey={domainKey}
      selectedConcepts={coveredConcepts}
      onSelect={(c) => selectConcept(c._id)}
      onRemove={(c) => removeConcept(c._id)}
      title={title}
      isLoading={isLoading}
    />
  );
};
