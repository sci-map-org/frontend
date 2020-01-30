import { useCreateDomainMutation, useGetDomainByKeyQuery, useSearchDomainsQuery } from './domains.operations.generated';

export const useGetDomainByKey = (key: string) => {
  const { loading, error, data } = useGetDomainByKeyQuery({ variables: { key } });
  return {
    domain: !!data && data.getDomainByKey,
    loading,
    error,
  };
};

export const useSearchDomains = () => {
  const { loading, error, data, fetchMore } = useSearchDomainsQuery({ variables: { options: { pagination: {} } } });

  return {
    domains: !!data && !!data.searchDomains && data.searchDomains.items,
    loading,
    error,
    fetchMore,
  };
};

export const useCreateDomain = () => {
  const [createDomain, { loading, error, data }] = useCreateDomainMutation();
  return {
    createDomain,
    loading,
    error,
    createdDomain: data && data.createDomain,
  };
};
