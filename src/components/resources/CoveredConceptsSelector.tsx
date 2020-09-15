import { differenceBy } from 'lodash';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { useGetDomainConceptListQuery } from '../../graphql/concepts/concepts.operations.generated';
import { ResourcePreviewDataFragment } from '../../graphql/resources/resources.fragments.generated';
import {
  useAttachResourceCoversConceptsMutation,
  useDetachResourceCoversConceptsMutation,
} from '../../graphql/resources/resources.operations.generated';
import { ConceptsPicker } from '../concepts/ConceptsPicker';

export const CoveredConceptsSelector: React.FC<{
  resourceId: string;
  coveredConcepts: ConceptDataFragment[];
  conceptList: ConceptDataFragment[];
  title?: string;
}> = ({ coveredConcepts, conceptList, resourceId, title }) => {
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
      title={title}
    />
  );
};

export const DomainCoveredConceptSelector: React.FC<{ domainKey: string; resource: ResourcePreviewDataFragment }> = ({
  domainKey,
  resource,
}) => {
  const { data } = useGetDomainConceptListQuery({ variables: { domainKey: domainKey } });
  const domainConceptList = (data?.getDomainByKey.concepts?.items || []).map((item) => item.concept);
  return (
    <CoveredConceptsSelector
      resourceId={resource._id}
      coveredConcepts={resource.coveredConcepts?.items || []}
      conceptList={domainConceptList}
    />
  );
};
