import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GetDomainByKeyOperation,
  GetDomainByKeyQueryResult,
  GetDomainByKeyQueryVariables,
  CreateDomainMutationResult,
  CreateDomainMutationVariables,
  CreateDomainOperation,
} from './domains.generated';

export const useGetDomainByKey = (key: string) => {
  const { loading, error, data } = useQuery<GetDomainByKeyQueryResult, GetDomainByKeyQueryVariables>(
    GetDomainByKeyOperation,
    { variables: { key } }
  );
  return {
    domain: !!data && data.getDomainByKey,
    loading,
    error,
  };
};

export const useCreateDomain = () => {
  const [createDomain, { loading, error, data }] = useMutation<
    CreateDomainMutationResult,
    CreateDomainMutationVariables
  >(CreateDomainOperation);
  return {
    createDomain,
    loading,
    error,
    createdDomain: data && data.createDomain,
  };
};
