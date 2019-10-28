import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../graphql/queries/auth';

export const useCurrentUser = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  return {
    loading,
    error,
    currentUser: !!data && data.currentUser,
  };
};
