import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CreateResourceMutationResult,
  CreateResourceMutationVariables,
  CreateResourceOperation,
  AddResourceToDomainMutationResult,
  AddResourceToDomainMutationVariables,
  AddResourceToDomainOperation,
  GetResourceByIdQueryResult,
  GetResourceByIdQueryVariables,
  GetResourceByIdOperation,
  ListDomainResourcePreviewsQueryResult,
  ListDomainResourcePreviewsQueryVariables,
  ListDomainResourcePreviewsOperation,
  AttachResourceCoversConceptsMutationResult,
  AttachResourceCoversConceptsMutationVariables,
  AttachResourceCoversConceptsOperation,
} from './resources.generated';

export const useGetResourceById = (_id: string) => {
  const { loading, error, data } = useQuery<GetResourceByIdQueryResult, GetResourceByIdQueryVariables>(
    GetResourceByIdOperation,
    { variables: { id: _id } }
  );
  return {
    resource: !!data && data.getResourceById,
    loading,
    error,
  };
};

export const useListDomainResourcesPreviews = (domainKey: string) => {
  const { loading, error, data, fetchMore } = useQuery<
    ListDomainResourcePreviewsQueryResult,
    ListDomainResourcePreviewsQueryVariables
  >(ListDomainResourcePreviewsOperation, {
    variables: {
      domainKey,
      options: {
        pagination: {},
      },
    },
  });
  return {
    resourcePreviews: !!data && !!data.getDomainByKey.resources && data.getDomainByKey.resources.items,
    loading,
    error,
    fetchMore,
  };
};

export const useCreateResource = () => {
  const [createResource, { loading, error, data }] = useMutation<
    CreateResourceMutationResult,
    CreateResourceMutationVariables
  >(CreateResourceOperation);
  return {
    createResource,
    loading,
    error,
    createdResource: data && data.createResource,
  };
};

export const useAddResourceToDomain = () => {
  const [addResourceToDomain, { loading, error, data }] = useMutation<
    AddResourceToDomainMutationResult,
    AddResourceToDomainMutationVariables
  >(AddResourceToDomainOperation);
  return {
    addResourceToDomain,
    loading,
    error,
    createdResource: data && data.addResourceToDomain,
  };
};

export const useAttachResourceCoversConcepts = () => {
  const [attachResourceCoversConcepts, { loading, error, data }] = useMutation<
    AttachResourceCoversConceptsMutationResult,
    AttachResourceCoversConceptsMutationVariables
  >(AttachResourceCoversConceptsOperation);
  return {
    attachResourceCoversConcepts,
    loading,
    error,
    updatedResource: data && data.attachResourceCoversConcepts,
  };
};
