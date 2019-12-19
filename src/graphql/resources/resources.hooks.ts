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
