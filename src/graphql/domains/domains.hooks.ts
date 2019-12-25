import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GetDomainByKeyOperation,
  GetDomainByKeyQueryResult,
  GetDomainByKeyQueryVariables,
  CreateDomainMutationResult,
  CreateDomainMutationVariables,
  CreateDomainOperation,
  SearchDomainsQueryResult,
  SearchDomainsQueryVariables,
  SearchDomainsOperation,
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

export const useSearchDomains = () => {
  const { loading, error, data, fetchMore } = useQuery<SearchDomainsQueryResult, SearchDomainsQueryVariables>(
    SearchDomainsOperation,
    {
      variables: {
        options: {
          query: '',
          pagination: {
            offset: 0,
            limit: 10,
          },
        },
      },
    }
  );

  return {
    domains: !!data && !!data.searchDomains && data.searchDomains.items,
    loading,
    error,
    fetchMore,
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
