import {
  useAddConceptToDomainMutation,
  useDeleteConceptMutation,
  useGetConceptQuery,
  useUpdateConceptMutation,
} from './concepts.operations.generated';

// export const useAddConceptToDomain = () => {
//   const [addConceptToDomain, { loading, error, data }] = useAddConceptToDomainMutation();
//   return {
//     addConceptToDomain,
//     loading,
//     error,
//     createdConcept: data && data.addConceptToDomain,
//   };
// };

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
