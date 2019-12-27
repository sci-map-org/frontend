import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  AddConceptToDomainMutationResult,
  AddConceptToDomainMutationVariables,
  AddConceptToDomainOperation,
  ListDomainConceptsQueryResult,
  ListDomainConceptsQueryVariables,
  ListDomainConceptsOperation,
  GetConceptOperation,
  GetConceptQueryResult,
  GetConceptQueryVariables,
  UpdateConceptMutationResult,
  UpdateConceptMutationVariables,
  UpdateConceptOperation,
  DeleteConceptMutationResult,
  DeleteConceptMutationVariables,
  DeleteConceptOperation,
} from './concepts.generated';

export const useAddConceptToDomain = () => {
  const [addConceptToDomain, { loading, error, data }] = useMutation<
    AddConceptToDomainMutationResult,
    AddConceptToDomainMutationVariables
  >(AddConceptToDomainOperation);
  return {
    addConceptToDomain,
    loading,
    error,
    createdConcept: data && data.addConceptToDomain,
  };
};

export const useUpdateConcept = () => {
  const [updateConcept, { loading, error }] = useMutation<UpdateConceptMutationResult, UpdateConceptMutationVariables>(
    UpdateConceptOperation,
    {}
  );
  return {
    updateConcept,
    loading,
    error,
  };
};

export const useDeleteConcept = () => {
  const [deleteConcept, { loading, error }] = useMutation<DeleteConceptMutationResult, DeleteConceptMutationVariables>(
    DeleteConceptOperation, // TODO: update cache to remove concept
    {
      update: (a, { data }) => {
        console.log(a, data && data.deleteConcept._id);
      },
    }
  );
  return {
    deleteConcept,
    loading,
    error,
  };
};

export const useGetConcept = (_id: string) => {
  const { loading, error, data } = useQuery<GetConceptQueryResult, GetConceptQueryVariables>(GetConceptOperation, {
    variables: { _id },
  });
  return {
    concept: !!data && data.getConcept,
    loading,
    error,
  };
};

export const useListDomainConcepts = (domainKey: string) => {
  const { loading, error, data, fetchMore } = useQuery<ListDomainConceptsQueryResult, ListDomainConceptsQueryVariables>(
    ListDomainConceptsOperation,
    {
      variables: {
        domainKey,
        options: {
          pagination: {},
        },
      },
    }
  );
  return {
    concepts: !!data && !!data.getDomainByKey.concepts && data.getDomainByKey.concepts.items,
    loading,
    error,
    fetchMore,
  };
};
