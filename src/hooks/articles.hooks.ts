import { useMutation } from '@apollo/react-hooks';

import { CreateArticleMutation } from '../graphql/generated/mutations';
import { CreateArticleMutationResult, MutationCreateArticleArgs } from '../graphql/generated/types';

export const useCreateArticle = () => {
  const [createArticle, { loading, error }] = useMutation<CreateArticleMutationResult, MutationCreateArticleArgs>(
    CreateArticleMutation,
    {}
  );
  return {
    createArticle,
    loading,
    error,
  };
};
