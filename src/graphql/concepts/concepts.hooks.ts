import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  useAddConceptToDomainMutation,
  useUpdateConceptMutation,
  useDeleteConceptMutation,
  useGetConceptQuery,
  useListDomainConceptsQuery,
} from './concepts.operations.generated';

export const useAddConceptToDomain = () => {
  const [addConceptToDomain, { loading, error, data }] = useAddConceptToDomainMutation();
  return {
    addConceptToDomain,
    loading,
    error,
    createdConcept: data && data.addConceptToDomain,
  };
};

export const useUpdateConcept = () => {
  const [updateConcept, { loading, error }] = useUpdateConceptMutation();
  return {
    updateConcept,
    loading,
    error,
  };
};

export const useDeleteConcept = () => {
  const [deleteConcept, { loading, error }] = useDeleteConceptMutation({
    update: (a, { data }) => {
      console.log(a, data && data.deleteConcept._id);
    },
  });

  return {
    deleteConcept,
    loading,
    error,
  };
};

export const useGetConcept = (_id: string) => {
  const { loading, error, data } = useGetConceptQuery({
    variables: { _id },
  });
  return {
    concept: !!data && data.getConcept,
    loading,
    error,
  };
};

export const useListDomainConcepts = (domainKey: string) => {
  const { loading, error, data, fetchMore } = useListDomainConceptsQuery({ variables: { domainKey, options: {} } });
  return {
    concepts: !!data && !!data.getDomainByKey.concepts && data.getDomainByKey.concepts.items,
    loading,
    error,
    fetchMore,
  };
};
