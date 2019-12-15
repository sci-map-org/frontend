import { useQuery } from '@apollo/react-hooks';
import { GetDomainByKeyOperation, GetDomainByKeyQueryResult, GetDomainByKeyQueryVariables } from './domains.generated';

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
