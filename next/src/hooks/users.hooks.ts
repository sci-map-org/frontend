import { useQuery } from '@apollo/react-hooks';
import { CurrentUserQuery } from '../graphql/generated/queries';
import { CurrentUserQueryResult } from '../graphql/generated/types';

export const useCurrentUser = () => {
  const { loading, error, data } = useQuery<CurrentUserQueryResult>(CurrentUserQuery);
  return {
    loading,
    error,
    currentUser: !!data && data.currentUser,
  };
};
