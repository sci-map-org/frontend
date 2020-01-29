import { useMutation } from '@apollo/react-hooks';

import { useQuery } from '../hooks/useQuery';
import {
  useCreateArticleMutation,
  useGetArticleByKeyQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useListUserArticlePreviewsQuery,
} from './articles.operations.generated';

export const useCreateArticle = () => {
  const [createArticle, { loading, error, data }] = useCreateArticleMutation();
  return {
    createArticle,
    loading,
    error,
    createdArticle: data && data.createArticle,
  };
};

export const useGetArticleByKey = (key: string) => {
  const { loading, error, data } = useGetArticleByKeyQuery({ variables: { key } });
  return {
    article: !!data && data.getArticleByKey,
    loading,
    error,
  };
};

export const useUpdateArticle = () => {
  const [updateArticle, { loading, error }] = useUpdateArticleMutation();
  return {
    updateArticle,
    loading,
    error,
  };
};

export const useDeleteArticle = () => {
  const [deleteArticle, { loading, error }] = useDeleteArticleMutation();
  return {
    deleteArticle,
    loading,
    error,
  };
};

export const useListUserArticlePreviews = (userKey: string) => {
  const { loading, error, data, fetchMore } = useListUserArticlePreviewsQuery({ variables: { userKey, options: {} } });

  return {
    articlePreviews: !!data && !!data.getUser.articles && data.getUser.articles.items,
    loading,
    error,
    fetchMore,
  };
};
