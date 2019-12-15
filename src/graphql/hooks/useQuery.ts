import { DocumentNode } from 'graphql';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { useQuery as useApolloQuery, QueryHookOptions } from '@apollo/react-hooks';

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
) {
  return useApolloQuery<TData, TVariables>(query, {
    errorPolicy: 'all',
    ...options,
  });
}
